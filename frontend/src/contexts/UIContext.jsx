import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);

  return (
    <UIContext.Provider value={{ sideBarOpen, setSideBarOpen, toggleSideBar }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
