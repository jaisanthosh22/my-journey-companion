import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useGeolocation } from "../../hooks/useGeolocation";
import { useNominatimSearch } from "../../hooks/useNominatimSearch";
import { useVoiceRecognition } from "../../hooks/useVoiceRecognition";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

import { getRoute } from "../../services/osrm";
import { processAI } from "../../services/speechAI";
import { addPOIMarkers, addTaxiMarkers } from "../../services/mapMarkers";
import { TILE_LAYERS, TILE_ATTRIBUTION } from "../../services/mapTiles";

import MapSearch from "./MapSearch";
import MapControls from "./MapControl";
import SafetyIndicator from "./SafetyIndicator";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, shadowUrl: markerShadow });

const DEFAULT_CENTER = [11.0168, 76.9558];
const DEFAULT_ZOOM = 13;
const WELCOME_AI = "Hello my dear. I am here with you. Talk to me freely.";

export default function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const routeLineRef = useRef(null);
  const userMarkerRef = useRef(null);
  const watchIdRef = useRef(null);
  const dayLayerRef = useRef(null);
  const nightLayerRef = useRef(null);
  const poiMarkersRef = useRef([]);
  const taxiMarkersRef = useRef([]);
  const voiceModeRef = useRef("search");

  const [mapError, setMapError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const { currentPos, lastPos, error: geoError } = useGeolocation();

  const {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    isSearching,
    doSearch,
  } = useNominatimSearch(400);

  const { speak } = useSpeechSynthesis({ lang: "en-IN" });

  const clearPOI = useCallback(() => {
    poiMarkersRef.current.forEach((m) => m?.remove?.());
    poiMarkersRef.current = [];
  }, []);
  const clearTaxis = useCallback(() => {
    taxiMarkersRef.current.forEach((m) => m?.remove?.());
    taxiMarkersRef.current = [];
  }, []);

  const showPOI = useCallback(
    async (amenity, icon) => {
      if (!mapInstance.current || !currentPos) return;
      clearPOI();
      const markers = await addPOIMarkers(
        mapInstance.current,
        L,
        amenity,
        icon,
        currentPos
      );
      poiMarkersRef.current = markers;
    },
    [currentPos, clearPOI]
  );

  const showTaxis = useCallback(() => {
    if (!mapInstance.current || !currentPos) return;
    clearTaxis();
    const markers = addTaxiMarkers(mapInstance.current, L, currentPos, 5);
    taxiMarkersRef.current = markers;
  }, [currentPos, clearTaxis]);

  const sendSOS = useCallback(() => {
    alert("🆘 SOS SENT!\nLocation shared.");
  }, []);
  const makeCall = useCallback(() => {
    window.location.href = "tel:112";
  }, []);

  const predictSafety = useCallback(() => {
    let score = 85;
    const hour = new Date().getHours();
    if (hour >= 21 || hour <= 5) score -= 25;
    if (currentPos && lastPos && mapInstance.current) {
      try {
        if (mapInstance.current.distance(lastPos, currentPos) < 5) score -= 20;
      } catch (_) {}
    }
    return Math.max(20, Math.min(95, score));
  }, [currentPos, lastPos]);

  const safetyScore = currentPos ? predictSafety() : null;

  const routeTo = useCallback(
    async (lat, lon) => {
      if (!currentPos || !mapInstance.current || !routeLineRef.current) {
        alert("Waiting for your location...");
        return;
      }
      try {
        const coords = await getRoute(currentPos, [lat, lon]);
        if (coords.length === 0) {
          alert("No route found.");
          return;
        }
        routeLineRef.current.setLatLngs(coords);
        mapInstance.current.fitBounds(routeLineRef.current.getBounds(), {
          padding: [40, 40],
        });
        speak(`Safety level: ${predictSafety()} percent.`);
      } catch (err) {
        console.error("Routing error:", err);
        alert("Routing failed.");
      }
    },
    [currentPos, predictSafety, speak]
  );

  const onVoiceResult = useCallback(
    (transcript) => {
      if (voiceModeRef.current === "search") {
        setQuery(transcript);
        doSearch(transcript);
      } else {
        const { reply } = processAI(transcript, {
          predictSafety,
          showPOI,
          showTaxis,
          sendSOS,
          makeCall,
          setDestination: (place) => {
            setQuery(place);
            doSearch(place);
          },
          routeTo: (lat, lon) => routeTo(lat, lon),
        });
        speak(reply);
      }
    },
    [setQuery, doSearch, predictSafety, showPOI, showTaxis, sendSOS, makeCall, routeTo, speak]
  );

  const { start: startVoice, isListening, error: voiceError } = useVoiceRecognition({
    lang: "en-IN",
    onResult: onVoiceResult,
  });

  const onVoiceClick = useCallback(() => {
    voiceModeRef.current = "search";
    startVoice();
  }, [startVoice]);

  const onAIClick = useCallback(() => {
    voiceModeRef.current = "ai";
    speak(WELCOME_AI);
    startVoice();
  }, [speak, startVoice]);

  const handleSelectSuggestion = useCallback(
    (place) => {
      setSuggestions([]);
      routeTo(parseFloat(place.lat), parseFloat(place.lon));
    },
    [setSuggestions, routeTo]
  );

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    const container = mapRef.current;
    if (!container || mapInstance.current) return;

    let map;
    try {
      map = L.map(container, { zoomControl: false }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      L.control.zoom({ position: "topright" }).addTo(map);

      const dayLayer = L.tileLayer(TILE_LAYERS.light, {
        attribution: TILE_ATTRIBUTION.light,
      }).addTo(map);
      const nightLayer = L.tileLayer(TILE_LAYERS.dark, {
        attribution: TILE_ATTRIBUTION.dark,
      });
      dayLayerRef.current = dayLayer;
      nightLayerRef.current = nightLayer;

      routeLineRef.current = L.polyline([], {
        color: "#38bdf8",
        weight: 4,
      }).addTo(map);

      mapInstance.current = map;

      const t = setTimeout(() => map.invalidateSize(), 100);

      /* ResizeObserver: invalidateSize when map container resizes (flex/orientation change) */
      const resizeTarget = mapContainerRef.current;
      const ro =
        resizeTarget &&
        typeof ResizeObserver !== "undefined" &&
        new ResizeObserver(() => {
          if (mapInstance.current) mapInstance.current.invalidateSize();
        });
      if (ro && resizeTarget) ro.observe(resizeTarget);

      return () => {
        if (ro && resizeTarget) ro.disconnect();
        clearTimeout(t);
        clearPOI();
        clearTaxis();
        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
          userMarkerRef.current = null;
        }
        routeLineRef.current = null;
        dayLayerRef.current = null;
        nightLayerRef.current = null;
        map.remove();
        mapInstance.current = null;
        setMapError(null);
      };
    } catch (err) {
      console.error("Map init error:", err);
      setMapError("Failed to load map.");
    }
  }, [clearPOI, clearTaxis]);

  useEffect(() => {
    if (!geoError) return;
    setMapError(geoError);
  }, [geoError]);

  useEffect(() => {
    if (!mapInstance.current || !currentPos) return;
    const map = mapInstance.current;
    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker(currentPos)
        .addTo(map)
        .bindPopup("You are here");
    } else {
      userMarkerRef.current.setLatLng(currentPos);
    }
    map.setView(currentPos, 16);
  }, [currentPos]);

  useEffect(() => {
    const map = mapInstance.current;
    const day = dayLayerRef.current;
    const night = nightLayerRef.current;
    if (!map || !day || !night) return;
    if (isDark) {
      map.removeLayer(day);
      map.addLayer(night);
    } else {
      map.removeLayer(night);
      map.addLayer(day);
    }
  }, [isDark]);

  return (
    <div className={`map-page ${isDark ? "dark" : ""}`}>
      <header>SafeZone – Smart Navigation</header>

      <div className="top-panel">
        {mapError && (
          <div className="mb-2 text-amber-700 bg-amber-100 px-3 py-2 rounded-lg text-sm">
            {mapError}
          </div>
        )}
        <MapSearch
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          isSearching={isSearching}
          onSelectSuggestion={handleSelectSuggestion}
          onVoiceClick={onVoiceClick}
          onAIClick={onAIClick}
          isListening={isListening}
          voiceError={voiceError}
          isDark={isDark}
        />
        <SafetyIndicator safety={currentPos ? safetyScore : null} />
      </div>

      <div className="map-fill">
        <div ref={mapContainerRef} className="absolute inset-0 z-0 min-h-[200px]">
          <div ref={mapRef} className="w-full h-full" aria-label="Map" />
        </div>
        <MapControls
          toggleMode={toggleDarkMode}
          isDark={isDark}
          sendSOS={sendSOS}
          makeCall={makeCall}
        />
      </div>
    </div>
  );
}

