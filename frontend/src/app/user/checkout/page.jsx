'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/LoadingSpinner';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!cartItems || cartItems.length === 0) {
    return <PageLoader text="Loading your cart..." />;
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // Simulate order placement (replace with API call in production)
      await new Promise(res => setTimeout(res, 1000));
      clearCart();
      router.push('/user/checkout/confirmation');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="border rounded p-2" />
            <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border rounded p-2" />
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="border rounded p-2" />
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="border rounded p-2 md:col-span-2" />
            <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="border rounded p-2" />
            <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="border rounded p-2" />
            <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP Code" className="border rounded p-2" />
          </div>
          <h2 className="text-lg font-semibold mb-4 mt-6">Payment Method</h2>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="radio" checked readOnly className="form-radio text-blue-600" />
              <span className="ml-2 font-medium">Cash on Delivery (COD)</span>
            </label>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold">
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map(item => (
              <li key={item.product.id} className="py-2 flex justify-between items-center">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
