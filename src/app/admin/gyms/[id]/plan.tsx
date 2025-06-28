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

import { Plus, Check } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type PlanType = "TRIAL" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "HALF_YEARLY";

interface PlanFormData {
  name: string;
  oldprice: number;
  newprice: number;
  type: PlanType | "";
  featured: string[];
  gymId: string;
}
import { Plan } from "@/types";

import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PlanType: PlanType[] = ["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"];
function Plans({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    oldprice: 0,
    newprice: 0,
    type: "",
    featured: [],
    gymId: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = <K extends keyof PlanFormData>(
    field: K,
    value: PlanFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const addFeature = () => {
    if (newFeature.trim() && !formData.featured.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        featured: [...prev.featured, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };
  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      featured: prev.featured.filter((f) => f !== feature),
    }));
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: "",
      oldprice: 0,
      newprice: 0,
      type: "",
      featured: [],
      gymId: "",
    });
    setNewFeature("");
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/plans/${id}`,
        formData,
        { withCredentials: true }
      );
      setPlans((prev) => [...prev, res.data.data]);
      handleCancel();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handelToggle = async (planId: string, isActive: boolean) => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/plans/toggle/${planId}`,
        { withCredentials: true }
      );
      toast.success(`Plan turned ${!isActive ? "on" : "off"}`);
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === planId ? { ...plan, isActive: !isActive } : plan
        )
      );
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
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/plans/${id}`,
          { withCredentials: true }
        );
        setPlans(res.data.data);
      } catch (error) {
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
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Membership Plans</CardTitle>
          <CardDescription>
            Create different pricing plans for your gym
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid-cols-2 grid gap-6">
            {plans.map((plan) => (
              <div
                className="border-2 p-6 border-border rounded-xl hover:border-primary/50 transition-all hover:shadow-lg bg-card"
                key={plan.id}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <h1 className="font-bold text-2xl mb-1">{plan.name}</h1>
                    <Switch
                      checked={plan.isActive}
                      onCheckedChange={() =>
                        handelToggle(plan.id, plan.isActive)
                      }
                    />
                  </div>
                  <div className="text-right">
                    <h1 className="font-extrabold text-3xl">
                      Rs. {plan.newprice}
                    </h1>
                    <h2 className="text-sm text-muted-foreground line-through">
                      Rs. {plan.oldprice}
                    </h2>
                    {/* <span className="text-xs text-muted-foreground">/year</span> */}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {plan.featured.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </div>
                </ul>

                <Button className="w-full" variant="outline">
                  Choose Basic
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </CardContent>
      </Card>

      {/* Dialog box for creating new plan  */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Plan</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new gym plan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Plan Name  */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter plan name"
              />
            </div>

            {/* prices */}
            <div className="grid grid-cols-2 gap-4">
              {/* Old price */}
              <div className="grid gap-2">
                <Label htmlFor="oldprice">Old Price</Label>
                <Input
                  id="oldprice"
                  type="number"
                  step="0.01"
                  value={formData.oldprice}
                  onChange={(e) =>
                    handleInputChange(
                      "oldprice",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />
              </div>
              {/* New Price */}
              <div className="grid gap-2">
                <Label htmlFor="newprice">New Price</Label>
                <Input
                  id="newprice"
                  type="number"
                  step="0.01"
                  value={formData.newprice}
                  onChange={(e) =>
                    handleInputChange(
                      "newprice",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Plan Type */}
            <div className="grid gap-2">
              <Label htmlFor="type">Plan Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  handleInputChange("type", value as PlanType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  {PlanType.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Features */}
            <div className="grid gap-2">
              <Label>Featured</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                />
                <Button type="button" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.featured.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {feature}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Plans;
