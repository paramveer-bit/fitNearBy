"use client";

import Image from "next/image";
import GalleryPage from "@/components/Gallery";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ImageType } from "@/types";

import { Loader2 } from "lucide-react";

function GymImages({ gymId }: { gymId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${gymId}/images`
        );
        setImages([...res.data.data, ...res.data.data]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

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
      <div className="grid grid-cols-4 gap-4">
        {/* Large Main Image */}
        {images[0] && (
          <div className="col-span-2 row-span-2 relative">
            <Image
              src={images[0].url}
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
              src={images[1].url}
              alt="Gym image 2"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {images[2] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={images[2].url}
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
              src={images[3].url}
              alt="Gym image 4"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {images[4] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={images[4].url}
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
      <dialog
        className="my-auto w-2/3 justify-center fixed mx-auto"
        ref={dialogRef}
      >
        <GalleryPage images={images} toggleDialog={toggleDialog} />
      </dialog>
    </div>
  );
}

export default GymImages;
