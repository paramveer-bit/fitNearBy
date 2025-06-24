"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GymImages from "@/components/gyms/GymImages";
import { MapPin, Star, Mail, Dumbbell } from "lucide-react";
import Image from "next/image";
import GymPlanes from "@/components/gyms/GymPlanes";
import ReviewCard from "@/components/profile/Review";
import TrainerCard from "@/components/gyms/trainerCard";
import { useParams } from "next/navigation";
import Link from "next/link";

import { GYM } from "@/types";
import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";
import AuthDialog from "@/components/auth";
import axios from "axios";
import { Loader } from "lucide-react";
import { Reviews } from "@/types";

export default function GymDetailPage() {
  const params = useParams<{ id: string }>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [gym, setGym] = useState<GYM | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    const fetchGyms = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${params.id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Gym data:", res.data);
        setGym(res.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, [params.id]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/reviews/gym/${params.id}`,
          {
            withCredentials: true,
          }
        );
        setReviews(res.data.data);
      } catch (error) {}
    };
    fetch();
  }, [gym]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-gray-600 ml-4">Loading gym details...</p>
      </div>
    );
  }

  if (!loading && gym == null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Gym not found</p>
      </div>
    );
  }

  if (gym) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {/* Logo */}
                <Image
                  src={gym.logoUrl}
                  alt={`${gym.name} logo`}
                  width={90}
                  height={90}
                  className="rounded-lg"
                />
                <div>
                  {/* Gym Address and name*/}
                  <h1 className="text-3xl font-bold text-gray-900">
                    {gym.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {gym.address}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{gym.rating}</span>
                      <span className="ml-1 text-gray-600">
                        ({gym._count.Reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Book Now */}
              {user.user ? (
                <Link href={`/book/${gym.id}`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Book Now
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setDialogOpen(true)}
                >
                  Book Now
                </Button>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <GymImages gymId={params.id} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="trainers">Trainers</TabsTrigger>
                  <TabsTrigger value="plans">Plans</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {gym.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {gym.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Operating Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {gym.GymOperatingHours.map((hours) => (
                          <div key={hours.day} className="flex justify-between">
                            <span className="font-medium">{hours.day}</span>
                            <span className="text-gray-600">
                              {hours.openAt} - {hours.closeAt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="facilities" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gym.Facilities.map((facility, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center">
                            <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
                            {facility.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {facility.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trainers" className="space-y-4">
                  <TrainerCard gymId={gym.id} />
                </TabsContent>

                <TabsContent value="plans" className="space-y-4">
                  <GymPlanes plans={gym.Plans} />
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        type={"user"}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-600" />
                    <span>{gym.email}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-3 text-gray-600 mt-1" />
                    <span>{gym.address}</span>
                  </div>
                </CardContent>
              </Card>
              {/* Quick stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{gym.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews</span>
                    <span className="font-semibold">{gym._count.Reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Facilities</span>
                    <span className="font-semibold">
                      {gym.Facilities.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trainers</span>
                    <span className="font-semibold">{gym._count.Trainer}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <AuthDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          type={"book"}
          id={params.id}
        />
      </div>
    );
  }
}
