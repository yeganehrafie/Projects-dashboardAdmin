import { HiHome, HiUsers } from "react-icons/hi2";

export interface MenuItem {
  label: string;
  href: string;
  main: string;
  iconElement?: React.ReactNode;
  children: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    label: "داشبورد",
    href: "/dashboard",
    main: "dashboard",
    iconElement: <HiHome size={18} />,
    children: [],
  },
  {
    label: "آیتم",
    href: "",
    main: "item",
    iconElement: <HiUsers size={18} />,
    children: [
      { label: "ایتم یک", href: "/items/list", main: "items-list", children: [] },
      { label: "ایتم دو", href: "/items/add", main: "items-add", children: [] },
    ],
  },
];