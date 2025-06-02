'use client';

import Link from 'next/link';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <svg className="mx-auto mb-4 h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-700 mb-4">Thank you for your purchase. Your order has been placed successfully and will be processed for delivery. Please keep the cash ready for payment on delivery.</p>
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
