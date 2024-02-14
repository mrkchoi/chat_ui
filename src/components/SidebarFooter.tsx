"use client";

import Link from "next/link";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { useStore } from "@/app/App";

function SidebarFooter() {
  const { panelOpen, setPanelOpen } = useStore();

  return panelOpen ? (
    <div className="flex w-full items-center justify-start p-6 pl-8">
      <Link href="#" onClick={() => setPanelOpen(false)} className="py-[6px]">
        <PanelLeftCloseIcon
          size={20}
          className="text-gray-500 transition-colors hover:text-black"
        />
      </Link>
    </div>
  ) : (
    <div className="flex w-full items-center justify-center p-6">
      <Link href="#" onClick={() => setPanelOpen(true)} className="py-[6px]">
        <PanelLeftOpenIcon
          size={20}
          className="text-gray-500 transition-colors hover:text-black"
        />
      </Link>
    </div>
  );
}

export default SidebarFooter;
