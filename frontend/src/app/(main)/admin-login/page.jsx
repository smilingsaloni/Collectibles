'use client';
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const AdminLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(7, "Password is too short").required("Required"),
});

const AdminLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("http://localhost:5000/admin/login", values);
        const { token, admin } = res.data;
        login(token, { ...admin, role: 'admin' });
        toast.success("Admin logged in successfully!");
        resetForm();
        router.push("/admin/profile");
      } catch (err) {
        toast.error("Invalid credentials");
      }
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Admin Login</h2>
        <form onSubmit={loginForm.handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{loginForm.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {loginForm.errors.password && loginForm.touched.password && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{loginForm.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;