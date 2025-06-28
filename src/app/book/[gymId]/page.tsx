"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Tag,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GYM } from "@/types";
// const gymData: GYM = {
//   id: "1",
//   name: "FitZone Premium",
//   location: "123 Downtown Street, City Center",
//   phone: "+91 98765 43210",
//   email: "info@fitzonepremium.com",
//   image: "/placeholder.svg?height=100&width=100",
//   plans: [
//     {
//       id: 1,
//       name: "Basic",
//       price: 1999,
//       originalPrice: 2499,
//       duration: "1 Month",
//       features: ["Gym Access", "Locker Facility", "Basic Equipment"],
//       popular: false,
//     },
//     {
//       id: 2,
//       name: "Premium",
//       price: 2999,
//       originalPrice: 3999,
//       duration: "1 Month",
//       features: [
//         "All Basic Features",
//         "Swimming Pool",
//         "Group Classes",
//         "Sauna Access",
//       ],
//       popular: true,
//     },
//     {
//       id: 3,
//       name: "Elite",
//       price: 4999,
//       originalPrice: 6999,
//       duration: "1 Month",
//       features: [
//         "All Premium Features",
//         "Personal Training (2 sessions)",
//         "Nutrition Consultation",
//         "Priority Booking",
//       ],
//       popular: false,
//     },
//   ],
// };

import PlanSelector from "./PlanSelector";
import PersonalDetails from "./PersonalDetails";
import axios from "axios";

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact?: string; // <-- make optional
  medicalConditions?: string; // <-- make optional
  agreeToTerms: boolean;
}
const durationMap: Record<string, string> = {
  MONTHLY: "1 Month",
  YEARLY: "12 Months",
  QUARTERLY: "3 Months",
  TRIAL: "7 Days",
  HALF_YEARLY: "6 Months",
};

export default function BookingPage() {
  const params = useParams();
  // ...existing code...
  const [gymData, setGymData] = useState<GYM>();
  // ...existing code...
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(""); // Default to Premium
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    medicalConditions: "",
    agreeToTerms: false,
  });

  const steps = [
    { id: 1, title: "Select Plan", description: "Choose your membership" },
    { id: 2, title: "Personal Details", description: "Enter your information" },
    { id: 3, title: "Payment", description: "Complete your booking" },
    { id: 4, title: "Confirmation", description: "Booking confirmed" },
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleBookingSubmit = () => {
  //   // Here you would integrate with payment gateway
  //   console.log("Processing payment...", {
  //     plan: selectedPlanData,
  //     user: bookingData,
  //     coupon: appliedCoupon,
  //     total,
  //     paymentMethod,
  //   });
  //   handleNextStep();
  // };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${params.gymId}`
        );
        setGymData(res.data.data);
        console.log("Gym Data:", res.data.data);
      } catch (error) {}
    };
    fetch();
  }, []);

  const handelSubmit = async () => {
    if (!selectedPlan) {
      alert("Please select a plan before proceeding.");
      return;
    }

    if (
      !bookingData.firstName ||
      !bookingData.lastName ||
      !bookingData.email ||
      !bookingData.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/booking/placeOrder`,
        {
          gymId: params.gymId,
          planId: selectedPlan,
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          phoneNumber: bookingData.phone,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data.data;
      const payment = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        order_id: data.order.id,
        ...data.order,
        handler: async (response: any) => {
          console.log("Payment Response:", response);
          const options = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            booking_id: data.booking_id,
          };
          // Here you would typically verify the payment signature and complete the booking
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASEURL}/booking/verifyPayment`,
            options,
            {
              withCredentials: true,
            }
          );

          if (res.data.data) {
            alert("Payment successful! Your booking is confirmed.");
            setCurrentStep(4); // Move to confirmation step
          }
        },
      });
      payment.open();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
      return;
    }

    // Here you would typically send the booking data to your backend
    console.log("Booking Data:", bookingData);
    handleNextStep();
  };

  if (!gymData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Alert variant="destructive">
          <AlertCircle className="w-6 h-6" />
          <AlertDescription>
            Gym data not found. Please check the gym ID.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedPlanData = gymData.Plans.find(
    (plan) => plan.id === selectedPlan
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={`/gym/${params.gymId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Gym
                </Button>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Book Membership</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Plan Selection */}
            {currentStep === 1 && (
              <PlanSelector
                plans={gymData.Plans}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                handleNextStep={handleNextStep}
              />
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <PersonalDetails
                bookingData={bookingData}
                setBookingData={setBookingData}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                handleBooking={handelSubmit}
              />
            )}

            {/* Step 3: Payment */}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your membership has been successfully booked. You&apos;ll
                    receive a confirmation email shortly.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gym:</span>
                        <span className="font-medium">{gymData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">
                          {selectedPlanData?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount Paid:</span>
                        <span className="font-medium">
                          ₹{selectedPlanData?.newprice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Download Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Gym Info */}
                <div className="flex items-center space-x-3 mb-6">
                  <Image
                    src={"/placeholder.svg"}
                    alt={gymData.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{gymData.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{gymData.location}</span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* Selected Plan */}
                {selectedPlanData && (
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">
                          {selectedPlanData.name} Plan
                        </p>
                        <p className="text-sm text-gray-600">
                          {durationMap[selectedPlanData.type]}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{selectedPlanData.oldprice}
                      </p>
                    </div>
                  </div>
                )}

                <Separator className="mb-4" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹{selectedPlanData ? selectedPlanData.newprice : 0}
                    </span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount ("NEW USER")</span>
                    <span>
                      -₹
                      {selectedPlanData
                        ? selectedPlanData.oldprice - selectedPlanData.newprice
                        : 0}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      ₹{selectedPlanData ? selectedPlanData.newprice : 0}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{gymData.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
