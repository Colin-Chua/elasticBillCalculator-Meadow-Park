import React, { useContext, useState } from "react";

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>> | ((val: boolean) => void);
}

export const SidebarContext = React.createContext<SidebarContext>({
  collapsed: true,
  setCollapsed: () => null
});

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const value = { collapsed, setCollapsed };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) throw new Error("useSidebarContext must be used within a SidebarProvider");
  return context;
};

export { useSidebarContext };
export default SidebarProvider;
