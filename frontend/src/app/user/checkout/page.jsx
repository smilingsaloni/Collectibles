'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

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
  const [checkoutData, setCheckoutData] = useState(null);
  
  // Load checkout data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem('checkoutData');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else if (!cartItems || cartItems.length === 0) {
      // If no checkout data and no cart items, redirect back to cart
      router.push('/user/cart');
    }
  }, [router, cartItems]);

  if (!checkoutData && (!cartItems || cartItems.length === 0)) {
    return <PageLoader text="Loading your checkout data..." />;
  }
  const calculateTotal = () => {
    if (checkoutData) {
      return checkoutData.pricing.total.toFixed(2);
    }
    return cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };
  
  const getSubtotal = () => {
    if (checkoutData) {
      return checkoutData.pricing.subtotal.toFixed(2);
    }
    return cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };
  
  const getShipping = () => {
    if (checkoutData) {
      return checkoutData.pricing.shipping.toFixed(2);
    }
    const subtotal = parseFloat(getSubtotal());
    return (subtotal > 100 ? 0 : 9.99).toFixed(2);
  };
  
  const getTax = () => {
    if (checkoutData) {
      return checkoutData.pricing.tax.toFixed(2);
    }
    return (parseFloat(getSubtotal()) * 0.08).toFixed(2);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // Use checkout data if available, otherwise fallback to cart items
      const items = checkoutData ? checkoutData.items : cartItems;
      const subtotal = parseFloat(getSubtotal());
      const shipping = parseFloat(getShipping());
      const tax = parseFloat(getTax());
      const total = parseFloat(calculateTotal());
      
      // Prepare order data
      const orderData = {
        userId: user?._id,
        name: form.name,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        phone: form.phone,
        items: items.map(item => ({
          product: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        paymentMethod: 'Cash on Delivery',
      };
      
      // Send order to backend
      const response = await fetch('http://localhost:5000/user/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Server error: ' + response.statusText);
      }
      
      // Clear cart and checkout data
      clearCart();
      sessionStorage.removeItem('checkoutData');
      toast.success('Order placed successfully!');
      router.push('/user/checkout/confirmation');
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
      toast.error('Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Checkout</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder="Full Name" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              placeholder="Email" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              required 
              placeholder="Phone Number" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              required 
              placeholder="Address" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600 md:col-span-2" 
            />
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              required 
              placeholder="City" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="state" 
              value={form.state} 
              onChange={handleChange} 
              required 
              placeholder="State" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="zip" 
              value={form.zip} 
              onChange={handleChange} 
              required 
              placeholder="ZIP Code" 
              className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600" 
            />
          </div>
          <h2 className="text-lg font-semibold mb-4 mt-6 text-gray-900 dark:text-white">Payment Method</h2>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="radio" checked readOnly className="form-radio text-blue-600" />
              <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">Cash on Delivery (COD)</span>
            </label>
          </div>
          {error && <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>}
          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
            {(checkoutData ? checkoutData.items : cartItems).map(item => (
              <li key={item.product.id} className="py-2 flex justify-between items-center">
                <span className="text-gray-800 dark:text-gray-200">{item.product.name} x {item.quantity}</span>
                <span className="text-gray-800 dark:text-gray-200">${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-gray-100">${getSubtotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-gray-900 dark:text-gray-100">${getShipping()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-gray-100">${getTax()}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-gray-900 dark:text-white">${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
