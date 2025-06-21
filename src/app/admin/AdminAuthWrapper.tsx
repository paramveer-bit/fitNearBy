"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/auth/AuthProvider";

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.replace("/"); // Redirect to home or login
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return null; // Or show a spinner
  }

  return <>{children}</>;
}
