import React, { useContext, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../store/AuthStore";
export default function Login() {
  const { setisauthenticated, setuser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //.endsWith("@gmail.com")
    if (!formData.email) {
      setError("Please enter correct email id");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter a password");
      return;
    }

    setError("");
    try {
      setLoading(true);
      const regUser = await axiosInstance.post("/auth/user/login", formData);

      if (regUser.status === 200) {
        console.log(regUser.data);
        toast.success(regUser.data.message);
        setuser({
          _id: regUser.data._id,
          contacts: regUser.data.contacts,
          email: regUser.data.email,
          fullname: regUser.data.fullname,
          profilePic: regUser.data.profilePic,
        });

        setisauthenticated(true);

        navigate("/");
      } else if (regUser.status === 400) {
        toast.error(regUser.data.message);
      }
    } catch (error) {
      console.log("Signup error", error);
      toast.error(
        "Please recheck your credentials,if new user please register"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          onClick={() => navigate("/sendotp")}
          className="text-green-400 font-semibold hover:text-green-500 cursor-pointer"
        >
          REGISTER
        </button>
      </div>

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
            Login
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-green-500 text-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition active:bg-green-700 cursor-pointer"
            >
              {loading ? "Logging in...." : "Login"}
            </button>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
                className="bg-transparent text-blue-600 px-1 py-1 cursor-pointer"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/sendotp");
                }}
                className="bg-transparent text-blue-600 px-1 py-1 cursor-pointer underline underline-offset-2 decoration-blue-600"
              >
                New user? Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
