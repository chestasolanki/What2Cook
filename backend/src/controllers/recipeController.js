const recipeService = require('../services/recipeService');
const searchService = require('../services/searchService');

function getRecipes(req, res) {
  const recipes = recipeService.getAllRecipes();
  res.json({ count: recipes.length, recipes });
}

function getRecipeById(req, res) {
  const recipe = recipeService.getRecipeById(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
}

async function searchRecipes(req, res) {
  try {
    const { q, maxCalories, minProtein, topK } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const results = await searchService.hybridSearch(q, {
      maxCalories: maxCalories ? parseInt(maxCalories) : null,
      minProtein: minProtein ? parseInt(minProtein) : null,
      topK: topK ? parseInt(topK) : 5
    });

    res.json({ count: results.length, results });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: 'Search failed' });
  }
}

function getPopularRecipes(req, res) {
  const recipes = recipeService.getAllRecipes();
  // Return first 6 popular recipes
  const popular = recipes.slice(0, 6);
  res.json({ count: popular.length, recipes: popular });
}

module.exports = {
  getRecipes,
  getRecipeById,
  searchRecipes,
  getPopularRecipes
};