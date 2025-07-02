"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext";
import type React from "react";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import axios from "axios";
import z from "zod";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  id: string | null;
}

export default function AuthDialog({
  open,
  onOpenChange,
  type,
  id,
}: AuthDialogProps) {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: "",
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signing, setSigning] = useState(false);
  // New state to track if we're in OTP verification stage
  const [isOtpStage, setIsOtpStage] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSigning(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/user/auth/signIn`,
        { email: loginData.email.toLowerCase(), password: loginData.password },
        { withCredentials: true }
      );
      // console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
      return;
    } finally {
      setSigning(false);
    }

    await fetchUser();

    if (type === "book") {
      // console.log("Booking gym with ID:", id);

      router.push(`/book/${id}`);
      onOpenChange(false);
      return;
    }
    // console.log("Redirecting to profile page");
    window.location.reload();
    onOpenChange(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpStage) {
      // First stage: Initial signup
      // console.log("Initial signup data:", signupData);

      const signupSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phoneNumber: z
          .string()
          .length(10, "Phone number must be exactly 10 digits"),
        // .regex(/^\d{10}$/, "Phone number must contain only digits"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      });

      const result = signupSchema.safeParse({
        name: signupData.name,
        email: signupData.email,
        phoneNumber: signupData.phoneNumber,
        password: signupData.password,
      });

      if (!result.success) {
        alert(result.error.errors.map((err) => err.message).join(", "));
        return;
      }

      try {
        setIsSigningUp(true);
        // Make API call to send OTP
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASEURL}/user/auth/signup`,
          {
            name: signupData.name,
            email: signupData.email.toLowerCase(),
            phone_number: signupData.phoneNumber,
            password: signupData.password,
          }
        );

        // console.log("OTP sent successfully:", res.data);
        toast.success("OTP sent to your email/phone");
        setIsOtpStage(true); // Move to OTP verification stage
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Show exactly the backend's message
          toast.error(error.response.data.message);
        } else {
          // Fallback for network/CORS/unexpected errors
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsSigningUp(false);
      }
    } else {
      // Second stage: OTP verification
      // console.log("Verifying OTP:", signupData.otp);

      if (!signupData.otp) {
        toast.error("Please enter the OTP");
        return;
      }

      try {
        setIsSigningUp(true);
        // Make API call to verify OTP and complete signup
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASEURL}/user/auth/verifyUser`,
          {
            email: signupData.email.toLowerCase(),
            otp: signupData.otp,
          },
          { withCredentials: true }
        );

        // console.log("Signup completed successfully:", res.data);
        toast.success("Account created successfully!");

        await fetchUser();

        if (type === "book") {
          // console.log("Booking gym with ID:", id);
          router.push(`/book/${id}`);
          setSignupData({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            otp: "",
          });
          setIsOtpStage(false);
          onOpenChange(false);
          return;
        }

        router.push("/profile");
        // Reset form and close dialog
        setSignupData({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          otp: "",
        });
        setIsOtpStage(false);
        onOpenChange(false);

        // Optionally redirect or fetch user data
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Show exactly the backend's message
          toast.error(error.response.data.message);
        } else {
          // Fallback for network/CORS/unexpected errors
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/user/auth/isSignedIn`,
        { withCredentials: true }
      );
      // console.log("User data:", res.data);
      setUser(res.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Reset OTP stage when dialog closes
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setIsOtpStage(false);
      setSignupData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        otp: "",
      });
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={signing}>
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              {!isOtpStage && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={signupData.phoneNumber}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              {isOtpStage && (
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    We&apos;ve sent an OTP to your email/phone. Please enter it
                    below to verify your account.
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-otp">Enter OTP</Label>
                    <Input
                      id="signup-otp"
                      type="text"
                      placeholder="Enter the 6-digit OTP"
                      value={signupData.otp}
                      onChange={(e) =>
                        setSignupData({ ...signupData, otp: e.target.value })
                      }
                      maxLength={6}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOtpStage(false)}
                    disabled={isSigningUp}
                  >
                    Back to Sign Up
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSigningUp}>
                {isOtpStage ? "Verify OTP" : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
