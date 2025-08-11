import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";

export default function EmailOtpStep() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/sendotp", {
        email: email,
      });
      if (res.data.otpsent) {
        toast.success("OTP sent successfully");
        navigate("/verifyotp", {
          state: { email: email },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Email already exists");
        navigate("/login");
      } else {
        toast.error("Something went wrong while sending OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-black bg-opacity-80 p-4 flex justify-between items-center fixed top-0 left-0 z-50 max-w-md mx-auto right-0 left-0">
        <h1
          onClick={() => navigate("/landingpage")}
          className="text-white text-xl font-bold cursor-pointer select-none hover:underline"
          title="Go to Landing Page"
        >
          HOME
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="text-green-400 font-semibold hover:text-green-500 cursor-pointer"
        >
          LOGIN
        </button>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold mb-8 tracking-wide select-none ">
          Welcome to CONVO
        </h1>
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md ">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-primary tracking-wide">
              CONVO
            </h1>
            <p className="text-gray-600 text-sm">Connect. Chat. Share.</p>
          </div>
          <h2 className="text-xl font-bold mb-4 text-center text-green-600">
            Register
          </h2>
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex items-center justify-start text-blue-800">
              Let's start by verifying your Email
            </div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="bg-transparent px-1 py-1 text-blue-600 cursor-pointer underline decoration-blue-600 underline-offset-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already a user? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
