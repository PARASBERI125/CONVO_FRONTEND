import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { axiosInstance } from "../lib/axios";
const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const [timeLeft, setTimeLeft] = useState(420);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  console.log(email);
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/verifyotp", {
        email: email,
        otp: otp,
      });

      if (res.data.genuinemail) {
        toast.success("OTP verified");

        navigate("/signup", { state: { email } });
      }
    } catch (error) {
      toast.error("Incorrect OTP");
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
      </div>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold mb-8 tracking-wide select-none ">
          Welcome to CONVO
        </h1>
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-primary tracking-wide">
              CONVO
            </h1>
            <p className="text-gray-600 text-sm">Connect. Chat. Share.</p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">
                Time Left: {formatTime(timeLeft)}
              </span>
              {timeLeft <= 0 && (
                <span className="text-red-500">
                  OTP expired,please resend email
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
