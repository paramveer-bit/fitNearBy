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
import { GYM } from "@/types";
import BlueTick from "@/assets/blueTick.svg";

const getMonth = (type: string) => {
  switch (type) {
    case "MONTHLY":
      return 1;
    case "YEARLY":
      return 12;
    case "QUARTERLY":
      return 3;
    case "HALF_YEARLY":
      return 6;
  }
};

function GymCard({ gym }: { gym: GYM }) {
  const getStatusColor = (distance: number) => {
    if (distance < 1) return "bg-green-100 text-green-800";
    if (distance < 3) return "bg-blue-100 text-blue-800";
    if (distance < 5) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };
  return (
    <Card
      key={gym.id}
      className="hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={gym.image || "/placeholder.svg"}
          alt={`${gym.name}`}
          fill
          className="object-cover"
        />
        {/* Gym Distance */}
        {gym.distance != null && (
          <div className="absolute top-4 right-4">
            <Badge className={`${getStatusColor(gym.distance)}`}>
              {gym.distance} km away
            </Badge>
          </div>
        )}
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
              ({gym._count.Reviews} reviews)
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
          {gym.GymOperatingHours[0]?.openAt +
            " - " +
            gym.GymOperatingHours[0]?.closeAt}
        </div>

        <div className="flex flex-wrap gap-2">
          {gym.Facilities != null &&
            gym.Facilities.map((facility, index) => (
              <Badge key={index} variant="secondary">
                {facility.name}
              </Badge>
            ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600">Starting from</span>
              <div className="font-bold text-2xl">
                {Number(
                  Math.min(
                    ...gym.Plans.map(
                      (p) => p.newprice / (getMonth(p.type) || 1)
                    )
                  )
                ).toFixed(2)}
                <span className="text-sm font-normal text-gray-600">/Day</span>
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
