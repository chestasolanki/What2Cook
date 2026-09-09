const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../data/recipes.json');

const rawItems = [
  {
    "title": "Masala Karela Recipe",
    "categories": ["Indian", "Side Dish", "Diabetic Friendly"],
    "directions": [
      "To begin making the Masala Karela Recipe,de-seed the karela and slice.",
      "Do not remove the skin as the skin has all the nutrients.",
      "Add the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.",
      "Release the pressure immediately and open the lids.",
      "Keep aside.Heat oil in a heavy bottomed pan or a kadhai.",
      "Add cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.",
      "Stir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.",
      "Cover the pan and simmer Masala Karela stirring occasionally until everything comes together well.",
      "Turn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family."
    ],
    "ingredients": [
      "6 Karela (Bitter Gourd/ Pavakkai) - deseeded", "Salt - to taste", "1 Onion - thinly sliced",
      "3 tablespoon Gram flour (besan)", "2 teaspoons Turmeric powder (Haldi)", "1 tablespoon Red Chilli powder",
      "2 teaspoons Cumin seeds (Jeera)", "1 tablespoon Coriander Powder (Dhania)", "1 tablespoon Amchur (Dry Mango Powder)", "Sunflower Oil - as required"
    ]
  },
  {
    "title": "Spicy Tomato Rice (Recipe)",
    "categories": ["South Indian Recipes", "Main Course", "Vegetarian"],
    "directions": [
      "To make tomato puliogere, first cut the tomatoes.", "Now put in a mixer grinder and puree it.",
      "Now heat oil in a pan.", "After the oil is hot, add chana dal, urad dal, cashew and let it cook for 10 to 20 seconds.",
      "After 10 to 20 seconds, add cumin seeds, mustard seeds, green chillies, dry red chillies and curry leaves.",
      "After 30 seconds, add tomato puree to it and mix.", "Add BC Belle Bhat powder, salt and mix it.",
      "Allow to cook for 7 to 8 minutes and then turn off the gas.", "Take it out in a bowl, add cooked rice and mix it.",
      "Serve hot.", "Serve tomato puliogre with tomato cucumber raita and papad for dinner."
    ],
    "ingredients": [
      "2-1 / 2 cups rice - cooked", "3 tomatoes", "3 teaspoons BC Belle Bhat powder", "salt - as per taste",
      "1 teaspoon chickpea lentils", "1/2 teaspoon cumin seeds", "1 teaspoon white urad dal", "1/2 Teaspoon mustard",
      "1 green chilli", "1 dry red chilli", "2 teaspoon cashew - or peanuts", "1-1 / 2 tablespoon oil - 1/2 teaspoon asafoetida"
    ]
  },
  {
    "title": "Ragi Semiya Upma Recipe - Ragi Millet Vermicelli Breakfast",
    "categories": ["South Indian Recipes", "South Indian Breakfast", "High Protein Vegetarian"],
    "directions": [
      "To begin making the Ragi Vermicelli Recipe, first steam the ragi vermicelli in a rice cooker or a steamer for about 5-6 minutes or till it is cooked but firm.Keep aside this aside till later use.",
      "You can add a few drops of oil and mix it so that they don't stick to each other.Place a kadai on the heat, add the ghee or oil to it and when warm add hing and allow it to sizzle for 30 seconds.",
      "Then follow it up with mustard seeds, urad dal and curry leaves, and allow them to crackle.Saute for 1 minute or so till the urad dal is slightly browned.Then, add onions and fry till translucent and soft.Next, add the green chillies along with par boiled carrots and peas.",
      "Sprinkle some salt and cook for 2-3 minutes or until the vegetables are semi cooked.Then, add the steamed ragi vermicelli toss it together so the vegetables are all well combined.Switch off the heat, take the vermicelli out into a serving dish and to with lemon juice.",
      "Mix well and serve along with Coconut Chutney and a hot cup of coffee or tea for a wholesome breakfast."
    ],
    "ingredients": [
      "1-1/2 cups Rice Vermicelli Noodles (Thin)", "1 Onion - sliced", "1/2 cup Carrots (Gajjar) - chopped",
      "1/3 cup Green peas (Matar)", "2 Green Chillies", "1/4 teaspoon Asafoetida (hing)",
      "1 teaspoon Mustard seeds", "1 teaspoon White Urad Dal (Split)", "1 teaspoon Ghee",
      "1 sprig Curry leaves", "Salt - to taste", "1 teaspoon Lemon juice"
    ]
  },
  {
    "title": "Gongura Chicken Curry Recipe - Andhra Style Gongura Chicken",
    "categories": ["Andhra", "Lunch", "Non Vegeterian"],
    "directions": [
      "To begin making Gongura Chicken Curry Recipe first prep all the ingredients and keep them aside.In a small pan, dry roast the methi seeds, coriander seeds, fennel seeds and red chillies for about 3 to 4 minutes on medium heat, until you notice the seeds crackling.",
      "Once done, turn off the heat and allow it to cool a bit and blend it into a smooth powder.Heat oil in a pressure cooker over medium heat; add the chopped onions, ginger, garlic and green chillies and saute until the onions are lightly browned and tender.Add the tomatoes, and saute until the tomatoes become soft and mushy.",
      "Once done add the chicken, the garam masala and turmeric powder.",
      "Add 1/4 cup of water and pressure cook the chicken for 3 to 4 whistles and turn off the heat.Once done, allow the pressure to release naturally.Make sure there are no stems when you pick the gongura leaves.",
      "Wash and chop the gongura leaves and keep aside.In another pan,add some oil along garlic and saute the chopped gongura leaves along with a little salt and the ground masala.",
      "The gongura leaves will wilt almost instantly.",
      "Saute the gongura in the masala for about 3 to 4 minutes until it becomes like a mushy paste.Once done, add the cooked chicken curry into the Gongura masala and saute on high heat for another 2 minutes and turn off the heat.Check the salt and spices and adjust according to taste.",
      "Transfer the Gongura Chicken Curry to a serving bowl and serve hot.Serve Gongura Chicken with Ghee Rice Recipe | Neychoru , Tomato Onion Cucumber Raita Recipe and a Semiya Payasam for a delicious weekend lunch."
    ],
    "ingredients": [
      "500 grams Chicken", "2 Onion - chopped", "1 Tomato - chopped", "4 Green Chillies - slit",
      "1 inch Ginger - finely chopped", "6 cloves Garlic - finely chopped", "1/2 teaspoon Turmeric powder (Haldi)",
      "1 teaspoon Garam masala powder", "2 tablespoon Sesame (Gingelly) Oil", "Salt - to taste",
      "1/4 teaspoon Methi Seeds (Fenugreek Seeds)", "1 tablespoon Coriander (Dhania) Seeds", "4 Dry Red Chillies",
      "1 teaspoon Fennel seeds (Saunf)", "1 teaspoon Sesame (Gingelly) Oil", "4 cloves Garlic",
      "2 cups Sorrel Leaves (Gongura) - picked and chopped", "Salt - to taste"
    ]
  },
  {
    "title": "Andhra Style Alam Pachadi Recipe - Adrak Chutney (Recipe)",
    "categories": ["Andhra", "South Indian Breakfast", "Vegetarian"],
    "directions": [
      "To make Andhra Style Alam Pachadi, first heat oil in a pan.", "Add lentils and cook till it turns brown.",
      "Now add dry red chillies, coriander seeds, onion, ginger and cook till the onion becomes soft.",
      "After the onion is cooked, add tomatoes and cook till the tomatoes become soft.",
      "Turn off the gas and allow it to cool.", "After it cools down, put it in a mixer grinder and make a paste.",
      "For tempering, heat the oil in a small pan.", "Add mustard seeds and let it cook for 10 seconds.",
      "Now add curry leaves, asafoetida and let it cook for 10 seconds.", "Add it to the chutney and mix.",
      "Serve Andhra Style Alam Pachadi with Ghee Roast Dosa and Kirai Sambar for breakfast."
    ],
    "ingredients": [
      "1 tablespoon chana dal", "1 tablespoon white urad dal", "2 red chillies", "1 tablespoon coriander seeds",
      "3 inches ginger - chop", "1 onion - chop", "1 tomato - chop", "salt - as per taste",
      "1 Teaspoon mustard", "asafoetida - a pinch", "oil - as per use", "1 sprig curry"
    ]
  },
  {
    "title": "Pudina Khara Pongal Recipe",
    "categories": ["South Indian Recipes", "South Indian Breakfast", "High Protein Vegetarian"],
    "directions": [
      "To begin making Pudina Khara Pongal Recipe, wash and soak the rice and dal for 20 minutes.",
      "Make a paste of mint/pudina, coriander, green chilli and ginger using a mixer grinder and keep aside.",
      "Heat oil in pressure cooker, add cumin seeds, soaked rice and dal and pressure cook for 4-5 whistles."
    ],
    "ingredients": [
      "1 cup Rice", "1/2 cup Yellow Moong Dal", "1 cup Mint Leaves", "1/4 cup Coriander Leaves",
      "1 Green Chilli", "1 inch Ginger", "1 teaspoon Cumin seeds", "ghee", "cashew nuts", "black peppercorns"
    ]
  },
  {
    "title": "Udupi Style Ash Gourd Coconut Curry Recipe",
    "categories": ["Udupi", "Lunch", "Vegetarian"],
    "directions": [
      "Cook ash gourd in pressure cooker with turmeric and salt.",
      "Grind roasted spices with fresh coconut and tamarind pulp.",
      "Combine cooked ash gourd with coconut paste and temper with mustard seeds and curry leaves."
    ],
    "ingredients": [
      "500 grams Ash gourd", "1/2 cup Fresh coconut", "4 Dry Red Chillies", "tamarind water",
      "jaggery", "mustard seeds", "curry leaves", "cumin seeds", "coriander seeds"
    ]
  },
  {
    "title": "Spicy Crunchy Masala Idli Recipe",
    "categories": ["South Indian Recipes", "Snack", "Vegetarian"],
    "directions": [
      "Stir fry cut idli strips in oil until crisp.",
      "Saute onions, capsicum, green chillies, and tomatoes with red chilli powder, turmeric, and tomato ketchup.",
      "Combine fried idlis with masala and garnish with fresh coriander and mint."
    ],
    "ingredients": [
      "10 Idli", "1 cup Green Bell Pepper", "1 cup Tomato", "1 cup Onions", "2 Green Chillies",
      "red chilli powder", "turmeric powder", "tomato ketchup", "coriander leaves", "mint leaves"
    ]
  },
  {
    "title": "Chettinad Style Chicken Roast Recipe",
    "categories": ["Chettinad", "Appetizer", "High Protein Non Vegetarian"],
    "directions": [
      "Marinate chicken legs with onion-coconut paste, hung curd, turmeric, and salt.",
      "Dry roast Chettinad spices (cumin, coriander, peppercorns, chillies, fennel, cinnamon, cloves).",
      "Grill chicken until crispy and toss with spicy Chettinad masala gravy."
    ],
    "ingredients": [
      "1 Chicken leg", "1/4 cup Hung Curd", "1/2 teaspoon Turmeric powder", "1 Onion", "4 cloves Garlic",
      "2 tablespoon Fresh coconut", "Chettinad spices", "ghee", "tamarind paste", "jaggery"
    ]
  },
  {
    "title": "Paneer Tikka Saddle Roll Recipe",
    "categories": ["Bengali Recipes", "Snack", "Vegetarian"],
    "directions": [
      "Marinate paneer slices in curd, besan, ginger, garlic, kasuri methi, chaat masala, and mint.",
      "Pan fry paneer tikka and give smoked coal flavor.",
      "Roll in whole wheat rotis with sliced onions, capsicum, lemon juice, and mint chutney."
    ],
    "ingredients": [
      "2 cups Whole Wheat Flour", "200 grams Paneer", "1/4 cup Hung Curd", "1 tablespoon Gram flour",
      "ginger", "garlic", "kasuri methi", "chaat masala", "mint leaves", "onion", "capsicum"
    ]
  },
  {
    "title": "Cheesy Garlic Broccoli Nuggets Recipe",
    "categories": ["Indian", "Snack", "Eggetarian"],
    "directions": [
      "Saute finely chopped broccoli in garlic oregano spread until tender.",
      "Mix with mozzarella cheese, garlic mayo, corn flour, and breadcrumbs.",
      "Shape into nuggets and pan fry until golden and crisp."
    ],
    "ingredients": [
      "1-1/2 cups Broccoli", "1/2 cup Mozzarella cheese", "1 tablespoon Garlic Mayo",
      "2 tablespoons Corn flour", "1/4 cup Breadcrumbs", "Garlic & Oregano Spread"
    ]
  },
  {
    "title": "Chettinad Style Prawn Biryani Recipe",
    "categories": ["Chettinad", "Lunch", "Non Vegeterian"],
    "directions": [
      "Marinate prawns with ginger garlic paste, chilli powder, turmeric, and lemon juice.",
      "Saute shallots, green chilli paste, grated coconut, curd, and biryani spices.",
      "Add basmati rice, warm water, ghee and cook on low heat until fluffy."
    ],
    "ingredients": [
      "200 grams Prawns", "1-1/2 cups Basmati rice", "4-5 Shallots", "ginger garlic paste",
      "grated coconut", "hung curd", "curry leaves", "biryani whole spices", "ghee"
    ]
  },
  {
    "title": "Murgh Malaiwala Recipe - Chicken In Rich Creamy Gravy",
    "categories": ["North Indian Recipes", "Lunch", "Non Vegeterian"],
    "directions": [
      "Marinate chicken with garlic, ginger, lemon juice, almond paste, and cream.",
      "Cook onions in ghee with cardamom, cinnamon, and bay leaf until translucent.",
      "Add marinated chicken, milk, and cream, simmering until tender and garnished with kasuri methi."
    ],
    "ingredients": [
      "500 grams Chicken", "2 teaspoon Ginger paste", "1 teaspoon Garlic paste", "1/2 cup Fresh cream",
      "1 cup Milk", "1 tablespoon Almond paste", "ghee", "cardamom", "cinnamon", "kasuri methi"
    ]
  },
  {
    "title": "Paal Kesari Recipe - South Indian Style Milk Kesari",
    "categories": ["South Indian Recipes", "Dessert", "Vegetarian"],
    "directions": [
      "Roast semolina in ghee until fragrant.",
      "Boil milk with saffron strands and sugar.",
      "Add roasted semolina continuously to prevent lumps and cook until smooth, garnishing with fried cashews and raisins."
    ],
    "ingredients": [
      "1/2 cup Semolina (Rava)", "3 cups Milk", "3/4 cup Sugar", "5 Saffron strands",
      "1 Cardamom", "1 teaspoon Ghee", "Cashew nuts", "Raisins"
    ],
    "title": "Dhania Chole Masala Recipe - Chickpeas In Fresh Coriander Gravy",
    "categories": ["North Indian Recipes", "Main Course", "High Protein Vegetarian"],
    "directions": [
      "Soak and pressure cook white chickpeas with water and salt.",
      "Blend fresh coriander, ginger, and green chillies into a fresh green dhania masala.",
      "Saute onions, ginger, garlic, bay leaves, cinnamon, black cardamom, and simmer chickpeas in dhania gravy."
    ],
    "ingredients": [
      "2 cups White Chickpeas", "1/2 cup Coriander Leaves", "4 Green Chillies", "1 inch Ginger",
      "1 Onion", "ginger garlic paste", "whole spices", "black salt", "ghee"
    ]
  }
];

