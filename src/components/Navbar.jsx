import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../store/AuthStore";
import { useChatStore } from "../store/ChatStore";
import { axiosInstance } from "../lib/axios";
import { Search } from "lucide-react";
const Navbar = () => {
  const [search, setsearch] = useState("");
  const [searchresults, setsearchresults] = useState([]);
  const { setSelectedUser } = useChatStore();
  const { user, setisauthenticated, setuser } = useContext(AuthContext);

  const handleinput = async (email) => {
    setsearch(email);
    if (email.trim() === "") {
      setsearchresults([]);
      return;
    }
    try {
      const res = await axiosInstance.get(`/auth/listofusers?email=${email}`);
      setsearchresults(res.data.listofusers);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="navbar bg-primary text-primary-content px-3 sm:px-8 md:px-14">
      {/* Left side - Logo */}
      <div className="flex-1 relative">
        <div className=" flex items-center gap-2 sm:gap-8 ">
          <p className="text-3xl font-light tracking-wide">CONVO</p>
          <div className="relative w-46">
            <input
              type="text"
              placeholder="Find People using Email......"
              onChange={(e) => handleinput(e.target.value)}
              className="input input-bordered input-sm text-black bg-white w-full pl-8 border-2 border-gray-600"
            />
            <Search className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
        {search && searchresults.length > 0 && (
          <div className="absolute mt-1 bg-white shadow-md rounded w-64 z-50">
            {searchresults.map((resultuser) => (
              <div
                key={resultuser._id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-black flex items-center gap-1"
                onClick={() => {
                  setSelectedUser(resultuser);

                  setsearch("");
                  setsearchresults([]);
                }}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={
                      resultuser.profilePic ||
                      `https://ui-avatars.com/api/?name=${resultuser.fullname}&background=random&color=fff`
                    }
                    className="object-cover"
                  ></img>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium">{resultuser.fullname}</p>
                  <p className="text-sm text-gray-600">{resultuser.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer for avatar menu */}
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-end">
          {/* Avatar Button to Open Drawer */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button cursor-pointer hover:scale-105"
          >
            <div className="avatar">
              <div className="w-11 rounded-full ">
                <img
                  alt="Profile"
                  src={user.profilePic}
                  className="object-cover"
                />
              </div>
            </div>
          </label>
        </div>

        {/* Drawer Side (Menu) */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content h-1/2 w-1/2 lg:w-1/4 pt-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Profile"
                    src={user.profilePic}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-start gap-4 mt-6">
              <div className="w-full px-1">
                <p className="text-2xl capitalize">{user.fullname}</p>
              </div>
              <div className="w-full break-all px-1">
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="w-full px-1">
                <NavLink
                  to="/updateprofile"
                  className="btn btn-primary font-semibold"
                  onClick={() => {
                    navigate("/updateprofile");
                    document.getElementById("my-drawer-4").checked = false;
                  }}
                >
                  Update Profile
                </NavLink>
              </div>
              <div className="w-1/3 px-1">
                <button
                  className="btn btn-error font-semibold"
                  type="button"
                  onClick={async () => {
                    await axiosInstance.get("/auth/user/logout");
                    setuser({
                      _id: "",
                      contacts: [],
                      email: "",
                      fullname: "",
                      profilePic: "",
                      cloudinaryPublicId: "",
                    });
                    setisauthenticated(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
