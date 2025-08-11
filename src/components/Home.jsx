import React from "react";
import { useChatStore } from "../store/ChatStore";
import Sidebar from "./Sidebar";
import NochatContainer from "./NochatContainer";
import ChatContainer from "./ChatContainer";
const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="max-h-screen bg-base-200">
      <div className="flex items-center justify-center py-8 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NochatContainer /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
