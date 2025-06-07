"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import one from "@/assets/one.webp";
import two from "@/assets/two.webp";
import three from "@/assets/three.webp";
import four from "@/assets/four.webp";
import five from "@/assets/five.webp";
import six from "@/assets/six.webp";

export default function GalleryPage() {
  // Sample images - replace with your actual image data
  const images = [
    {
      id: 1,
      src: one,
      alt: "Gallery Image 1",
      title: "Beautiful Landscape",
    },
    {
      id: 2,
      src: two,
      alt: "Gallery Image 2",
      title: "City Architecture",
    },
    {
      id: 3,
      src: three,
      alt: "Gallery Image 3",
      title: "Nature Photography",
    },
    {
      id: 4,
      src: four,
      alt: "Gallery Image 4",
      title: "Abstract Art",
    },
    {
      id: 5,
      src: five,
      alt: "Gallery Image 5",
      title: "Portrait Photography",
    },
    {
      id: 6,
      src: six,
      alt: "Gallery Image 6",
      title: "Street Photography",
    },
    {
      id: 7,
      src: one,
      alt: "Gallery Image 7",
      title: "Wildlife Photography",
    },
    {
      id: 8,
      src: two,
      alt: "Gallery Image 8",
      title: "Macro Photography",
    },
    {
      id: 9,
      src: two,
      alt: "Gallery Image 8",
      title: "Macro Photography",
    },
    {
      id: 10,
      src: two,
      alt: "Gallery Image 8",
      title: "Macro Photography",
    },
    {
      id: 11,
      src: two,
      alt: "Gallery Image 8",
      title: "Macro Photography",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handlePrevious = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  return (
    <div className="w-full p-2">
      {/* Main Content */}
      <div className="container p-1 w-full insert-0">
        {/* Main Image Display */}
        <div className="relative mb-2">
          <div className="relative aspect-[16/9] max-h-[70vh] mx-auto bg-muted rounded-lg overflow-hidden">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              fill
              className="object-cover "
              priority
            />

            {/* Navigation Arrows */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Thumbnail Scroller */}
        <div className="relative">
          <div className="overflow-x-auto px-2 py-2">
            <div className="flex gap-4 min-w-max">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                    selectedImage.id === image.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                  {selectedImage.id === image.id && (
                    <div className="absolute inset-0 bg-primary/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
