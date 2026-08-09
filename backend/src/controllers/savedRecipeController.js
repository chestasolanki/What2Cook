const savedRecipeService = require('../services/savedRecipeService');

// GET /api/saved-recipes
function getSaved(req, res) {
  try {
    const saved = savedRecipeService.getSavedRecipes();
    res.json({ count: saved.length, recipes: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
}

// POST /api/saved-recipes
function save(req, res) {
  try {
    const { recipe } = req.body;
    if (!recipe || !recipe.id) {
      return res.status(400).json({ error: 'Valid recipe object with id is required' });
    }

    const result = savedRecipeService.saveRecipe(recipe);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save recipe' });
  }
}

// DELETE /api/saved-recipes/:id
function remove(req, res) {
  try {
    const { id } = req.params;
    const result = savedRecipeService.removeSavedRecipe(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove saved recipe' });
  }
}

module.exports = {
  getSaved,
  save,
  remove
};
