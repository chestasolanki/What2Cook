import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, ChefHat } from 'lucide-react';
import { loginWithGoogleApi } from '../services/api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Load Official Google Identity Services SDK
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse
        });

        const btnDiv = document.getElementById('googleSignInBtn');
        if (btnDiv) {
          window.google.accounts.id.renderButton(btnDiv, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
            width: 320
          });
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [isOpen]);

  const handleGoogleResponse = async (response) => {
    if (!response.credential) return;
    setIsSubmitting(true);
    setError('');

    try {
      // Send real Google ID Token to backend for verification
      const data = await loginWithGoogleApi(response.credential);
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError(err.message || 'Real Google Sign-In failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-2xl space-y-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center shadow-xl shadow-rose-500/30">
          <ChefHat className="w-8 h-8 text-white font-bold" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Sign in to What2Cook</h2>
          <p className="text-xs text-slate-500">
            Sign in with Google OAuth to search recipes, filter nutrition, and save your favorite cookbook meals!
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {!GOOGLE_CLIENT_ID && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium text-left space-y-1">
            <div className="font-bold">⚠️ Action Required: Add GOOGLE_CLIENT_ID</div>
            <div>Please add <code>VITE_GOOGLE_CLIENT_ID=your_id</code> in <code>frontend/.env</code> to render the live Google OAuth login button.</div>
          </div>
        )}

        {/* Real Official Google Button Container */}
        <div className="flex justify-center my-4 min-h-[44px]">
          <div id="googleSignInBtn"></div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Real Google OAuth 2.0 Identity Provider</span>
        </div>
      </div>
    </div>
  );
}
