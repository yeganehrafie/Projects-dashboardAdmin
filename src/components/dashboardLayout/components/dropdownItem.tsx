"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HiChevronLeft } from "react-icons/hi2";
import { MenuItem } from "./menuService";
import { Box, Popover } from "@mui/material";

interface Props {
  item: MenuItem;
  collapsed?: boolean;
  isOpen?: boolean;              
  onToggle?: () => void;          
  onClick?: () => void;
}

export default function DropdownItem({ item, collapsed,isOpen,onToggle}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pathname = usePathname();

  const isItemActive =
    pathname.split("/")[2] === item.main ||
    pathname.split("/")[4] === item.main;

  // ───────────── حالت 64px ─────────────
  if (collapsed) {
    return (
      <>
        <Box
          onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
          className={`
            flex items-center justify-center p-3 cursor-pointer
            transition-colors duration-300 group 
            ${
              isItemActive
                ? "text-[var(--sideBarItemIcon)] "
                : "text-[var(--sideBarItemIcon)] group-hover:text-[var(--text-color-sidebar)]"
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
        </Box>

        {/*  Popover — زیر منو را  موقعیت رو مدیریت می‌کنه */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
          transformOrigin={{ vertical: "center", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                ml: 1,
                minWidth: 180,
                border: "1px solid var(--form-border)",
                borderRadius: 2,
                boxShadow: "var(--topbar-shadow)",
                background: "var(--background)",
                overflow: "hidden",
              },
            },
          }}
        >
          <Box className="p-2">
            {/* <p className="text-xs font-bold text-[var(--sideBarItemIcon)] px-2 py-1 border-b border-[var(--form-border)] mb-1">
              {item.label}
            </p> */}
            {item.children.map((child, childIndex) => {
              const isChildActive = pathname.includes(child.href);
              return (
                <Link
                  key={childIndex}
                  href={child.href}
                  onClick={() => setAnchorEl(null)}
                  className={`
                    block p-2 rounded-md text-sm transition-colors font-semibold 
                    ${
                      isChildActive
                        ? "bg-[var(--lable-sidebar)] text-[var(--notif-icon-hover)]"
                        : "text-[var(--sideBarItemIcon)]  hover:text-[var(--notif-icon-hover)] hover:bg-[var(--lable-sidebar)]"
                    }
                  `}
                >
                  {child.label}
                </Link>
              );
            })}
          </Box>
        </Popover>
      </>
    );
  }

  // ───────────── حالت 240px ─────────────
  return (
    <div>
      <Link
        href="#"
        onClick={(e) => {
        e.preventDefault();
        onToggle?.();
      }}
        className={`
          flex flex-row pr-1 gap-1 p-2 cursor-pointer
          border-r-2 transition-colors duration-300  group
          ${isItemActive ? "border-teal" : "border-transparent"}
        `}
      >
        <div className="w-fit md:text-center text-[var(--sideBarItemIcon)] group-hover:text-[var(--text-color-sidebar)] duration-300">
          {item.iconElement}
        </div>
        <div className="flex-grow text-sm font-semibold text-[var(--sideBarItemIcon)] group-hover:text-[var(--text-color-sidebar)] duration-300">
          {item.label}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 90 }}
          transition={{ duration: 0.2 }}
          className="w-fit flex items-center text-gray-400"
        >
          <HiChevronLeft size={16} />
        </motion.div>
      </Link>

      <AnimatePresence initial={false}>
        {isOpen && (
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
                  key={childIndex}
                  href={child.href}
                  className={`
                    block p-2 mt-2 mx-2 pr-[30px] rounded-xs duration-200
                    hover:border-r-2 hover:border-r-[var(--border-r-sidebar)]
                    text-[var(--sideBarItemIcon)] hover:text-[var(--text-color-sidebar)]
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
}