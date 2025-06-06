"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import gym1 from "@/assets/gym1.png"
import gym2 from "@/assets/gym2.png"
import gym3 from "@/assets/gym3.png"

// Mock data - in a real app, this would come from your database
const mockGyms = [
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
    facilities: ["Cardio Equipment", "Weight Training", "Group Classes", "Swimming Pool"],
    operatingHours: "6:00 AM - 10:00 PM",
    images: gym2
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
    facilities: ["Weight Training", "Personal Training", "Nutrition Counseling"],
    operatingHours: "5:00 AM - 11:00 PM",
    images: gym1
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
    facilities: ["Yoga Studio", "Meditation Room", "Spa Services", "Healthy Cafe"],
    operatingHours: "6:00 AM - 9:00 PM",
    images: gym3
  },
]

const getStatusColor = (distance: number) => {
  if (distance < 1) return "bg-green-100 text-green-800"
  if (distance < 3) return "bg-blue-100 text-blue-800"
  if (distance < 5) return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-800"
}

export default function GymsPage() {
  const [gyms, setGyms] = useState(mockGyms)
  const [searchTerm, setSearchTerm] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [sortBy, setSortBy] = useState("distance")

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Error getting location:", error)
        },
      )
    }
  }, [])

  const filteredGyms = gyms.filter(
    (gym) =>
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedGyms = [...filteredGyms].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance
      case "rating":
        return b.rating - a.rating
      case "price":
        return Math.min(...a.plans.map((p) => p.price)) - Math.min(...b.plans.map((p) => p.price))
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Gyms Near You</h1>
          <p className="text-gray-600">Discover the best fitness facilities in your area</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by gym name, location, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {sortedGyms.length} gym{sortedGyms.length !== 1 ? "s" : ""} near you
          </p>
        </div>

        {/* Gym Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedGyms.map((gym) => (
            <Card key={gym.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={gym.images}
                  alt={`${gym.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(gym.distance)}`}>{gym.distance} km away</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{gym.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {gym.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-lg">{gym.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">({gym.reviewCount} reviews)</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-base">{gym.description}</CardDescription>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {gym.operatingHours}
                </div>

                <div className="flex flex-wrap gap-2">
                  {gym.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary">
                      {facility}
                    </Badge>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Starting from</span>
                      <div className="font-bold text-2xl">
                        ${Math.min(...gym.plans.map((p) => p.price))}
                        <span className="text-sm font-normal text-gray-600">/month</span>
                      </div>
                    </div>
                    <Button size="lg" asChild>
                      <Link href={`/gyms/${gym.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedGyms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No gyms found matching your search criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
