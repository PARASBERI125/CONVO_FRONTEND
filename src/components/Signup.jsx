import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../store/AuthStore";
export default function Signup() {
  const { checkauth } = useContext(AuthContext);
  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/sendotp");
    }
  }, [email, navigate]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: email,
    password: "",
    profilePic: null,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter a password");
      return;
    }
    if (!formData.profilePic) {
      setError("Profile image is required");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const regUser = await axiosInstance.post(
        "/auth/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (regUser.status === 200) {
        toast.success(regUser.data.message);

        checkauth();

        navigate("/");
      } else {
        toast.error(regUser.data.message);
      }
    } catch (error) {
      console.log("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold mb-8 tracking-wide select-none ">
        Welcome to CONVO
      </h1>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* App Title */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-primary tracking-wide">
            CONVO
          </h1>
          <p className="text-gray-600 text-sm">Connect. Chat. Share.</p>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center text-green-600">
          Register
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Input with Label */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Enter Profile Pic
            </label>
            <input
              type="file"
              name="profilePic"
              onChange={(e) =>
                setFormData({ ...formData, profilePic: e.target.files[0] })
              }
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-3 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-100 file:text-green-600
                         hover:file:bg-green-200
                         border border-gray-400 rounded-lg cursor-pointer"
            />
          </div>

          <input
            type="text"
            name="fullname"
            placeholder="Enter your Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black capitalize"
          />

          <input
            type="email"
            name="email"
            placeholder={formData.email}
            disabled
            className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black bg-gray-100 placeholder-gray-800"
          />

          <input
            type="password"
            name="password"
            placeholder="Create a Strong Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition active:bg-green-700 cursor-pointer"
          >
            {loading ? "Signing up...." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
