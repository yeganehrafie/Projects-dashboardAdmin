"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { HiChevronDown, HiUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import AppContext,{ContextType} from "@/context/AppContext";
const EASE = cubicBezier(0.16, 1, 0.3, 1);

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  danger?: boolean;
  onClick?:React.ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "ویرایش پروفایل", href: "", icon: <HiUser size={18} /> },
  {
    label: "خروج",
    href: "/",
    danger:true,
    icon: <HiArrowRightOnRectangle size={18} />,
  },
];

export default function UserProfile() {
  const { user, setUser }:ContextType = useContext(AppContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);  
  const router=useRouter();

  const handleLogout=()=>{
   localStorage.removeItem("user");
   setUser("undefined");
   router.push("/login");
}
  //  بستن با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  //  بستن با Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 p-1 pl-2 rounded-lg  transition"
        aria-label="منوی کاربر"
        aria-expanded={isOpen}
      >
      <div className="icon_user user_profile">
        <FaUser className="text-sm  rounded-full h-10 w-10 p-3 border border-gray-400"/>
      </div>

        <div className="hidden md:flex flex-col items-start user_profile">
          <span className="text-sm font-bold">
            {user?.userName||"yeganeh"}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="text-gray-400"
        >
          <HiChevronDown size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl shadow-xl overflow-hidden z-50 user_profile"
          >
            <div className="px-4 py-3 border-b border-b-gray-400 bg_user_profile">
              <p className="text-sm font-bold ">
                {user?.userName ||"yeganeh"}
              </p>
              <p className="text-xs  truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>

            <ul>
              {MENU_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={()=>handleLogout()}
                    className={`menu-item-user_profile
                      flex items-center gap-3 px-4 py-2 text-sm transition font-semibold
                      ${
                        item.danger
                          ? "text-red-500 "
                          : "var(--text_gray) "
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}