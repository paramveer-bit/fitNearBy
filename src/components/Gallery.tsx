"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import one from "@/assets/one.webp";
import two from "@/assets/two.webp";
import three from "@/assets/three.webp";
import four from "@/assets/four.webp";
import five from "@/assets/five.webp";
import six from "@/assets/six.webp";
import { ImageType } from "@/types";

export default function GalleryPage({
  images,
  toggleDialog,
}: {
  images: ImageType[];
  toggleDialog: () => void;
}) {
  // Sample images - replace with your actual image data

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
              src={selectedImage.url || "/placeholder.svg"}
              alt={"GYM Image"}
              fill
              className="object-cover "
              priority
            />

            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-background/80 hover:bg-background/90 z-10"
              onClick={toggleDialog}
            >
              <X className="h-4 w-4" />
            </Button>

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
                    src={image.url}
                    alt={"Thumbnail"}
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
