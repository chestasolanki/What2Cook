import React, { useState } from 'react';
import { X, Heart, Edit2, Check, LogOut, Flame, ChevronRight, Trash2 } from 'lucide-react';
import { updateProfileApi } from '../services/api';

export default function UserProfileModal({ isOpen, user, savedRecipes, onSelectRecipe, onDeleteSavedRecipe, onUpdateUser, onLogout, onClose }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [isSavingName, setIsSavingName] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setIsSavingName(true);
    setError('');

    try {
      const token = localStorage.getItem('pantrychef_token');
      const data = await updateProfileApi({ name: newName.trim(), token });
      onUpdateUser(data.user);
      setIsEditingName(false);
    } catch (err) {
      setError(err.message || 'Failed to update name');
    } finally {
      setIsSavingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Avatar & Info Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-red-500 shadow-md" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold border-2 border-red-500">
              {user.name?.[0] || 'U'}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-1 w-full">
            {/* Editable Name */}
            {isEditingName ? (
              <div className="flex items-center gap-2 max-w-xs mx-auto sm:mx-0">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-white border border-red-500 rounded-xl px-3 py-1 text-sm font-bold text-slate-900 focus:outline-none w-full"
                />
                <button
                  onClick={handleSaveName}
                  disabled={isSavingName}
                  className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold transition-all shrink-0 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-extrabold text-slate-900">{user.name}</h3>
                <button
                  onClick={() => {
                    setNewName(user.name);
                    setIsEditingName(true);
                  }}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Edit Display Name"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <p className="text-xs text-slate-500">{user.email}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold">
              Google Authenticated Account
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Saved Recipes Section */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h4 className="font-bold text-slate-900 text-base">Saved Cookbook ({savedRecipes.length})</h4>
            </div>
            <span className="text-xs text-slate-400">Bookmarked Recipes</span>
          </div>

          {savedRecipes.length === 0 ? (
            <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <p className="text-xs text-slate-500 font-medium">No saved recipes in your account yet.</p>
              <p className="text-[11px] text-slate-400">
                Click the heart button on any recipe card to save it to your profile!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 group transition-all"
                >
                  <div
                    onClick={() => {
                      onSelectRecipe(recipe);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer space-y-0.5"
                  >
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-red-600 font-bold uppercase">{recipe.cuisine || 'Recipe'}</span>
                      {recipe.nutrition?.calories && (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500" /> {recipe.nutrition.calories} kcal
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-red-600 transition-colors line-clamp-1">
                      {recipe.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onSelectRecipe(recipe);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-red-600 hover:text-white border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onDeleteSavedRecipe(recipe.id)}
                      className="p-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
