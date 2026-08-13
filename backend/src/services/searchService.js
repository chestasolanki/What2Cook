const MiniSearch = require('minisearch');
const recipeService = require('./recipeService');

let miniSearchInstance = null;
let pipelineInstance = null;
let recipeEmbeddings = [];

/**
 * Initialize MiniSearch BM25 index and compute vector embeddings
 */
async function initializeSearchEngine() {
  console.log("⚡ Initializing Hybrid Search Engine...");
  const recipes = recipeService.getAllRecipes();

  if (recipes.length === 0) {
    console.warn("⚠️ No recipes found to index.");
    return;
  }

  // 1. Initialize BM25 Keyword Search (Instant)
  if (!miniSearchInstance) {
    miniSearchInstance = new MiniSearch({
      fields: ['title', 'ingredients', 'tags', 'cuisine'],
      storeFields: ['id', 'title', 'cuisine', 'nutrition', 'ingredients', 'instructions'],
      extractField: (document, fieldName) => {
        if (fieldName === 'ingredients') {
          return Array.isArray(document.ingredients) ? document.ingredients.join(' ') : '';
        }
        if (fieldName === 'tags') {
          return Array.isArray(document.tags) ? document.tags.join(' ') : '';
        }
        return document[fieldName];
      }
    });

    miniSearchInstance.addAll(recipes);
    console.log(`✅ BM25 Keyword Index built instantly for ${recipes.length} recipes.`);
  }

  // 2. Initialize Embeddings Pipeline in background (Non-blocking)
  if (!pipelineInstance) {
    (async () => {
      try {
        const { pipeline } = await import('@xenova/transformers');
        pipelineInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        
        console.log("⏳ Computing vector embeddings for recipes...");
        
        const tempEmbeddings = [];
        for (const recipe of recipes) {
          const textToEmbed = `${recipe.title}. Ingredients: ${recipe.ingredients.join(', ')}`;
          const output = await pipelineInstance(textToEmbed, { pooling: 'mean', normalize: true });
          tempEmbeddings.push({
            id: recipe.id,
            recipe,
            vector: Array.from(output.data)
          });
        }
        recipeEmbeddings = tempEmbeddings;
        console.log(`✅ Computed ${recipeEmbeddings.length} vector embeddings.`);
      } catch (err) {
        console.warn("⚠️ Could not load local transformers model, using BM25 search:", err.message);
      }
    })();
  }
}

/**
 * Cosine Similarity Helper
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

/**
 * Hybrid Search Engine with Reciprocal Rank Fusion (RRF) & Metadata Filtering
 */
async function hybridSearch(query, options = {}) {
  if (!miniSearchInstance) {
    await initializeSearchEngine();
  }

  const { maxCalories, minProtein, isVegetarian, topK = 5 } = options;

  // 1. BM25 Keyword Search with field weighting
  const bm25Results = miniSearchInstance.search(query, {
    boost: { title: 5, ingredients: 3, tags: 2, cuisine: 1 },
    fuzzy: 0.2,
    prefix: true,
    combineWith: 'OR'
  });

  // 2. Vector Search
  let vectorResults = [];
  if (pipelineInstance && recipeEmbeddings.length > 0) {
    const queryOutput = await pipelineInstance(query, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(queryOutput.data);

    vectorResults = recipeEmbeddings.map(item => ({
      id: item.id,
      recipe: item.recipe,
      score: cosineSimilarity(queryVector, item.vector)
    })).sort((a, b) => b.score - a.score);
  }

  // 3. Reciprocal Rank Fusion (RRF) Algorithm & Direct Keyword Boosting
  const RRF_K = 60;
  const rrfScores = new Map();

  bm25Results.forEach((item, rank) => {
    const rrfScore = 1 / (RRF_K + rank + 1);
    rrfScores.set(item.id, (rrfScores.get(item.id) || 0) + rrfScore);
  });

  vectorResults.forEach((item, rank) => {
    const rrfScore = 1 / (RRF_K + rank + 1);
    rrfScores.set(item.id, (rrfScores.get(item.id) || 0) + rrfScore);
  });

  // Direct exact ingredient/title query keyword boost
  const queryTerms = query.toLowerCase().split(/[,\s]+/).filter(t => t.length > 2);
  const allRecipes = recipeService.getAllRecipes();
  const recipeMap = new Map(allRecipes.map(r => [r.id, r]));

  // Boost recipes that match specific requested ingredients or titles directly
  allRecipes.forEach(recipe => {
    const titleText = (recipe.title || '').toLowerCase();
    const ingText = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(' ').toLowerCase() : '';
    
    let matchCount = 0;
    queryTerms.forEach(term => {
      if (titleText.includes(term)) matchCount += 3;
      else if (ingText.includes(term)) matchCount += 1;
    });

    if (matchCount > 0) {
      const currentScore = rrfScores.get(recipe.id) || 0;
      rrfScores.set(recipe.id, currentScore + (matchCount * 0.5));
    }
  });

  const NON_VEG_WORDS = ['chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna', 'bacon', 'turkey', 'lamb', 'meat', 'shrimp', 'prawn', 'crab', 'anchovy', 'sausage', 'ham', 'steak', 'veal', 'duck'];

  let fusedResults = [];
  rrfScores.forEach((rrfScore, id) => {
    const recipe = recipeMap.get(id);
    if (!recipe) return;

    // Apply Metadata Filters
    if (maxCalories && recipe.nutrition && recipe.nutrition.calories > maxCalories) return;
    if (minProtein && recipe.nutrition && recipe.nutrition.proteinGrams < minProtein) return;

    // Apply Vegetarian Filter
    if (isVegetarian) {
      const fullRecipeText = `${recipe.title} ${(recipe.ingredients || []).join(' ')}`.toLowerCase();
      const hasNonVeg = NON_VEG_WORDS.some(word => fullRecipeText.includes(word));
      if (hasNonVeg) return;
    }

    fusedResults.push({
      recipe,
      rrfScore: parseFloat(rrfScore.toFixed(5))
    });
  });

  fusedResults.sort((a, b) => b.rrfScore - a.rrfScore);
  return fusedResults.slice(0, topK);
}

module.exports = {
  initializeSearchEngine,
  hybridSearch
};