import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Award } from "lucide-react";

import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const getImageSrc = (image: string) => {
    switch (image) {
      case "t1":
        return typeof t1 === "string" ? t1 : t1.src;
      case "t2":
        return typeof t2 === "string" ? t2 : t2.src;
      default:
        return undefined;
    }
  };
  const imageSrc = getImageSrc(trainer.profileUrl);

  return (
    <Card key={trainer.id}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={trainer.profileUrl} alt={trainer.name} />
            <AvatarFallback>
              {trainer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{trainer.name}</CardTitle>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Users className="h-4 w-4 mr-1" />
              {!trainer.trained ? 0 : trainer.trained} clients trained
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-1" />
              {!trainer.experience ? 0 : trainer.experience} years experience
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm">{trainer.bio}</p>
        <div>
          <h4 className="font-semibold text-sm mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {trainer.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrainerCard;

interface Trainer {
  id: string;
  name: string;
  email: string;
  bio: string;
  specialties: string[];
  experience: number | null; // in years
  trained: number | null; // number of clients trained
  profileUrl: string; // assuming 't1' is a URL or imported asset path
}
