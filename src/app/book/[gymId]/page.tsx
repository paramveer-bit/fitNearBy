"use client";

import { useState } from "react";
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

const gymData = {
  id: 1,
  name: "FitZone Premium",
  location: "123 Downtown Street, City Center",
  phone: "+91 98765 43210",
  email: "info@fitzonepremium.com",
  image: "/placeholder.svg?height=100&width=100",
  plans: [
    {
      id: 1,
      name: "Basic",
      price: 1999,
      originalPrice: 2499,
      duration: "1 Month",
      features: ["Gym Access", "Locker Facility", "Basic Equipment"],
      popular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: 2999,
      originalPrice: 3999,
      duration: "1 Month",
      features: [
        "All Basic Features",
        "Swimming Pool",
        "Group Classes",
        "Sauna Access",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: 4999,
      originalPrice: 6999,
      duration: "1 Month",
      features: [
        "All Premium Features",
        "Personal Training (2 sessions)",
        "Nutrition Consultation",
        "Priority Booking",
      ],
      popular: false,
    },
  ],
};

interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  description: string;
  minAmount: number;
  maxDiscount: number; // Optional for fixed discounts
}

const availableCoupons: Coupon[] = [
  {
    code: "WELCOME20",
    discount: 20,
    type: "percentage",
    description: "20% off for new members",
    minAmount: 1500,
    maxDiscount: 1000,
  },
  {
    code: "FLAT500",
    discount: 500,
    type: "fixed",
    description: "Flat ₹500 off on any plan",
    minAmount: 2000,
    maxDiscount: 500,
  },
  {
    code: "PREMIUM15",
    discount: 15,
    type: "percentage",
    description: "15% off on Premium and Elite plans",
    minAmount: 2500,
    maxDiscount: 750,
  },
];

export default function BookingPage() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(2); // Default to Premium
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [bookingData, setBookingData] = useState({
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

  const selectedPlanData = gymData.plans.find(
    (plan) => plan.id === selectedPlan
  );
  const subtotal = selectedPlanData?.price || 0;
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.min(
          (subtotal * appliedCoupon.discount) / 100,
          appliedCoupon.maxDiscount
        )
      : appliedCoupon.discount
    : 0;
  const taxes = Math.round((subtotal - discount) * 0.18); // 18% GST
  const total = subtotal - discount + taxes;

  const applyCoupon = () => {
    setCouponError("");
    const coupon = availableCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (subtotal < coupon.minAmount) {
      setCouponError(
        `Minimum order amount ₹${coupon.minAmount} required for this coupon`
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

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

  const handleBookingSubmit = () => {
    // Here you would integrate with payment gateway
    console.log("Processing payment...", {
      plan: selectedPlanData,
      user: bookingData,
      coupon: appliedCoupon,
      total,
      paymentMethod,
    });
    handleNextStep();
  };

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
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Membership Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gymData.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                          plan.popular
                            ? "border-blue-500 bg-blue-50"
                            : selectedPlan === plan.id
                            ? "border-blue-300 bg-blue-25"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {plan.popular && (
                          <Badge className="absolute -top-3 left-6">
                            Most Popular
                          </Badge>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                selectedPlan === plan.id
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedPlan === plan.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{plan.name}</h3>
                              <p className="text-sm text-gray-600">
                                {plan.duration}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-green-600">
                                ₹{plan.price}
                              </span>
                              {plan.originalPrice > plan.price && (
                                <span className="text-lg text-gray-500 line-through">
                                  ₹{plan.originalPrice}
                                </span>
                              )}
                            </div>
                            {plan.originalPrice > plan.price && (
                              <Badge variant="secondary" className="mt-1">
                                Save ₹{plan.originalPrice - plan.price}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleNextStep} size="lg">
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
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
                      <Label htmlFor="emergencyContact">
                        Emergency Contact
                      </Label>
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
                        <Link
                          href="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:underline"
                        >
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
                      onClick={handleNextStep}
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
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Coupon Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Apply Coupon Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!appliedCoupon ? (
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) =>
                              setCouponCode(e.target.value.toUpperCase())
                            }
                          />
                          <Button onClick={applyCoupon} disabled={!couponCode}>
                            Apply
                          </Button>
                        </div>
                        {couponError && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{couponError}</AlertDescription>
                          </Alert>
                        )}

                        {/* Available Coupons */}
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">
                            Available Coupons:
                          </p>
                          <div className="space-y-2">
                            {availableCoupons.map((coupon) => (
                              <div
                                key={coupon.code}
                                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100"
                                onClick={() => setCouponCode(coupon.code)}
                              >
                                <div>
                                  <p className="font-medium text-green-800">
                                    {coupon.code}
                                  </p>
                                  <p className="text-sm text-green-600">
                                    {coupon.description}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Apply
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                          <span>
                            Coupon <strong>{appliedCoupon.code}</strong>{" "}
                            applied! You saved ₹{discount}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removeCoupon}
                          >
                            Remove
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label
                          htmlFor="razorpay"
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              R
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Razorpay</p>
                            <p className="text-sm text-gray-600">
                              UPI, Cards, Net Banking, Wallets
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label
                          htmlFor="stripe"
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              S
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Stripe</p>
                            <p className="text-sm text-gray-600">
                              Credit/Debit Cards
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="paytm" id="paytm" />
                        <Label
                          htmlFor="paytm"
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              P
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Paytm</p>
                            <p className="text-sm text-gray-600">
                              Paytm Wallet, UPI, Cards
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handleBookingSubmit}
                    size="lg"
                    className="px-8"
                  >
                    Pay ₹{total} & Book Now
                  </Button>
                </div>
              </div>
            )}

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
                        <span>Booking ID:</span>
                        <span className="font-medium">
                          #GYM{Date.now().toString().slice(-6)}
                        </span>
                      </div>
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
                        <span className="font-medium">₹{total}</span>
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
                    src={gymData.image || "/placeholder.svg"}
                    alt={gymData.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{gymData.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>Downtown</span>
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
                          {selectedPlanData.duration}
                        </p>
                      </div>
                      <p className="font-semibold">₹{selectedPlanData.price}</p>
                    </div>
                  </div>
                )}

                <Separator className="mb-4" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Taxes (GST 18%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{gymData.phone}</span>
                  </div>
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
