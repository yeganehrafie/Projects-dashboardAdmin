"use client";
import { useCallback, useContext } from "react";
import { motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { HiBars3 } from "react-icons/hi2";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import AppContext, { ContextType } from "@/context/AppContext";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import BtnDarkMode from "@/components/common/buttons/btnDarkMode";
import SearchBar from "./SearchBar";
const TOPBAR_HEIGHT = 50;
const EASE = cubicBezier(0.16, 1, 0.3, 1);

export default function TopBar() {
  const {setIsOpen }: ContextType = useContext(AppContext);

 const handleToggleSidebar = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    },
    [setIsOpen]
);
  // if (!user) return null;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component={motion.header}
      initial={{ y: -TOPBAR_HEIGHT, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        height: TOPBAR_HEIGHT,
        backgroundColor: "var(--form-bg)",
        color: "text.primary",
        borderBottom: "1px solid var(--form-border)",
        boxShadow: "var(--topbar-shadow)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: `${TOPBAR_HEIGHT}px !important`,
          height: TOPBAR_HEIGHT,
          gap: 1,
          px: 1,
        }}
      >
        <IconButton
          component={motion.button}
          onClick={handleToggleSidebar}
          data-ignore-outside-click
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="باز و بسته کردن منو"
          sx={{
          color: "var(--notif-icon)",
          "&:hover": { color: "var(--notif-icon-hover)" },
          transition: "color 0.2s",
        }}
        >
          <HiBars3 size={24} />
        </IconButton>
<div className="flex items-center justify-between w-full gap-4">
  <div className="topbar_rtl flex-1 max-w-md">
    <SearchBar />
  </div>

  <div className="topbar_ltr flex items-center space-x-4">
    <Notifications />
    <UserProfile />
    <BtnDarkMode />
  </div>
</div>
     
      </Toolbar>
    </AppBar>
  );
}