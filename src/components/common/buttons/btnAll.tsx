"use client"
import { Button,Box } from "@mui/material";

export interface Props{
    title?:string;
    loading?: boolean;
    onclick?:()=>void;
}
const BtnAll:React.FC<Props>=({title,loading,onclick})=>{
    return(
     <Box className="d-flex justify-center items-center text-center">
         <Button
            onClick={onclick}
            fullWidth
            disabled={loading}
            className="!bg-[#dc2626] hover:!bg-[#F54D42] !duration-500  !text-gray-50 !text-lg !font-medium !w-72">
             {title}
         </Button>
     </Box>
    )
}
export default BtnAll;