"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  console.log("AdminAuthWrapper: user", user);
  useEffect(() => {
    // if (user == null) return;
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/"); // Redirect to home or login
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return null; // Or show a spinner
  }

  return <>{children}</>;
}
