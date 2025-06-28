import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { Trainer } from "@/types"; // Assuming Trainer type is defined in types.ts
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TrainerFormData {
  name: string;
  email: string;
  bio: string;
  profileUrl: string;
  specialties: string[];
  experience: number;
  trained: number;
}
import { Loader } from "lucide-react";

function TrainerPage({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TrainerFormData>({
    name: "",
    email: "",
    bio: "",
    profileUrl: "",
    specialties: [],
    experience: 0,
    trained: 0,
  });
  const [newSpecialties, setNewFeature] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = <K extends keyof TrainerFormData>(
    field: K,
    value: TrainerFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSpecialty = () => {
    if (
      newSpecialties.trim() &&
      !formData.specialties.includes(newSpecialties.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialties.trim()],
      }));
      setNewFeature("");
    }
  };
  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((f) => f !== specialty),
    }));
  };
  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: "",
      email: "",
      bio: "",
      profileUrl: "",
      specialties: [],
      experience: 0,
      trained: 0,
    });
    setSelectedFile(null);
    setNewFeature("");
    setOpen(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (!selectedFile) {
        toast.error("Select Image First");
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/trainers/upload`,
        { image: selectedFile },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleInputChange("profileUrl", res.data.data.url);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
      setSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/trainers/add/${id}`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      handleCancel();
    } catch (error) {
      console.error(error);
      toast.error("Error in adding a trainer");
    } finally {
      setSubmitting(false);
    }
  };

  const handelDelete = async (trainerId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/trainers/delete/${trainerId}`,
        { withCredentials: true }
      );
      setTrainers((prev) => prev.filter((t) => t.id !== trainerId));
      toast.success("Trainer deleted successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/trainers/${id}`
        );
        console.log(res.data.data);
        setTrainers(res.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Show exactly the backend's message
          toast.error(error.response.data.message);
        } else {
          // Fallback for network/CORS/unexpected errors
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainers();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Trainers</CardTitle>
          <CardDescription>Add information about gym trainers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {trainers.length > 0 &&
              trainers.map((trainer) => (
                <div className="w-full relative group" key={trainer.id}>
                  <TrainerCard key={trainer.id} trainer={trainer} />
                  <Button
                    onClick={() => handelDelete(trainer.id)}
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Delete image</span>
                  </Button>
                </div>
              ))}
          </div>

          {/* New trainer addition button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Trainer
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Plan</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new gym plan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Trainer Name  */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-50"
                  placeholder="Trainer Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-50"
                  placeholder="Trainer Email"
                />
              </div>
            </div>

            {/* Experiance and image */}
            <div className="grid grid-cols-2 gap-4">
              {/* Profile Image */}
              <div className="grid gap-2">
                <Label htmlFor="Image">Image</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>
              {/* Experience */}
              <div className="grid gap-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  type="number"
                  step="1"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Clients trained */}
            <div className="space-y-2">
              <Label htmlFor="trained">Client Trained</Label>
              <Input
                id="trained"
                value={formData.trained}
                onChange={(e) =>
                  handleInputChange("trained", Number(e.target.value))
                }
                className="bg-gray-50"
                placeholder="Client Trained"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-gray-50 min-h-[100px] resize-none"
                placeholder="Enter something about Trainer"
              />
            </div>

            {/* Features */}
            <div className="grid gap-2">
              <Label>Specialties</Label>
              <div className="flex gap-2">
                <Input
                  value={newSpecialties}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add Specialties"
                  onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                />
                <Button type="button" size="sm" onClick={addSpecialty}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {specialty}
                    <button onClick={() => removeSpecialty(specialty)}>
                      <X className="h-3 w-3 cursor-pointer" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const TrainerCard = ({ trainer }: { trainer: Trainer }) => {
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
};

export default TrainerPage;
