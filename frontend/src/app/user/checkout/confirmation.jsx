'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/LoadingSpinner';
import axios from 'axios';

const ConfirmationPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login');
      return;
    }

    // Try to fetch the latest order
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/orders/${user._id}`);
        if (response.data && response.data.length > 0) {
          // Sort by createdAt descending (just in case)
          const sortedOrders = [...response.data].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          // Get the most recent order
          setLatestOrder(sortedOrders[0]);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, [user, router]);

  if (loading) {
    return <PageLoader text="Loading order details..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <svg className="mx-auto mb-4 h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. Your order has been placed successfully and will be processed for delivery. 
          Please keep the cash ready for payment on delivery.
        </p>
        {latestOrder && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md text-left">
            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Order ID:</span> {latestOrder._id.substring(0, 10)}...</p>
            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Date:</span> {new Date(latestOrder.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-700"><span className="font-medium">Total:</span> ${latestOrder.total.toFixed(2)}</p>
          </div>
        )}
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">Payment Method: Cash on Delivery</span>
        </div>
        <Link href="/user/orders" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors mb-2">View My Orders</Link>
        <br />
        <Link href="/browse-products" className="inline-block text-blue-600 hover:underline mt-2">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
