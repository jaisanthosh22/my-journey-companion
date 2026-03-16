import { useCallback, useEffect, useRef, useState } from "react";

interface NominatimPlace {
  place_id?: number | string;
  lat: string;
  lon: string;
  display_name: string;
  [key: string]: unknown;
}

interface UseNominatimSearchResult {
  query: string;
  setQuery: (value: string) => void;
  suggestions: NominatimPlace[];
  setSuggestions: (value: NominatimPlace[]) => void;
  isSearching: boolean;
  doSearch: (value: string) => void;
}

export function useNominatimSearch(debounceMs = 400): UseNominatimSearchResult {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const performSearch = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      if (typeof window === "undefined") return;

      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSearching(true);
      try {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("format", "json");
        url.searchParams.set("q", trimmed);
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "5");

        const res = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            "Accept-Language": "en",
          },
        });
        if (!res.ok) {
          throw new Error("Search failed");
        }
        const data = (await res.json()) as NominatimPlace[];
        setSuggestions(data ?? []);
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error("Nominatim search error", err);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const scheduleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current != null) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        performSearch(value);
      }, debounceMs);
    },
    [debounceMs, performSearch]
  );

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    scheduleSearch(query);
    return () => {
      if (debounceRef.current != null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query, scheduleSearch]);

  const doSearch = useCallback(
    (value: string) => {
      setQuery(value);
      scheduleSearch(value);
    },
    [scheduleSearch]
  );

  useEffect(
    () => () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    },
    []
  );

  return { query, setQuery, suggestions, setSuggestions, isSearching, doSearch };
}

