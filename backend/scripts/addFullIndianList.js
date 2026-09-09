const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../data/recipes.json');

const titlesList = [
  { title: "Aloo Paratha", calories: 197, protein: 6.1, fat: 6.7, categories: ["Indian", "Vegetarian", "North"], ingredients: ["500 g potatoes", "ghee", "onion", "tomatoes", "spices", "coriander"] },
  { title: "Gobi Paratha", calories: 214, protein: 7.2, fat: 7.4, categories: ["Indian", "Vegetarian", "North"], ingredients: ["500 g cauliflower", "flour", "ghee", "spices"] },
  { title: "Mooli Paratha", calories: 231, protein: 8.3, fat: 8.1, categories: ["Indian", "Vegetarian", "North"], ingredients: ["radish", "flour", "ghee", "spices"] },
  { title: "Paneer Paratha", calories: 248, protein: 9.4, fat: 8.8, categories: ["Indian", "Vegetarian", "North"], ingredients: ["500 g paneer", "flour", "ghee", "spices"] },
  { title: "Lachha Paratha", calories: 265, protein: 10.5, fat: 9.5, categories: ["Indian", "Vegetarian", "layered"], ingredients: ["wheat flour", "ghee", "carom seeds", "salt"] },
  { title: "Missi Roti", calories: 282, protein: 11.6, fat: 10.2, categories: ["Indian", "Vegetarian", "Rajasthani"], ingredients: ["gram flour", "wheat flour", "spices", "ghee"] },
  { title: "Bajra Roti", calories: 299, protein: 12.7, fat: 10.9, categories: ["Indian", "Vegetarian", "millet"], ingredients: ["pearl millet flour", "water", "ghee"] },
  { title: "Jowar Roti", calories: 316, protein: 13.8, fat: 11.6, categories: ["Indian", "Vegetarian", "sorghum"], ingredients: ["sorghum flour", "warm water", "ghee"] },
  { title: "Makki di Roti", calories: 333, protein: 14.9, fat: 12.3, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["cornmeal flour", "warm water", "ghee"] },
  { title: "Naan", calories: 350, protein: 16.0, fat: 13.0, categories: ["Indian", "Vegetarian", "Indian"], ingredients: ["refined flour", "yogurt", "yeast", "butter"] },
  { title: "Butter Naan", calories: 367, protein: 17.1, fat: 13.7, categories: ["Indian", "Vegetarian", "Indian"], ingredients: ["flour", "butter", "yogurt", "nigella seeds"] },
  { title: "Garlic Naan", calories: 384, protein: 18.2, fat: 14.4, categories: ["Indian", "Vegetarian", "Indian"], ingredients: ["flour", "garlic", "butter", "coriander"] },
  { title: "Tandoori Roti", calories: 401, protein: 19.3, fat: 15.1, categories: ["Indian", "Vegetarian", "tandoor"], ingredients: ["whole wheat flour", "yogurt", "ghee"] },
  { title: "Puri", calories: 418, protein: 20.4, fat: 15.8, categories: ["Indian", "Vegetarian", "deep-fried"], ingredients: ["wheat flour", "oil for frying", "salt"] },
  { title: "Bhatura", calories: 435, protein: 21.5, fat: 16.5, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["flour", "yogurt", "oil", "baking powder"] },
  { title: "Kachori", calories: 452, protein: 22.6, fat: 17.2, categories: ["Indian", "Vegetarian", "stuffed"], ingredients: ["flour", "spiced moong dal", "oil"] },
  { title: "Bedmi Puri", calories: 469, protein: 23.7, fat: 17.9, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["wheat flour", "urad dal paste", "spices"] },
  { title: "Thepla", calories: 486, protein: 24.8, fat: 18.6, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["wheat flour", "methi leaves", "yogurt", "spices"] },
  { title: "Pav Bhaji", calories: 503, protein: 25.9, fat: 19.3, categories: ["Indian", "Vegetarian", "Mumbai"], ingredients: ["potatoes", "peas", "butter", "pav bread", "bhaji masala"] },
  { title: "Vada Pav", calories: 520, protein: 27.0, fat: 20.0, categories: ["Indian", "Vegetarian", "Mumbai"], ingredients: ["potato vada", "pav bun", "chutney", "garlic powder"] },
  { title: "Dhokla", calories: 537, protein: 28.1, fat: 20.7, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["gram flour", "fruit salt", "mustard seeds", "curry leaves"] },
  { title: "Khandvi", calories: 194, protein: 29.2, fat: 21.4, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["gram flour", "yogurt", "mustard seeds", "coconut"] },
  { title: "Fafda", calories: 211, protein: 30.3, fat: 22.1, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["gram flour", "carom seeds", "oil"] },
  { title: "Handvo", calories: 228, protein: 5.4, fat: 22.8, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["rice lentil batter", "bottle gourd", "sesame seeds"] },
  { title: "Patra", calories: 245, protein: 6.5, fat: 23.5, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["colocasia leaves", "gram flour batter", "tamarind"] },
  { title: "Poha", calories: 262, protein: 7.6, fat: 24.2, categories: ["Indian", "Vegetarian", "Maharashtrian"], ingredients: ["flattened rice", "peanuts", "mustard seeds", "turmeric"] },
  { title: "Sabudana Khichdi", calories: 279, protein: 8.7, fat: 24.9, categories: ["Indian", "Vegetarian", "Maharashtrian"], ingredients: ["tapioca pearls", "peanuts", "potatoes", "green chilies"] },
  { title: "Upma", calories: 296, protein: 9.8, fat: 25.6, categories: ["Indian", "Vegetarian", "South"], ingredients: ["semolina", "mustard seeds", "curry leaves", "cashews"] },
  { title: "Rava Upma", calories: 313, protein: 10.9, fat: 26.3, categories: ["Indian", "Vegetarian", "semolina"], ingredients: ["roasted rava", "onion", "ginger", "ghee"] },
  { title: "Vegetable Upma", calories: 330, protein: 12.0, fat: 27.0, categories: ["Indian", "Vegetarian", "vegetable"], ingredients: ["semolina", "carrots", "peas", "beans"] },
  { title: "Pesarattu", calories: 347, protein: 13.1, fat: 27.7, categories: ["Indian", "Vegetarian", "Andhra"], ingredients: ["whole green gram", "ginger", "green chilies"] },
  { title: "Masala Dosa", calories: 364, protein: 14.2, fat: 6.4, categories: ["Indian", "Vegetarian", "South"], ingredients: ["fermented rice batter", "spiced potato filling", "ghee"] },
  { title: "Plain Dosa", calories: 381, protein: 15.3, fat: 7.1, categories: ["Indian", "Vegetarian", "South"], ingredients: ["rice", "urad dal", "ghee"] },
  { title: "Rava Dosa", calories: 398, protein: 16.4, fat: 7.8, categories: ["Indian", "Vegetarian", "South"], ingredients: ["semolina", "rice flour", "cumin", "chilies"] },
  { title: "Set Dosa", calories: 415, protein: 17.5, fat: 8.5, categories: ["Indian", "Vegetarian", "soft"], ingredients: ["poha", "urad dal", "rice"] },
  { title: "Mysore Masala Dosa", calories: 432, protein: 18.6, fat: 9.2, categories: ["Indian", "Vegetarian", "Karnataka"], ingredients: ["dosa batter", "red chutney", "potato masala"] },
  { title: "Onion Uttapam", calories: 449, protein: 19.7, fat: 9.9, categories: ["Indian", "Vegetarian", "South"], ingredients: ["dosa batter", "chopped onions", "green chilies"] },
  { title: "Vegetable Uttapam", calories: 466, protein: 20.8, fat: 10.6, categories: ["Indian", "Vegetarian", "South"], ingredients: ["dosa batter", "tomatoes", "onions", "capsicum"] },
  { title: "Idli", calories: 483, protein: 21.9, fat: 11.3, categories: ["Indian", "Vegetarian", "South"], ingredients: ["steamed rice batter", "urad dal"] },
  { title: "Rava Idli", calories: 500, protein: 23.0, fat: 12.0, categories: ["Indian", "Vegetarian", "Karnataka"], ingredients: ["semolina", "curd", "mustard seeds", "cashews"] },
  { title: "Medu Vada", calories: 517, protein: 24.1, fat: 12.7, categories: ["Indian", "Vegetarian", "South"], ingredients: ["urad dal batter", "black pepper", "curry leaves"] },
  { title: "Masala Vada", calories: 534, protein: 25.2, fat: 13.4, categories: ["Indian", "Vegetarian", "South"], ingredients: ["chana dal", "onions", "fennel seeds"] },
  { title: "Ven Pongal", calories: 191, protein: 26.3, fat: 14.1, categories: ["Indian", "Vegetarian", "Tamil"], ingredients: ["raw rice", "moong dal", "ghee", "black pepper", "cashews"] },
  { title: "Kuzhi Paniyaram", calories: 208, protein: 27.4, fat: 14.8, categories: ["Indian", "Vegetarian", "South"], ingredients: ["idli batter", "onions", "mustard seeds"] },
  { title: "Appam", calories: 225, protein: 28.5, fat: 15.5, categories: ["Indian", "Vegetarian", "Kerala"], ingredients: ["fermented rice flour", "coconut milk", "yeast"] },
  { title: "Puttu", calories: 242, protein: 29.6, fat: 16.2, categories: ["Indian", "Vegetarian", "Kerala"], ingredients: ["rice flour", "grated coconut"] },
  { title: "Idiyappam", calories: 259, protein: 30.7, fat: 16.9, categories: ["Indian", "Vegetarian", "Kerala"], ingredients: ["rice flour string hoppers", "coconut milk"] },
  { title: "Methi Thepla", calories: 276, protein: 5.8, fat: 17.6, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["wheat flour", "fresh methi leaves", "spices"] },
  { title: "Chole Bhature", calories: 293, protein: 6.9, fat: 18.3, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["spiced chickpeas", "fried bhatura bread"] },
  { title: "Rajma Chawal", calories: 310, protein: 8.0, fat: 19.0, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["red kidney beans", "steamed basmati rice", "spices"] },
  { title: "Dal Makhani", calories: 327, protein: 9.1, fat: 19.7, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["black urad dal", "butter", "cream", "tomatoes"] },
  { title: "Dal Tadka", calories: 344, protein: 10.2, fat: 20.4, categories: ["Indian", "Vegetarian", "Indian"], ingredients: ["toor dal", "ghee temper", "garlic", "cumin"] },
  { title: "Dal Fry", calories: 361, protein: 11.3, fat: 21.1, categories: ["Indian", "Vegetarian", "Indian"], ingredients: ["yellow lentils", "onions", "tomatoes", "spices"] },
  { title: "Dal Palak", calories: 378, protein: 12.4, fat: 21.8, categories: ["Indian", "Vegetarian", "lentil"], ingredients: ["yellow lentils", "spinach leaves", "garlic"] },
  { title: "Dal Panchmel", calories: 395, protein: 13.5, fat: 22.5, categories: ["Indian", "Vegetarian", "Rajasthani"], ingredients: ["five mixed lentils", "ghee", "cloves", "cinnamon"] },
  { title: "Dal Baati", calories: 412, protein: 14.6, fat: 23.2, categories: ["Indian", "Vegetarian", "Rajasthani"], ingredients: ["spiced dal", "baked wheat baati", "ghee"] },
  { title: "Dal Dhokli", calories: 429, protein: 15.7, fat: 23.9, categories: ["Indian", "Vegetarian", "Gujarati"], ingredients: ["sweet sour dal", "wheat flour dumplings"] },
  { title: "Dal Khichdi", calories: 446, protein: 16.8, fat: 24.6, categories: ["Indian", "Vegetarian", "rice"], ingredients: ["rice", "toor dal", "ghee", "cumin"] },
  { title: "Moong Dal Khichdi", calories: 463, protein: 17.9, fat: 25.3, categories: ["Indian", "Vegetarian", "light"], ingredients: ["rice", "yellow moong dal", "ghee"] },
  { title: "Masala Khichdi", calories: 480, protein: 19.0, fat: 26.0, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["rice", "lentils", "vegetables", "spices"] },
  { title: "Vegetable Khichdi", calories: 497, protein: 20.1, fat: 26.7, categories: ["Indian", "Vegetarian", "vegetable"], ingredients: ["rice", "dal", "carrots", "peas", "potatoes"] },
  { title: "Palak Paneer", calories: 514, protein: 21.2, fat: 27.4, categories: ["Indian", "Vegetarian", "spinach"], ingredients: ["500 g paneer", "spinach puree", "cream", "garlic"] },
  { title: "Shahi Paneer", calories: 531, protein: 22.3, fat: 6.1, categories: ["Indian", "Vegetarian", "rich"], ingredients: ["paneer", "cashew paste", "cream", "saffron"] },
  { title: "Kadai Paneer", calories: 188, protein: 23.4, fat: 6.8, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["paneer", "capsicum", "kadai masala", "tomatoes"] },
  { title: "Paneer Butter Masala", calories: 205, protein: 24.5, fat: 7.5, categories: ["Indian", "Vegetarian", "creamy"], ingredients: ["paneer", "butter", "tomato gravy", "cream"] },
  { title: "Paneer Tikka Masala", calories: 222, protein: 25.6, fat: 8.2, categories: ["Indian", "Vegetarian", "grilled"], ingredients: ["grilled paneer", "spiced tomato gravy"] },
  { title: "Matar Paneer", calories: 239, protein: 26.7, fat: 8.9, categories: ["Indian", "Vegetarian", "peas"], ingredients: ["paneer", "green peas", "tomato gravy"] },
  { title: "Palak Corn", calories: 256, protein: 27.8, fat: 9.6, categories: ["Indian", "Vegetarian", "spinach"], ingredients: ["sweet corn", "spinach puree", "spices"] },
  { title: "Malai Kofta", calories: 273, protein: 28.9, fat: 10.3, categories: ["Indian", "Vegetarian", "cream-based"], ingredients: ["paneer potato kofta", "cashew cream gravy"] },
  { title: "Lauki Kofta", calories: 290, protein: 30.0, fat: 11.0, categories: ["Indian", "Vegetarian", "bottle"], ingredients: ["bottle gourd dumplings", "spiced curry"] },
  { title: "Nargisi Kofta", calories: 307, protein: 5.1, fat: 11.7, categories: ["Indian", "Vegetarian", "stuffed"], ingredients: ["stuffed vegetable dumplings", "rich gravy"] },
  { title: "Navratan Korma", calories: 324, protein: 6.2, fat: 12.4, categories: ["Indian", "Vegetarian", "mixed"], ingredients: ["nine vegetables and nuts", "creamy sauce"] },
  { title: "Vegetable Korma", calories: 341, protein: 7.3, fat: 13.1, categories: ["Indian", "Vegetarian", "mixed"], ingredients: ["mixed vegetables", "coconut cashew paste"] },
  { title: "Kadai Vegetable", calories: 358, protein: 8.4, fat: 13.8, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["capsicum", "carrots", "peas", "kadai spices"] },
  { title: "Mix Veg Curry", calories: 375, protein: 9.5, fat: 14.5, categories: ["Indian", "Vegetarian", "mixed"], ingredients: ["carrots", "peas", "potatoes", "tomato gravy"] },
  { title: "Aloo Gobi", calories: 392, protein: 10.6, fat: 15.2, categories: ["Indian", "Vegetarian", "potato"], ingredients: ["potatoes", "cauliflower", "turmeric", "ginger"] },
  { title: "Aloo Matar", calories: 409, protein: 11.7, fat: 15.9, categories: ["Indian", "Vegetarian", "potato"], ingredients: ["potatoes", "green peas", "tomato gravy"] },
  { title: "Aloo Palak", calories: 426, protein: 12.8, fat: 16.6, categories: ["Indian", "Vegetarian", "potato"], ingredients: ["potatoes", "spinach", "garlic", "spices"] },
  { title: "Aloo Baingan", calories: 443, protein: 13.9, fat: 17.3, categories: ["Indian", "Vegetarian", "potato"], ingredients: ["potatoes", "eggplant", "tomatoes", "spices"] },
  { title: "Baingan Bharta", calories: 460, protein: 15.0, fat: 18.0, categories: ["Indian", "Vegetarian", "smoky"], ingredients: ["roasted eggplant mash", "onions", "tomatoes"] },
  { title: "Bharwa Baingan", calories: 477, protein: 16.1, fat: 18.7, categories: ["Indian", "Vegetarian", "stuffed"], ingredients: ["baby eggplants", "stuffed spice mix"] },
  { title: "Bhindi Masala", calories: 494, protein: 17.2, fat: 19.4, categories: ["Indian", "Vegetarian", "okra"], ingredients: ["okra", "onions", "tomatoes", "dry spices"] },
  { title: "Bhindi Fry", calories: 511, protein: 18.3, fat: 20.1, categories: ["Indian", "Vegetarian", "crispy"], ingredients: ["crispy fried okra", "amchur powder", "chilies"] },
  { title: "Jeera Aloo", calories: 528, protein: 19.4, fat: 20.8, categories: ["Indian", "Vegetarian", "cumin"], ingredients: ["boiled potatoes", "cumin seeds", "green chilies"] },
  { title: "Dum Aloo", calories: 185, protein: 20.5, fat: 21.5, categories: ["Indian", "Vegetarian", "Kashmiri"], ingredients: ["baby potatoes", "yogurt gravy", "fennel powder"] },
  { title: "Aloo Tamatar", calories: 202, protein: 21.6, fat: 22.2, categories: ["Indian", "Vegetarian", "potato"], ingredients: ["potatoes", "tangy tomato gravy", "coriander"] },
  { title: "Methi Aloo", calories: 219, protein: 22.7, fat: 22.9, categories: ["Indian", "Vegetarian", "fenugreek"], ingredients: ["potatoes", "fresh fenugreek leaves"] },
  { title: "Gobi Masala", calories: 236, protein: 23.8, fat: 23.6, categories: ["Indian", "Vegetarian", "cauliflower"], ingredients: ["cauliflower florets", "onion tomato masala"] },
  { title: "Gobi Manchurian", calories: 253, protein: 24.9, fat: 24.3, categories: ["Indian", "Vegetarian", "Indo-Chinese"], ingredients: ["fried cauliflower florets", "soy chili sauce"] },
  { title: "Matar Mushroom", calories: 270, protein: 26.0, fat: 25.0, categories: ["Indian", "Vegetarian", "peas"], ingredients: ["mushrooms", "green peas", "onion tomato gravy"] },
  { title: "Mushroom Masala", calories: 287, protein: 27.1, fat: 25.7, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["button mushrooms", "spiced onion tomato gravy"] },
  { title: "Mushroom Do Pyaza", calories: 304, protein: 28.2, fat: 26.4, categories: ["Indian", "Vegetarian", "mushroom"], ingredients: ["mushrooms", "diced onions", "curry spices"] },
  { title: "Corn Palak", calories: 321, protein: 29.3, fat: 27.1, categories: ["Indian", "Vegetarian", "corn"], ingredients: ["sweet corn", "spinach puree", "garlic"] },
  { title: "Chana Masala", calories: 338, protein: 30.4, fat: 27.8, categories: ["Indian", "Vegetarian", "spiced"], ingredients: ["chickpeas", "tea leaves extract", "chana masala spices"] },
  { title: "Kala Chana Curry", calories: 355, protein: 5.5, fat: 6.5, categories: ["Indian", "Vegetarian", "black"], ingredients: ["black chickpeas", "thin onion gravy"] },
  { title: "Lobia Masala", calories: 372, protein: 6.6, fat: 7.2, categories: ["Indian", "Vegetarian", "black-eyed"], ingredients: ["black-eyed peas", "spiced gravy"] },
  { title: "Matar Masala", calories: 389, protein: 7.7, fat: 7.9, categories: ["Indian", "Vegetarian", "green"], ingredients: ["green peas", "onion tomato sauce"] },
  { title: "Soya Chaap Masala", calories: 406, protein: 8.8, fat: 8.6, categories: ["Indian", "Vegetarian", "soy"], ingredients: ["soybean sticks", "spiced tomato gravy"] },
  { title: "Soya Chaap Tikka", calories: 423, protein: 9.9, fat: 9.3, categories: ["Indian", "Vegetarian", "grilled"], ingredients: ["marinated soybean sticks", "tandoori spices"] },
  { title: "Methi Matar Malai", calories: 440, protein: 11.0, fat: 10.0, categories: ["Indian", "Vegetarian", "fenugreek"], ingredients: ["fresh methi", "peas", "heavy cream"] },
  { title: "Sarson ka Saag", calories: 457, protein: 12.1, fat: 10.7, categories: ["Indian", "Vegetarian", "Punjabi"], ingredients: ["mustard greens", "spinach", "makki flour", "ghee"] },
  { title: "Chicken Biryani", calories: 360, protein: 21.0, fat: 22.0, categories: ["Indian", "Non-Vegetarian"], ingredients: ["500 g chicken", "basmati rice", "biryani spices", "yogurt"] },
  { title: "Butter Chicken", calories: 496, protein: 29.8, fat: 27.6, categories: ["Indian", "Non-Vegetarian", "Punjabi"], ingredients: ["500 g chicken", "butter", "cream", "tomato sauce"] },
  { title: "Chicken Curry", calories: 479, protein: 28.7, fat: 26.9, categories: ["Indian", "Non-Vegetarian"], ingredients: ["500 g chicken", "onions", "tomatoes", "curry powder"] },
  { title: "Chicken Tikka Masala", calories: 530, protein: 6.0, fat: 7.0, categories: ["Indian", "Non-Vegetarian"], ingredients: ["grilled chicken tikka", "spiced gravy"] },
  { title: "Mutton Biryani", calories: 428, protein: 25.4, fat: 24.8, categories: ["Indian", "Non-Vegetarian"], ingredients: ["500 g mutton", "basmati rice", "spices", "ghee"] },
  { title: "Mutton Rogan Josh", calories: 425, protein: 22.5, fat: 17.5, categories: ["Indian", "Non-Vegetarian", "Kashmiri"], ingredients: ["mutton", "kashmiri chili", "yogurt", "rattan jot"] },
  { title: "Egg Biryani", calories: 462, protein: 27.6, fat: 26.2, categories: ["Indian", "Non-Vegetarian"], ingredients: ["boiled eggs", "basmati rice", "biryani masala"] }
];

