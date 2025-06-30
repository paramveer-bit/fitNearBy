"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  Search,
  X,
  SlidersHorizontal,
  Filter,
  Star,
  TrendingUp,
  Zap,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import GymCard from "@/components/home/gymCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import type { GYM } from "@/types";
import { toast } from "sonner";
import LocationSuggestions from "@/components/location-suggestion";

const allFacilities = [
  "Only Mens",
  "Only Womens",
  "Unisex",
  "Cardio Equipment",
  "Weight Training",
  "Group Classes",
  "Swimming Pool",
  "Personal Training",
  "Yoga Studio",
  "Locker Rooms",
  "Nutrition Counseling",
];

interface Filters {
  priceRange: [number, number];
  maxDistance: number;
  facilities: string[];
  minRating: number;
}

interface LocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
  permissionDenied: boolean;
}

export default function GymsPage() {
  const [gyms, setGyms] = useState<GYM[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationState, setLocationState] = useState<LocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    error: null,
    loading: false,
    permissionDenied: false,
  });
  const [sortBy, setSortBy] = useState("distance");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 20000],
    maxDistance: 10,
    minRating: 0,
    facilities: [],
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Enhanced geolocation function
  const getCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocationState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        loading: false,
      }));
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    setLocationState((prev) => ({ ...prev, loading: true, error: null }));

    // Check permission first
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        setLocationState((prev) => ({
          ...prev,
          loading: false,
          permissionDenied: true,
          error:
            "Location permission denied. Please enable location access in your browser settings.",
        }));
        toast.error("Location permission denied");
        return;
      }
    } catch (error) {
      console.error("Permission API not supported:", error);
      console.log("Permission API not supported, proceeding with geolocation");
    }

    const options: PositionOptions = {
      enableHighAccuracy: true, // Use GPS if available
      timeout: 15000, // 15 seconds timeout
      maximumAge: 300000, // Accept cached position up to 5 minutes old
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        setLocationState({
          lat: latitude,
          lng: longitude,
          accuracy: accuracy,
          error: null,
          loading: false,
          permissionDenied: false,
        });

        toast.success(`Location found with ${Math.round(accuracy)}m accuracy`);
      },
      (error) => {
        let errorMessage = "Failed to get location";
        let permissionDenied = false;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            permissionDenied = true;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "Location information unavailable. Please try again.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred while getting location.";
            break;
        }

        setLocationState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
          permissionDenied,
        }));

        toast.error(errorMessage);
      },
      options
    );
  };

  // Add this function after the getCurrentLocation function
  const searchByLocation = async (locationQuery: string): Promise<void> => {
    if (!locationQuery.trim()) {
      toast.error("Please enter a location to search");
      return;
    }

    setIsSearching(true);

    try {
      // First, try to geocode the location using a geocoding service
      // For this example, I'll use a simple approach with OpenStreetMap Nominatim
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          locationQuery
        )}&limit=1`
      );

      if (!geocodeResponse.ok) {
        throw new Error("Failed to geocode location");
      }

      const geocodeData = await geocodeResponse.json();

      if (geocodeData.length === 0) {
        toast.error("Location not found. Please try a different search term.");
        setIsSearching(false);
        return;
      }

      const { lat, lon } = geocodeData[0];
      const latitude = Number.parseFloat(lat);
      const longitude = Number.parseFloat(lon);

      // Update location state with the geocoded coordinates
      setLocationState({
        lat: latitude,
        lng: longitude,
        accuracy: null, // No accuracy info from geocoding
        error: null,
        loading: false,
        permissionDenied: false,
      });

      // Fetch gyms based on the geocoded location
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/gym/location/getGyms`,
        {
          params: {
            latitude: latitude,
            longitude: longitude,
          },
        }
      );

      setGyms(res.data.data);
      toast.success(
        `Found ${res.data.data.length} gyms near "${locationQuery}"`
      );
    } catch (error: unknown) {
      console.error("Search error:", error);

      // Fallback: fetch all gyms if location search fails
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/gym`);
        setGyms(res.data.data);
        toast.warning(
          "Couldn't find specific location. Showing all gyms instead."
        );
      } catch (fallbackError) {
        if (axios.isAxiosError(fallbackError) && fallbackError.response) {
          toast.error(fallbackError.response.data.message);
        } else {
          toast.error("Failed to fetch gyms. Please try again.");
        }
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Add handler for search button click
  const handleSearchClick = () => {
    if (manualLocation.trim()) {
      searchByLocation(manualLocation);
    } else {
      // If no manual location, try to get current location
      getCurrentLocation();
    }
  };

  // Add this function to handle suggestion selection
  const handleLocationSelect = (
    locationName: string,
    lat: number,
    lng: number
  ) => {
    setManualLocation(locationName);
    setShowSuggestions(false);

    // Update location state
    setLocationState({
      lat: lat,
      lng: lng,
      accuracy: null,
      error: null,
      loading: false,
      permissionDenied: false,
    });

    // Fetch gyms for this location
    searchByLocation(locationName);
  };

  // Request location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 20000) count++;
    if (filters.maxDistance < 10) count++;
    if (filters.facilities.length > 0) count++;
    if (filters.minRating > 0) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  // Fetch gyms based on location
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        let res;

        if (locationState.lat && locationState.lng) {
          // Fetch gyms with location
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASEURL}/gym/location/getGyms`,
            {
              params: {
                latitude: locationState.lat,
                longitude: locationState.lng,
              },
            }
          );
        } else {
          // Fetch all gyms without location
          res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/gym`);
        }

        setGyms(res.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred while fetching gyms");
        }
      }
    };

    // Only fetch gyms if we have location or if location failed
    if ((locationState.lat && locationState.lng) || locationState.error) {
      fetchGyms();
    }
  }, [locationState.lat, locationState.lng, locationState.error]);

  const applyFilters = (gyms: GYM[]) => {
    return gyms.filter((gym) => {
      const minPrice = Math.min(...gym.Plans.map((p) => p.newprice));
      if (
        minPrice < filters.priceRange[0] ||
        minPrice > filters.priceRange[1]
      ) {
        return false;
      }

      if (gym.rating < filters.minRating) {
        return false;
      }

      if (gym.distance && gym.distance > filters.maxDistance) {
        return false;
      }

      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((facility) =>
          gym.Facilities.map((f) => f.name).includes(facility)
        );
        if (!hasAllFacilities) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredGyms = applyFilters(
    gyms.filter(
      (gym) =>
        gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedGyms: GYM[] = [...filteredGyms].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        if (!a.distance && !b.distance) return 0;
        if (!a.distance) return 1;
        if (!b.distance) return -1;
        return a.distance - b.distance;
      case "rating":
        return b.rating - a.rating;
      case "price":
        return (
          Math.min(...a.Plans.map((p) => p.newprice)) -
          Math.min(...b.Plans.map((p) => p.newprice))
        );
      default:
        return 0;
    }
  });

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 20000],
      minRating: 0,
      maxDistance: 10,
      facilities: [],
    });
  };

  const toggleFacility = (facility: string) => {
    setFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // Filter content component
  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <p className="text-sm text-gray-500">Refine your search</p>
        </div>
      </div>

      {/* Sort By */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <Label className="text-sm font-semibold text-gray-900">
              Sort By
            </Label>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">📍 Distance</SelectItem>
              <SelectItem value="rating">⭐ Rating</SelectItem>
              <SelectItem value="price">💰 Price</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <Label className="text-sm font-semibold text-gray-900">
                Price Range
              </Label>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200"
            >
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Badge>
          </div>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: value as [number, number],
              }))
            }
            max={20000}
            min={0}
            step={100}
            className="w-full [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-600"
          />
        </CardContent>
      </Card>

      {/* Minimum Rating */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-white">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <Label className="text-sm font-semibold text-gray-900">
                Minimum Rating
              </Label>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
              {filters.minRating > 0 ? `${filters.minRating}+ ⭐` : "Any"}
            </Badge>
          </div>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, minRating: value[0] }))
            }
            max={5}
            min={0}
            step={0.1}
            className="w-full [&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-yellow-500"
          />
        </CardContent>
      </Card>

      {/* Maximum Distance */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <Label className="text-sm font-semibold text-gray-900">
                Max Distance
              </Label>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 border-purple-200"
            >
              {filters.maxDistance < 10 ? `${filters.maxDistance} km` : "Any"}
            </Badge>
          </div>
          <Slider
            value={[filters.maxDistance]}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, maxDistance: value[0] }))
            }
            max={50}
            min={0.5}
            step={0.5}
            className="w-full [&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600"
          />
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-600" />
            <Label className="text-sm font-semibold text-gray-900">
              Required Facilities
            </Label>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {allFacilities.map((facility) => (
              <div
                key={facility}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors"
              >
                <Checkbox
                  id={facility}
                  checked={filters.facilities.includes(facility)}
                  onCheckedChange={() => toggleFacility(facility)}
                  className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={facility}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  {facility}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold bg-transparent"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-800 to-gray-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                Find Your Perfect Fitness Match
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gyms Near You
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transform your fitness journey with premium gyms, expert trainers,
              and state-of-the-art facilities
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                      <Input
                        placeholder={
                          locationState.loading
                            ? "Getting your location..."
                            : locationState.lat && locationState.lng
                            ? `Location: ${
                                manualLocation || "Current location"
                              }`
                            : "Enter city, address, or area"
                        }
                        value={manualLocation}
                        onChange={(e) => {
                          setManualLocation(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => {
                          // Delay hiding suggestions to allow clicks
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            setShowSuggestions(false);
                            handleSearchClick();
                          }
                        }}
                        className="pl-12 pr-10 h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                        disabled={locationState.loading || isSearching}
                      />
                      {manualLocation && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setManualLocation("");
                            setShowSuggestions(false);
                            getCurrentLocation();
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 z-10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {(locationState.loading || isSearching) && (
                        <RefreshCw className="absolute right-10 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin z-10" />
                      )}

                      <LocationSuggestions
                        query={manualLocation}
                        onSelect={handleLocationSelect}
                        isVisible={showSuggestions}
                      />
                    </div>
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search gyms, trainers, classes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                      />
                    </div>
                    <Button
                      size="lg"
                      onClick={handleSearchClick}
                      disabled={locationState.loading || isSearching}
                      className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto disabled:opacity-50"
                    >
                      {isSearching ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Status Alert */}
      {(locationState.error || locationState.loading) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Alert
            className={
              locationState.error
                ? "border-red-200 bg-red-50"
                : "border-blue-200 bg-blue-50"
            }
          >
            <AlertCircle
              className={`h-4 w-4 ${
                locationState.error ? "text-red-600" : "text-blue-600"
              }`}
            />
            <AlertDescription className="flex items-center justify-between">
              <span
                className={
                  locationState.error ? "text-red-800" : "text-blue-800"
                }
              >
                {locationState.loading
                  ? "Getting your location for better results..."
                  : locationState.error}
              </span>
              {locationState.error && !locationState.loading && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Location Accuracy Info */}
      {locationState.lat && locationState.lng && locationState.accuracy && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200"
            >
              📍 Location accuracy: ±{Math.round(locationState.accuracy)}m
            </Badge>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-96 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6 overflow-y-auto max-h-screen sticky top-0">
          <FilterContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-10 px-4 border-2 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="font-medium">Filters</span>
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-1 bg-blue-600 hover:bg-blue-700 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-96 overflow-y-auto bg-white"
                >
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-xl font-bold">
                      Filter Gyms
                    </SheetTitle>
                    <SheetDescription className="text-gray-600">
                      Refine your search to find the perfect gym for your
                      fitness journey.
                    </SheetDescription>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              {/* Mobile Sort */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <Label className="text-sm font-medium whitespace-nowrap text-gray-700">
                  Sort:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-28 h-6 border-0 focus:ring-0 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">📍 Distance</SelectItem>
                    <SelectItem value="rating">⭐ Rating</SelectItem>
                    <SelectItem value="price">💰 Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <Card className="mb-8 border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {activeFiltersCount} Active Filter
                    {activeFiltersCount !== 1 ? "s" : ""}
                  </Badge>
                  {filters.priceRange[0] > 0 ||
                  filters.priceRange[1] < 20000 ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      💰 ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </Badge>
                  ) : null}
                  {filters.minRating > 0 && (
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">
                      ⭐ {filters.minRating}+ stars
                    </Badge>
                  )}
                  {filters.maxDistance < 10 && (
                    <Badge className="bg-purple-600 hover:bg-purple-700">
                      📍 ≤ {filters.maxDistance} km
                    </Badge>
                  )}
                  {filters.facilities.map((facility) => (
                    <Badge
                      key={facility}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {facility}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Header */}
          <div className="mb-8 hidden sm:block">
            <Card className="border-0 shadow-sm bg-gradient-to-r from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {sortedGyms.length} Gym
                      {sortedGyms.length !== 1 ? "s" : ""} Found
                    </h2>
                    <p className="text-gray-600">
                      Discover the best fitness centers in your area
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 text-sm font-medium text-blue-600">
                          • {activeFiltersCount} filter
                          {activeFiltersCount !== 1 ? "s" : ""} applied
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="h-4 w-4" />
                    Sorted by {sortBy}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gym Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6 lg:gap-8">
            {sortedGyms.map((gym) => (
              <div
                key={gym.id}
                className="transform hover:scale-[1.02] transition-transform duration-200"
              >
                <GymCard gym={gym} />
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedGyms.length === 0 && !locationState.loading && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No gyms found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any gyms matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="h-12 px-6 border-2 hover:border-blue-300"
                  >
                    Clear Search
                  </Button>
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={clearAllFilters}
                      className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
