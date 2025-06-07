"use client";

import { useState } from "react";
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
import Logo from "@/assets/logo.jpg";
// Mock data - in a real app, this would come from your database
import ReviewCard from "@/components/profile/Review";
import TrainerCard from "@/components/gyms/trainerCard";
import { useParams } from "next/navigation";
import Link from "next/link";

const mockGym = {
  id: 1,
  name: "FitZone Premium",
  location: "Downtown",
  address: "123 Main St, City Center",
  email: "info@fitzonepremium.com",
  phone: "+1 (555) 123-4567",
  description:
    "FitZone Premium is a state-of-the-art fitness facility offering comprehensive wellness solutions. Our modern equipment, expert trainers, and diverse programs cater to all fitness levels and goals.",
  logoUrl: "/placeholder.svg?height=100&width=100",
  rating: 4.8,
  reviewCount: 124,
  facilities: [
    {
      name: "Cardio Equipment",
      description: "Latest treadmills, ellipticals, and bikes",
    },
    {
      name: "Weight Training",
      description: "Free weights and resistance machines",
    },
    { name: "Group Classes", description: "Yoga, Pilates, Zumba, and more" },
    {
      name: "Swimming Pool",
      description: "Olympic-size pool for swimming and aqua fitness",
    },
    {
      name: "Sauna & Steam",
      description: "Relaxation and recovery facilities",
    },
    {
      name: "Personal Training",
      description: "One-on-one sessions with certified trainers",
    },
  ],
  plans: [
    {
      id: 1,
      name: "Trial Pass",
      price: 19.99,
      type: "TRIAL",
      duration: 1,
      description: "7-day trial access to all facilities",
    },
    {
      id: 2,
      name: "Monthly",
      price: 49.99,
      type: "MONTHLY",
      duration: 1,
      description: "Full access with no commitment",
    },
    {
      id: 3,
      name: "Quarterly",
      price: 129.99,
      type: "QUARTERLY",
      duration: 3,
      description: "3-month plan with 15% savings",
    },
    {
      id: 4,
      name: "Annual",
      price: 399.99,
      type: "YEARLY",
      duration: 12,
      description: "Best value with 33% savings",
    },
  ],
  trainers: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@fitzonepremium.com",
      bio: "Certified personal trainer with 8+ years of experience in strength training and nutrition.",
      specialties: ["Strength Training", "Weight Loss", "Nutrition"],
      certifications: ["NASM-CPT", "Precision Nutrition"],
      experience: 8,
      trained: 150,
      image: "t1",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@fitzonepremium.com",
      bio: "Former athlete specializing in functional fitness and sports performance.",
      specialties: [
        "Functional Training",
        "Sports Performance",
        "Injury Prevention",
      ],
      certifications: ["CSCS", "FMS"],
      experience: 6,
      trained: 120,
      image: "t2",
    },
  ],
  operatingHours: [
    { day: "Monday", openAt: "06:00", closeAt: "22:00" },
    { day: "Tuesday", openAt: "06:00", closeAt: "22:00" },
    { day: "Wednesday", openAt: "06:00", closeAt: "22:00" },
    { day: "Thursday", openAt: "06:00", closeAt: "22:00" },
    { day: "Friday", openAt: "06:00", closeAt: "22:00" },
    { day: "Saturday", openAt: "07:00", closeAt: "20:00" },
    { day: "Sunday", openAt: "08:00", closeAt: "18:00" },
  ],
  reviews: [
    {
      id: 1,
      user: { name: "John Doe" },
      rating: 5,
      comment:
        "Excellent facilities and friendly staff. The equipment is always clean and well-maintained.",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      user: { name: "Jane Smith" },
      rating: 4,
      comment:
        "Great gym with good variety of classes. The trainers are knowledgeable and helpful.",
      createdAt: "2024-01-10",
    },
  ],
};

import { UserContext } from "@/app/auth/AuthProvider";
import React, { useContext } from "react";
import AuthDialog from "@/components/auth";

export default function GymDetailPage() {
  const params = useParams<{ id: string }>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const user = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <Image
                src={Logo}
                alt={`${mockGym.name} logo`}
                width={90}
                height={90}
                className="rounded-lg"
              />
              <div>
                {/* Gym Address and name*/}
                <h1 className="text-3xl font-bold text-gray-900">
                  {mockGym.name}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {mockGym.address}
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{mockGym.rating}</span>
                    <span className="ml-1 text-gray-600">
                      ({mockGym.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Book Now */}
            {user.user ? (
              <Link href={`/book/${mockGym.id}`}>
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
        <GymImages />

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
                    <CardTitle>About {mockGym.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {mockGym.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Operating Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockGym.operatingHours.map((hours) => (
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
                  {mockGym.facilities.map((facility, index) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockGym.trainers.map((trainer) => (
                    <TrainerCard key={trainer.id} trainer={trainer} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="plans" className="space-y-4">
                <GymPlanes />
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-6">
                  {mockGym.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} type={"user"} />
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
                  <span>{mockGym.email}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 text-gray-600 mt-1" />
                  <span>{mockGym.address}</span>
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
                    <span className="font-semibold">{mockGym.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-semibold">{mockGym.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Facilities</span>
                  <span className="font-semibold">
                    {mockGym.facilities.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trainers</span>
                  <span className="font-semibold">
                    {mockGym.trainers.length}
                  </span>
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
