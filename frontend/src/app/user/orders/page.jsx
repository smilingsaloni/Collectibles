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
        // Fetch user orders from backend
        const res = await axios.get(`http://localhost:5000/user/orders/${user._id}`);
        // Direct access to the data since our API returns the orders array directly
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, isAuthenticated]);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Not Logged In</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) return <PageLoader text="Loading your orders..." />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Order ID:</span> <span className="dark:text-gray-300">{order._id}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                      order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.orderStatus || "Processing"}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Placed on:</span> <span className="dark:text-gray-300">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Payment:</span> <span className="dark:text-gray-300">{order.paymentMethod || "Cash on Delivery"}</span>
                </div>
                
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Shipping Address:</span> <span className="dark:text-gray-300">{order.address}, {order.city}, {order.state} {order.zip}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Subtotal:</span> <span className="dark:text-gray-300">${order.subtotal?.toFixed(2) || "-"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Shipping:</span> <span className="dark:text-gray-300">${order.shipping?.toFixed(2) || "-"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Tax:</span> <span className="dark:text-gray-300">${order.tax?.toFixed(2) || "-"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Total:</span> <span className="dark:text-gray-300">${order.total?.toFixed(2) || "-"}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 dark:text-white">Items:</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                        <div>
                          <p className="font-medium dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
