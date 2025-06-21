import React, { ReactNode } from "react";
import AdminAuthWrapper from "./AdminAuthWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthWrapper>
      <div className="admin-layout">
        <header className="admin-header">
          <h1>Admin Panel</h1>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </AdminAuthWrapper>
  );
}
