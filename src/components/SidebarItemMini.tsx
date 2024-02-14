"use client";

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

function SidebarItemMini({ chat }: { chat: Chat }) {
  const { selectedChatId, setSelectedChatId } = useStore();

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
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarImage src={chat.avatar} alt={chat.userName} />
              <AvatarFallback>{chat.userName[0]}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{chat.userName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}

export default SidebarItemMini;
