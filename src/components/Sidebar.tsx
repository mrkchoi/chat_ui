"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <SidebarHeader />
      <SidebarMain />
      <SidebarFooter />
    </div>
  );
}

export default Sidebar;
