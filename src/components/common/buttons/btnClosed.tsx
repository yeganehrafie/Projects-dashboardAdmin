import { Box } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";

interface Props{
    onClose:()=>void;
}

export default function BtnClosed({ onClose }: Props) {
  
    return(
       <Box>
          <RiCloseLine
           onClick={onClose}
           className="text-md font-bold text-(var(--text_gray))  bg-[var(--lable-sidebar)] h-6 w-6 p-1 rounded-full hover:text-red-600 
           hover:scale-75 cursor-pointer duration-300"/>
       </Box>
    )
}