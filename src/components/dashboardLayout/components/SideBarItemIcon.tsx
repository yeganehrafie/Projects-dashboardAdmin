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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center "
            >
              {item.iconElement}
            </motion.div>
          </Link>
        </li>
      ))}
    </ul>
  );
}