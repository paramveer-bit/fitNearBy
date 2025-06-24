"use client";
import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/GymLogo.svg"; // Adjust the path as necessary
import AuthDialog from "@/components/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useContext(UserContext);
  console.log("User Context:", user);
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image src={logo} alt="Gym Logo" className="w-56 mt-3 h-40" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/gyms"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Find Gyms
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                href="/listgym"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                List Your Gym
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              {/* If user is logged in, show profile link */}
              {user.user ? (
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              ) : (
                <button onClick={() => setDialogOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </button>
              )}
            </Button>
            <Button size="sm" asChild>
              <Link href="/gyms">
                <MapPin className="h-4 w-4 mr-2" />
                Find Gyms
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/gyms"
                className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Find Gyms
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
              <Link
                href="/profile"
                className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
      <AuthDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        id={null}
        type={"login"}
      />
    </nav>
  );
}
