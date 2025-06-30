import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/40 via-transparent to-indigo-600/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(99,102,241,0.4),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl animate-bounce delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          <div className="text-left space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600/25 to-indigo-600/25 rounded-full px-8 py-4 border border-blue-400/40 backdrop-blur-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-4 animate-pulse"></div>
                <Star className="w-5 h-5 text-yellow-400 mr-3" />
                <span className="text-blue-200 font-bold text-lg">
                  Most Trusted Gym Platform
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-pulse">
                  Dream
                </span>
                <span className="block">Gym</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-2xl font-light">
              Connect with premium fitness centers, explore world-class
              facilities, and begin your transformation journey today.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                size="lg"
                asChild
                className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-10 text-2xl rounded-full shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-110 border-2 border-white/20"
              >
                <Link href="/" className="flex items-center">
                  <Zap className="mr-4 h-8 w-8 group-hover:animate-pulse" />
                  Explore Gyms Now
                  <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex flex-col space-y-6 pt-8">
              <div className="flex items-center">
                <div className="flex -space-x-4 mr-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-white shadow-xl"></div>
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full border-4 border-white shadow-xl"></div>
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full border-4 border-white shadow-xl"></div>
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">50K+</span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">
                    50,000+ Fitness Enthusiasts
                  </div>
                  <div className="text-blue-200 text-lg">
                    Already transformed their lives
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-blue-200 text-lg">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="font-bold text-white text-xl">4.9/5</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-cyan-400 mr-2" />
                  <span>500+ Premium Gyms</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400 mr-2" />
                  <span>100+ Cities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Interactive Dashboard */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-2xl">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white">
                      Gym Finder
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="bg-emerald-500 w-4 h-4 rounded-full animate-pulse"></div>
                      <span className="text-emerald-300 font-semibold">
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Location Display */}
                  <div className="bg-white/25 rounded-2xl p-5 border border-white/40 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                      <div className="flex-1">
                        <div className="text-white text-lg font-medium">
                          Faridabad
                        </div>
                        <div className="text-blue-200 text-sm">
                          15 gyms found nearby
                        </div>
                      </div>
                      <div className="bg-cyan-500 rounded-full p-2">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/25 to-blue-600/25 rounded-2xl p-5 border border-cyan-400/40">
                      <div className="text-4xl font-bold text-cyan-300 mb-2">
                        500+
                      </div>
                      <div className="text-cyan-100 font-medium">
                        Premium Gyms
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/25 to-green-600/25 rounded-2xl p-5 border border-emerald-400/40">
                      <div className="text-4xl font-bold text-emerald-300 mb-2">
                        100+
                      </div>
                      <div className="text-emerald-100 font-medium">Cities</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500/25 to-purple-600/25 rounded-2xl p-5 border border-indigo-400/40">
                      <div className="text-4xl font-bold text-indigo-300 mb-2">
                        {"<1min"}
                      </div>
                      <div className="text-indigo-100 font-medium">
                        Booking Time
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/25 to-orange-600/25 rounded-2xl p-5 border border-yellow-400/40">
                      <div className="text-4xl font-bold text-yellow-300 mb-2">
                        4.9★
                      </div>
                      <div className="text-yellow-100 font-medium">
                        Satisfaction
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href="/" className="flex items-center">
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                      <Clock className="mr-3 h-6 w-6" />
                      Start Exploring
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Enhanced Floating Success Card */}
              <div className="absolute -top-8 -right-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-6 shadow-2xl border border-emerald-400/60 animate-bounce">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/25 rounded-full p-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">
                      New Member!
                    </div>
                    <div className="text-emerald-100">
                      Alex joined PowerFit Gym
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Background Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-600/40 to-indigo-600/40 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
