"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { generateGymCard } from "./gym-card-generator";
import { Booking } from "@/types";

interface GymCardDownloaderProps {
  booking: Booking;
  buttonText?: string;
  className?: string;
}

export default function GymCardDownloader({
  booking,
  buttonText = "Download Gym Membership Card",
  className = "",
}: GymCardDownloaderProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadGymCard = async () => {
    setIsGenerating(true);

    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      // Create a temporary container off-screen
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.width = "400px";
      tempContainer.style.backgroundColor = "white";
      document.body.appendChild(tempContainer);

      // Render the gym card component into the temporary container
      const root = createRoot(tempContainer);
      const cardElement = generateGymCard(booking);

      // Render and wait for it to be ready
      root.render(cardElement);

      // Wait a bit for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create canvas from the rendered card
      const canvas = await html2canvas(
        tempContainer.firstChild as HTMLElement,
        {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: 400,
          height: tempContainer.firstChild
            ? (tempContainer.firstChild as HTMLElement).offsetHeight
            : 600,
        }
      );

      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the card nicely on A4
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2; // Center horizontally on A4
      const y = 20; // 20mm from top

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // Save the PDF
      const memberName = booking.name || "Member";
      const gymName = booking.gym.name.replace(/\s+/g, "_");
      const fileName = `${memberName.replace(
        /\s+/g,
        "_"
      )}_${gymName}_Membership_Card.pdf`;
      pdf.save(fileName);

      // Clean up
      root.unmount();
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={downloadGymCard}
      disabled={isGenerating}
      className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold ${className}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating Card...
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          {buttonText}
        </>
      )}
    </Button>
  );
}
