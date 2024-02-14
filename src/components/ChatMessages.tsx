"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useStore, Chat, Message } from "@/app/App";

function ChatMessages() {
  const { chatData, selectedChatId, loggedInUser, panelOpen } = useStore();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatData, selectedChatId, panelOpen]);

  return (
    <div
      ref={chatContainerRef}
      className="flex w-full flex-1 flex-col gap-4 overflow-y-scroll p-6"
    >
      {chatData.find((chat: Chat) => chat.chatId === selectedChatId) &&
        chatData
          .find((chat: Chat) => chat.chatId === selectedChatId)
          ?.messages.map((message: Message) => {
            return (
              <div
                key={message.messageId}
                className={cn("flex items-center gap-4", {
                  "justify-start": message.senderId !== loggedInUser.userId,
                  "flex-row-reverse justify-start":
                    message.senderId === loggedInUser.userId,
                })}
              >
                <Avatar>
                  <AvatarImage
                    src={message.senderAvatar}
                    alt={message.userName}
                  />
                  <AvatarFallback>{message.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex max-w-[50%] flex-col items-start justify-center">
                  <span
                    className={cn(
                      "whitespace-pre-wrap rounded-lg bg-accent p-3 text-sm",
                      {
                        "bg-blue-100": message.senderId === loggedInUser.userId,
                      },
                    )}
                  >
                    {message.message}
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default ChatMessages;
