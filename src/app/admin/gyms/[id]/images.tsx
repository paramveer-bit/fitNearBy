import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

interface ImageData {
  id: string;
  url: string;
}

function Images({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    console.log("Uploading file:", selectedFile);
    console.log("Gym ID:", id);
    if (selectedFile) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${id}/addimage`,
          { image: selectedFile },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", res.data);
        setSelectedFile(null);
        setPreviewUrl("");
        setIsDialogOpen(false);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      // Reset dialog state
    }
  };

  const handleCancel = () => {
    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym/${id}/images`
        );

        setImages(res.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to load images.");
      }
    };
    fetch();
  }, [id, selectedFile]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gym Images</CardTitle>
          <CardDescription>Add photos to showcase your gym</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <div className="h-52 w-full" key={image.id}>
                <img src={image.url} alt={"Gym Image"} />
              </div>
            ))}
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Gym Image</DialogTitle>
            <DialogDescription>
              Select an image file to add to your gym gallery.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>

            {previewUrl && (
              <div className="relative h-48 w-full border rounded-md overflow-hidden">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Images;
