"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Info, Phone } from "lucide-react";
import { useStore, Chat } from "@/app/App";

function ChatHeader() {
  const { chatData, selectedChatId } = useStore();

  const activeChat = useMemo(() => {
    return (
      chatData.find((chat: Chat) => chat.chatId === selectedChatId) ??
      chatData[0]
    );
  }, [chatData, selectedChatId]);
  return (
    <div className="flex h-20 w-full justify-between border-b p-6">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={activeChat.avatar} alt={activeChat.userName} />
          <AvatarFallback>{activeChat.userName[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex w-full flex-col items-start justify-center">
          <span className="font-semibold">{activeChat.userName}</span>
          <span className="text-sm text-slate-400">Active 2 mins ago</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="#">
          <Phone
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <Link href="#">
          <Camera
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <Link href="#">
          <Info
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
      </div>
    </div>
  );
}

export default ChatHeader;
