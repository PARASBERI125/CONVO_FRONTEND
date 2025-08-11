import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/ChatStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const messageendref = useRef(null);
  const {
    connectSocket,
    unsubscribefrommessages,
    subscribetomessages,
    getMessage,
    selectedUser,
    isMessagesLoading,
    messages,
    getMyId,
    myself,
  } = useChatStore();

  useEffect(() => {
    const init = async () => {
      await getMyId();
      connectSocket();
      subscribetomessages();
    };
    init();

    return () => {
      unsubscribefrommessages(); // cleanup on unmount
    };
  }, [getMyId, connectSocket, subscribetomessages, unsubscribefrommessages]);

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage]);

  useEffect(() => {
    if (messageendref.current && messages) {
      messageendref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              ref={messageendref}
              className={`chat ${
                message.senderId === selectedUser._id
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === selectedUser._id
                        ? selectedUser.profilePic ||
                          `https://ui-avatars.com/api/?name=${selectedUser.fullname}&background=random&color=fff`
                        : myself.profilePic ||
                          `https://ui-avatars.com/api/?name=${myself.fullname}&background=random&color=fff`
                    }
                    alt="profile pic"
                  ></img>
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1 ">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 z-10">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
