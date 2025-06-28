"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Check, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
interface DayHours {
  id: string;
  openTime: string;
  closeTime: string;
}

interface OperatingHours {
  [key: string]: DayHours;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const convertToOperatingHours = (
  data: { id: string; day: string; openAt: string; closeAt: string }[]
): OperatingHours => {
  const result: Partial<OperatingHours> = {};

  DAYS.forEach((day) => {
    const entry = data.find((d) => d.day === day);
    result[day] = {
      id: entry?.id || "",
      openTime: entry?.openAt || "06:00",
      closeTime: entry?.closeAt || "22:00",
    };
  });

  return result as OperatingHours;
};

export default function Component({ id }: { id: string }) {
  const [originalHours, setOriginalHours] = useState<OperatingHours>({
    Monday: { id: "day_1", openTime: "10:25", closeTime: "22:00" },
    Tuesday: { id: "day_2", openTime: "06:00", closeTime: "22:00" },
    Wednesday: { id: "day_3", openTime: "06:00", closeTime: "22:00" },
    Thursday: { id: "day_4", openTime: "06:00", closeTime: "22:00" },
    Friday: { id: "day_5", openTime: "06:00", closeTime: "22:00" },
    Saturday: { id: "day_6", openTime: "06:00", closeTime: "22:00" },
    Sunday: { id: "day_7", openTime: "06:00", closeTime: "22:00" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentHours, setCurrentHours] =
    useState<OperatingHours>(originalHours);
  const [updatedDays, setUpdatedDays] = useState<Set<string>>(new Set());
  const [loadingDays, setLoadingDays] = useState<Set<string>>(new Set());
  const [errorDays, setErrorDays] = useState<Set<string>>(new Set());

  const hasChanges = (day: string): boolean => {
    return (
      originalHours[day].openTime !== currentHours[day].openTime ||
      originalHours[day].closeTime !== currentHours[day].closeTime
    );
  };

  const handleTimeChange = (
    day: string,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    setCurrentHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));

    setErrorDays((prev) => {
      const newSet = new Set(prev);
      newSet.delete(day);
      return newSet;
    });
  };

  const handleUpdate = async (day: string) => {
    const dayData = currentHours[day];

    setLoadingDays((prev) => new Set([...prev, day]));
    setErrorDays((prev) => {
      const newSet = new Set(prev);
      newSet.delete(day);
      return newSet;
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/gym-time/modify/${dayData.id}`,
        {
          day,
          openAt: dayData.openTime,
          closeAt: dayData.closeTime,
        },
        { withCredentials: true }
      );

      setOriginalHours((prev) => ({
        ...prev,
        [day]: currentHours[day],
      }));

      setUpdatedDays((prev) => new Set([...prev, day]));

      setTimeout(() => {
        setUpdatedDays((prev) => {
          const newSet = new Set(prev);
          newSet.delete(day);
          return newSet;
        });
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Show exactly the backend's message
        toast.error(error.response.data.message);
      } else {
        // Fallback for network/CORS/unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoadingDays((prev) => {
        const newSet = new Set(prev);
        newSet.delete(day);
        return newSet;
      });
    }
  };

  const handleReset = (day: string) => {
    setCurrentHours((prev) => ({
      ...prev,
      [day]: originalHours[day],
    }));

    setErrorDays((prev) => {
      const newSet = new Set(prev);
      newSet.delete(day);
      return newSet;
    });
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/gym-time/${id}`
        );

        const temp = convertToOperatingHours(res.data.data);
        setOriginalHours(temp);
        setCurrentHours(temp);
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
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Operating Hours
        </CardTitle>
        <p className="text-muted-foreground">
          {"Set the gym's operating hours for each day"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex items-center gap-4 p-4 rounded-lg border bg-card"
          >
            <div className="w-24 font-medium text-sm">{day}</div>

            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Open Time</label>
                <div className="relative">
                  <Input
                    type="time"
                    value={currentHours[day].openTime}
                    onChange={(e) =>
                      handleTimeChange(day, "openTime", e.target.value)
                    }
                    className="pr-10"
                    disabled={loadingDays.has(day)}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Close Time</label>
                <div className="relative">
                  <Input
                    type="time"
                    value={currentHours[day].closeTime}
                    onChange={(e) =>
                      handleTimeChange(day, "closeTime", e.target.value)
                    }
                    className="pr-10"
                    disabled={loadingDays.has(day)}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 min-w-[140px] justify-end">
              {loadingDays.has(day) ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Updating...</span>
                </div>
              ) : updatedDays.has(day) ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Updated!</span>
                </div>
              ) : errorDays.has(day) ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Failed</span>
                  </div>
                  <Button size="sm" onClick={() => handleUpdate(day)}>
                    Retry
                  </Button>
                </div>
              ) : hasChanges(day) ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReset(day)}
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => handleUpdate(day)}>
                    Update
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
