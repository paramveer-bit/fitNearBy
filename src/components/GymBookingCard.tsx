"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  CreditCard,
  MapPin,
} from "lucide-react";

// Your interfaces (keeping them here for reference)
import type { Booking } from "@/types";
interface BookingCardProps {
  booking: Booking;
}
export default function BookingCard({ booking }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPlanTypeLabel = (type: string) => {
    switch (type) {
      case "MONTHLY":
        return "Monthly Plan";
      case "YEARLY":
        return "Yearly Plan";
      case "QUARTERLY":
        return "Quarterly Plan";
      case "HALF_YEARLY":
        return "Half-Yearly Plan";
      case "TRIAL":
        return "Trial Plan";
      default:
        return type;
    }
  };
  // console.log(booking);
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-l from-zinc-800 to-gray-900 border-b-2 border-gray-700 rounded-t-lg">
          <div className="text-center">
            <h2 className="text-lg font-bold text-black-800">FitNearby</h2>
            <p className="text-xs text--600">Your Fitness Booking Platform</p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={booking.gym.logoUrl || "/placeholder.svg?height=48&width=48"}
              alt={booking.gym.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <CardTitle className="text-xl">{booking.gym.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                {booking.gym.location}
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Booking Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(booking.startDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(booking.endDate)}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* User Information */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booking.name && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.name}
                  </p>
                </div>
              </div>
            )}
            {booking.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.email}
                  </p>
                </div>
              </div>
            )}
            {booking.phone_number && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.phone_number}
                  </p>
                </div>
              </div>
            )}
            {booking.orderId && (
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {booking.orderId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Plan Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Plan Details</h3>
            <Badge variant="outline">
              {getPlanTypeLabel(booking.plan.type)}
            </Badge>
          </div>

          <div>
            <span className="font-medium">{booking.plan.name}</span>
          </div>

          {/* Plan Features */}
          {booking.plan.featured && booking.plan.featured.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Plan Features:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {booking.plan.featured.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Created Date */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Booking created on {formatDate(booking.createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage with sample data
// export default function Component() {
//   const sampleBooking: Booking = {
//     id: "booking-123",
//     gym: {
//       id: "gym-1",
//       name: "FitZone Premium",
//       location: "Downtown",
//       email: "info@fitzone.com",
//       logoUrl: "/placeholder.svg?height=48&width=48",
//       description: "Premium fitness center",
//       latitude: 40.7128,
//       longitude: -74.006,
//       address: "123 Fitness St, Downtown",
//       rating: 4.8,
//       _count: { Reviews: 245, Trainer: 12 },
//       nearBy: "Central Park",
//       locationLink: "https://maps.google.com",
//       Facilities: [],
//       Plans: [],
//       GymOperatingHours: [],
//       distance: 2.5,
//     },
//     startDate: "2024-01-15T00:00:00Z",
//     endDate: "2024-02-15T00:00:00Z",
//     status: "CONFIRMED",
//     createdAt: "2024-01-10T10:30:00Z",
//     plan: {
//       id: "plan-1",
//       name: "Premium Monthly",
//       type: "MONTHLY",
//       newprice: 89,
//       oldprice: 120,
//       featured: [
//         "24/7 Gym Access",
//         "Personal Training Session",
//         "Group Classes",
//         "Locker & Towel Service",
//         "Nutrition Consultation",
//       ],
//       gymId: "gym-1",
//       isActive: true,
//     },
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone_number: "+1 (555) 123-4567",
//     orderId: "ORD-2024-001234",
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <BookingCard booking={sampleBooking} />
//     </div>
//   );
// }
