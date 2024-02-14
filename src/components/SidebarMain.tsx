"use client";

import { useMemo } from "react";
import { useStore, Chat } from "@/app/page";
import SidebarItemFull from "./SidebarItemFull";
import SidebarItemMini from "./SidebarItemMini";

function SidebarMain() {
  const { chatData, panelOpen, loggedInUser } = useStore();

  const sortedData = useMemo(() => {
    return chatData.sort((a, b) => {
      const aTime = a.messages[a.messages.length - 1]?.timestamp ?? 0;
      const bTime = b.messages[b.messages.length - 1]?.timestamp ?? 0;
      return bTime - aTime;
    });
  }, [chatData]);

  return (
    <div className="scrollbar-hide w-full flex-1 overflow-y-scroll">
      <div className="flex w-full flex-col items-center justify-start">
        {sortedData.map((chat: Chat) => {
          const lastMessage =
            chat.messages[chat.messages.length - 1]?.message ?? "";
          const lastMessageSender = !lastMessage.length
            ? ""
            : chat.messages[chat.messages.length - 1].senderId ===
                loggedInUser.userId
              ? "You: "
              : chat.messages[chat.messages.length - 1].userName + ": ";
          const messagePreview =
            `${lastMessageSender}${lastMessage}`.length > 25
              ? `${lastMessageSender}${lastMessage}`.slice(0, 22) + "..."
              : `${lastMessageSender}${lastMessage}`;

          return panelOpen ? (
            <SidebarItemFull
              key={chat.chatId}
              chat={chat}
              messagePreview={messagePreview}
            />
          ) : (
            <SidebarItemMini key={chat.chatId} chat={chat} />
          );
        })}
      </div>
    </div>
  );
}

export default SidebarMain;
