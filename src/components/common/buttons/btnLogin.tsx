"use client"
import { Button,Box } from "@mui/material";

export interface Props{
    title?:string;
    loading?: boolean;
    onclick?:()=>void;
}
const BtnLogin:React.FC<Props>=({title,loading,onclick})=>{
    return(
     <Box className="d-flex justify-center items-center text-center">
         <Button
            onClick={onclick}
            fullWidth
            disabled={loading}
            className="!bg-[#dc2626] !text-gray-50 !text-lg !font-medium ">
             {title}
         </Button>
     </Box>
    )
}
export default BtnLogin;