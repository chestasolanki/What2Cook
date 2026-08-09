import React from 'react';
import { Bot, User, BookOpen } from 'lucide-react';

export default function ChatWindow({ messages, onSelectRecipe, isStreaming }) {
  if (messages.length === 0) return null;

  // Helper to format text and render clickable [Source X] badges
  const renderTextWithCitations = (text, sources = []) => {
    if (!text) return null;

    // Pattern to match [Source 1], [Source 2], etc.
    const parts = text.split(/(\[Source\s*\d+\])/gi);

    return parts.map((part, index) => {
      const match = part.match(/\[Source\s*(\d+)\]/i);
      if (match && sources) {
        const sourceId = parseInt(match[1]);
        const matchedSource = sources.find(s => s.sourceId === sourceId);

        return (
          <button
            key={index}
            onClick={() => matchedSource && onSelectRecipe(matchedSource)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold font-mono transition-all cursor-pointer shadow-sm hover:scale-105"
            title={matchedSource ? `Click to view ${matchedSource.title}` : 'Source Recipe'}
          >
            <BookOpen className="w-3 h-3 text-emerald-600" />
            <span>{part}</span>
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div id="chat-section" className="max-w-4xl mx-auto px-6 mb-16 space-y-6 scroll-mt-6">
      {messages.map((msg, index) => (
        <div key={index} className="space-y-4 animate-fadeIn">
          {/* User Message */}
          {msg.role === 'user' && (
            <div className="flex items-start justify-end gap-3">
              <div className="bg-red-600 text-white p-4 rounded-3xl rounded-tr-none max-w-xl text-sm shadow-xl font-semibold">
                {msg.content}
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          )}

          {/* AI Grounded Response */}
          {msg.role === 'assistant' && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30 mt-1">
                <Bot className="w-5 h-5 font-bold" />
              </div>

              <div className="space-y-4 flex-1">
                {/* Retrieved Sources Header Cards */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-md space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-emerald-600">
                        <BookOpen className="w-3.5 h-3.5" /> Verified Ground-Truth Sources ({msg.sources.length})
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Click any card to inspect recipe</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {msg.sources.map((src) => (
                        <div
                          key={src.sourceId}
                          onClick={() => onSelectRecipe(src)}
                          className="bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200/80 hover:border-red-500/40 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-mono text-emerald-600 font-bold">[Source {src.sourceId}]</span>
                            <span className="text-slate-500 font-medium">{src.nutrition?.calories} kcal</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-red-600">
                            {src.title}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Response Text Bubble */}
                <div className="bg-white p-6 rounded-3xl rounded-tl-none border border-slate-100 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap shadow-xl">
                  {renderTextWithCitations(msg.content, msg.sources)}

                  {isStreaming && index === messages.length - 1 && (
                    <span className="inline-block w-2 h-4 ml-1 bg-red-600 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
