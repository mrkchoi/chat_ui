"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useStore, Chat } from "@/app/App";

function SidebarItemFull({
  chat,
  messagePreview,
}: {
  chat: Chat;
  messagePreview: string;
}) {
  const {
    chatData,
    selectedChatId,
    setSelectedChatId,
    panelOpen,
    loggedInUser,
  } = useStore();
  return (
    <Link
      key={chat.chatId}
      href="#"
      className={cn(
        "flex w-full items-center justify-start px-6 py-4 hover:bg-slate-50",
        {
          "bg-slate-100": chat.chatId === selectedChatId,
        },
      )}
      onClick={() => {
        setSelectedChatId(chat.chatId);
      }}
    >
      <Avatar>
        <AvatarImage src={chat.avatar} alt={chat.userName} />
        <AvatarFallback>{chat.userName[0]}</AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col items-start justify-center">
        <span className="font-semibold">{chat.userName}</span>
        <span className="text-sm text-slate-400">{messagePreview}</span>
      </div>
    </Link>
  );
}

export default SidebarItemFull;
