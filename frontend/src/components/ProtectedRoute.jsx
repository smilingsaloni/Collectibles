"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }
      
      if (requireAdmin && !isAdmin()) {
        router.push("/login");
        return;
      }
    }
  }, [isAuthenticated, isAdmin, loading, router, requireAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated() || (requireAdmin && !isAdmin())) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
