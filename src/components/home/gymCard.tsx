import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gym1 from "@/assets/gym1.png";
import gym2 from "@/assets/gym2.png";
import gym3 from "@/assets/gym3.png";
import one from "@/assets/one.webp";
import two from "@/assets/two.webp";
import BlueTick from "@/assets/blueTick.svg";

function GymCard({ gym }: { gym: SportsClub }) {
  const getStatusColor = (distance: number) => {
    if (distance < 1) return "bg-green-100 text-green-800";
    if (distance < 3) return "bg-blue-100 text-blue-800";
    if (distance < 5) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getImageSrc = (image: string) => {
    switch (image) {
      case "one":
        return one;
      case "two":
        return two;
      case "gym1":
        return gym1;
      case "gym2":
        return gym2;
      case "gym3":
        return gym3;
      default:
        return "/placeholder.svg"; // Fallback image
    }
  };
  const imageSrc = getImageSrc(gym.images);
  return (
    <Card
      key={gym.id}
      className="hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={`${gym.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${getStatusColor(gym.distance)}`}>
            {gym.distance} km away
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex">
              <>{gym.name}</>
              <Image
                src={BlueTick}
                alt="Verified"
                className="inline-block ml-1 aspect-square h-6 w-6 ml-4"
              />
            </CardTitle>
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
            <div className="text-sm text-gray-600">
              ({gym.reviewCount} reviews)
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-base">
          {gym.description}
        </CardDescription>

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
                {Math.min(...gym.plans.map((p) => p.price))}
                <span className="text-sm font-normal text-gray-600">
                  /month
                </span>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href={`/gyms/${gym.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GymCard;

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
