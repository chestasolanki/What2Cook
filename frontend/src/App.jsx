import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import PopularRecipesGrid from './components/PopularRecipesGrid';
import ChatWindow from './components/ChatWindow';
import RecipeModal from './components/RecipeModal';
import UserProfileModal from './components/UserProfileModal';
import AuthModal from './components/AuthModal';
import FloatingChatbot from './components/FloatingChatbot';
import { streamRAGChat, fetchSavedRecipes, fetchPopularRecipesApi, saveRecipeApi, deleteSavedRecipeApi } from './services/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [maxCalories, setMaxCalories] = useState(null);
  const [minProtein, setMinProtein] = useState(null);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pantrychef_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load saved recipes and popular recipes on mount
  useEffect(() => {
    fetchSavedRecipes()
      .then(res => setSavedRecipes(res.recipes || []))
      .catch(err => console.warn('Could not load saved recipes:', err));

    fetchPopularRecipesApi()
      .then(res => setPopularRecipes(res.recipes || []))
      .catch(err => console.warn('Could not load popular recipes:', err));
  }, []);

  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('pantrychef_user', JSON.stringify(userData));
    localStorage.setItem('pantrychef_token', token);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('pantrychef_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pantrychef_user');
    localStorage.removeItem('pantrychef_token');
    setIsProfileModalOpen(false);
  };

  const handleToggleSave = async (recipe) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!recipe || !recipe.id) return;
    const isCurrentlySaved = savedRecipes.some(r => r.id === recipe.id);

    try {
      if (isCurrentlySaved) {
        const res = await deleteSavedRecipeApi(recipe.id);
        setSavedRecipes(res.savedRecipes || []);
      } else {
        const res = await saveRecipeApi(recipe);
        setSavedRecipes(res.savedRecipes || []);
      }
    } catch (err) {
      console.error('Error toggling save recipe:', err);
    }
  };

  const handleDeleteSaved = async (id) => {
    try {
      const res = await deleteSavedRecipeApi(id);
      setSavedRecipes(res.savedRecipes || []);
    } catch (err) {
      console.error('Error deleting saved recipe:', err);
    }
  };

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    // Enforce authentication before searching
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const userMessage = query.trim();
    setQuery('');
    setIsLoading(true);

    const updatedMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(updatedMessages);

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '', sources: [] }
    ]);

    setIsStreaming(true);

    let currentAnswer = '';
    let currentSources = [];

    await streamRAGChat({
      message: userMessage,
      maxCalories,
      minProtein,
      isVegetarian,
      onSources: (sources) => {
        currentSources = sources;
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1].sources = sources;
          return next;
        });
      },
      onToken: (token) => {
        currentAnswer += token;
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1].content = currentAnswer;
          return next;
        });
      },
      onError: (err) => {
        console.error('RAG Error:', err);
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1].content = `⚠️ Error: ${err}`;
          return next;
        });
        setIsLoading(false);
        setIsStreaming(false);
      },
      onDone: () => {
        setIsLoading(false);
        setIsStreaming(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans flex flex-col">
      <Navbar
        user={user}
        savedCount={savedRecipes.length}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-1 space-y-4">
        <HeroSection />

        <FilterBar
          query={query}
          setQuery={setQuery}
          maxCalories={maxCalories}
          setMaxCalories={setMaxCalories}
          minProtein={minProtein}
          setMinProtein={setMinProtein}
          isVegetarian={isVegetarian}
          setIsVegetarian={setIsVegetarian}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Featured Popular Recipes Grid */}
        <PopularRecipesGrid
          recipes={popularRecipes}
          savedRecipes={savedRecipes}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          onToggleSave={handleToggleSave}
        />

        <ChatWindow
          messages={messages}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          isStreaming={isStreaming}
        />
      </main>

      {/* Floating Bottom Right Chatbot Assistant */}
      <FloatingChatbot
        user={user}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Recipe Inspection Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isSaved={selectedRecipe ? savedRecipes.some(r => r.id === selectedRecipe.id) : false}
        onToggleSave={handleToggleSave}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* User Profile & Saved Recipes Drawer Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        user={user}
        savedRecipes={savedRecipes}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
        onDeleteSavedRecipe={handleDeleteSaved}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Google Authentication Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="glass-panel border-t border-rose-100 py-6 text-center text-xs text-slate-500">
        <p>What2Cook — Recipe & Nutrition Assistant</p>
      </footer>
    </div>
  );
}
