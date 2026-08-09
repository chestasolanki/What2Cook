import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

export default function PopularRecipesGrid({ recipes = [], savedRecipes = [], onSelectRecipe, onToggleSave }) {
  const [scrollIndex, setScrollIndex] = useState(0);

  // Fallback recipes array so popular dishes are 100% ALWAYS visible
  const samplePopular = [
    {
      id: 'pop-1',
      title: 'Tuscan Garlic Spinach Pasta',
      cuisine: 'Italian',
      nutrition: { calories: 420, proteinGrams: 16 }
    },
    {
      id: 'pop-2',
      title: 'Roasted Herb Rosemary Chicken',
      cuisine: 'Gourmet',
      nutrition: { calories: 480, proteinGrams: 42 }
    },
    {
      id: 'pop-3',
      title: 'Grilled Salmon Asparagus Bowl',
      cuisine: 'Seafood',
      nutrition: { calories: 510, proteinGrams: 38 }
    },
    {
      id: 'pop-4',
      title: 'Fresh Avocado Quinoa Salad',
      cuisine: 'Healthy',
      nutrition: { calories: 340, proteinGrams: 14 }
    }
  ];

  const displayRecipes = recipes && recipes.length > 0 ? recipes : samplePopular;

  // Minimalist Slate & Rose Pill Card Color Themes from Screenshot
  const cardThemes = [
    { bg: 'bg-[#e11d48]', border: 'border-[#f43f5e]', text: 'text-white' }, // Rose Pink
    { bg: 'bg-[#be123c]', border: 'border-[#e11d48]', text: 'text-white' }, // Deep Rose
    { bg: 'bg-[#059669]', border: 'border-[#10b981]', text: 'text-white' }, // Fresh Emerald
    { bg: 'bg-[#7c3aed]', border: 'border-[#8b5cf6]', text: 'text-white' }, // Violet
    { bg: 'bg-[#e11d48]', border: 'border-[#f43f5e]', text: 'text-white' }, // Crimson Rose
    { bg: 'bg-[#0284c7]', border: 'border-[#38bdf8]', text: 'text-white' }  // Ocean Blue
  ];

  // Dish Images Map
  const dishImages = [
    '/popular_dish_1.jpg', // Tuscan Garlic Spinach Pasta
    '/popular_dish_2.jpg', // Roasted Herb Chicken
    '/popular_dish_3.jpg', // Grilled Salmon & Quinoa
    '/dribbble_veg_hero_plate.jpg', // Avocado Salad Bowl
    '/popular_dish_1.jpg',
    '/popular_dish_2.jpg'
  ];

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, displayRecipes.length - 4)));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < displayRecipes.length - 4 ? prev + 1 : 0));
  };

  const visibleRecipes = displayRecipes.slice(scrollIndex, scrollIndex + 4).length < 4 
    ? displayRecipes.slice(0, 4) 
    : displayRecipes.slice(scrollIndex, scrollIndex + 4);

  return (
    <div
      id="popular-recipes-section"
      className="max-w-6xl mx-auto px-6 py-12 space-y-10 scroll-mt-6 select-none animate-page-load opacity-100"
      style={{ animationDelay: '300ms' }}
    >
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Top Culinary Dishes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Popular & Trending Dishes
        </h2>
        <p className="text-sm text-slate-600 font-normal">
          Click any recipe to inspect full ingredients and cooking steps, or tap the heart to save!
        </p>
      </div>

      {/* Dribbble Ticket Container with Side Notch Cutouts & Carousel Navigation */}
      <div className="relative bg-white rounded-[40px] border border-rose-100/80 shadow-[0_25px_60px_rgba(225,29,72,0.06)] p-6 sm:p-10 pt-16">
        {/* Left Arrow Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 z-20"
          title="Previous Dishes"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 z-20"
          title="Next Dishes"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* 4 Overlapping Pill Dish Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleRecipes.map((recipe, index) => {
            const isSaved = savedRecipes.some((r) => r.id === recipe.id);
            const theme = cardThemes[(scrollIndex + index) % cardThemes.length];
            const dishImg = dishImages[(scrollIndex + index) % dishImages.length];

            return (
              <div
                key={recipe.id}
                className={`relative ${theme.bg} rounded-[32px] p-5 pt-14 text-center shadow-xl flex flex-col justify-between items-center space-y-4 group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
                onClick={() => onSelectRecipe(recipe)}
              >
                {/* Overlapping Top Circular Dish Plate Image */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full p-1 bg-white shadow-xl border-2 border-white/60 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={dishImg}
                    alt={recipe.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Dish Title & Calorie Info */}
                <div className="space-y-1 w-full pt-2">
                  <h3 className="font-extrabold text-white text-base leading-snug line-clamp-1">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-bold text-white/90 px-2 pt-1">
                    <span className="text-sm font-black">
                      {recipe.nutrition?.calories ? `${recipe.nutrition.calories} kcal` : 'Fresh Recipe'}
                    </span>

                    {/* Heart Save Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(recipe);
                      }}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transition-transform cursor-pointer hover:scale-110"
                      title={isSaved ? 'Remove from Saved' : 'Save Recipe'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Bottom Action Pill & Star Rating */}
                <div className="flex items-center justify-between w-full pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRecipe(recipe);
                    }}
                    className="px-4 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-50 transition-colors flex items-center gap-1"
                  >
                    <span>View Recipe</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  <div className="flex items-center gap-1 text-white text-xs font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
