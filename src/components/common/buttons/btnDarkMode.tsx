"use client"
import {useContext} from "react"
import ThemeContext from "@/context/ThemeContext";
import { FaStar } from "react-icons/fa6";
import { PiMoonFill } from "react-icons/pi";

export default function BtnDarkMode(){
  const { theme, toggleTheme } = useContext(ThemeContext);

    return(
     <button onClick={toggleTheme}>{theme === "dark" ?<FaStar className="text-gray-200  font-bold text-xl"/> : <PiMoonFill className="text-amber-500 font-bold text-xl"/>}</button>
    )
}