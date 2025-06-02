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
    // Log the user object from context to debug
    console.log('User from AuthContext:', user);
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?._id) {
                console.log('No user ID available, cannot fetch user data');
                setLoading(false);
                return;
            }            try {
                // Check if we already have the complete user data in the context
                if (user && user.name && user.email) {
                    console.log('Using user data from context:', user);
                    setUserData(user);
                    setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        city: user.city || '',
                    });
                    setLoading(false);
                } else {
                    // Fetch from API if we don't have complete data
                    const apiUrl = `http://localhost:5000/user/getbyid/${user._id}`;
                    console.log('Fetching user data for ID:', user._id);
                    console.log('API URL:', apiUrl);
                    
                    const response = await axios.get(apiUrl);
                    console.log('User data received:', response.data);
                    
                    if (response.data) {
                        setUserData(response.data);
                        setFormData({
                            name: response.data.name || '',
                            email: response.data.email || '',
                            city: response.data.city || '',
                        });
                    } else {
                        setError('User data not found');
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                console.error('Error status:', err.response ? err.response.status : 'No status');
                console.error('Error details:', err.response ? err.response.data : 'No response data');
                
                if (err.response && err.response.status === 404) {
                    setError(`User with ID ${user._id} not found`);
                } else {
                    setError(`Failed to load user data: ${err.message}`);
                }
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
        
        if (!user?._id) {
            setError('User ID not available');
            return;
        }
        
        try {
            const apiUrl = `http://localhost:5000/user/update/${user._id}`;
            console.log('Updating user data at:', apiUrl);
            console.log('Form data being sent:', formData);
            
            const response = await axios.put(apiUrl, formData);
            console.log('Update response:', response.data);
            
            setUserData(response.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating user data:', err);
            console.error('Error status:', err.response ? err.response.status : 'No status');
            console.error('Error details:', err.response ? err.response.data : 'No response data');
            
            if (err.response && err.response.data && err.response.data.message) {
                setError(`Failed to update: ${err.response.data.message}`);
            } else {
                setError(`Failed to update user data: ${err.message}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 dark:bg-gray-900 dark:text-gray-200">
                <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="text-center p-4 dark:bg-gray-900 dark:text-gray-200">
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
        <div className="container mx-auto p-4 my-20 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h1>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                            <p className="mt-1 dark:text-white">{userData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                            <p className="mt-1 dark:text-white">{userData.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
                            <p className="mt-1 dark:text-white">{userData.city || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                            <p className="mt-1 dark:text-white">{formattedDate}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
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