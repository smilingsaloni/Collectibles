'use client';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({ children }) {
  return <ProtectedRoute requireAdmin={false}>{children}</ProtectedRoute>;
}
