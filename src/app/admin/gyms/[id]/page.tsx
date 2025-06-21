"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Clock,
  Users,
  Dumbbell,
  CreditCard,
  ImageIcon,
} from "lucide-react";
import Basic from "./basic";
import Images from "./images";
import Facilities from "./facilities";
import Plans from "./plan";
import Traine from "./trainer";
import Hours from "./hours";
import { useParams } from "next/navigation";

export default function GymDashboard() {
  const params = useParams<{ id: string }>();
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Gym</h1>
        <p className="text-muted-foreground">
          Create a comprehensive gym profile with all details
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Plans
          </TabsTrigger>
          <TabsTrigger value="trainers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Trainers
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hours
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Basic id={params.id} />
        </TabsContent>

        <TabsContent value="images">
          <Images id={params.id} />
        </TabsContent>

        <TabsContent value="facilities">
          <Facilities id={params.id} />
        </TabsContent>

        <TabsContent value="plans">
          <Plans id={params.id} />
        </TabsContent>

        <TabsContent value="trainers">
          <Traine id={params.id} />
        </TabsContent>

        <TabsContent value="hours">
          <Hours id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
