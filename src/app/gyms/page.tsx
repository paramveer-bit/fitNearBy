"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gym1 from "@/assets/gym1.png";
import gym2 from "@/assets/gym2.png";
import gym3 from "@/assets/gym3.png";
import one from "@/assets/one.webp";
import two from "@/assets/two.webp";
import GymCard from "@/components/home/gymCard";

// Mock data - in a real app, this would come from your database
const mockGyms: SportsClub[] = [
  {
    id: 1,
    name: "FitZone Premium",
    location: "Downtown",
    address: "123 Main St, City Center",
    latitude: 40.7128,
    longitude: -74.006,
    description: "Premium fitness facility with state-of-the-art equipment",
    logoUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviewCount: 124,
    distance: 0.5,
    plans: [
      { name: "Monthly", price: 49.99, type: "MONTHLY" },
      { name: "Yearly", price: 399.99, type: "YEARLY" },
    ],
    facilities: [
      "Cardio Equipment",
      "Weight Training",
      "Group Classes",
      "Swimming Pool",
    ],
    operatingHours: "6:00 AM - 10:00 PM",
    images: "gym1", // assuming "gym1" is a placeholder for an image URL
  },
  {
    id: 2,
    name: "PowerHouse Gym",
    location: "Midtown",
    address: "456 Oak Ave, Midtown",
    latitude: 40.7589,
    longitude: -73.9851,
    description: "Strength training focused gym with expert trainers",
    logoUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    reviewCount: 89,
    distance: 1.2,
    plans: [
      { name: "Monthly", price: 39.99, type: "MONTHLY" },
      { name: "Quarterly", price: 99.99, type: "QUARTERLY" },
    ],
    facilities: [
      "Weight Training",
      "Personal Training",
      "Nutrition Counseling",
    ],
    operatingHours: "5:00 AM - 11:00 PM",
    images: "gym2",
  },
  {
    id: 3,
    name: "Wellness Center",
    location: "Uptown",
    address: "789 Pine St, Uptown",
    latitude: 40.7831,
    longitude: -73.9712,
    description: "Holistic wellness center with yoga and meditation",
    logoUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviewCount: 156,
    distance: 2.1,
    plans: [
      { name: "Trial", price: 19.99, type: "TRIAL" },
      { name: "Monthly", price: 59.99, type: "MONTHLY" },
    ],
    facilities: [
      "Yoga Studio",
      "Meditation Room",
      "Spa Services",
      "Healthy Cafe",
    ],
    operatingHours: "6:00 AM - 9:00 PM",
    images: "gym3",
  },
  {
    id: 4,
    name: "Budget Fitness",
    location: "Suburbs",
    address: "321 Elm St, Suburbs",
    latitude: 40.7282,
    longitude: -74.0776,
    description: "Affordable fitness option with essential equipment",
    logoUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.2,
    reviewCount: 67,
    distance: 3.5,
    plans: [
      { name: "Monthly", price: 24.99, type: "MONTHLY" },
      { name: "Yearly", price: 199.99, type: "YEARLY" },
    ],
    facilities: ["Cardio Equipment", "Weight Training", "Locker Rooms"],
    operatingHours: "24/7",
    images: "one",
  },
  {
    id: 5,
    name: "Elite Sports Club",
    location: "Business District",
    address: "555 Corporate Blvd, Business District",
    latitude: 40.7505,
    longitude: -73.9934,
    description: "Luxury sports club with premium amenities",
    logoUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviewCount: 203,
    distance: 1.8,
    plans: [
      { name: "Monthly", price: 89.99, type: "MONTHLY" },
      { name: "Yearly", price: 899.99, type: "YEARLY" },
    ],
    facilities: [
      "Cardio Equipment",
      "Weight Training",
      "Swimming Pool",
      "Tennis Court",
      "Spa Services",
      "Personal Training",
    ],
    operatingHours: "5:00 AM - 10:00 PM",
    images: "two",
  },
];

