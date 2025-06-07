import React, { useRef } from "react";

import Image from "next/image";
import one from "@/assets/one.webp";
import two from "@/assets/two.webp";
import three from "@/assets/three.webp";
import four from "@/assets/four.webp";
import five from "@/assets/five.webp";
import six from "@/assets/six.webp";
import GalleryPage from "@/components/Gallery";

const mockGym = {
  id: "1",
  name: "Fitness Hub",
  images: [one, two, three, four, five, six],
};

function GymImages() {
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
  return (
    <div className="mb-8 relative">
      <div className="grid grid-cols-4 gap-4">
        {/* Large Main Image */}
        {mockGym.images[0] && (
          <div className="col-span-2 row-span-2 relative">
            <Image
              src={mockGym.images[0]}
              alt="Main gym image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Top Right Images */}
        {mockGym.images[1] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={mockGym.images[1]}
              alt="Gym image 2"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {mockGym.images[2] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={mockGym.images[2]}
              alt="Gym image 3"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Bottom Right Images */}
        {mockGym.images[3] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={mockGym.images[3]}
              alt="Gym image 4"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {mockGym.images[4] && (
          <div className="col-span-1 relative aspect-square">
            <Image
              src={mockGym.images[4]}
              alt="Gym image 5"
              fill
              className="object-cover rounded-lg"
            />
            {mockGym.images.length > 5 && (
              <div className="absolute right-2 bottom-2 bg-black/60 rounded-lg flex items-center justify-center">
                <button
                  className="text-white font-semibold px-4 py-2 bg-black/70 rounded-lg"
                  onClick={toggleDialog}
                >
                  +{mockGym.images.length - 5} more
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
        <GalleryPage />
      </dialog>
    </div>
  );
}

export default GymImages;
