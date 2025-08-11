import { axiosInstance } from "../lib/axios.js";
import Spinner from "../components/Spinner.jsx";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState({
    _id: "",
    contacts: [],
    email: "",
    fullname: "",
    profilePic: "",
    cloudinaryPublicId: "",
  });
  const [isauthenticated, setisauthenticated] = useState(false);
  const [loading, setloading] = useState(true);
  const checkauth = async () => {
    try {
      const checkuser = await axiosInstance.get("/auth/user/profile");

      if (checkuser.status === 200) {
        setisauthenticated(true);
        console.log(checkuser.data);
        setuser({
          _id: checkuser.data._id,
          contacts: checkuser.data.contacts,
          email: checkuser.data.email,
          fullname: checkuser.data.fullname,
          profilePic: checkuser.data.profilePic,
          cloudinaryPublicId: checkuser.data.cloudinaryPublicId,
        });
      } else {
        setisauthenticated(false);
      }
      setloading(false);
    } catch (error) {
      console.log(error);

      setisauthenticated(false);
      setloading(false);
    }
  };
  useEffect(() => {
    checkauth();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setuser, isauthenticated, setisauthenticated, checkauth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
