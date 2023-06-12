import React, { useContext, } from "react";
import { useMediaQuery } from "react-responsive";


interface AppContext {
  
  isMobileView: boolean;
  isHalfWidth: boolean;
 
}

export const AppContext = React.createContext<AppContext>({
 
  isMobileView: false,
  isHalfWidth: false,
 
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobileView = useMediaQuery({ query: "(max-width: 639px)" });
  const isHalfWidth = useMediaQuery({ query: "(max-width: 800px) " });
  


 
  return <AppContext.Provider value={{ isMobileView, isHalfWidth, }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("useAppContext must be used within a AppProvider");
  return context;
};

export { useAppContext };
export default AppProvider;