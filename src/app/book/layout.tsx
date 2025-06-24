import React, { ReactNode } from "react";
import UserAuthWrapper from "@/app/UserAuthWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  console.log("AdminLayout rendered");
  return (
    <UserAuthWrapper>
      <div className="admin-layout">
        <header className="admin-header">
          <h1>Admin Panel</h1>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </UserAuthWrapper>
  );
}
