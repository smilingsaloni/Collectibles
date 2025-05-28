'use client';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  return <ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>;
}
