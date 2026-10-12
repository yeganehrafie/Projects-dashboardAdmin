"use client";

import { useContext } from "react";
import SideBar from "@/components/dashboardLayout/SideBar";
import TopBar from "@/components/dashboardLayout/TopBar";
import AppContext,{ContextType} from "@/context/AppContext";
interface Props {
  children: React.ReactNode;
}

export default function LayoutDashboard({ children }: Props) {

const TOPBAR_HEIGHT = 50;
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;
const { isOpen }:ContextType =useContext(AppContext);

  return (
 <div className="w-full h-full overflow-auto">
    <TopBar/>
    <div className="flex flex-grow h-full  overflow-auto">
        <aside>
          <SideBar /> 
        </aside>
    <main
        className="transition-[padding] duration-300"
        style={{
          paddingTop: TOPBAR_HEIGHT,
          paddingRight: isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
        }}
      >
        <div className="p-4">{children}</div>
      </main> 
     </div>
</div>
  );
}