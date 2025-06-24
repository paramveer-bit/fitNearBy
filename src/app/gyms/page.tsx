"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapPin, Search, X, Filter } from "lucide-react";
import GymCard from "@/components/home/gymCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

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

import type { GYM } from "@/types";

export default function GymsPage() {
  const [gyms, setGyms] = useState<GYM[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [sortBy, setSortBy] = useState("distance");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 20000],
    maxDistance: 10,
    minRating: 0,
    facilities: [],
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  console.log("User Location:", userLocation);

  if (!gyms) {
    setSortBy("distance");
  }

  // Getting user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    }
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++;
    if (filters.maxDistance < 10) count++;
    if (filters.facilities.length > 0) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  useEffect(() => {
    if (!userLocation) {
      const fetchGyms = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/gym`);
          setGyms(res.data.data);
        } catch (error) {
          console.error("Error fetching gyms:", error);
        }
      };
      fetchGyms();
    } else {
      const fetchGyms = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASEURL}/gym/location/getGyms`,
            {
              params: {
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              },
            }
          );
          setGyms(res.data.data);
        } catch (error) {
          console.error("Error fetching gyms:", error);
        }
      };
      fetchGyms();
    }
  }, [userLocation]);

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

      if (gym.distance > filters.maxDistance) {
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
      priceRange: [0, 100],
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

  // Filter Panel Component
  const FilterPanel = ({ className = "" }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Price Range (Monthly)</Label>
          <span className="text-sm text-gray-600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: value as [number, number],
            }))
          }
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <span className="text-sm text-gray-600">
            {filters.minRating > 0
              ? `${filters.minRating}+ stars`
              : "Any rating"}
          </span>
        </div>
        <Slider
          value={[filters.minRating]}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, minRating: value[0] }))
          }
          max={5}
          min={0}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Maximum Distance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Maximum Distance</Label>
          <span className="text-sm text-gray-600">
            {filters.maxDistance < 10
              ? `${filters.maxDistance} km`
              : "Any distance"}
          </span>
        </div>
        <Slider
          value={[filters.maxDistance]}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, maxDistance: value[0] }))
          }
          max={10}
          min={0.5}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Facilities */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Required Facilities</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allFacilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={facility}
                checked={filters.facilities.includes(facility)}
                onCheckedChange={() => toggleFacility(facility)}
              />
              <Label htmlFor={facility} className="text-sm">
                {facility}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero and search section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Perfect Gym
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Discover gyms near you with the best facilities and pricing
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  placeholder="Enter your location"
                  className="pl-9 sm:pl-10 h-10 sm:h-12 text-gray-900 text-sm sm:text-base"
                />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 sm:pl-10 h-10 sm:h-12 text-gray-900 text-sm sm:text-base"
                />
              </div>
              <Button
                size="lg"
                className="h-10 sm:h-12 px-6 sm:px-8 bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto max-h-screen sticky top-0">
          <FilterPanel />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Mobile Filter Button and Sort */}
          <div className="lg:hidden mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sheet
                open={isMobileFiltersOpen}
                onOpenChange={setIsMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4 px-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 px-1.5 py-0.5 text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 sm:w-96">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Sort */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium whitespace-nowrap">
                  Sort:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
              {filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? (
                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Badge>
              ) : null}
              {filters.minRating > 0 && (
                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  Rating: {filters.minRating}+ stars
                </Badge>
              )}
              {filters.maxDistance < 10 && (
                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  Distance: ≤ {filters.maxDistance} km
                </Badge>
              )}
              {filters.facilities.map((facility) => (
                <Badge
                  key={facility}
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  {facility}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-base">
              Found {sortedGyms.length} gym{sortedGyms.length !== 1 ? "s" : ""}{" "}
              near you
              {activeFiltersCount > 0 && (
                <span className="ml-2 text-xs sm:text-sm">
                  ({activeFiltersCount} filter
                  {activeFiltersCount !== 1 ? "s" : ""} applied)
                </span>
              )}
            </p>
          </div>

          {/* Gym Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {sortedGyms.map((gym) => (
              <GymCard gym={gym} key={gym.id} />
            ))}
          </div>

          {/* No Gym Found */}
          {sortedGyms.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-base sm:text-lg mb-4">
                No gyms found matching your search criteria.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-center justify-center">
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
                {activeFiltersCount > 0 && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
