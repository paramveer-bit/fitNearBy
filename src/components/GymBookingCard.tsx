import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dumbbell, QrCode, Calendar, BadgeIcon as IdCard } from "lucide-react";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            {/* Partner branding */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400">Powered by</div>
              <div className="text-sm font-semibold text-orange-400">
                FitNearBy
              </div>
            </div>

            {/* Gym name and status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">PowerFit Gym</h1>
                  <p className="text-xs text-gray-300">
                    Premium Fitness Center
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-500 text-white hover:bg-green-500"
              >
                ACTIVE
              </Badge>
            </div>
          </div>

          {/* Member Info */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-orange-500">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Member"
              />
              <AvatarFallback className="bg-orange-500 text-white text-lg font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-gray-300">Premium Member</p>
              <div className="flex items-center gap-1 mt-1">
                <IdCard className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">ID: GM-2024-001</span>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-600 mb-6" />

          {/* Membership Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Membership Type</span>
              <span className="text-sm font-medium text-orange-400">
                Premium Annual
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Member Since</span>
              <span className="text-sm font-medium">Jan 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-300">Expires</span>
              </div>
              <span className="text-sm font-medium text-green-400">
                Dec 31, 2024
              </span>
            </div>
          </div>

          <Separator className="bg-gray-600 mb-6" />

          {/* QR Code Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Scan for entry</p>
              <p className="text-xs text-gray-500">Show at front desk</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <QrCode className="w-12 h-12 text-black" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-600">
            <p className="text-xs text-center text-gray-400">
              24/7 Access • All Locations • Guest Privileges
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
