import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="relative bg-gradient-to-r bg-black text-white">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Gym
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover top-rated gyms in your area and book your fitness journey
            today
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              <Link href="/gyms">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
