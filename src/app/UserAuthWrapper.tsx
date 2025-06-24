"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isVerified) {
      router.replace("/"); // Redirect to home or login
    }
  }, [user, router]);

  // if (user === null) {
  //   return <div>Loading...</div>;
  // }

  if (!user || !user.isVerified) {
    return null; // Or show a spinner
  }

  return <>{children}</>;
}
