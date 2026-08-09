import React from 'react';
import { X, Heart, Trash2, Clock, Flame, ChevronRight } from 'lucide-react';

export default function SavedRecipesModal({ isOpen, savedRecipes, onSelectRecipe, onDeleteRecipe, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Saved Cookbook</h2>
              <p className="text-xs text-slate-400">{savedRecipes.length} bookmarked recipes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        {savedRecipes.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="text-4xl">📖</div>
            <h3 className="text-base font-bold text-slate-300">No saved recipes yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Search for ingredients in the assistant and click the "Save Recipe" heart button on any recipe card to store it here!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4 group"
              >
                <div
                  onClick={() => {
                    onSelectRecipe(recipe);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">
                      {recipe.cuisine || 'Recipe'}
                    </span>
                    {recipe.nutrition?.calories && (
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Flame className="w-3 h-3 text-orange-400" /> {recipe.nutrition.calories} kcal
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                    {recipe.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectRecipe(recipe);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-all text-xs flex items-center gap-1"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteRecipe(recipe.id)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
