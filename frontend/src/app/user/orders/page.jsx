"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/LoadingSpinner";
import axios from "axios";

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace with your backend endpoint for fetching user orders
        const res = await axios.get(`http://localhost:5000/user/orders/${user._id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, isAuthenticated]);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Not Logged In</h2>
          <p className="text-gray-700 mb-4">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) return <PageLoader text="Loading your orders..." />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-800">Order ID:</span> {order._id}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Status:</span> <span className="text-blue-600">{order.status}</span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Placed on:</span> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Payment:</span> {order.paymentMethod || "Cash on Delivery"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Total:</span> ${order.total?.toFixed(2) || "-"}
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <ul className="list-disc pl-6">
                    {order.items.map((item) => (
                      <li key={item.product._id} className="mb-1">
                        {item.product.name} x {item.quantity} (${item.product.price.toFixed(2)} each)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