function addFullList() {
  let existing = [];
  if (fs.existsSync(recipesPath)) {
    existing = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
  }

  const existingTitles = new Set(existing.map(r => r.title.toLowerCase().trim()));
  let countAdded = 0;

  titlesList.forEach(item => {
    if (!existingTitles.has(item.title.toLowerCase().trim())) {
      const newId = `recipe_ind_${String(existing.length + 1).padStart(3, '0')}`;
      const fatGrams = Math.round(item.fat || 10);
      const proteinGrams = Math.round(item.protein || 12);
      const calories = Math.round(item.calories || 300);
      const carbsGrams = Math.max(10, Math.round((calories - (proteinGrams * 4 + fatGrams * 9)) / 4));

      existing.push({
        id: newId,
        title: item.title.trim(),
        cuisine: item.categories && item.categories.length > 0 ? item.categories[0] : 'Indian',
        prepTimeMinutes: 30,
        nutrition: {
          calories,
          proteinGrams,
          carbsGrams,
          fatGrams
        },
        ingredients: item.ingredients || ["mixed vegetables", "spices", "oil"],
        instructions: [
          `1. Prepare ingredients for ${item.title}.`,
          "2. Heat oil or ghee in a pan and temper with spices.",
          "3. Cook onions, tomatoes, and main ingredients until fragrant.",
          "4. Simmer until tender and garnish with fresh coriander."
        ],
        tags: item.categories || ["Indian", "Homestyle"]
      });
      existingTitles.add(item.title.toLowerCase().trim());
      countAdded++;
    }
  });

  fs.writeFileSync(recipesPath, JSON.stringify(existing, null, 2));
  console.log(`✅ Successfully added ${countAdded} new Indian recipes to recipes.json (Total dataset: ${existing.length})`);
}

addFullList();
