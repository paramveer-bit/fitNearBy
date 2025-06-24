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
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface Facility {
  id: string;
  name: string;
  description: string;
}

function Facilities({ id }: { id: string }) {
  const [facilities, setFacility] = useState<Facility[]>([]);
  const [newFacility, setNewFacility] = useState<Facility>({
    id: "",
    name: "",
    description: "",
  });
  const [adding, setAdding] = useState(false);

  const addNewFacility = async () => {
    if (!newFacility.name || !newFacility.description) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/facilities/${id}`,
        newFacility
      );
      console.log(res.data.data);
      toast.success("New facility added successfully");
      setFacility((prev) => [...prev, res.data.data]);
      setNewFacility({ id: "", name: "", description: "" });
    } catch (error) {
      console.error("Error adding new facility:", error);
      toast.error("Failed to add new facility");
    } finally {
      setAdding(false);
    }
  };

  const removeFacility = async (facilityId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/facilities/${facilityId}`
      );
      setFacility((prev) =>
        prev.filter((facility) => facility.id !== facilityId)
      );
    } catch (error) {
      console.error("Error removing facility:", error);
      toast.error("Failed to remove facility");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/facilities/${id}`
        );
        console.log(res.data.data);
        setFacility(res.data.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        toast.error("Failed to fetch facilities");
      }
    };
    fetch();
  }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facilities</CardTitle>
        <CardDescription>
          List all available facilities and equipment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            <div className="border my-auto py-1 px-1 border-black rounded-md">
              {facility.name}
            </div>
            <div className="flex gap-2 justify-between">
              <div className="border my-auto py-1 px-2 border-black rounded-md w-full">
                {facility.description}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border my-auto p-1 border-black rounded-md"
                onClick={() => removeFacility(facility.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* // new facilities empty boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input
            value={newFacility.name}
            onChange={(e) =>
              setNewFacility({ ...newFacility, name: e.target.value })
            }
            placeholder="Facility name"
          />
          <div className="flex gap-2">
            <Input
              value={newFacility.description}
              onChange={(e) =>
                setNewFacility({ ...newFacility, description: e.target.value })
              }
              placeholder="Description"
              className="flex-1"
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={addNewFacility}
          disabled={adding}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Facility
        </Button>
      </CardContent>
    </Card>
  );
}

export default Facilities;
