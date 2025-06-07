import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Shield,
  Camera,
  Video,
  MapPin,
  Mail,
  Instagram,
} from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          {/* Header content removed - no logo */}
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            List Your Gym on {"'"}Fit Nearby{"'"}
            <br />
            Today!
          </h1>
        </section>

        {/* Pricing Section */}
        <section className="bg-red-600 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Choose Your Plan
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="bg-red-700 border-red-500 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Check className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-2xl font-bold">
                      Non-Verified Listing – FREE
                    </h3>
                  </div>

                  <div className="space-y-4">
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
                      <span className="text-lg">No charges at all</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-red-700 border-red-500 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Check className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-2xl font-bold">
                      Verified Listing – PREMIUM
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">We visit your gym</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">Gym Exploring videos</span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">4K photos</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-lg">
                        Verified badge for more trust
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Elite Gym Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
            List Your Elite Gym. Get Discovered by
            <br />
            Thousands of Quality Members Near You.
          </h2>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Contact Now to Register Your Gym
          </h2>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <Mail className="w-6 h-6 text-blue-400" />
              <span className="text-xl">Mail: Fitnearby.as@gmail.com</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Instagram className="w-6 h-6 text-pink-500" />
              <span className="text-xl">Instagram: @fitnearby_</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-400 text-sm tracking-widest">
              FIT NEAR BY FIT NEAR BY FIT NEAR BY FIT NEAR BY FIT NEAR BY
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
