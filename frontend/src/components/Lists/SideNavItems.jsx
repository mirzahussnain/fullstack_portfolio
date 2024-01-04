import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faDashboard,
  faCogs,
  faSchool,
  faHistory,
  faInfo,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../utils/context/store";
import { NavLink } from "react-router-dom";
import { handleThemeToggle } from "../../utils/theme/ThemeUtils";
import { dark_mode, light_mode } from "../../utils/theme/ThemePack";

const SideBarItems = () => {
  const {
    theme: [theme, setTheme],
    sideNav: [isExpanded],
  } = useContext(AppContext);

  const sideNavItems = [
    { icon: faDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: faProjectDiagram, label: "Projects", path: "/admin/projects" },
    { icon: faSchool, label: "Education", path: "/admin/educations" },
    { icon: faCogs, label: "Skills", path: "/admin/skills" },
    { icon: faHistory, label: "Experience", path: "/admin/experiences" },
    { icon: faInfo, label: "About", path: "/admin/about" },
  ];

  return (
    <>
      <div
        className={`w-full h-full flex flex-col max-lg:overflow-auto ${
          !isExpanded && "hidden"
        }`}
      >
        {sideNavItems.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full  mb-1 h-full ${
                    theme === "dark"
                      ? "text-purple-500 bg-neutral-300 shadow-md shadow-purple-500 hover:text-white"
                      : "text-green-400 bg-white hover:text-black shadow-md shadow-teal-700 "
                  }`;
                } else {
                  return `w-full h-full bg-transparent text-white`;
                }
              }}
            >
              <div
                className={`cursor-pointer w-full h-full flex items-center justify-center ${
                  theme === "dark"
                    ? "hover:text-purple-500 hover:bg-neutral-300"
                    : "hover:text-green-400 hover:bg-white"
                }`}
              >
                <div className={`w-[195px] h-full text-end py-3 px-2`}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className={`w-full h-full p-3`}>
                  <span>{item.label}</span>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      <div
        className={`h-[60px] max-lg:h-[60px] max-lg:rounded-br-lg ${
          isExpanded ? "w-full" : "hidden"
        } flex flex-col justify-between items-center bg-slate-700`}
      >
        <div
          className={`h-full w-full inline-flex justify-center items-center text-white hover:font-bold hover:bg-white ${
            theme === "dark"
              ? "hover:bg-neutral-300 hover:text-purple-500"
              : "hover:text-green-400 hover:bg-white"
          } cursor-pointer transition-all duration-200`}
          onClick={() => setTheme(handleThemeToggle(theme))}
        >
          <h2 className={`mr-2`}>
            {theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
          </h2>
          <FontAwesomeIcon icon={theme==='dark'?faSun:faMoon}
          className={`w-[20px] h-[20px] rounded-full transition-transform duration-500
          ${
            theme === "dark" ? "rotate-0 text-yellow-500" : "rotate-180 text-zinc-500"
          }`}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarItems;
