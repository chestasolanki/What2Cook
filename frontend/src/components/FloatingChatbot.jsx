import React, { useState } from 'react';
import { MessageSquare, X, Send, BookOpen, Bot } from 'lucide-react';
import { streamRAGChat } from '../services/api';

export default function FloatingChatbot({ user, onSelectRecipe, onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! 👋 I am your What2Cook AI Assistant. What ingredients do you have in your kitchen today?`,
      sources: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!query.trim() || isLoading) return;

    if (!user) {
      onOpenAuth();
      return;
    }

    const userMsg = query.trim();
    setQuery('');
    setIsLoading(true);

    const updated = [...messages, { role: 'user', content: userMsg }];
    setMessages(updated);

    // Append empty assistant message for streaming
    setMessages((prev) => [...prev, { role: 'assistant', content: '', sources: [] }]);

    let currentText = '';

    await streamRAGChat({
      message: userMsg,
      onSources: (sources) => {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1].sources = sources;
          return next;
        });
      },
      onToken: (token) => {
        currentText += token;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1].content = currentText;
          return next;
        });
      },
      onError: (err) => {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1].content = `⚠️ Error: ${err}`;
          return next;
        });
        setIsLoading(false);
      },
      onDone: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      {/* Pure Circular Chat Icon Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-500 hover:to-red-400 text-white shadow-[0_15px_35px_rgba(234,88,12,0.45)] flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 border-2 border-white group"
        title="What2Cook AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageSquare className="w-6 h-6 text-white fill-white/20" />
          )}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse"></span>
        </div>
      </button>

      {/* Floating Chatbot Window / Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md h-[520px] bg-white rounded-3xl border border-orange-100 shadow-[0_25px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-orange-600 to-red-500 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">What2Cook AI Chatbot</h4>
                <p className="text-[10px] text-white/80 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Grounded Recipe Engine
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdf8f5] text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-orange-600 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-orange-100 font-normal rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Cited Sources Preview in Chatbot */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 space-y-1 w-full max-w-[85%]">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      <span>Retrieved Recipes ({msg.sources.length}):</span>
                    </div>

                    <div className="space-y-1">
                      {msg.sources.map((src) => (
                        <div
                          key={src.sourceId}
                          onClick={() => {
                            onSelectRecipe(src);
                            setIsOpen(false);
                          }}
                          className="bg-white hover:bg-orange-50 p-2 rounded-xl border border-orange-100 text-slate-800 text-[11px] font-bold flex items-center justify-between cursor-pointer transition-colors shadow-xs"
                        >
                          <span className="truncate max-w-[180px]">{src.title}</span>
                          <span className="text-[10px] text-orange-600 font-mono font-bold">View</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-orange-100 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything or type ingredients..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 font-medium"
            />

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-40 transition-all shadow-md cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
