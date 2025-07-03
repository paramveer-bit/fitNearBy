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
// import BlueTick from "@/assets/blueTick.svg";

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
    <Link href={`/gyms/${gym.id}`}>
      <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={gym.image || "/placeholder.svg?height=192&width=400"}
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

        <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <span className="truncate">{gym.name}</span>
                <Image
                  src={gym.logoUrl}
                  alt="Verified"
                  width={24}
                  height={24}
                  className="hidden sm:inline-block ml-2 flex-shrink-0"
                />
              </CardTitle>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{gym.location}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold text-base sm:text-lg">
                  {gym.rating}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                ({gym._count.Reviews} reviews)
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6 flex-1 flex flex-col">
          {/* Description with line clamping */}
          <CardDescription className="text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {gym.description}
          </CardDescription>

          {/* Operating Hours */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {gym.GymOperatingHours[0]?.openAt} -{" "}
              {gym.GymOperatingHours[0]?.closeAt}
            </span>
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {gym.Facilities?.slice(0, 4).map((facility, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {facility.name}
              </Badge>
            ))}
            {gym.Facilities && gym.Facilities.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{gym.Facilities.length - 4} more
              </Badge>
            )}
          </div>

          {/* Pricing and CTA - pushed to bottom */}
          <div className="border-t pt-2 sm:pt-4 mt-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm text-gray-600">
                  Starting from
                </span>
                <div className="font-bold text-xl sm:text-2xl">
                  ₹
                  {Number(
                    Math.min(
                      ...gym.Plans.map(
                        (p) => p.newprice / (getMonth(p.type) || 1)
                      )
                    )
                  ).toFixed(0)}
                  <span className="text-xs sm:text-sm font-normal text-gray-600">
                    /Day
                  </span>
                </div>
              </div>
              <Button size="sm" className="sm:size-lg flex-shrink-0" asChild>
                <Link href={`/gyms/${gym.id}`}>
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">View</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default GymCard;
