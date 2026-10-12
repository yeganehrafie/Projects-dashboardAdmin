"use client"
import { Button,Box } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

export interface Props{
    title?:string;
    loading?: boolean;
    onclick?:()=>void;
}
const BtnLoginGoogle:React.FC<Props>=({title,loading,onclick})=>{
    return(
     <Box className="d-flex justify-center items-center text-center ">
         <Button
            onClick={onclick}
            fullWidth
            disabled={loading}
            className="!p-2 !rounded !rounded-md !border-gray-50 !text-md !font-medium "
        sx={{
          backgroundColor: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          color: "var(--glass-text)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "all 0.25s ease",

          "&:hover": {
            backgroundColor: "var(--glass-hover)",
            borderColor: "var(--glass-border)",
          },

          "&.Mui-disabled": {
            backgroundColor: "var(--glass-bg)",
            color: "var(--glass-text)",
            opacity: 0.5,
          },
        }}            >
          <FaGoogle className="mx-2 text-[#dc2626] " />
             {title}
         </Button>
     </Box>
    )
}
export default BtnLoginGoogle;