import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MapPin, Search } from "lucide-react";
import { fetchCitySuggestions } from "../services/weatherService";
import { debounce } from "../utils/debounce";
import type { CitySuggestion } from "../types/weather";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelectCoords?: (lat: number, lon: number, name: string) => void;
}

export function SearchBar({ onSearch, onSelectCoords }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(
    debounce(async (q: string) => {
      if (q.trim().length < 2) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const results = await fetchCitySuggestions(q);
      setSuggestions(results);
      setLoading(false);
      setShowSuggestions(results.length > 0);
    }, 350),
    [],
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    const displayName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setQuery(displayName);
    setShowSuggestions(false);

    if (onSelectCoords) {
      onSelectCoords(suggestion.lat, suggestion.lon, suggestion.name);
    } else {
      onSearch(suggestion.name);
    }
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="search-form"
      >
        <div
          className={`search-wrapper ${focused ? "search-wrapper--focused" : ""}`}
        >
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setFocused(true);
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => setFocused(false)}
            placeholder="Search city or location..."
            className="search-input"
          />
          {loading && <Loader2 size={18} className="search-spinner" />}
        </div>
      </motion.form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="suggestions-list"
          >
            {suggestions.map((s, i) => (
              <li key={`${s.lat}-${s.lon}-${i}`}>
                <button
                  className="suggestion-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectSuggestion(s)}
                >
                  <MapPin size={14} className="suggestion-item__icon" />
                  <span className="suggestion-item__name">{s.name}</span>
                  {s.state && (
                    <span className="suggestion-item__state">{s.state},</span>
                  )}
                  <span className="suggestion-item__country">{s.country}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
