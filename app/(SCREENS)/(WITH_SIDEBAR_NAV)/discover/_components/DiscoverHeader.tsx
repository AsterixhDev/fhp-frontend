import React, { useState, useEffect, useRef } from "react";
import { Search, X, Clock } from "lucide-react";

interface Props {
  query: string;
  onChange: (v: string) => void;
  onSearch: (searchQuery: string) => void;
}

const STORAGE_KEY = "recent_searches";

const DiscoverHeader: React.FC<Props> = ({ query, onChange, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions] = useState([
    "CEO Marriage",
    "Cold Revenge",
    "Hidden Identity",
    "Campus Love",
    "Billionaire Romance",
    "Revenge Drama",
    "Fantasy Romance",
    "Thriller Mystery",
    "Office Romance",
    "College Drama",
    "Royal Love",
    "Secret Child",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect to load recent searches from localStorage, avoid direct state updates in effect
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTimeout(() => {
        // Use setTimeout to avoid synchronous state updates directly in the effect
        setRecentSearches(JSON.parse(stored));
      }, 0);
    }
  }, []); // Empty dependency array ensures this only runs once after mount

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      addToRecentSearches(searchQuery);
    }
  };

  const addToRecentSearches = (searchQuery: string) => {
    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFromRecentSearches = (searchToRemove: string) => {
    const updated = recentSearches.filter((s) => s !== searchToRemove);
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query);
      setShowSuggestions(false);
    }
  };

  const getFilteredSuggestions = () => {
    if (!query.trim()) return suggestions;
    return suggestions.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <div className="sticky top-0 z-20 bg-black px-4 py-3 border-b border-white/10">
      <div className="relative">
        <div className="flex bg-white/10 justify-between items-center gap-10 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-white/60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search short dramas, actors, genres"
            className="bg-transparent outline-none text-sm w-full text-white"
          />
          {query && (
            <button
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Auto Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 rounded-lg border border-white/10 shadow-lg max-h-96 overflow-y-auto">
            {query.trim() ? (
              // Auto suggestions
              <div className="p-2">
                {getFilteredSuggestions().length > 0 ? (
                  <div>
                    <div className="px-3 py-2 text-xs text-white/60">
                      Suggestions
                    </div>
                    {getFilteredSuggestions().map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onChange(suggestion);
                          handleSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm cursor-pointer text-white hover:bg-white/10 rounded flex items-center gap-3"
                      >
                        <Search className="w-3 h-3 text-white/60" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-white/60">
                    No suggestions found
                  </div>
                )}
              </div>
            ) : // Recent searches
            recentSearches.length > 0 ? (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Clock className="w-3 h-3" />
                    Recent searches
                  </div>
                  <button
                    onClick={clearAllRecent}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    Clear all
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onChange(search);
                        handleSearch(search);
                        setShowSuggestions(false);
                      }}
                      className="flex-1 text-left px-3 py-2 cursor-pointer text-sm text-white hover:bg-white/10 rounded flex items-center gap-3"
                    >
                      <Clock className="w-3 h-3 text-white/60" />
                      {search}
                    </button>
                    <button
                      onClick={() => removeFromRecentSearches(search)}
                      className="p-1 text-white/60 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-white/60">
                No recent searches
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default DiscoverHeader;
