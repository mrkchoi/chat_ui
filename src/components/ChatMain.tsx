"use client";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

function ChatMain() {
  return (
    <div className="flex h-full flex-col items-center justify-start">
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
}

export default ChatMain;
