const fs = require('fs');
const path = require('path');

const savedDataPath = path.join(__dirname, '../../data/saved_recipes.json');

// Ensure saved_recipes.json exists
function ensureSavedFile() {
  if (!fs.existsSync(savedDataPath)) {
    const dir = path.dirname(savedDataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(savedDataPath, JSON.stringify([], null, 2));
  }
}

/**
 * Get all saved recipes
 */
function getSavedRecipes() {
  ensureSavedFile();
  const rawData = fs.readFileSync(savedDataPath, 'utf-8');
  return JSON.parse(rawData);
}

/**
 * Save a recipe (prevents duplicates)
 */
function saveRecipe(recipe) {
  ensureSavedFile();
  const saved = getSavedRecipes();

  // Check if already saved
  const existingIdx = saved.findIndex(r => r.id === recipe.id);
  if (existingIdx !== -1) {
    return { success: true, alreadySaved: true, savedRecipes: saved };
  }

  const recipeToSave = {
    ...recipe,
    savedAt: new Date().toISOString()
  };

  saved.unshift(recipeToSave); // Add to top
  fs.writeFileSync(savedDataPath, JSON.stringify(saved, null, 2));
  return { success: true, alreadySaved: false, recipe: recipeToSave, savedRecipes: saved };
}

/**
 * Remove a saved recipe by ID
 */
function removeSavedRecipe(recipeId) {
  ensureSavedFile();
  let saved = getSavedRecipes();
  const filtered = saved.filter(r => r.id !== recipeId);
  fs.writeFileSync(savedDataPath, JSON.stringify(filtered, null, 2));
  return { success: true, savedRecipes: filtered };
}

module.exports = {
  getSavedRecipes,
  saveRecipe,
  removeSavedRecipe
};
