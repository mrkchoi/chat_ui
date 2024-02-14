"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal } from "lucide-react";

import { useStore } from "@/app/page";
import ChatCreateDialog from "./ChatCreateDialog";

function SidebarHeader() {
  const { panelOpen, loggedInUser } = useStore();

  return panelOpen ? (
    <div className="flex h-20 w-full items-center justify-between p-6">
      <h2 className="text-2xl font-bold">Chats</h2>
      <div className="flex gap-4">
        <Link href="#">
          <MoreHorizontal
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <ChatCreateDialog />
      </div>
    </div>
  ) : (
    <div className="flex h-20 w-full items-center justify-between border-b p-6">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarImage
                src={loggedInUser.avatar}
                alt={loggedInUser.userName}
              />
              <AvatarFallback>{loggedInUser.userName[0]}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{loggedInUser.userName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default SidebarHeader;
