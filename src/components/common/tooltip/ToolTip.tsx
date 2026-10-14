
"use client";
import { Tooltip ,Button} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactElement;
  placement?: "top" | "bottom" |"left-start" | "right-start";
}

export default function ToolTip({
  title,
  children,
  placement,
}: Props) {
   return (
    <Tooltip placement={placement} title={title ?? ""} describeChild   
     slotProps={{
        tooltip: {
          sx: {
           marginTop:"35px",
           fontSize:"15px",
           background:"var(--lable-sidebar)",
           color:"var(--sideBarItemIcon)"
          },
        },
      }}>
      <Button>{children}</Button>
    </Tooltip>
  );
}