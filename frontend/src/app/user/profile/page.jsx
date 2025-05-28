'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Image from 'next/image';

const UserProfile = () => {
    const { user, login } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?._id) return;
            
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getbyid/${user._id}`);
                setUserData(response.data);
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    city: response.data.city || '',
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user profile');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/user/update/${user._id}`, 
                formData
            );
            
            setUserData(response.data);
            login(localStorage.getItem('token'), response.data);
            setIsEditing(false);
            setLoading(false);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <p>User profile not found. Please log in again.</p>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <span className="text-4xl font-bold text-gray-700">
                                {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                            </span>
                        </div>
                        <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                            <p className="text-blue-100">Member since {formattedDate}</p>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                                            Personal Information
                                        </h3>
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium">{userData.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email Address</p>
                                                <p className="font-medium">{userData.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">City</p>
                                                <p className="font-medium">{userData.city || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Member Since</p>
                                                <p className="font-medium">{formattedDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Account Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium">Account Verified</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium">Notifications Enabled</p>
                                        </div>
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

export default UserProfile;