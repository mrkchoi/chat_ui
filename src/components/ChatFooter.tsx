"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  PlusCircle,
  Image as ImageIcon,
  Paperclip,
  ThumbsUp,
  SendHorizontalIcon,
  SmileIcon as SmileIconLucide,
} from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { v4 as uuidv4 } from "uuid";
import { useStore } from "@/app/App";

function ChatFooter() {
  const { chatData, setChatData, selectedChatId, loggedInUser } = useStore();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedChatId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setInputValue((prev) => prev + "\n");
    }
  };

  const handleSendMessage = () => {
    const formattedMessage = inputValue.trim();
    if (formattedMessage === "") return;

    const newMessage = {
      messageId: uuidv4(),
      senderId: loggedInUser.userId,
      userName: loggedInUser.userName,
      senderAvatar: loggedInUser.avatar,
      message: formattedMessage,
      timestamp: Date.now(),
    };
    const newChatData = [...chatData];
    const chatIndex = newChatData.findIndex(
      (chat) => chat.chatId === selectedChatId,
    );
    newChatData[chatIndex].messages = [
      ...newChatData[chatIndex].messages,
      newMessage,
    ];
    setChatData(newChatData);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex w-full items-center justify-between p-6">
      <div className="flex items-center justify-between gap-4 pr-4">
        <Link href="#">
          <PlusCircle
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <Link href="#">
          <ImageIcon
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <Link href="#">
          <Paperclip
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
      </div>
      <div className="relative flex w-full items-center">
        <Textarea
          ref={inputRef}
          placeholder="Aa"
          className="resize-none items-center justify-center overflow-hidden rounded-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-2 top-[50%] translate-y-[-50%]">
          <Popover>
            <PopoverTrigger asChild>
              <SmileIconLucide
                size={20}
                className="cursor-pointer text-gray-500 transition-colors hover:text-black"
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[390px]">
              <Picker
                data={data}
                emojiVersion="13.1"
                exceptEmojis={["relaxed"]}
                previewPosition="none"
                onEmojiSelect={(emoji: any) => {
                  setInputValue((prev) => prev + emoji.native);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex gap-4 pl-4">
        <Link href="#" onClick={handleSendMessage}>
          <SendHorizontalIcon
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
        <Link
          href="#"
          onClick={() => {
            const newMessageId = uuidv4();
            const newMessage = {
              messageId: newMessageId,
              senderId: loggedInUser.userId,
              userName: loggedInUser.userName,
              senderAvatar: loggedInUser.avatar,
              message: "👍",
              timestamp: Date.now(),
            };
            const newChatData = [...chatData];
            const chatIndex = newChatData.findIndex(
              (chat) => chat.chatId === selectedChatId,
            );
            newChatData[chatIndex].messages = [
              ...newChatData[chatIndex].messages,
              newMessage,
            ];
            setChatData(newChatData);
            setInputValue("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <ThumbsUp
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
      </div>
    </div>
  );
}

export default ChatFooter;
