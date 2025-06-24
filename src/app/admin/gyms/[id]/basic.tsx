import React, { useEffect, useState } from "react";

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
import axios from "axios";
import { toast } from "sonner";

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
}

function Basic({ id }: { id: string }) {
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${id}`
        );
        console.log(res.data.data);
        setGymData(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Error in fetching gym details");
      }
    };
    fetchData();
  }, [id]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the fundamental details about the gym
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Gym Name *</Label>
            <Input
              id="name"
              value={gymData.name}
              onChange={(e) => setGymData({ ...gymData, name: e.target.value })}
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
              setGymData({ ...gymData, description: e.target.value })
            }
            placeholder="Enter Google Maps location link"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Basic;
