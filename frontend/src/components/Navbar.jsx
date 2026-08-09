import React from 'react';
import { ChefHat, User } from 'lucide-react';

export default function Navbar({ user, onOpenProfile, onOpenAuth }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="relative z-50 px-6 sm:px-12 py-5 bg-transparent select-none animate-page-load" style={{ animationDelay: '50ms' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo (What2Cook) */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
            <ChefHat className="w-6 h-6 text-white font-bold" />
          </div>
          <span className="font-extrabold text-2.5xl tracking-tight text-slate-900">
            What<span className="text-rose-500">2Cook</span>
          </span>
        </div>

        {/* Center: Valid App Navbar Tags */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-rose-500 font-bold border-b-2 border-rose-500 pb-0.5 cursor-pointer">
            Home
          </button>
          <button onClick={() => scrollToSection('recipe-search-section')} className="hover:text-rose-500 transition-colors cursor-pointer">
            Find Recipes
          </button>
          <button onClick={() => scrollToSection('popular-recipes-section')} className="hover:text-rose-500 transition-colors cursor-pointer">
            Trending Dishes
          </button>
          <button onClick={() => scrollToSection('chat-section')} className="hover:text-rose-500 transition-colors cursor-pointer">
            AI Assistant
          </button>
        </div>

        {/* Right: User Profile / Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 p-1 pr-4 rounded-full bg-white border border-rose-100 hover:border-rose-300 transition-all cursor-pointer shadow-sm hover:shadow-md"
              title={`${user.name} - Profile & Saved Recipes`}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-rose-400"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                  {user.name?.[0] || <User className="w-4 h-4" />}
                </div>
              )}
              <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer hover:scale-105"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