const allFacilities = [
  "Cardio Equipment",
  "Weight Training",
  "Group Classes",
  "Swimming Pool",
  "Personal Training",
  "Yoga Studio",
  "Meditation Room",
  "Spa Services",
  "Healthy Cafe",
  "Tennis Court",
  "Locker Rooms",
  "Nutrition Counseling",
];

interface Filters {
  priceRange: [number, number];
  minRating: number;
  maxDistance: number;
  facilities: string[];
  open24Hours: boolean;
}

const getStatusColor = (distance: number) => {
  if (distance < 1) return "bg-green-100 text-green-800";
  if (distance < 3) return "bg-blue-100 text-blue-800";
  if (distance < 5) return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

export default function GymsPage() {
  const [gyms, setGyms] = useState(mockGyms);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [sortBy, setSortBy] = useState("distance");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 100],
    minRating: 0,
    maxDistance: 10,
    facilities: [],
    open24Hours: false,
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    // Get user's location
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
    if (filters.minRating > 0) count++;
    if (filters.maxDistance < 10) count++;
    if (filters.facilities.length > 0) count++;
    if (filters.open24Hours) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  const applyFilters = (gyms: typeof mockGyms) => {
    return gyms.filter((gym) => {
      // Price filter
      const minPrice = Math.min(...gym.plans.map((p) => p.price));
      if (
        minPrice < filters.priceRange[0] ||
        minPrice > filters.priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (gym.rating < filters.minRating) {
        return false;
      }

      // Distance filter
      if (gym.distance > filters.maxDistance) {
        return false;
      }

      // Facilities filter
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((facility) =>
          gym.facilities.includes(facility)
        );
        if (!hasAllFacilities) {
          return false;
        }
      }

      // 24/7 filter
      if (filters.open24Hours && gym.operatingHours !== "24/7") {
        return false;
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

  const sortedGyms = [...filteredGyms].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance;
      case "rating":
        return b.rating - a.rating;
      case "price":
        return (
          Math.min(...a.plans.map((p) => p.price)) -
          Math.min(...b.plans.map((p) => p.price))
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
      open24Hours: false,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Left Sidebar */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Gym
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover gyms near you with the best facilities and pricing
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Enter your location"
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex ">
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Price Range (Monthly)
                </Label>
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

            {/* 24/7 Filter */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="open24Hours"
                checked={filters.open24Hours}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    open24Hours: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="open24Hours" className="text-sm font-medium">
                Open 24/7
              </Label>
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
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All Filters ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? (
                <Badge variant="secondary" className="px-3 py-1">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Badge>
              ) : null}
              {filters.minRating > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  Rating: {filters.minRating}+ stars
                </Badge>
              )}
              {filters.maxDistance < 10 && (
                <Badge variant="secondary" className="px-3 py-1">
                  Distance: ≤ {filters.maxDistance} km
                </Badge>
              )}
              {filters.open24Hours && (
                <Badge variant="secondary" className="px-3 py-1">
                  24/7 Open
                </Badge>
              )}
              {filters.facilities.map((facility) => (
                <Badge key={facility} variant="secondary" className="px-3 py-1">
                  {facility}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found {sortedGyms.length} gym{sortedGyms.length !== 1 ? "s" : ""}{" "}
              near you
              {activeFiltersCount > 0 && (
                <span className="ml-2 text-sm">
                  ({activeFiltersCount} filter
                  {activeFiltersCount !== 1 ? "s" : ""} applied)
                </span>
              )}
            </p>
          </div>

          {/* Gym Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedGyms.map((gym) => (
              <GymCard gym={gym} key={gym.id} />
            ))}
          </div>

          {sortedGyms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No gyms found matching your search criteria.
              </p>
              <div className="mt-4 space-x-2">
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

interface Plan {
  name: string;
  price: number;
  type: "MONTHLY" | "YEARLY" | "QUARTERLY" | "TRIAL";
}

interface SportsClub {
  id: number;
  name: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  logoUrl: string;
  rating: number;
  reviewCount: number;
  distance: number;
  plans: Plan[];
  facilities: string[];
  operatingHours: string;
  images: string; // assuming "two" is a placeholder for two image URLs
}
