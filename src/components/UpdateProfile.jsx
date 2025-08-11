import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../store/AuthStore";
import { PencilIcon } from "@heroicons/react/24/solid";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { user, setuser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(user.profilePic);
  const [name, setname] = useState(user.fullname);
  const handleIconClick = () => {
    fileInputRef.current.click(); // trigger file input
  };

  const handleupdate = async () => {
    setloading(true);
    let hasChanges = false;
    const formData = new FormData();

    try {
      if (name !== user.fullname) {
        formData.append("fullname", name);
        hasChanges = true;
      }

      if (fileInputRef.current.files[0]) {
        formData.append("profilePic", fileInputRef.current.files[0]);
        hasChanges = true;
      }

      if (!hasChanges) {
        toast.error("Nothing to update");
        setloading(false);
        return;
      }
      const res = await axiosInstance.patch(
        "/auth/user/update",

        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setuser(res.data.updatedUser);
      } else {
        toast.error(res.data.message);
      }

      setloading(false);
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };

  return (
    <div className=" max-h-screen flex flex-col mt-12 items-center space-y-6">
      <div className="relative group">
        <img
          src={selectedImage}
          className="object-cover w-40 h-40 rounded-full"
          alt="Profile"
        />

        {/* Pencil Icon on hover */}
        <div
          onClick={handleIconClick}
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-60 transition cursor-pointer rounded-full"
        >
          <PencilIcon className="w-8 h-8 text-white" />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedImage(URL.createObjectURL(file));
            }
          }}
        />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-orange-600 text-lg">Full Name : </p>
        <input
          type="text"
          value={name}
          className="px-0.5 border-0 border-b-2 border-white text-lg text-white focus:outline-none  capitalize"
          onChange={(e) => {
            setname(e.target.value);
          }}
        ></input>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-orange-600 text-lg">Email : </p>
        <input
          type="text"
          value={user.email}
          disabled
          className="px-0.5 border-0 border-b-2 border-gray-200 text-lg text-gray-400 focus:outline-none "
        ></input>
      </div>
      <div className="flex items-center justify-between gap-5">
        <button
          type="button"
          disabled={loading}
          className="px-3 py-2 bg-red-600 text-white cursor-pointer hover:bg-red-700 rounded-2xl active:bg-red-800 mt-5 disabled:cursor-not-allowed"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-primary text-lg text-white cursor-pointer hover:bg-blue-600 rounded-2xl active:bg-blue-700 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleupdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
