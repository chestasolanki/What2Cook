const fs = require('fs');
const path = require('path');

function parseKaggleDataset() {
  console.log("⏳ Processing Kaggle Epicurious Recipe Dataset...");

  const rawKagglePath = path.join(__dirname, '../data/full_format_recipes.json');
  const outputPath = path.join(__dirname, '../data/recipes.json');

  if (!fs.existsSync(rawKagglePath)) {
    console.error("❌ Could not find Kaggle file at backend/data/full_format_recipes.json");
    console.log("Please download the dataset from Kaggle and save it as backend/data/full_format_recipes.json");
    return;
  }

  // Read raw Kaggle JSON
  const rawData = fs.readFileSync(rawKagglePath, 'utf-8');
  const kaggleRecipes = JSON.parse(rawData);

  console.log(`Read ${kaggleRecipes.length} raw recipes from Kaggle.`);

  // Filter and transform into our clean PantryChef schema
  const cleanRecipes = [];

  kaggleRecipes.forEach((item, index) => {
    // Only keep recipes that have titles, ingredients, instructions, and calorie data
    if (
      item.title &&
      item.ingredients && Array.isArray(item.ingredients) && item.ingredients.length > 0 &&
      item.directions && Array.isArray(item.directions) && item.directions.length > 0 &&
      item.calories !== undefined && item.calories !== null
    ) {
      cleanRecipes.push({
        id: `recipe_${String(index + 1).padStart(3, '0')}`,
        title: item.title.trim(),
        cuisine: item.categories && item.categories.length > 0 ? item.categories[0] : 'General',
        prepTimeMinutes: item.prepTime || 25,
        nutrition: {
          calories: Math.round(item.calories || 0),
          proteinGrams: Math.round(item.protein || 0),
          carbsGrams: Math.round(item.carbs || Math.max(0, Math.round((item.calories - (item.protein * 4 + item.fat * 9)) / 4))),
          fatGrams: Math.round(item.fat || 0)
        },
        ingredients: item.ingredients.map(ing => ing.trim()),
        instructions: item.directions.map(dir => dir.trim()),
        tags: item.categories ? item.categories.slice(0, 5) : []
      });
    }
  });

  // Limit to top 500 clean recipes for optimal speed and memory
  const finalDataset = cleanRecipes.slice(0, 500);

  fs.writeFileSync(outputPath, JSON.stringify(finalDataset, null, 2));
  console.log(`✅ Successfully processed and saved ${finalDataset.length} clean recipes to backend/data/recipes.json!`);
}

parseKaggleDataset();