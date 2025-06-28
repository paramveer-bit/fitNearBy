import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Trash2 } from "lucide-react";
import { Reviews } from "@/types";
import { Button } from "../ui/button";
function Review({
  id,
  review,
  type,
  handelDelete,
}: {
  id: string;
  review: Reviews;
  type: string;
  handelDelete?: (id: string) => void;
}) {
  return (
    <Card key={review.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              {review.gym?.logoUrl ? (
                <AvatarImage src={review.gym.logoUrl || "/placeholder.svg"} />
              ) : (
                ""
              )}
              <AvatarFallback>
                {type === "gym"
                  ? review.gym?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : review.user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {type === "gym" ? review.gym?.name : review.user?.name}
              </h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {type === "gym" && handelDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handelDelete(id)}
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-4">
          <p className="text-gray-600">{review.comment}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Review;
