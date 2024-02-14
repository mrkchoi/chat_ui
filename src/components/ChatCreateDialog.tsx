"use client";

import Link from "next/link";
import { USERS } from "@/lib/data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { SquarePen, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "@/app/App";

function ChatCreateDialog() {
  const {
    chatData,
    setChatData,
    setSelectedChatId,
    openDialog,
    setOpenDialog,
    openDialogPopover,
    setOpenDialogPopover,
    newChatUser,
    setNewChatUser,
  } = useStore();

  const createNewChat = () => {
    if (newChatUser.userId && newChatUser.userName) {
      const newMessageId = uuidv4();
      const newChatData = {
        chatId: newMessageId,
        userName: newChatUser.userName as string,
        avatar: newChatUser.avatar as string,
        messages: [],
      };
      setChatData([...chatData, newChatData]);
      setSelectedChatId(newChatData.chatId);
      setOpenDialogPopover(false);
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Link href="#">
          <SquarePen
            size={20}
            className="text-gray-500 transition-colors hover:text-black"
          />
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new chat</DialogTitle>
          <DialogDescription>
            You can create a new chat with anyone in your contacts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Popover open={openDialogPopover} onOpenChange={setOpenDialogPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDialogPopover}
                className="flex h-[3rem] w-[200px] items-center justify-between"
              >
                {newChatUser?.userName ? (
                  <>
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={newChatUser.avatar}
                        alt={newChatUser.userName}
                      />
                      <AvatarFallback>{newChatUser.userName[0]}</AvatarFallback>
                    </Avatar>
                    {newChatUser.userName}
                  </>
                ) : (
                  "Select a contact..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search contacts..." />
                <CommandEmpty>No matching users found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-scroll">
                  {USERS.map((user) => (
                    <CommandItem
                      key={user.userId}
                      value={user.userName}
                      onSelect={() => {
                        setNewChatUser(
                          newChatUser.userName === user.userName ? {} : user,
                        );
                        setOpenDialogPopover(false);
                      }}
                    >
                      <Avatar className="mr-2">
                        <AvatarImage src={user.avatar} alt={user.userName} />
                        <AvatarFallback>{user.userName[0]}</AvatarFallback>
                      </Avatar>
                      {user.userName}
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          newChatUser?.userName === user.userName
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createNewChat}>
            Create chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatCreateDialog;
