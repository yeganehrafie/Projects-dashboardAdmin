"use client";
import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier, AnimatePresence } from "motion/react";
import { IconButton } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import BtnAll from "@/components/common/buttons/btnAll";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 👆 بستن با کلیک بیرون
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



  return (
    <div ref={dropdownRef} className="relative z-40">
      <IconButton
        component={motion.button}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="سرچ"
        aria-expanded={isOpen}
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
          borderColor: "[var(--form-border)]",
          color: "var(--notif-icon)",
          "&:hover": { color: "var(--notif-icon-hover)" },
          transition: "color 0.2s, border-color 0.2s",
        }}
      >
        <BiSearch size={20} />
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute bg-input left-0 mt-2 w-80 origin-top-left rounded-xl  shadow-xl overflow-hidden z-50"
          >
            <div className="p-3  ">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <BiSearch size={18} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو کنید..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700  placeholder:text-gray-400"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="px-3 py-2 text-center">
              <BtnAll title="بستن"onclick={()=>setIsOpen(false)}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}