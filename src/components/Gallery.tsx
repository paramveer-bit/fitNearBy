"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImageType } from "@/types";

export default function GalleryPage({
  images,
  toggleDialog,
}: {
  images: ImageType[];
  toggleDialog: () => void;
}) {
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Escape") {
        toggleDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-4 lg:p-6">
      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Main Image Display */}
        <div className="relative flex-1 mb-3 sm:mb-4 lg:mb-6">
          <div className="relative w-full h-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] max-h-[80vh] bg-muted rounded-lg overflow-hidden">
            <Image
              src={selectedImage.url || "/placeholder.svg"}
              alt="GYM Image"
              fill
              className="object-contain sm:object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />

            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/80 hover:bg-background/90 z-10 h-8 w-8 sm:h-10 sm:w-10"
              onClick={toggleDialog}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 text-foreground px-2 py-1 rounded-md text-xs sm:text-sm">
              {images.findIndex((img) => img.id === selectedImage.id) + 1} /{" "}
              {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Scroller */}
        {images.length > 1 && (
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 sm:gap-3 lg:gap-4 pb-2 px-1">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      selectedImage.id === image.id
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                    />
                    {selectedImage.id === image.id && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll indicators for mobile */}
            <div className="flex justify-center mt-2 sm:hidden">
              <div className="flex gap-1">
                {Array.from({ length: Math.ceil(images.length / 4) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile swipe hint */}
      <div className="text-center text-xs text-muted-foreground mt-2 sm:hidden">
        Swipe left or right to navigate • Tap thumbnails to jump
      </div>
    </div>
  );
}
