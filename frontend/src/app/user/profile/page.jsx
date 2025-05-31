'use client';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const { user } = useAuth();
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
            if (!user?._id) {
                setLoading(false);
                return;
            }

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
                setError('Failed to load user data');
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
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${user._id}`, formData);
            setUserData(response.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating user data:', err);
            setError('Failed to update user data');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="text-center p-4">
                <p>No user data found</p>
            </div>
        );
    }

    const formattedDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="container mx-auto p-4 my-20">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p className="mt-1">{userData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="mt-1">{userData.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">City</p>
                            <p className="mt-1">{userData.city || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Member Since</p>
                            <p className="mt-1">{formattedDate}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;