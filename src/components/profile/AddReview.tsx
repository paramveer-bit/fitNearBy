"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Star } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Booking, Reviews } from "@/types";

interface data {
  booking: Booking[];
  reviews: Reviews[];
  handleAddReview: (
    gymId: string,
    rating: number,
    comment: string
  ) => Promise<boolean>;
}

function AddReview({ booking, reviews, handleAddReview }: data) {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    gymId: "",
    rating: 5,
    comment: "",
  });

  const reviewedGymIds = new Set(reviews.map((r) => String(r.gym?.id)));
  const availableGyms = booking
    .filter((b) => b.status === "CONFIRMED") // Only include confirmed bookings
    .map((b) => b.gym)
    .filter((gym) => gym && !reviewedGymIds.has(String(gym.id)));

  const handel = async () => {
    if (!newReview.gymId || !newReview.comment.trim()) {
      return;
    }
    const res = await handleAddReview(
      newReview.gymId,
      newReview.rating,
      newReview.comment
    );
    if (res) {
      setNewReview({ gymId: "", rating: 5, comment: "" });
      setIsAddingReview(false);
    }
  };

  return (
    <Dialog open={isAddingReview} onOpenChange={setIsAddingReview}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Review
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm sm:max-w-[500px] px-4">
        <DialogHeader>
          <DialogTitle>Add New Review</DialogTitle>
          <DialogDescription>
            Share your experience with a gym you&apos;ve visited
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Gym Select */}
          <div className="space-y-2">
            <Label htmlFor="gym">Select Gym</Label>
            <Select
              value={newReview.gymId}
              onValueChange={(value) =>
                setNewReview((prev) => ({ ...prev, gymId: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a gym" />
              </SelectTrigger>
              <SelectContent>
                {availableGyms.map((gym) => (
                  <SelectItem key={gym.id} value={gym.id}>
                    <div>
                      <div className="font-medium">{gym.name}</div>
                      <div className="text-sm text-gray-500">
                        {gym.location}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex flex-wrap items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setNewReview((prev) => ({ ...prev, rating: star }))
                  }
                  className="focus:outline-none"
                >
                  <Star
                    // smaller on very small screens, normal on sm+
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      star <= newReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {newReview.rating} star{newReview.rating !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              rows={4}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddingReview(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handel}
              disabled={!newReview.gymId || !newReview.comment.trim()}
              className="w-full sm:w-auto"
            >
              Add Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddReview;
