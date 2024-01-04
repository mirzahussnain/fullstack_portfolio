import React, { useContext } from "react";
import { dark_mode, light_mode } from "./../../utils/theme/ThemePack";
import SideBarItems from "../../components/Lists/SideNavItems";
import { AppContext } from "../../utils/context/store";
import Loader from "../../components/Loader/Loader";

const SideNav = () => {
  const {
    sideNav: [isExpanded],
    theme: [theme],
    loader:[isLoading]
  } = useContext(AppContext);
  return (
    isLoading?<Loader/>:
    <>
      <div
        className={`h-[632px] max-lg:max-h-[450px] max-md:max-h-[351px] max-lg:rounded-r-lg relative   flex flex-col  justify-between max-lg:justify-start
          ${
            theme === "dark"
              ? "bg-gradient-to-b from-purple-900 to-purple-500 shadow-purple-900"
              : "bg-gradient-to-b from-teal-600 to-teal-400 shadow-teal-400"
          }  
      shadow-md ${
        !isExpanded
          ? "w-0 max-lg:hidden"
          : isExpanded && "w-[250px] h-full max-lg:absolute max-lg:z-10"
      } transition-all `}
      >
        <div
          className={`flex flex-col  justify-center items-center ${
            isExpanded ? "w-full p-3" : "w-0 p-0"
          }
      h-[145px] max-lg:h-[100px] bg-transparent border-b`}
        >
          <img
            src={
              theme === "dark"
                ? dark_mode["portfolio-dark"]
                : light_mode["portfolio-light"]
            }
            className={`object-cover  ${
              isExpanded ? "w-[100px]" : "w-0"
            } h-[100px] max-lg:h-[60px] max-lg:w-[60px] transition-all duration-200`}
            alt="Portfolio"
          />

          <h1
            className={`${theme === "dark" ? "text-black" : "text-white"} 
   ${isExpanded ? "font-kaushan mb-3 text-lg tracking-widest" : "hidden"}`}
          >
            Portfolio
          </h1>
        </div>
        <SideBarItems />
      </div>
    </>
  );
};

export default SideNav;
