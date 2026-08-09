import React from 'react';
import { X, Flame, Dumbbell, Heart, CheckCircle2, ChefHat, BookOpen } from 'lucide-react';

export default function RecipeModal({ recipe, isSaved, onToggleSave, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges & Actions */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="px-3.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider">
            {recipe.cuisine || 'Gourmet Recipe'}
          </span>

          <button
            onClick={() => onToggleSave(recipe)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isSaved
                ? 'bg-rose-50 border border-rose-200 text-rose-600 shadow-sm'
                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved in Cookbook' : 'Save Recipe'}</span>
          </button>
        </div>

        {/* Recipe Title & Macro Summary */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            {recipe.title}
          </h2>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            {recipe.nutrition?.calories && (
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Calories: <strong className="text-slate-900">{recipe.nutrition.calories} kcal</strong></span>
              </span>
            )}
            {recipe.nutrition?.proteinGrams && (
              <span className="flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-red-600" />
                <span>Protein: <strong className="text-slate-900">{recipe.nutrition.proteinGrams}g</strong></span>
              </span>
            )}
            {recipe.nutrition?.fatGrams && (
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>Fat: <strong className="text-slate-900">{recipe.nutrition.fatGrams}g</strong></span>
              </span>
            )}
          </div>
        </div>

        {/* Ingredients Checklist */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-red-600" />
            <span>Ingredients Checklist</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients?.map((ing, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Steps */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Cooking Instructions</span>
          </h3>

          <div className="space-y-3">
            {recipe.instructions?.map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex gap-3">
                <span className="font-bold text-red-600 font-mono text-sm">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
