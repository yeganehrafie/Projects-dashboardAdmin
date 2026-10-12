"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import AppContext, { ContextType } from "@/context/AppContext";
import { cubicBezier } from "motion/react";
import { Drawer, Box } from "@mui/material";
import SideBarItem from "@/components/dashboardLayout/components/SideBarItem"
import SideBarItemIcon from "@/components/dashboardLayout/components/SideBarItemIcon";

const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 240;
const TOPBAR_HEIGHT = 50;

const EASE = cubicBezier(0.16, 1, 0.3, 1);

export default function SideBar() {
  const {isOpen, setIsOpen }: ContextType = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  //  تشخیص موبایل
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      setIsOpen(!e.matches);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);


  //  کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobile || !isOpenRef.current) return;
      const target = event.target as HTMLElement;
      let current: HTMLElement | null = target;
      while (current) {
        if (current.hasAttribute("data-ignore-outside-click")) return;
        current = current.parentElement;
      }
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, setIsOpen]);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      variant={isMobile ? "temporary" : "persistent"}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: isOpen ? SIDEBAR_WIDTH : isMobile ? SIDEBAR_WIDTH : 64,
          top: `${TOPBAR_HEIGHT}px`,
          height: `calc(100% - ${TOPBAR_HEIGHT}px)`,
          borderLeft: "1px solid var(--form-border)",
          overflowX: "hidden",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "var(--topbar-shadow)",
          zIndex:"10",
        },
        "& .MuiBackdrop-root": {
          top: `${TOPBAR_HEIGHT}px`,
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0,0,0,0.4)" },
        },
      }}
    >
      <Box
        ref={sidebarRef}
        data-ignore-outside-click
        sx={{
          pt: 1,
          overflowY: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor:"var(--bg_form)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <SideBarItem />
            </motion.div>
          ) : (
            !isMobile && (
              <motion.div
                key="icon"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <SideBarItemIcon setSideBarOpenStatus={setIsOpen} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </Box>
    </Drawer>
  );
}