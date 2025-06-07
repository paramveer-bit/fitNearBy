"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/app/auth/AuthProvider";
import React, { useContext } from "react";
import AuthDialog from "@/components/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, MapPin } from "lucide-react";
import ReviewCard from "@/components/profile/Review";

// Mock user data - in a real app, this would come from your authentication system and database
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  isVerified: true,
  createdAt: "2024-01-15",
  bookings: [
    {
      id: 1,
      gym: {
        id: 1,
        name: "FitZone Premium",
        location: "Downtown",
        logoUrl: "/placeholder.svg?height=50&width=50",
      },
      plan: {
        name: "Monthly",
        price: 49.99,
        type: "MONTHLY",
      },
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      status: "CONFIRMED",
      createdAt: "2024-01-20",
    },
    {
      id: 2,
      gym: {
        id: 2,
        name: "PowerHouse Gym",
        location: "Midtown",
        logoUrl: "/placeholder.svg?height=50&width=50",
      },
      plan: {
        name: "Quarterly",
        price: 99.99,
        type: "QUARTERLY",
      },
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      status: "COMPLETED",
      createdAt: "2023-12-15",
    },
  ],
  reviews: [
    {
      id: 1,
      gym: {
        id: 1,
        name: "FitZone Premium",
        logoUrl: "/placeholder.svg?height=50&width=50",
      },
      rating: 5,
      comment:
        "Excellent facilities and friendly staff. The equipment is always clean and well-maintained.",
      createdAt: "2024-01-25",
    },
    {
      id: 2,
      gym: {
        id: 2,
        name: "PowerHouse Gym",
        logoUrl: "/placeholder.svg?height=50&width=50",
      },
      rating: 4,
      comment:
        "Great gym with good variety of equipment. The trainers are knowledgeable and helpful.",
      createdAt: "2024-01-10",
    },
  ],
};

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  console.log("User Context:", user);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AuthDialog
          open={true}
          onOpenChange={() => {}}
          type="profile"
          id={null}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-xl">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {mockUser.name}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="h-4 w-4 mr-1" />
                  {mockUser.email}
                  {mockUser.isVerified && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since{" "}
                  {new Date(mockUser.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {/* <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your profile information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {
                  mockUser.bookings.filter((b) => b.status === "CONFIRMED")
                    .length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockUser.bookings.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Reviews Written</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {mockUser.reviews.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-4">
              {mockUser.bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={booking.gym.logoUrl || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {booking.gym.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {booking.gym.name}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.gym.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(
                              booking.startDate
                            ).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <div className="mt-2">
                          <div className="font-semibold">
                            {booking.plan.name}
                          </div>
                          <div className="text-gray-600">
                            ${booking.plan.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/gyms/${booking.gym.id}`}>View Gym</a>
                      </Button>
                      {booking.status === "CONFIRMED" && (
                        <Button variant="outline" size="sm">
                          Download Card
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {mockUser.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} type={"gym"} />
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Privacy Settings</span>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Change Password</span>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Billing & Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Payment Methods</span>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Billing History</span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Download Receipts</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  These actions are permanent and cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
