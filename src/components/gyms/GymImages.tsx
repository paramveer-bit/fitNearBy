"use client";

import type React from "react";

import Image from "next/image";
import GalleryPage from "@/components/Gallery";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ImageType } from "@/types";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function GymImages({ gymId }: { gymId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleDialog = () => {
    if (dialogRef.current) {
      if (dialogRef.current.open) {
        dialogRef.current.close();
      } else {
        dialogRef.current.showModal();
      }
    }
  };

  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${gymId}/images`
        );
        setImages(res.data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [gymId]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide < images.length - 1 ? currentSlide + 1 : 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-500" size={24} />
      </div>
    );
  }

  if (!loading && images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="mb-8 relative">
      {/* Desktop Grid Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-4">
          {/* Large Main Image */}
          {images[0] && (
            <div className="col-span-2 row-span-2 relative">
              <Image
                src={images[0].url || "/placeholder.svg"}
                alt="Main gym image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Top Right Images */}
          {images[1] && (
            <div className="col-span-1 relative aspect-square">
              <Image
                src={images[1].url || "/placeholder.svg"}
                alt="Gym image 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {images[2] && (
            <div className="col-span-1 relative aspect-square">
              <Image
                src={images[2].url || "/placeholder.svg"}
                alt="Gym image 3"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Bottom Right Images */}
          {images[3] && (
            <div className="col-span-1 relative aspect-square">
              <Image
                src={images[3].url || "/placeholder.svg"}
                alt="Gym image 4"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {images[4] && (
            <div className="col-span-1 relative aspect-square">
              <Image
                src={images[4].url || "/placeholder.svg"}
                alt="Gym image 5"
                fill
                className="object-cover rounded-lg"
              />
              {images.length > 5 && (
                <div className="absolute right-2 bottom-2 bg-black/60 rounded-lg flex items-center justify-center">
                  <button
                    className="text-white font-semibold px-4 py-2 bg-black/70 rounded-lg"
                    onClick={toggleDialog}
                  >
                    +{images.length - 5} more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slider Layout */}
      <div className="md:hidden">
        <div className="relative">
          {/* Main Slider Container */}
          <div
            ref={sliderRef}
            className="relative w-full h-64 sm:h-80 overflow-hidden rounded-lg"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`Gym image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-8 w-8"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-8 w-8"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
              {currentSlide + 1} / {images.length}
            </div>

            {/* View All Button */}
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2">
                <button
                  className="text-white font-semibold px-3 py-1.5 bg-black/70 rounded-lg text-sm"
                  onClick={toggleDialog}
                >
                  View All
                </button>
              </div>
            )}
          </div>

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Dialog */}
      <dialog
        className="my-auto w-full max-w-6xl justify-center fixed mx-auto backdrop:bg-black/50"
        ref={dialogRef}
      >
        <GalleryPage images={images} toggleDialog={toggleDialog} />
      </dialog>
    </div>
  );
}

export default GymImages;
