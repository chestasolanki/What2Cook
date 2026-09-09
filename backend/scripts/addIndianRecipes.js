const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../data/recipes.json');

const newRecipesData = [
  {
    "directions": [
      "Heat oil or ghee in a heavy pan over medium heat and add cumin seeds.",
      "Add onion and cook until softened and lightly golden. Add ginger-garlic paste and cook until fragrant.",
      "Add tomatoes and powdered spices. Cook until the tomatoes soften and the oil begins to separate.",
      "Add the potatoes, salt, and the yogurt or coconut milk if used. Mix well.",
      "Cover and cook until the main ingredient is tender and the flavors are well combined. Add a little water if needed.",
      "Finish with garam masala and fresh coriander. Serve hot with rice, roti, naan, or other suitable Indian accompaniment."
    ],
    "fat": 6.7,
    "date": "2026-02-02T04:00:00.000Z",
    "categories": ["Indian", "Vegetarian", "North", "Dinner", "Main Course", "Homestyle"],
    "calories": 197.0,
    "desc": "Aloo Paratha is a popular Indian North Indian flatbread.",
    "protein": 6.1,
    "rating": 4.8,
    "title": "Aloo Paratha",
    "ingredients": [
      "500 g potatoes", "2 tablespoons cooking oil or ghee", "1 medium onion, finely chopped",
      "2 medium tomatoes, chopped", "1 tablespoon ginger-garlic paste", "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder", "1 teaspoon red chili powder", "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala", "1/2 cup plain yogurt or coconut milk, as appropriate", "Salt to taste", "Fresh coriander leaves for garnish"
    ],
    "sodium": 203.0
  },
  {
    "directions": [
      "Heat oil or ghee in a heavy pan over medium heat and add cumin seeds.",
      "Add onion and cook until softened and lightly golden. Add ginger-garlic paste and cook until fragrant.",
      "Add tomatoes and powdered spices. Cook until the tomatoes soften and the oil begins to separate.",
      "Add the mixed vegetables, salt, and the yogurt or coconut milk if used. Mix well.",
      "Cover and cook until the main ingredient is tender and the flavors are well combined. Add a little water if needed.",
      "Finish with garam masala and fresh coriander. Serve hot with rice, roti, naan, or other suitable Indian accompaniment."
    ],
    "fat": 7.4,
    "date": "2026-03-03T04:00:00.000Z",
    "categories": ["Indian", "Vegetarian", "North", "Dinner", "Main Course", "Homestyle"],
    "calories": 214.0,
    "desc": "Gobi Paratha is a popular Indian North Indian flatbread.",
    "protein": 7.2,
    "rating": 4.5,
    "title": "Gobi Paratha",
    "ingredients": [
      "500 g mixed vegetables", "2 tablespoons cooking oil or ghee", "1 medium onion, finely chopped",
      "2 medium tomatoes, chopped", "1 tablespoon ginger-garlic paste", "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder", "1 teaspoon red chili powder", "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala", "1/2 cup plain yogurt or coconut milk, as appropriate", "Salt to taste", "Fresh coriander leaves for garnish"
    ],
    "sodium": 286.0
  },
  {
    "directions": [
      "Heat oil or ghee in a heavy pan over medium heat and add cumin seeds.",
      "Add onion and cook until softened and lightly golden. Add ginger-garlic paste and cook until fragrant.",
      "Add tomatoes and powdered spices. Cook until the tomatoes soften and the oil begins to separate.",
      "Add the mixed vegetables, salt, and the yogurt or coconut milk if used. Mix well.",
      "Cover and cook until the main ingredient is tender and the flavors are well combined. Add a little water if needed.",
      "Finish with garam masala and fresh coriander. Serve hot with rice, roti, naan, or other suitable Indian accompaniment."
    ],
    "fat": 8.1,
    "date": "2026-04-04T04:00:00.000Z",
    "categories": ["Indian", "Vegetarian", "North", "Lunch", "Main Course", "Homestyle"],
    "calories": 231.0,
    "desc": "Mooli Paratha is a popular Indian North Indian flatbread.",
    "protein": 8.3,
    "rating": 4.2,
    "title": "Mooli Paratha",
    "ingredients": [
      "500 g mixed vegetables", "2 tablespoons cooking oil or ghee", "1 medium onion, finely chopped",
      "2 medium tomatoes, chopped", "1 tablespoon ginger-garlic paste", "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder", "1 teaspoon red chili powder", "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala", "1/2 cup plain yogurt or coconut milk, as appropriate", "Salt to taste", "Fresh coriander leaves for garnish"
    ],
    "sodium": 369.0
  },
  {
    "directions": [
      "Heat oil or ghee in a heavy pan over medium heat and add cumin seeds.",
      "Add onion and cook until softened and lightly golden. Add ginger-garlic paste and cook until fragrant.",
      "Add tomatoes and powdered spices. Cook until the tomatoes soften and the oil begins to separate.",
      "Add the paneer, salt, and the yogurt or coconut milk if used. Mix well.",
      "Cover and cook until the main ingredient is tender and the flavors are well combined. Add a little water if needed.",
      "Finish with garam masala and fresh coriander. Serve hot with rice, roti, naan, or other suitable Indian accompaniment."
    ],
    "fat": 8.8,
    "date": "2026-05-05T04:00:00.000Z",
    "categories": ["Indian", "Vegetarian", "North", "Dinner", "Main Course", "Homestyle"],
    "calories": 248.0,
    "desc": "Paneer Paratha is a popular Indian North Indian flatbread.",
    "protein": 9.4,
    "rating": 3.9,
    "title": "Paneer Paratha",
    "ingredients": [
      "500 g paneer", "2 tablespoons cooking oil or ghee", "1 medium onion, finely chopped",
      "2 medium tomatoes, chopped", "1 tablespoon ginger-garlic paste", "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder", "1 teaspoon red chili powder", "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala", "1/2 cup plain yogurt or coconut milk, as appropriate", "Salt to taste", "Fresh coriander leaves for garnish"
    ],
    "sodium": 452.0
  },
  {
    "directions": ["Mix ingredients and cook into Palak Paneer curry."],
    "fat": 27.4, "calories": 514.0, "protein": 21.2, "rating": 4.1, "title": "Palak Paneer",
    "categories": ["Indian", "Vegetarian", "spinach"],
    "ingredients": ["500 g paneer", "spinach", "spices", "ghee", "tomatoes", "onion"]
  },
  {
    "directions": ["Cook Paneer Butter Masala curry."],
    "fat": 7.5, "calories": 205.0, "protein": 24.5, "rating": 4.8, "title": "Paneer Butter Masala",
    "categories": ["Indian", "Vegetarian", "creamy"],
    "ingredients": ["500 g paneer", "butter", "cream", "tomatoes", "spices"]
  },
  {
    "directions": ["Cook Chole Bhature chickpea meal."],
    "fat": 18.3, "calories": 293.0, "protein": 6.9, "rating": 4.8, "title": "Chole Bhature",
    "categories": ["Indian", "Vegetarian", "Punjabi"],
    "ingredients": ["chickpeas", "bhatura flour", "spices", "onion", "tomatoes"]
  },
  {
    "directions": ["Cook Rajma Chawal kidney bean rice meal."],
    "fat": 19.0, "calories": 310.0, "protein": 8.0, "rating": 4.5, "title": "Rajma Chawal",
    "categories": ["Indian", "Vegetarian", "Punjabi"],
    "ingredients": ["kidney beans", "basmati rice", "spices", "onion", "tomatoes"]
  },
  {
    "directions": ["Cook Dal Makhani lentil curry."],
    "fat": 19.7, "calories": 327.0, "protein": 9.1, "rating": 4.2, "title": "Dal Makhani",
    "categories": ["Indian", "Vegetarian", "Punjabi"],
    "ingredients": ["black lentils", "kidney beans", "butter", "cream", "spices"]
  },
  {
    "directions": ["Cook Masala Dosa crepe."],
    "fat": 6.4, "calories": 364.0, "protein": 14.2, "rating": 3.5, "title": "Masala Dosa",
    "categories": ["Indian", "Vegetarian", "South"],
    "ingredients": ["dosa batter", "potato masala", "mustard seeds", "curry leaves"]
  },
  {
    "directions": ["Steam Idli cakes."],
    "fat": 11.3, "calories": 483.0, "protein": 21.9, "rating": 4.6, "title": "Idli",
    "categories": ["Indian", "Vegetarian", "South"],
    "ingredients": ["rice", "urad dal", "salt"]
  },
  {
    "directions": ["Cook Butter Chicken."],
    "fat": 27.6, "calories": 496.0, "protein": 29.8, "rating": 4.7, "title": "Butter Chicken",
    "categories": ["Indian", "Non-Vegetarian", "Punjabi"],
    "ingredients": ["500 g chicken", "butter", "cream", "tomatoes", "spices"]
  },
  {
    "directions": ["Cook Chicken Biryani."],
    "fat": 22.0, "calories": 360.0, "protein": 21.0, "rating": 3.9, "title": "Chicken Biryani",
    "categories": ["Indian", "Non-Vegetarian"],
    "ingredients": ["500 g chicken", "basmati rice", "biryani spices", "yogurt", "saffron"]
  },
  {
    "directions": ["Cook Pav Bhaji."],
    "fat": 19.3, "calories": 503.0, "protein": 25.9, "rating": 4.2, "title": "Pav Bhaji",
    "categories": ["Indian", "Vegetarian", "Mumbai"],
    "ingredients": ["mixed vegetables", "pav bread", "butter", "pav bhaji masala"]
  }
];

