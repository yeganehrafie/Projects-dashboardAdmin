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
 <div className="d-flex w-full h-full overflow-auto">
    <TopBar/>
    <SideBar /> 
    <main
        className="transition-[padding] duration-300"
        style={{
          paddingTop: TOPBAR_HEIGHT,
          paddingRight: isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
        }}
      >
        <div className="flex justify-center items-start w-full">
             <div className="py-4 w-[90%] max-w-full">{children}</div>
        </div>
        
      </main> 
</div>
  );
}