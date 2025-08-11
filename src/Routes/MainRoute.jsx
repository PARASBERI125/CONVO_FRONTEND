import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Login from "../components/Login";
import UpdateProfile from "../components/UpdateProfile";
import { Navigate } from "react-router";
import SendOtp from "../components/SendOtp";
import VerifyOtp from "../components/VerifyOtp";
import { AuthContext } from "../store/AuthStore";
import ForgotPassword from "../components/ForgotPassword";
import LandingPage from "../components/LandingPage";

const MainRoute = () => {
  const { isauthenticated } = useContext(AuthContext);
  return (
    <Routes>
      {isauthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/sendotp" element={<SendOtp />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/landingpage" element={<LandingPage />} />

          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/landingpage" />} />
        </>
      )}
    </Routes>
  );
};

export default MainRoute;
