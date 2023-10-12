import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { Sidebar_Context } from "../ContextSidebar";

export const SidebarContext = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleToggleSidebar = (item) => {
    setIsSidebarExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Sidebar_Context.Provider
      value={{ isSidebarExpanded, handleToggleSidebar }}
    >
      {children}
    </Sidebar_Context.Provider>
  );
};
