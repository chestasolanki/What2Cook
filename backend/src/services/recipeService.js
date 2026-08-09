const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/recipes.json');

function getAllRecipes() {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function getRecipeById(id) {
  return getAllRecipes().find(r => r.id === id) || null;
}

module.exports = { getAllRecipes, getRecipeById };