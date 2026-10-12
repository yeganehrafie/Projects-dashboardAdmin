"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "@/models/User";

export interface ContextType {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isOpen: boolean;                
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContext: ContextType = {
  user: undefined,
  setUser: () => {},
  isOpen: true,
  setIsOpen: () => {},
};

const AppContext = createContext<ContextType>(defaultContext);

//provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true; 
    const saved = localStorage.getItem("isOpen");
    return saved ? JSON.parse(saved) : true;
  });

  return (
    <AppContext.Provider value={{ user, setUser, isOpen, setIsOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;