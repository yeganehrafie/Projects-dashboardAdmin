"use client"
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppContext, { ContextType } from "@/context/AppContext";
import { FormControl,Box ,Typography} from "@mui/material";
import { IoEyeOffSharp ,IoEyeSharp} from "react-icons/io5";
import BtnLogin from "@/components/common/buttons/btnLogin";
import BtnLoginGoogle from "@/components/common/buttons/btnLoginGoogle";
import TextField from "@/components/common/input/TextField";
import Logo from "@/components/common/logo/Logo";
import BtnDarkMode from "@/components/common/buttons/btnDarkMode";
interface Errors {
  username?: string;
  password?: string;
}
export default function Login() {

    const {user, setUser }: ContextType = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass,setShowPass]=useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const router=useRouter();

    const handelShowPass=()=>{
      setShowPass(!showPass)
    }


    const handelValidateInput=()=>{
        const newError:Errors={};
        if(username.trim()===""){
            newError.username="نام کاربری را وارد نمایید"
        }
         if(password.trim()===""){
            newError.password="رمز عبور را وارد نمایید"
        }
       setErrors(newError);
       return Object.keys(newError).length===0;
    }
    const handelLogin=()=>{
      // if(!handelValidateInput) return ;
      router.push("/dashboard")      
    }

   
return (
    <>
<div className="relative ">
  <div className="absolute top-4 left-8">
    <BtnDarkMode />
  </div>
 <div className="min-h-screen flex items-center justify-center px-4">
    <FormControl className="formControl !rounded !rounded-lg !px-4 !py-2 !max-w-xl !w-3/6 !space-y-4">
      <div className="logo d-flex mx-auto items-center justify-center">
         <Logo/>
      </div>
        <Typography variant="h6"className="typography-h6 !text-md !font-semibod !tracking-wide !text-center ">
                 کاربر عزیز برای دسترسی به داشبرد ادمین وارد شوید
        </Typography>
        <TextField
         label="نام کاربری"
         type="text"
         error={!!errors.username}
         placeholder="مثال:yeganeh"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}
         />
         
        <TextField
         label="رمز عبور"
         type={showPass?"text":"password"}
         error={!!errors.password}
         placeholder="مثال:1333333"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         onIconClick={handelShowPass} 
         icon={showPass?<IoEyeSharp onClick={()=>setShowPass(false)}/>:<IoEyeOffSharp onClick={()=>setShowPass(true)}/>}
         />
        <Link href="" className="text-xs font-bold link-color  ">فراموشی رمز عبور</Link>
         <div className="btn space-y-2">
              <BtnLogin onclick={handelLogin} title="ورود"/>
            <Box className="flex items-center gap-2">
              <span className="h-[1px] flex-1 bg-gray-300"></span>
              <span className="text-gray-600">&</span>
              <span className="h-[1px] flex-1 bg-gray-300"></span>
            </Box>
              <BtnLoginGoogle title="ورود با اکانت گوگل"/>
         </div>
    </FormControl>
      </div>   

    </div>
 
    </>

    )
}