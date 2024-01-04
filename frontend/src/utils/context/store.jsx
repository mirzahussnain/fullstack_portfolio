import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { themeChecker, windowViewWidthChecker } from "../theme/ThemeUtils";
export const AppContext = createContext();

export default ({ children }) => {
  const [theme, setTheme] = useState(themeChecker);
  const [isExpanded, setIsExpanded] = useState(windowViewWidthChecker);
  const [isLoading, setIsLoading] = useState(false);
  const [userData,setUserData]=useState({})
  const [projectWindow,setProjectWindow]=useState({state:false,project:null})
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated')==='true' || false
  );
  const [err,setError]=useState(null)

  

  const store = {
    theme: [theme, setTheme],
    sideNav: [isExpanded, setIsExpanded],
    loader: [isLoading, setIsLoading],
    authenticated: [isAuthenticated, setIsAuthenticated],
    userData:[userData,setUserData],
    projectDetails:[projectWindow,setProjectWindow],
    responseError:[err,setError]
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
