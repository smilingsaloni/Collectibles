'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { PageLoader } from '@/components/LoadingSpinner';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    updateQuantity(itemId, newQuantity);
    setUpdating(false);
  };

  const handleRemoveItem = async (itemId) => {
    setUpdating(true);
    removeFromCart(itemId);
    setUpdating(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };
  const handleCheckout = () => {
    // If not authenticated, redirect to login
    if (!user) {
      toast.error('Please log in to proceed to checkout');
      router.push('/login?redirect=/user/cart');
      return;
    }
    
    // Calculate all price values
    const subtotal = parseFloat(calculateTotal());
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Store checkout data in session storage for checkout page
    const checkoutData = {
      items: cartItems,
      pricing: {
        subtotal,
        shipping,
        tax,
        total
      }
    };
    
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/user/checkout');
  };
  if (!cartItems) {
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
                </div>                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div key={item.product.id || index} className="p-6 flex items-center space-x-4">
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
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
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
                        onClick={() => handleRemoveItem(item.product.id)}
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