import React, { ReactNode } from "react";
import AdminAuthWrapper from "./AdminAuthWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthWrapper>
      <div className="admin-layout">
        <main className="admin-content">{children}</main>
      </div>
    </AdminAuthWrapper>
  );
}
