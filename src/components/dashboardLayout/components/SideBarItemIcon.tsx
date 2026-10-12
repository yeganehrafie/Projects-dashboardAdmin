"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { menuItems } from "./menuService";

interface Props {
  setSideBarOpenStatus: (status: boolean) => void;
}

export default function SideBarItemIcon({ setSideBarOpenStatus }: Props) {
  return (
    <ul className="space-y-2 text-center font-bold ">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className="w-full"
        >
          <Link
            href={item.href}
            onClick={() => setSideBarOpenStatus(true)}
            className="flex items-center justify-center p-3 cursor-pointer "
            title={item.label}
          >
            <motion.div
              className="flex items-center justify-center text-[var(--sideBarItemIcon)] hover:text-[var(--notif-icon-hover)] duration-300"
            >
              {item.iconElement}
            </motion.div>
          </Link>
        </li>
      ))}
    </ul>
  );
}