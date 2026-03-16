import { FaMicrophone, FaRobot } from "react-icons/fa";

export default function MapSearch({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  isSearching,
  onSelectSuggestion,
  onVoiceClick,
  onAIClick,
  isListening,
  voiceError,
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="input-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter destination"
          aria-label="Search destination"
        />
        <button
          type="button"
          onClick={onVoiceClick}
          disabled={!onVoiceClick || isListening}
          className="voice-btn"
          title="Voice search"
          aria-label="Voice search"
        >
          <FaMicrophone className={isListening ? "animate-pulse" : ""} size={18} />
        </button>
        <button
          type="button"
          onClick={onAIClick}
          disabled={!onAIClick || isListening}
          className="voice-btn"
          title="AI assistant"
          aria-label="AI assistant"
        >
          <FaRobot className={isListening ? "animate-pulse" : ""} size={18} />
        </button>
      </div>
      {voiceError && (
        <p className="text-xs text-red-600 mt-1">{voiceError}</p>
      )}
      {isSearching && (
        <p className="text-xs opacity-80 mt-1">Searching...</p>
      )}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((place, index) => (
            <li
              key={`${place.place_id ?? index}-${place.lat}-${place.lon}`}
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectSuggestion(place);
                setSuggestions([]);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSuggestion(place);
                  setSuggestions([]);
                }
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
