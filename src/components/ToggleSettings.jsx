import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const PageToggle = createContext();

export const ToggletSettings = ({ children }) => {
  //   const [pageTitle, setPageTitle] = useState("Default Title");
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.innerWidth >= 768);

  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);

  return (
    <PageToggle.Provider value={{ isSideBarOpen, toggleSideBar }}>
      {children}
    </PageToggle.Provider>
  );
};

ToggletSettings.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePageToggle = () => useContext(PageToggle);
