"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Mail, Plus, Loader } from "lucide-react";
import Link from "next/link";
import axios from "axios";
// Mock data - in a real app, this would come from your databas

interface Gym {
  id: string;
  name: string;
  location: string;
  locationName?: string;
  email: string;
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  nearBy: string;
  logoUrl?: string;
}
export default function GymsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [fetching, setFetching] = useState(false);

  const filteredGyms = useMemo(() => {
    if (!searchTerm) return gyms;

    return gyms.filter((gym) => {
      const searchLower = searchTerm.toLowerCase();

      // Search in gym name, location, description
      const basicMatch = gym.name.toLowerCase().includes(searchLower);
      return basicMatch;
    });
  }, [searchTerm, gyms]);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/gym`);
        setGyms(res.data.data);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      } finally {
        setFetching(false);
      }
    };
    console.log("Fetching gyms...");
    fetchGyms();
  }, []);

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Gym</h1>
          <p className="text-muted-foreground">
            Discover gyms in your area with the facilities and programs you need
          </p>
        </div>
        <Link href="/admin/create">
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Gym
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search gyms by name, location, facilities, or trainer specialties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredGyms.length} gym{filteredGyms.length !== 1 ? "s" : ""} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Gym Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGyms.map((gym) => (
          <Card
            key={gym.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex">
              {/* Gym Details */}
              <div className="flex-1 p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={gym.logoUrl || "/placeholder.svg"}
                          alt={gym.name}
                        />
                        <AvatarFallback>{gym.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{gym.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {gym.locationName || "Faridabad"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {gym.description}
                  </p>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {gym.email}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        window.open(`${gym.location}`, "_blank");
                      }}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredGyms.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No gyms found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available gyms.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
