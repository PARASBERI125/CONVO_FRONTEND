import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  myself: {
    id: "",
    fullname: "",
    profilePic: "",
  },
  socket: null,
  onlineUsers: [],

  getMyId: async () => {
    try {
      const res = await axiosInstance.get("/auth/user/profile");
      set({
        myself: {
          id: res.data._id,
          fullname: res.data.fullname,
          profilePic: res.data.profilePic,
        },
      });
    } catch (error) {
      console.log("Could not get my information", error);
    }
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data || [] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessage: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    try {
      const res = await axiosInstance.post(
        `/message/sendmessage/${selectedUser._id}`,
        messageData
      );
      

      set((state)=>({ messages: [...state.messages, res.data] }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { myself } = get();
    const socket = io("https://api.convochat.fun", {
      query: {
        userId: myself.id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
     socket.on("ContactsUpdated", () => {
      get().getUsers(); // refresh sidebar instantly
    });
  },
  disconnectSocket: () => {
    get().socket.disconnect();
  },

  subscribetomessages: () => {
    const { socket } = get();
    if (!socket || typeof socket.on !== "function") return;
    socket.on("NewMessage", (messagesent) => {
      set((state)=>({ messages: [...state.messages, messagesent] }));
    });
  },
  unsubscribefrommessages: () => {
    const { socket } = get();
    if (!socket || typeof socket.on !== "function") return;

    socket.off("NewMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
