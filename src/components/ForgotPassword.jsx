import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendPass = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter a valid Email id");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/forgotpassword", {
        email: email,
      });

      if (response.status === 200) {
        toast.success("New Password sent successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Error sending the password,try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold mb-8 tracking-wide select-none ">
        Welcome to CONVO
      </h1>
      <div className="relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 text-black text-3xl cursor-pointer"
        >
          ←
        </button>

        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-primary tracking-wide">
            CONVO
          </h1>
          <p className="text-gray-600 text-sm">Connect. Chat. Share.</p>
        </div>

        <form onSubmit={handleSendPass} className="space-y-4">
          <div className="flex items-start justify-center ">
            <p className="text-blue-500">
              We will send you a new password on your email address
            </p>
          </div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            {loading ? "Sending..." : "Send Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
