"use client";

import { create } from "zustand";
import { DATA, LOGGED_IN_USER } from "@/lib/data";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";

import Sidebar from "@/components/Sidebar";
import ChatMain from "@/components/ChatMain";

export type newUser = {
  userId?: string;
  userName?: string;
  avatar?: string;
};
export type Chat = {
  chatId: string;
  userName: string;
  avatar: string;
  messages: any[];
};
export type Message = {
  messageId: string;
  senderId: string;
  userName: string;
  senderAvatar: string;
  message: string;
  timestamp: number;
};

export type LoggedInUser = {
  userId: string;
  userName: string;
  avatar: string;
};

interface ChatState {
  chatData: Chat[];
  setChatData: (chatData: Chat[]) => void;
  selectedChatId: string;
  setSelectedChatId: (selectedChatId: string) => void;
  loggedInUser: LoggedInUser;
  panelOpen: boolean;
  setPanelOpen: (panelOpen: boolean) => void;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  newChatUser: newUser;
  setNewChatUser: (newChatUser: newUser) => void;
  openDialogPopover: boolean;
  setOpenDialogPopover: (openDialogPopover: boolean) => void;
}

export const useStore = create<ChatState>((set) => ({
  chatData: DATA,
  setChatData: (newChatData: Chat[]) => set({ chatData: newChatData }),
  selectedChatId: "1",
  setSelectedChatId: (selectedChatId: string) => set({ selectedChatId }),
  loggedInUser: LOGGED_IN_USER,
  panelOpen: true,
  setPanelOpen: (panelOpen: boolean) => set({ panelOpen }),
  openDialog: false,
  setOpenDialog: (openDialog: boolean) => set({ openDialog }),
  openDialogPopover: false,
  setOpenDialogPopover: (openDialogPopover: boolean) =>
    set({ openDialogPopover }),
  newChatUser: {},
  setNewChatUser: (newChatUser: newUser) => set({ newChatUser }),
}));

export default function Home() {
  const { panelOpen } = useStore();

  return (
    <main className="p-18 flex h-screen w-screen items-center justify-center">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-[100%] rounded-lg border"
      >
        <ResizablePanel
          defaultSize={50}
          className={cn("flex max-w-[18rem]")}
          style={{
            flexGrow: !panelOpen ? 0 : 1,
            flexShrink: 0,
            flexBasis: "auto",
          }}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ChatMain />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
