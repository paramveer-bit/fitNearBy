"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GymData {
  name: string;
  location: string;
  email: string;
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  nearBy: string;
  locationLink: string;
  logoUrl: string; // Optional field for logo URL
}

function Basic() {
  const [gymData, setGymData] = useState<GymData>({
    name: "",
    location: "",
    email: "",
    description: "",
    address: "",
    latitude: null,
    longitude: null,
    nearBy: "",
    locationLink: "",
    logoUrl: "", // Initialize with an empty string
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const validate = () => {
    if (!gymData.name.trim()) return "Gym name is required.";
    if (!gymData.email.trim()) return "Email is required.";
    if (!gymData.location.trim()) return "Location is required.";
    if (!gymData.description.trim()) return "Gym Description is required";
    if (!gymData.address.trim()) return "Address is required";
    if (!gymData.latitude) return "Latitude is required";
    if (!gymData.longitude) return "Longitude is required";
    if (!gymData.nearBy.trim()) return "Nearby places are required";
    if (!gymData.locationLink.trim()) return "Location link is required";
    return null;
  };

  const submit = async () => {
    const validation = validate();
    if (validation) {
      toast.error("Error", {
        description: validation,
      });
      return;
    }
    try {
      setIsSubmitting(true);
      if (!selectedFile) {
        toast.error("Select Image First");
        return;
      }
      const res1 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/gym/add/logo`,
        { image: selectedFile },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", res1.data);
      // Set the logoUrl in gymData to the uploaded image URL and send it to backend
      const gymDataWithLogo = { ...gymData, logoUrl: res1.data.data.url };
      setGymData(gymDataWithLogo);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/gym/addgym`,
        gymDataWithLogo,
        { withCredentials: true }
      );
      router.push(`/admin/gyms/${res.data.data.id}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Function to handle form submission can be added here

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Gym</h1>
        <p className="text-muted-foreground">
          Create a comprehensive gym profile with all details
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the fundamental details about the gym
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Gym Name *</Label>
              <Input
                id="name"
                value={gymData.name}
                onChange={(e) =>
                  setGymData({ ...gymData, name: e.target.value })
                }
                placeholder="Enter gym name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={gymData.email}
                onChange={(e) =>
                  setGymData({ ...gymData, email: e.target.value })
                }
                placeholder="gym@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Gym Logo</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={gymData.description}
              onChange={(e) =>
                setGymData({ ...gymData, description: e.target.value })
              }
              placeholder="Describe your gym..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={gymData.location}
                onChange={(e) =>
                  setGymData({ ...gymData, location: e.target.value })
                }
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input
                id="address"
                value={gymData.address}
                onChange={(e) =>
                  setGymData({ ...gymData, address: e.target.value })
                }
                placeholder="Street address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={gymData.latitude || ""}
                onChange={(e) =>
                  setGymData({
                    ...gymData,
                    latitude: e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null,
                  })
                }
                placeholder="40.7128"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={gymData.longitude || ""}
                onChange={(e) =>
                  setGymData({
                    ...gymData,
                    longitude: e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null,
                  })
                }
                placeholder="-74.0060"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nearBy">Nearby Landmarks</Label>
              <Input
                id="nearBy"
                value={gymData.nearBy}
                onChange={(e) =>
                  setGymData({ ...gymData, nearBy: e.target.value })
                }
                placeholder="Near Central Park"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationLink">Location Link</Label>
            <Textarea
              id="locationLink"
              value={gymData.locationLink}
              onChange={(e) =>
                setGymData({ ...gymData, locationLink: e.target.value })
              }
              placeholder="Enter Google Maps location link"
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-none"
              onClick={submit}
            >
              {isSubmitting ? "Registering..." : "Register Gym"}
              Register Gym
            </Button>
            <Button type="button" variant="outline">
              Clear Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Basic;
