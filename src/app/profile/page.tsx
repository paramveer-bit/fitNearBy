"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import AuthDialog from "@/components/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, MapPin, LogOut } from "lucide-react";
import ReviewCard from "@/components/profile/Review";
import type { UserProfile } from "@/types";
import axios from "axios";
import { Loader } from "lucide-react";
import AddReview from "@/components/profile/AddReview";
import { toast } from "sonner";
import DownloadButton from "@/components/GymBookingCard";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState<UserProfile>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const [gymCard, setGymCard] = useState(false);
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

  const handleAddReview = async (
    gymId: string,
    rating: number,
    comment: string
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/reviews/${gymId}`,
        {
          rating,
          comment,
        },
        { withCredentials: true }
      );

      const gym = profileData?.Booking.find((b) => b.gym.id === gymId)?.gym;

      setProfileData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          Reviews: [
            ...prev.Reviews,
            {
              id: res.data.data.id,
              gym: gym || undefined,
              rating,
              comment,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
      toast.success("Review added successfully!");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/user/auth/signout`, {
        withCredentials: true,
      });

      // Clear user context
      setUser(null);

      toast.success("Logged out successfully!");

      // Redirect to home page or login page
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred during logout");
      }
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/user/profile`,
          { withCredentials: true }
        );
        setProfileData(res.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Show exactly the backend's message
          toast.error(error.response.data.message);
        } else {
          // Fallback for network/CORS/unexpected errors
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handelDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASEURL}/reviews/${id}`);
      setProfileData((prev) =>
        prev
          ? {
              ...prev,
              Reviews: prev.Reviews.filter((review) => review.id !== id),
            }
          : prev
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AuthDialog
          open={open}
          onOpenChange={setOpen}
          type="profile"
          id={null}
        />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!loading && !profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No profile data found</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No profile data found</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start sm:items-center space-x-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
                    {profileData.name}
                  </h1>
                  <div className="flex items-center text-sm sm:text-base text-gray-600 mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {profileData.email}
                    {profileData.isVerified && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm sm:text-base text-gray-600 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Member since{" "}
                    {new Date(profileData.createdAt).toLocaleDateString()}
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
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full sm:w-auto bg-transparent"
                >
                  {loggingOut ? (
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 mr-2" />
                  )}
                  {loggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {
                    profileData.Booking.filter(
                      (b) =>
                        b.endDate >= new Date().toISOString() &&
                        b.status === "CONFIRMED"
                    ).length
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
                  {profileData.Booking.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Reviews Written</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {profileData.Reviews.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <div className="space-y-4">
                {profileData.Booking.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarImage src={"/placeholder.svg"} />
                            <AvatarFallback>
                              {booking.gym.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-base sm:text-lg">
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
                              ).toLocaleDateString()}{" "}
                              - {new Date(booking.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <div className="mt-2">
                            <div className="font-semibold">
                              {booking.plan.type}
                            </div>
                            <div className="text-gray-600">
                              Rs. {booking.plan.newprice}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-2 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          asChild
                        >
                          <a href={`/gyms/${booking.gym.id}`}>View Gym</a>
                        </Button>
                        {booking.status === "CONFIRMED" && (
                          <Dialog open={gymCard} onOpenChange={setGymCard}>
                            <DialogTrigger asChild>
                              <Button size="sm">View Card</Button>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-sm sm:max-w-[500px] px-4">
                              <DownloadButton booking={booking} />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">My Reviews</h2>
                <AddReview
                  booking={profileData.Booking}
                  reviews={profileData.Reviews}
                  handleAddReview={handleAddReview}
                />
              </div>
              <div className="space-y-4">
                {profileData.Reviews.map((review) => (
                  <ReviewCard
                    id={review.id}
                    key={review.id}
                    review={review}
                    type={"gym"}
                    handelDelete={handelDelete}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
