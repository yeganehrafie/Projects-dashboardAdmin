"use client";
import { Box } from "@mui/material";
import { menuItems } from "./menuService";
import DropdownItem from "./dropdownItem";
import SingleLinkItem from "./SingleLinkItem";
import ToolTip from "@/components/common/tooltip/ToolTip";

interface Props {
  setSideBarOpenStatus: (status: boolean) => void;
}

export default function SideBarItemIcon({ setSideBarOpenStatus }: Props) {
  return (
    <Box className="flex flex-col items-center gap-1 pt-2">
      {menuItems.map((item, index) => {
        const hasChildren = item.children.length > 0;

      if (!hasChildren) {
          return (
            <ToolTip key={index} title={item.label} placement="right-start">
              <SingleLinkItem
                item={item}
                collapsed
                onClick={() => setSideBarOpenStatus(true)}
              />
            </ToolTip>
          );
        }
      return (
          <DropdownItem
            key={index}
            item={item}
            collapsed
            onClick={() => setSideBarOpenStatus(true)}
          />
        );
      })}
    </Box>
  );
}