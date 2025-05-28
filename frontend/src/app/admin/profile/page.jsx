"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Package, Users, Plus, BarChart3, Settings, LogOut } from "lucide-react";

const AdminProfile = () => {
  const { user, logout } = useAuth();

  const adminActions = [
    {
      title: "Add Products",
      description: "Add new products to the marketplace",
      icon: Plus,
      href: "/admin/add-products",
      color: "bg-blue-500"
    },
    {
      title: "Manage Products",
      description: "View, edit, and delete existing products",
      icon: Package,
      href: "/admin/manage-products",
      color: "bg-green-500"
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/manage-users",
      color: "bg-purple-500"
    },
    {
      title: "Analytics",
      description: "View platform analytics and reports",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-orange-500"
    }];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.email?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Administrator
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {adminActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Products</p>
                  <p className="text-2xl font-bold text-blue-800">--</p>
                </div>
                <Package className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-green-800">--</p>
                </div>
                <Users className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-purple-800">--</p>
                </div>
                <BarChart3 className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;