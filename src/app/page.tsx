import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Star,
  Users,
  Dumbbell,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Trophy,
  Heart,
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Landing/Hero";
import home from "@/assets/home.jpeg"; // Adjust the path as necessary

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-3 mb-6 border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">
                Why Choose FitNearBy
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Your Fitness Journey
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Starts Here
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of gym booking with our intelligent platform
              that connects you to premium fitness facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-6 relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Smart Location Search
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  Our smart algorithm finds the perfect gym match based on your
                  location, preferences, and fitness goals in seconds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-yellow-50/50 to-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-6 relative">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Trusted Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  Real reviews from verified members help you make confident
                  decisions with our transparent rating system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white via-green-50/50 to-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-6 relative">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Instant Access
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  Book instantly and get immediate access to your chosen gym
                  with our seamless digital membership system.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 mb-8 border border-white/20 backdrop-blur-sm">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-semibold">
                  Premium Experience
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-tight">
                Everything You Need for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {" "}
                  Success
                </span>
              </h2>

              <div className="space-y-8">
                <div className="group flex items-start cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      State-of-the-Art Equipment
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Access cutting-edge fitness equipment and modern
                      facilities designed for every workout style and fitness
                      level.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start cursor-pointer">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                      Expert Personal Trainers
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Work with certified professionals who create personalized
                      workout plans to accelerate your fitness journey.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start cursor-pointer">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      Premium Safety Standards
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Train with confidence in clean, safe environments with
                      strict hygiene protocols and 24/7 security.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start cursor-pointer">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                      Flexible Membership Plans
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Choose from various plans that adapt to your lifestyle,
                      budget, and fitness goals with easy modifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={home}
                    alt="Premium gym interior with modern equipment"
                    width={700}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">10K+</p>
                      <p className="text-sm text-gray-600">Goals Achieved</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-3 mb-6 border border-blue-200/50 backdrop-blur-sm">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Minutes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes finding and booking your perfect gym
              incredibly simple
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Download App
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get our mobile app and create your account in under 2
                    minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Find Gyms
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Search for gyms near you and explore facilities, amenities,
                    and reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Book Instantly
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Choose your membership plan and book your gym access
                    instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Start Training
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Show up and start your fitness journey with full access to
                    facilities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/gyms" className="flex items-center">
                <Zap className="mr-3 h-6 w-6" />
                Get Started Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-28 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(236,72,153,0.2),transparent_70%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-ping"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full px-8 py-4 mb-8 border border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-blue-400 mr-3" />
            <span className="text-blue-300 font-semibold text-lg">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              Fitness Journey?
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Join thousands of fitness enthusiasts who&apos;ve found their
            perfect gym through FitNearBy. Start your transformation today with
            exclusive member benefits!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              asChild
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-8 text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
            >
              <Link href="/gyms" className="flex items-center">
                <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Find Your Perfect Gym
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
