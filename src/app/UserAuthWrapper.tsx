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

  useEffect(() => {
    if (!isLoading && (!user || !user.isVerified)) {
      router.replace("/"); // Redirect to home or login
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isVerified) {
    return null; // Or show a spinner
  }

  return <>{children}</>;
}
// l u
// t t
// t fals
// f this
// f false
