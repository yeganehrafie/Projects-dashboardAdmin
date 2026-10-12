"use client";
import { useState, useCallback ,useContext} from "react";
import AppContext,{ContextType} from "@/context/AppContext";
import BtnClosed from "@/components/common/buttons/btnClosed";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HiChevronLeft } from "react-icons/hi2";
import { menuItems, type MenuItem } from "./menuService";  
import { Box } from "@mui/material";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export default function SideBarItem() {
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
  const pathname = usePathname();

  const{setIsOpen,isOpen}:ContextType=useContext(AppContext);;
  
  const toggleDropdown = useCallback((index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const isMenuItemActive = useCallback(
    (item: MenuItem) =>
      item.children.some(
        (child) =>
          pathname === child.href || pathname.split("/")[2] === child.main
      ),
    [pathname]
  );
  const isCollapsed = !isOpen;

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
        const isActive = isMenuItemActive(item);
        const isOpen =
          openDropdowns[index] !== undefined ? openDropdowns[index] : isActive;

        const isItemActive =
          pathname.split("/")[2] === item.main ||
          pathname.split("/")[4] === item.main;

        return (
          <div key={index}>
            
            <Link
              href={item.href}
              onClick={(e) => {
                if (item.children.length > 0) {
                  e.preventDefault();
                  toggleDropdown(index);
                }
              }}
              className={`
                flex flex-row pr-1 gap-1 p-2 cursor-pointer
                border-r-2 transition-colors duration-300
                group
                ${
                  isItemActive
                    ? "border-teal "
                    : "border-transparent "
                }
              `}
            >
              <div className="w-fit md:text-center  text-[var(--sideBarItemIcon)] 
               group-hover:text-[--text-color-sidebar] group-focus:text-[--text-color-sidebar] duration-300">
                {item.iconElement}
              </div>
              <div className="flex-grow text-sm font-semibold 
               text-[var(--sideBarItemIcon)] group-hover:text-[--text-color-sidebar] 
               group-focus:text-[--text-color-sidebar] duration-300">{item.label}</div>
               
              {item.children.length > 0 && (
                <motion.div
                  animate={{ rotate: isOpen ? 0 : 90 }}
                  transition={{ duration: 0.2 }}
                  className="w-fit flex items-center text-gray-400"
                >
                  <HiChevronLeft size={16} />
                </motion.div>
              )}
            </Link>
            <AnimatePresence initial={false}>
              {item.children.length > 0 && isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden text-right w-full text-sm space-y-2"
                >
                  {item.children.map((child, childIndex) => {
                    const isChildActive = pathname.includes(child.href);

                    return (
                      <Link
                        key={`${index}-${childIndex}`}
                        href={child.href}
                    className={`
                    block p-2 mt-2 mx-2 pr-[30px] rounded-xs duration-200 hover:border-r-2 hover:border-r-[var(--border-r-sidebar)] 
                    text-[var(--sideBarItemIcon)] hover:text-[var(--text-color-sidebar] focus:text-[var(--text-color-sidebar]
                    ${
                     isChildActive
                      ? "bg-gray-100 text-[var(--notif-icon-hover)]"
                      : "bg-transparent hover:bg-[var(--lable-sidebar)]"
                 }
              `}
              >
                        {child.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}