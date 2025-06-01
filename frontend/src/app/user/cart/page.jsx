'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/LoadingSpinner';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin } from 'lucide-react';
import axios from 'axios';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      // Mock cart data - replace with actual API call
      const mockCartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: 'Vintage Baseball Card - Babe Ruth',
            price: 299.99,
            image: 'data:image/jpeg;base64,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'
          },
          quantity: 2
        },
        {
          id: 2,
          product: {
            id: 2,
            name: 'Limited Edition Comic Book',
            price: 89.99,
            image: 'https://u-mercari-images.mercdn.net/photos/m45006834036_1.jpg'
          },
          quantity: 1
        }
      ];
      setCartItems(mockCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      // Mock update - replace with actual API call
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    setUpdating(true);
    try {
      // Mock remove - replace with actual API call
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert('Checkout functionality will be implemented soon!');
  };
  if (loading) {
    return <PageLoader text="Loading your cart..." />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/browse-products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                        className="p-2 text-red-400 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">$9.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${(parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">
                        ${(parseFloat(calculateTotal()) + 9.99 + (parseFloat(calculateTotal()) * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;