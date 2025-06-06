"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  // Sample images - replace with your actual image data
  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 1",
      title: "Beautiful Landscape",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 2",
      title: "City Architecture",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 3",
      title: "Nature Photography",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 4",
      title: "Abstract Art",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 5",
      title: "Portrait Photography",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 6",
      title: "Street Photography",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 7",
      title: "Wildlife Photography",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Gallery Image 8",
      title: "Macro Photography",
    },
  ]

  const [selectedImage, setSelectedImage] = useState(images[0])

  const handlePrevious = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setSelectedImage(images[previousIndex])
  }

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(images[nextIndex])
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <div className="container mx-auto px-2 pt-4 w-1/2  ">
        {/* Main Image Display */}
        <div className="relative mb-8">
          <div className="relative aspect-[4/3] max-h-[70vh] mx-auto bg-muted rounded-lg overflow-hidden">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              fill
              className="object-cover"
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
          <div className="overflow-x-auto pb-4">
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
                  {selectedImage.id === image.id && <div className="absolute inset-0 bg-primary/20" />}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
