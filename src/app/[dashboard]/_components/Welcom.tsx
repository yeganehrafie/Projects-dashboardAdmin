"use client"
import { useContext } from "react";
import {Box,Typography} from "@mui/material";
import AppContext,{ContextType} from "@/context/AppContext";

export default function Welcom(){
  const {user}:ContextType=useContext(AppContext);

return(
    <Box
     className="w-full flex justify-center items-center px-4 py-4 bg-gradient-to-r from-[#3471d5] via-[#7e6f9f] to-[#c86d6e]
    rounded-md shadow-md
  "
>
  <Typography
    variant="h6"
    className="!text-[#ededed] !font-semibold !text-center !leading-relaxed !tracking-wide"
  >
    {user?.userName || "یگانه"} عزیز، به داشبورد ادمین خوش آمدی 👋
  </Typography>
</Box>
    )
}