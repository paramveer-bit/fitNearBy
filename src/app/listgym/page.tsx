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

export default function ListYourGymPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/40 via-transparent to-indigo-600/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(99,102,241,0.4),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl animate-bounce delay-500"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/25 to-indigo-600/25 rounded-full px-6 py-3 mb-8 border border-blue-400/40 backdrop-blur-lg">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-blue-200">
                Premium Gym Listings
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              List Your Gym on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                FitNearBy
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100">
                Today!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of fitness enthusiasts in your area. Get
              discovered, grow your membership, and build your fitness
              community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-700 text-white px-10 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-110 border-2 border-white/20"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-xl font-semibold rounded-full transition-all duration-300 backdrop-blur-sm bg-transparent"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-cyan-400 mr-3" />
                  <span className="text-4xl font-bold text-white">1K+</span>
                </div>
                <p className="text-blue-200 font-medium">Active Members</p>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-emerald-400 mr-3" />
                  <span className="text-4xl font-bold text-white">50+</span>
                </div>
                <p className="text-blue-200 font-medium">Listed Gyms</p>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-yellow-400 mr-3" />
                  <span className="text-4xl font-bold text-white">4.9</span>
                </div>
                <p className="text-blue-200 font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-3 mb-6 border border-blue-200/50 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-semibold">
                  Choose Your Plan
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Plan
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start free or go premium for maximum visibility and professional
                presentation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-green-50/50 to-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-10 relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          Free Listing
                        </h3>
                        <p className="text-gray-600 text-lg">Non-Verified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-green-600">
                        Rs.0
                      </div>
                      <div className="text-lg text-gray-500">Forever</div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        Get listed on our platform
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        You provide details & images
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        Basic visibility
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        No charges at all
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Free
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-500 text-black px-6 py-2 text-sm font-bold rounded-bl-2xl">
                  POPULAR
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-10 relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl w-16 h-16 flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          Premium Listing
                        </h3>
                        <p className="text-blue-600 text-lg font-semibold">
                          Verified & Featured
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">
                        Contact
                      </div>
                      <div className="text-lg text-gray-500">For Pricing</div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        We visit your gym personally
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        Professional exploring videos
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        High-quality 4K photography
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        Verified badge for credibility
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                      <span className="text-lg text-gray-700">
                        Priority placement
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    Go Premium
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Elite Gym Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-6xl mx-auto">
              <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 mb-8 border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-semibold">
                  Elite Gym Listing
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white">
                List Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  Elite Gym
                </span>
                <br />
                <span className="text-blue-100">Get Discovered by</span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl">
                  Thousands of Quality Members Near You
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Quality Members
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    Connect with serious fitness enthusiasts looking for their
                    perfect gym
                  </p>
                </div>

                <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Grow Your Business
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    Increase membership and revenue with targeted local exposure
                  </p>
                </div>

                <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Build Trust
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    Verified listings build credibility and attract more members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-3 mb-8 border border-blue-200/50 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-semibold">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Get Started?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Contact us now to register your gym and start connecting with
                your community
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      Email Us
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      Get in touch via email
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      Fitnearby.as@gmail.com
                    </p>
                  </CardContent>
                </Card>

                <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-pink-50/50 to-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative">
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      Follow Us
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      Connect on Instagram
                    </p>
                    <p className="text-pink-600 font-bold text-lg">
                      @fitnearby_
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
              >
                Contact Us Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-4">
                FitNearBy
              </div>
              <div className="text-blue-200 text-sm tracking-[0.3em] font-light">
                CONNECTING FITNESS COMMUNITIES
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
