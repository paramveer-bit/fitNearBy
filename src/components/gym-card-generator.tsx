"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  Clock,
  Star,
} from "lucide-react";
import type { Booking } from "@/types";

export function generateGymCard(booking: Booking): React.ReactElement {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPlanTypeDisplay = (type: string) => {
    switch (type) {
      case "MONTHLY":
        return "Monthly Plan";
      case "YEARLY":
        return "Annual Plan";
      case "QUARTERLY":
        return "Quarterly Plan";
      case "HALF_YEARLY":
        return "6-Month Plan";
      case "TRIAL":
        return "Trial Plan";
      default:
        return type;
    }
  };

  return (
    <div className="w-96 mx-auto">
      <Card className="overflow-hidden bg-white border-0 shadow-2xl">
        {/* Premium Header with FitNearBy Branding */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>

          <div className="relative z-10">
            {/* FitNearBy Logo and Branding */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">
                    FitNearBy
                  </h1>
                  <p className="text-xs text-gray-300 font-medium">
                    Premium Fitness Network
                  </p>
                </div>
              </div>
              <Badge
                className={`${getStatusColor(
                  booking.status
                )} text-white border-0 px-3 py-1`}
              >
                {booking.status}
              </Badge>
            </div>

            {/* Gym Information */}
            <div className="flex items-center space-x-4">
              {booking.gym.logoUrl && (
                <img
                  src={booking.gym.logoUrl || "/placeholder.svg"}
                  alt={`${booking.gym.name} logo`}
                  className="w-14 h-14 rounded-xl bg-white p-2 shadow-lg"
                  crossOrigin="anonymous"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {booking.gym.name}
                </h2>
                <div className="flex items-center text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.gym.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-white">
          {/* Member Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
              Member Details
            </h3>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="space-y-3 text-sm">
                {/* Add Booking ID as the first item */}
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center text-blue-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="font-bold">Booking ID:</span>
                  </div>
                  <span className="text-blue-900 font-mono font-bold text-base">
                    {booking.id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">Name:</span>
                  <span className="text-gray-900 font-medium">
                    {booking.name || "N/A"}
                  </span>
                </div>
                {booking.email && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Email:</span>
                    </div>
                    <span className="text-gray-900">{booking.email}</span>
                  </div>
                )}
                {booking.phone_number && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Phone:</span>
                    </div>
                    <span className="text-gray-900">
                      {booking.phone_number}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plan Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
              Membership Plan
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900 text-lg">
                  {booking.plan.name}
                </span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                  {getPlanTypeDisplay(booking.plan.type)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Price:</span>
                <div className="flex items-center space-x-2">
                  {booking.plan.oldprice > booking.plan.newprice && (
                    <span className="line-through text-gray-500 text-sm">
                      ₹{booking.plan.oldprice}
                    </span>
                  )}
                  <span className="font-bold text-green-600 text-lg">
                    ₹{booking.plan.newprice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Validity Period */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-3"></div>
              Validity Period
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-gray-600 font-semibold text-sm">
                    Start Date
                  </span>
                </div>
                <div className="font-bold text-gray-900">
                  {formatDate(booking.startDate)}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-red-600" />
                  <span className="text-gray-600 font-semibold text-sm">
                    End Date
                  </span>
                </div>
                <div className="font-bold text-gray-900">
                  {formatDate(booking.endDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          {booking.plan.featured && booking.plan.featured.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full mr-3"></div>
                Plan Features
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {booking.plan.featured.map((feature, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <div className="flex items-center">
                <CreditCard className="w-3 h-3 mr-1" />
                <span>Member ID: {booking.id.slice(-8)}</span>
              </div>
              {booking.orderId && <div>Order: {booking.orderId}</div>}
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <div>Issued: {formatDate(booking.createdAt)}</div>
              <div className="flex items-center">
                <span>Powered by </span>
                <span className="font-bold text-blue-600 ml-1">FitNearBy</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
