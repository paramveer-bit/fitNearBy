"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Award } from "lucide-react";

import { Trainer } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
function TrainerCard({ gymId }: { gymId: string }) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/trainers/${gymId}`
        );
        setTrainers(res.data.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [gymId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!loading && trainers.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No trainers available for this gym.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trainers.map((trainer) => (
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
                  {!trainer.experience ? 0 : trainer.experience} years
                  experience
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
      ))}
    </div>
  );
}

export default TrainerCard;
