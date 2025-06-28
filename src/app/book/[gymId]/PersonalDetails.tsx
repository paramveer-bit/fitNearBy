import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

interface Props {
  bookingData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emergencyContact?: string;
    medicalConditions?: string;
    agreeToTerms: boolean;
  };
  setBookingData: React.Dispatch<React.SetStateAction<Props["bookingData"]>>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleBooking: () => void;
}

function PersonalDetails({
  bookingData,
  setBookingData,
  handleNextStep,
  handlePrevStep,
  handleBooking,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={bookingData.firstName}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={bookingData.lastName}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={bookingData.emergencyContact}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  emergencyContact: e.target.value,
                })
              }
              placeholder="Emergency contact number"
            />
          </div>

          <div>
            <Label htmlFor="medicalConditions">
              Medical Conditions (Optional)
            </Label>
            <Textarea
              id="medicalConditions"
              value={bookingData.medicalConditions}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  medicalConditions: e.target.value,
                })
              }
              placeholder="Any medical conditions or allergies we should know about"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={bookingData.agreeToTerms}
              onCheckedChange={(checked) =>
                setBookingData({
                  ...bookingData,
                  agreeToTerms: !!checked,
                })
              }
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            Back
          </Button>
          <Button
            onClick={() => {
              handleNextStep();
              handleBooking();
            }}
            disabled={
              !bookingData.firstName ||
              !bookingData.lastName ||
              !bookingData.email ||
              !bookingData.phone ||
              !bookingData.agreeToTerms
            }
            size="lg"
          >
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalDetails;
