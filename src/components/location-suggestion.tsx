"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

interface LocationSuggestionsProps {
  query: string;
  onSelect: (location: string, lat: number, lng: number) => void;
  isVisible: boolean;
}

export default function LocationSuggestions({
  query,
  onSelect,
  isVisible,
}: LocationSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim() || query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&countrycodes=us,ca,gb,au,in`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isVisible || (!loading && suggestions.length === 0)) {
    return null;
  }

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 border shadow-lg bg-white">
      <CardContent className="p-2">
        {loading ? (
          <div className="p-3 text-center text-gray-500">
            <Clock className="h-4 w-4 inline mr-2" />
            Searching locations...
          </div>
        ) : (
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 hover:bg-gray-50"
                onClick={() => {
                  onSelect(
                    suggestion.display_name,
                    Number.parseFloat(suggestion.lat),
                    Number.parseFloat(suggestion.lon)
                  );
                  setSuggestions([]);
                }}
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-sm truncate">
                  {suggestion.display_name}
                </span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
