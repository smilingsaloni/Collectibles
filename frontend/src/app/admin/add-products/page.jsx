"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const categories = [
    "Trading Cards",
    "Coins",
    "Vinyl Records",
    "Comics",
    "Stamps",
    "Toys",
];

const AddProductSchema = Yup.object().shape({
    title: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required("Required"),
    description: Yup.string().min(10, "Too Short!").required("Required"),
    category: Yup.string().required("Required"),
    price: Yup.number().min(1, "Price must be at least 1").required("Required"),
    image: Yup.mixed().required("Image is required"),
});

const AddProduct = () => {
    const [previewUrl, setPreviewUrl] = React.useState(null);

    React.useEffect(() => {
        // Cleanup preview URL when component unmounts
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            price: "",
            image: null,
        },
        validationSchema: AddProductSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // 1. Upload image to Cloudinary
                const cloudName = "dilx82lku";
                const uploadPreset = "mypreset";
                const imageData = new FormData();
                imageData.append("file", values.image);
                imageData.append("upload_preset", uploadPreset);
                imageData.append("cloud_name", cloudName);

                const cloudinaryRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    imageData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        transformRequest: [(data, headers) => {
                            delete headers['Authorization'];
                            return data;
                        }],
                    }
                );
                const imageUrl = cloudinaryRes.data.secure_url;

                // 2. Send product data to backend with Cloudinary image URL
                const productData = {
                    name: values.title,
                    description: values.description,
                    category: values.category,
                    price: Number(values.price),
                    images: [imageUrl],
                    admin: "6473362b1025df8d34ac773a"  // Using a default admin ID
                };
                
                await axios.post("http://localhost:5000/product/add", productData);
                
                // Clear preview and form
                setPreviewUrl(null);
                toast.success("Product added successfully!");
                resetForm();
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to add product");
            }
        },
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("image", file);
            // Create and set preview URL
            const objectUrl = URL.createObjectURL(file);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(objectUrl);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-800">Product Name</label>
                        <input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        {formik.errors.title && formik.touched.title && (
                            <p className="text-xs text-red-600 mt-1">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-800">Description</label>
                        <textarea
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                            rows={4}
                        />
                        {formik.errors.description && formik.touched.description && (
                            <p className="text-xs text-red-600 mt-1">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-800">Category</label>
                        <select
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {formik.errors.category && formik.touched.category && (
                            <p className="text-xs text-red-600 mt-1">{formik.errors.category}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-800">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                            min="1"
                        />
                        {formik.errors.price && formik.touched.price && (
                            <p className="text-xs text-red-600 mt-1">{formik.errors.price}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 font-medium text-gray-800">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        {formik.errors.image && formik.touched.image && (
                            <p className="text-xs text-red-600 mt-1">{formik.errors.image}</p>
                        )}
                        {previewUrl && (
                            <div className="mt-4">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full max-h-[200px] object-contain rounded-lg border border-gray-200"
                                />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                    >                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
