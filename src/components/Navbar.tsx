"use client";

import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  User,
  Menu,
  X,
  Home,
  Search,
  Phone,
  Building2,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/GymLogo.svg";
import AuthDialog from "@/components/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useContext(UserContext);

  // console.log("User Context:", user);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Gym Logo"
                className="w-32 mt-3 h-16"
              />
            </Link>
          </div>

          {/* Desktop Navigation - UNCHANGED */}
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

          {/* Desktop Actions - UNCHANGED */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
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

          {/* Mobile menu button - Enhanced */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-b shadow-lg">
            <div className="px-4 py-6 space-y-1">
              {/* Navigation Links */}
              <div className="space-y-2 mb-6">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  <Home className="h-5 w-5 mr-3 text-gray-500" />
                  Home
                </Link>
                <Link
                  href="/gyms"
                  onClick={closeMenu}
                  className="flex items-center text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  <Search className="h-5 w-5 mr-3 text-gray-500" />
                  Find Gyms
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex items-center text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  <Phone className="h-5 w-5 mr-3 text-gray-500" />
                  Contact
                </Link>
                <Link
                  href="/listgym"
                  onClick={closeMenu}
                  className="flex items-center text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  <Building2 className="h-5 w-5 mr-3 text-gray-500" />
                  List Your Gym
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* User Actions */}
              <div className="space-y-3">
                {user.user ? (
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex items-center text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      closeMenu();
                    }}
                    className="flex items-center w-full text-gray-900 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors text-left"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Login
                  </button>
                )}

                {/* Primary CTA Button */}
                <div className="px-4 pt-2">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md"
                    onClick={closeMenu}
                  >
                    {/* <Link
                      href="/gyms"
                      className="flex items-center justify-center"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Find Gyms Near You
                    </Link> */}
                  </Button>
                </div>
              </div>

              {/* User Info (if logged in) */}
              {user.user && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Welcome back!
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.user.email || "Gym Member"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
