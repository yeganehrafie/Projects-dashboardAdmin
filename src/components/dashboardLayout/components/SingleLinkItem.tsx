"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { MenuItem } from "./menuService";
interface Props {
  item: MenuItem;
  collapsed?: boolean; 
  onClick?: () => void;  
}

export default function SingleLinkItem({ item, collapsed}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pathname = usePathname();
  const isActive = pathname.split("/")[2] === item.main;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          setAnchorEl(e.currentTarget);
        }}
        className={`
          flex items-center justify-center p-3
          transition-colors duration-300
          ${
            isActive
              ? "text-[var(--notif-icon-hover)]"
              : "text-[var(--sideBarItemIcon)] hover:text-[var(--notif-icon-hover)]"
          }
        `}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center"
        >
          {item.iconElement}
        </motion.div>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={`
        flex flex-row pr-1 gap-1 p-2 cursor-pointer
        border-r-2 transition-colors duration-300 group
        ${isActive ? "border-teal" : "border-transparent"}
      `}
    >
      <div
        className="
          w-fit md:text-center
          text-[var(--sideBarItemIcon)]
          group-hover:text-[var(--text-color-sidebar)]
          duration-300
        "
      >
        {item.iconElement}
      </div>
      <div
        className="
          flex-grow text-sm font-semibold
          text-[var(--sideBarItemIcon)]
          group-hover:text-[var(--text-color-sidebar)]
          duration-300
        "
      >
        {item.label}
      </div>
    </Link>
  );
}