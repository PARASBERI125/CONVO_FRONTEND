import React from "react";
import { Link } from "react-router";
import { MessageCircle, Image } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col ">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-black bg-opacity-70 backdrop-blur">
        <h1 className="text-3xl font-bold tracking-wide text-primary">CONVO</h1>
        <Link
          to="/sendotp"
          className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 py-16 gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Chat Freely. <br />{" "}
            <span className="text-bae">Share Instantly.</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            CONVO lets you connect with people in real-time, share images, and
            communicate effortlessly with a clean, secure interface.
          </p>
          <Link
            to="/login"
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
          >
            Start Chatting
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/chatting-concept-illustration_114360-2299.jpg"
            alt="Chat Illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <MessageCircle className="mx-auto text-primary" size={40} />
            <h3 className="text-xl font-semibold mt-4 mb-2">Real-time Chat</h3>
            <p className="text-gray-400">
              Send and receive messages instantly with lightning-fast delivery.
            </p>
          </div>
          <div>
            <Image className="mx-auto text-primary" size={40} />
            <h3 className="text-xl font-semibold mt-4 mb-2">Image Sharing</h3>
            <p className="text-gray-400">
              Share photos directly in chat, smooth and secure.
            </p>
          </div>
          <div>
            <svg
              className="mx-auto text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">Privacy First</h3>
            <p className="text-gray-400">
              Your data stays with you. We don’t track, store, or peek.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-black">
        &copy; {new Date().getFullYear()} CONVO — Connect. Chat. Share.
      </footer>
    </div>
  );
};

export default LandingPage;