function transformAndReplace() {
  const formattedRecipes = rawItems.map((item, idx) => {
    const isNonVeg = (item.categories || []).some(c => c.toLowerCase().includes('non') || c.toLowerCase().includes('chicken') || c.toLowerCase().includes('prawn'));
    const cal = isNonVeg ? 420 : 280;
    const protein = isNonVeg ? 28 : 10;
    const fat = isNonVeg ? 18 : 8;
    const carbs = Math.max(15, Math.round((cal - (protein * 4 + fat * 9)) / 4));

    return {
      id: `recipe_${String(idx + 1).padStart(3, '0')}`,
      title: item.title.trim(),
      cuisine: item.categories && item.categories.length > 0 ? item.categories[0] : 'Indian',
      prepTimeMinutes: 30,
      nutrition: {
        calories: cal,
        proteinGrams: protein,
        carbsGrams: carbs,
        fatGrams: fat
      },
      ingredients: item.ingredients || ["mixed vegetables", "spices", "oil"],
      instructions: item.directions || ["Cook ingredients together and serve hot."],
      tags: item.categories || ["Indian", "Homestyle"]
    };
  });

  fs.writeFileSync(recipesPath, JSON.stringify(formattedRecipes, null, 2));
  console.log(`✅ Successfully replaced backend/data/recipes.json with ${formattedRecipes.length} curated recipes!`);
}

transformAndReplace();
