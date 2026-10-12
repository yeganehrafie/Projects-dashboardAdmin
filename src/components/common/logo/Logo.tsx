import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function Logo(){
    return(
        <div className="h-20 w-20 rounded-full shadow-sm shadow-[#dc2626] bg-gradient-to-r from-[#dc2626] to-[#FF894C] flex items-center justify-center">
            <MdOutlineAdminPanelSettings className="text-3xl text-gray-50 text-center"/>
        </div>
    )
}