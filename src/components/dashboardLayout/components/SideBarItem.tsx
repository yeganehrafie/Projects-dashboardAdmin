"use client";
import {useContext,useState} from "react";
import AppContext,{ContextType} from "@/context/AppContext";
import BtnClosed from "@/components/common/buttons/btnClosed";
import { menuItems } from "./menuService";  
import SingleLinkItem from "./SingleLinkItem";
import DropdownItem from "./dropdownItem";
import { Box } from "@mui/material";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export default function SideBarItem() {
  const{setIsOpen}:ContextType=useContext(AppContext);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3 text-gray-600 font-bold overflow-x-hidden ">
    <Box className="flex justify-between items-center mx-2">
      <div className="icon flex items-center space-x-4">
          <span className="text-md font-semibold bg-gradient-to-r 
          from-[#dc2626] to-[#FF894C] bg-clip-text text-transparent mt-3">
           ADMIN
        </span>
        <MdOutlineAdminPanelSettings className="text-2xl text-[#dc2626]"/>
    </div>
      <div className="close block  md:hidden">
          <BtnClosed onClose={() => setIsOpen(false)} />
      </div> 
    </Box>
      
     <span className="block h-[1px] w-full bg-gray-400"></span>

      {menuItems.map((item, index) => {
        const hasChildren = item.children.length > 0;

        return hasChildren ? (
          <DropdownItem 
             key={index} 
             item={item}   
             isOpen={openIndex === index}
             onToggle={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
            />
        ) : (
          <SingleLinkItem key={index} item={item} />
        );
      })}
    </div>
  );
}