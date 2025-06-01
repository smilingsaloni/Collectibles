"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { PageLoader } from "@/components/LoadingSpinner";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

const ViewProduct = () => {
    const { id } = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
                setProduct({
                    id: res.data._id,
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    category: res.data.category,
                    image: res.data.images?.[0] || "/api/placeholder/300/200",
                    seller: res.data.admin?.name || "Anonymous Seller",
                });
            } catch (err) {
                setError("Product not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!isAuthenticated()) {
            alert("Please login to add items to your cart");
            router.push("/login");
            return;
        }
        addToCart(product, quantity);
    };

    if (loading) return <PageLoader text="Loading product..." />;
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 text-white rounded-md">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-96 w-auto object-contain rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="mb-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                                {product.category}
                            </span>
                        </div>
                        <div className="mb-4 text-lg text-gray-700">
                            <span className="font-semibold">Seller:</span> {product.seller}
                        </div>
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center mb-6">
                            <label className="mr-2 font-medium">Quantity:</label>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                                className="w-16 px-2 py-1 border rounded-md text-center"
                            />
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;