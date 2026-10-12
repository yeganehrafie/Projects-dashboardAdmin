"use client"
import { TextField as MuiTextField  } from "@mui/material";

interface Props{
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?:()=>void;
  type?: string;
  error?: boolean;
  helperText?: string;
}
const TextField =({
  label,
  icon,
  placeholder,
  isRequired,
  value,
  onChange,
  type,
  error,
  helperText,
  onIconClick,
}: Props)=>{
    return( 
        <>
    <MuiTextField
      fullWidth
      label={label}
      placeholder={placeholder}
      required={isRequired}
      value={value}
      onChange={onChange}
      type={type}
      helperText={helperText}
      variant="outlined"
      slotProps={{
      input: {
      startAdornment: icon ? (
          <span 
            onClick={onIconClick}
            className="flex items-center text-gray-400 cursor-pointer mr-2">
              {icon}
            </span>
      ) : undefined,
           sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border-focused)",
              borderWidth: "2px",
            },
            "& input": {
              direction: "ltr",
              textAlign: "left",
              color: "var(--foreground)",
            },
            "& input::placeholder": {
              textAlign: "left",
              color: "var(--text_gray)",
              opacity: 0.7,
            },
          },
        },
        inputLabel: {
          sx: {
            color: "var(--input-label)",
            "&.Mui-focused": {
              color: "var(--input-label-focused)",
            },
          },
        },
  }}/>
    {error && (
        <div
          className="text-red-500 mt-1 text-start text-md font-normal ">
          {error}
        </div>
      )}
          
        </>
  
    );
    
}
export default TextField
