import React from 'react';
import { ArrowRight, Play, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function HeroSection() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('recipe-search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 py-8 overflow-hidden select-none">
      {/* Background Soft Peach Glow */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Bold Headline & Actions */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4 animate-page-load" style={{ animationDelay: '150ms' }}>
            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Healthy <span className="text-orange-600">Cooking</span> is an Important Part of Lifestyle
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              We prepare delicious recipes based on what's inside your pantry. Grounded AI search with exact step-by-step instructions for all diets.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-5 animate-page-load" style={{ animationDelay: '300ms' }}>
            <button
              onClick={scrollToSearch}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
            >
              <span>Explore Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToSearch}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-white hover:bg-orange-50 border border-orange-100 text-slate-800 font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <span>How It Works</span>
            </button>
          </div>

          {/* Service Feature Badges */}
          <div className="flex flex-wrap gap-6 pt-4 text-xs font-semibold text-slate-700 border-t border-orange-100 animate-page-load" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Instant Search</div>
                <div className="text-[10px] text-slate-500">Within 0.5s</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">100% Citations</div>
                <div className="text-[10px] text-slate-500 font-medium">Real Verified Recipes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Giant Gourmet Dish Frame & Badges */}
        <div className="lg:col-span-6 flex justify-center items-center relative animate-page-load" style={{ animationDelay: '450ms' }}>
          {/* Warm Yellow/Orange Background Circle Slice */}
          <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] bg-amber-400 rounded-full z-0 transform translate-x-4 translate-y-2"></div>

          <div className="relative w-[340px] sm:w-[440px] aspect-square rounded-full p-3 flex items-center justify-center z-10">
            {/* Gourmet Dish Plate Image */}
            <img
              src="/dribbble_veg_hero_plate.jpg"
              alt="Gourmet Gourmet Salad Bowl"
              className="w-full h-full object-cover rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            />

            {/* Floating 20% Off Badge */}
            <div className="absolute top-6 right-4 bg-lime-400 text-slate-950 font-black px-4 py-2 rounded-full shadow-xl border-2 border-white text-xs tracking-wider uppercase">
              20% Off Nutrients
            </div>

            {/* Floating Calorie Badge */}
            <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Healthy Gourmet Bowl</div>
                <div className="text-[10px] text-slate-500 font-semibold">180 kcal • 12g protein</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
