"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Shield,
  Camera,
  Video,
  MapPin,
  Mail,
  Instagram,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/20 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse delay-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-300">
                Premium Gym Listings
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              List Your Gym on{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                Fit Nearby
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300">
                Today!
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of fitness enthusiasts in your area. Get
              discovered, grow your membership, and build your fitness
              community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl font-bold text-white">10K+</span>
                </div>
                <p className="text-gray-400">Active Members</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl font-bold text-white">500+</span>
                </div>
                <p className="text-gray-400">Listed Gyms</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl font-bold text-white">4.9</span>
                </div>
                <p className="text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  Plan
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Start free or go premium for maximum visibility and professional
                presentation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Free Listing</h3>
                        <p className="text-gray-400">Non-Verified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">
                        $0
                      </div>
                      <div className="text-sm text-gray-400">Forever</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        Get listed on our platform
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        You provide details & images
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">Basic visibility</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">No charges at all</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300">
                    Start Free
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-500/50 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-500/20">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-500 text-black px-4 py-1 text-sm font-bold">
                  POPULAR
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center mr-4">
                        <Shield className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Premium Listing</h3>
                        <p className="text-red-200">Verified & Featured</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-400">
                        Contact
                      </div>
                      <div className="text-sm text-red-200">For Pricing</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        We visit your gym personally
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        Professional exploring videos
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        High-quality 4K photography
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        Verified badge for credibility
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">Priority placement</span>
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25">
                    Go Premium
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Elite Gym Section */}
        <section className="container mx-auto px-4 py-20 text-center relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              List Your{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                Elite Gym
              </span>
              <br />
              <span className="text-gray-300">Get Discovered by</span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">
                Thousands of Quality Members Near You
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <Users className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Quality Members</h3>
                <p className="text-gray-400">
                  Connect with serious fitness enthusiasts looking for their
                  perfect gym
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <TrendingUp className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Grow Your Business</h3>
                <p className="text-gray-400">
                  Increase membership and revenue with targeted local exposure
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Build Trust</h3>
                <p className="text-gray-400">
                  Verified listings build credibility and attract more members
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Contact us now to register your gym and start connecting with
                your community
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-red-500/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-400 mb-4">Get in touch via email</p>
                    <p className="text-blue-400 font-semibold">
                      Fitnearby.as@gmail.com
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-pink-500/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center group-hover:bg-pink-500/30 transition-colors duration-300">
                        <Instagram className="w-6 h-6 text-pink-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                    <p className="text-gray-400 mb-4">Connect on Instagram</p>
                    <p className="text-pink-400 font-semibold">@fitnearby_</p>
                  </CardContent>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-red-500/25"
              >
                Contact Us Now
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent mb-4">
                FIT NEARBY
              </div>
              <div className="text-gray-500 text-sm tracking-[0.3em] font-light">
                CONNECTING FITNESS COMMUNITIES
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
