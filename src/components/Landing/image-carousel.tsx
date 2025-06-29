"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import v2 from "@/assets/v2.webp";
import fitxone from "@/assets/fitxone.webp";
import hype from "@/assets/hype.webp";
const cardData = [
  {
    id: 1,
    title: "V2 GYM Zone",
    description: "State-of-the-art fitness machines and equipment",
    image: v2,
    link: "https://www.instagram.com/reel/DGVxUeKvb6p/?igsh=ejQzOGRtMWtqOGpr",
  },
  {
    id: 2,
    title: "FITXONE GYM ",
    description: "Join energizing group fitness sessions",
    image: fitxone,
    link: "https://www.instagram.com/reel/DF-XKJbvFpJ/?igsh=MTJ3ZnQ3c3Z6NXZ0Mg==",
  },
  {
    id: 3,
    title: "HYPE GYM",
    description: "One-on-one sessions with certified trainers",
    image: hype,
    link: "https://www.instagram.com/reel/DGDuzAdPPmF/?igsh=ZWluY3p2Mmh6cjRj",
  },
];

export default function ImageCarousel() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FitNearBy ki duniya ko
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              explore karein!
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aapki fitness ke liye transparent policies aur easy bookings,
            hamesha!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cardData.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  {/* <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p> */}

                  {/* Click indicator */}
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to start your fitness journey?
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/gyms">Browse All Gyms</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
