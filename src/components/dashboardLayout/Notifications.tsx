"use client";
import {useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdNotificationsNone } from "react-icons/md";
import { motion, cubicBezier, AnimatePresence } from "motion/react";
import { IconButton, Box, Badge, Typography } from "@mui/material";
import BtnAll from "@/components/common/buttons/btnAll";
interface Notification {
  id?: number;
  title: string;
  time?: string;
  desc?:string;
  img_url:string;
  unread?: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1,title:"yeganeh", desc: "کاربر جدید ثبت‌نام کرد", time: "۵ دقیقه پیش", unread: true,img_url:"/assets/10.jpg" },
  { id: 2,title:"elahe" ,desc: "سفارش جدید ثبت شد", time: "۲۰ دقیقه پیش", unread: true,img_url:"/assets/7.jpg" },
  { id: 3,title:"reza" ,desc: "گزارش هفتگی آماده شد", time: "۱ ساعت پیش",img_url:"/assets/9.jpg" },
];

const EASE = cubicBezier(0.16, 1, 0.3, 1);

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  //  بستن با کلیک روی صفحه
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
    <div ref={dropdownRef} className="relative">
      <IconButton
        component={motion.button}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="اعلان‌ها"
        aria-expanded={isOpen}
        sx={{
        color: "var(--notif-icon)",
        "&:hover": { color: "var(--notif-icon-hover)" },
        transition: "color 0.2s",
     }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <MdNotificationsNone size={24} />
        </Badge>
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 mt-2 w-80 origin-top-left rounded-xl
             bg-[var(--form-bg)] shadow-xl border border-[var(--form-border)] overflow-hidden z-50"
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid var(--form-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background:"var(--bg-dropdown)",
                color:"var(--text)"
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                اعلان‌ها
              </Typography>
              {unreadCount > 0 && (
                <Typography className="!text-sm !tracking-widest" color="error">
                  {unreadCount} خوانده‌ نشده
                </Typography>
              )}
            </Box>
            <ul className="max-h-80 overflow-y-auto py-1 bg-list-notif">
              {NOTIFICATIONS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`
                      w-full text-right px-4 py-3 transition
                      notif-map
                    `}
                  >
            <div className="flex items-start gap-3">  
                 <Image
                   src={item.img_url}
                   alt={item.title}
                   width={48}
                   height={48}
                   className="rounded-full border-2 border-gray-500 object-cover"
                 />
            <div className="flex flex-col flex-1 min-w-0">
                   <p className="text-md font-bold title-notif ">
                    {item.title}
                   </p>
                   <p className="text-xs font-medium   mt-1 line-clamp-2 p-notif">
                    {item.desc}
                    </p>
              </div>
            </div>
                    <p className="flex items-end justify-end text-xs   fomt-semibold mt-1  p-notif">{item.time}</p>
                  </button>
                </li>
              ))}
            </ul>
          <div className="btnAll py-2">
             <BtnAll title="مشاهده همه"/>
          </div>
           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}