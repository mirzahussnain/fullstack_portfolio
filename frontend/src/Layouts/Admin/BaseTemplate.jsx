import { useContext } from "react";
import { AppContext } from "../../utils/context/store";
import SideNav from "../../components/SideNav/SideNav"; 
import { Outlet, useNavigate } from "react-router-dom";

const BaseTemplate = () => {
  const {
    sideNav: [isExpanded],
    theme: [theme],
    responseError:[err],
  } = useContext(AppContext);
  const navigateTo=useNavigate()
  return err?navigateTo('/error',{
    state:{
      error:err,
    },
    replace:true
  }):(
    <div
      className={`flex justify-start w-screen h-screen relative overflow-hidden ${
        theme !== "dark"
          ? "bg-light-4 bg-cover bg-no-repeat "
          : "bg-neutral-900 "
      }`}
    >
      <SideNav />

      <div
        className={` ${
          isExpanded
            ? "min-w-[calc(100%-250px)] max-lg:w-full mx-[1%]"
            : "min-w-[calc(100%-70px)] mx-[2%]"
        }
       h-full  flex flex-col justify-between items-start
        overflow-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default BaseTemplate;