function mergeRecipes() {
  let existing = [];
  if (fs.existsSync(recipesPath)) {
    existing = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
  }

  const existingTitles = new Set(existing.map(r => r.title.toLowerCase().trim()));
  let countAdded = 0;

  newRecipesData.forEach(item => {
    if (!existingTitles.has(item.title.toLowerCase().trim())) {
      const newId = `recipe_ind_${String(existing.length + 1).padStart(3, '0')}`;
      const fatGrams = Math.round(item.fat || 5);
      const proteinGrams = Math.round(item.protein || 8);
      const calories = Math.round(item.calories || 250);
      const carbsGrams = Math.max(10, Math.round((calories - (proteinGrams * 4 + fatGrams * 9)) / 4));

      existing.push({
        id: newId,
        title: item.title.trim(),
        cuisine: item.categories && item.categories.length > 0 ? item.categories[0] : 'Indian',
        prepTimeMinutes: 25,
        nutrition: {
          calories,
          proteinGrams,
          carbsGrams,
          fatGrams
        },
        ingredients: item.ingredients || ["mixed vegetables", "spices", "oil"],
        instructions: item.directions || ["Cook ingredients together and serve hot."],
        tags: item.categories || ["Indian", "Homestyle"]
      });
      existingTitles.add(item.title.toLowerCase().trim());
      countAdded++;
    }
  });

  fs.writeFileSync(recipesPath, JSON.stringify(existing, null, 2));
  console.log(`✅ Successfully added ${countAdded} new Indian recipes to recipes.json (Total: ${existing.length})`);
}

mergeRecipes();
