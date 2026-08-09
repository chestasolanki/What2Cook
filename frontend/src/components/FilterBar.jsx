import React from 'react';
import { Search, Flame, Dumbbell, Sparkles, Leaf } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FilterBar({ query, setQuery, maxCalories, setMaxCalories, minProtein, setMinProtein, isVegetarian, setIsVegetarian, onSearch, isLoading }) {
  const [filterRef, isRevealed] = useScrollReveal(0.1);

  const samplePills = [
    'chicken & spinach under 500 cal',
    'high protein pasta',
    'tofu stir-fry',
    'avocado quinoa bowl',
    'quick dinner'
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div
      ref={filterRef}
      id="recipe-search-section"
      className={`max-w-4xl mx-auto px-6 mb-8 scroll-mt-6 scroll-reveal ${isRevealed ? 'is-revealed' : ''}`}
    >
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-[0_20px_50px_rgba(225,29,72,0.05)] space-y-5">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type ingredients you have (e.g. spinach, rice, garlic, tofu)..."
            className="w-full bg-[#fff5f6] border border-rose-200/80 rounded-full pl-12 pr-32 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm sm:text-base font-medium transition-all"
          />

          <button
            onClick={onSearch}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Find Recipes</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Tags & Vegetarian Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-semibold mr-1">Quick Ideas:</span>
            {samplePills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => { setQuery(pill); }}
                className="px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-900 font-semibold transition-all cursor-pointer hover:scale-105"
              >
                + {pill}
              </button>
            ))}
          </div>

          {/* Vegetarian Toggle Switch */}
          <button
            onClick={() => setIsVegetarian(!isVegetarian)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer hover:scale-105 ${
              isVegetarian
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${isVegetarian ? 'text-emerald-600 animate-bounce' : 'text-slate-400'}`} />
            <span>Vegetarian Only 🌱</span>
          </button>
        </div>

        {/* Sliders for Nutrition Metadata Filtering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-rose-100">
          {/* Max Calories Slider */}
          <div className="space-y-2 bg-[#fff5f6] p-3.5 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Flame className="w-4 h-4 text-rose-500" /> Max Calories:
              </span>
              <span className="font-bold text-rose-600 font-mono">
                {maxCalories ? `${maxCalories} kcal` : 'Any Calories'}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="50"
              value={maxCalories || 1000}
              onChange={(e) => setMaxCalories(parseInt(e.target.value) === 1000 ? null : parseInt(e.target.value))}
              className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Min Protein Slider */}
          <div className="space-y-2 bg-[#fff5f6] p-3.5 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Dumbbell className="w-4 h-4 text-rose-600" /> Min Protein:
              </span>
              <span className="font-bold text-rose-600 font-mono">
                {minProtein ? `${minProtein}g protein` : 'Any Protein'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={minProtein || 0}
              onChange={(e) => setMinProtein(parseInt(e.target.value) === 0 ? null : parseInt(e.target.value))}
              className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
