import { useContext, useState } from "react";
import { AppContext } from "../../utils/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisV, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
const AdminHeader = ({ title }) => {
  const {
    theme: [theme],
    sideNav: [isExpanded, setIsExpanded],
    authenticated: [, setIsAuthenticated],
    userData: [userData],
  } = useContext(AppContext);

  const [toggleLogoutMenu, setToggleLogoutMenu] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}logout`, {
        withCredentials: true,
      });

      
      if(response?.status===200){
        setTimeout(()=>{
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);

        },[2000])
        toast.success(response?.data?.message);
        
      }
      else{
        throw new Error(response?.error?.data?.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-[145px]  px-2 flex justify-between items-center relative">
        <div className={` h-[90px] flex justify-between items-center `}>
          <button
            className={` absolute z-20 w-[15px] h-[30px] text-center ${
              isExpanded ? "left-52" : "left-0"
            }}
      ${
        theme === "dark"
          ? "text-white/90 hover:text-white"
          : " text-black/90 hover:text-black"
      } 
      rounded-l-xl transition-all`}
            onClick={() => setIsExpanded((curr) => !curr)}
          >
            {isExpanded ? (
              <FontAwesomeIcon icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>

        <div
          className={`w-full h-full flex flex-col justify-center items-start 
            ${theme === "dark" ? "text-fuchsia-600" : "text-teal-600"}`}
        >
          <h1 className={`ml-10 font-extrabold text-2xl font-OpenSans`}>
            {title}
          </h1>
          <span
            className={`ml-4 px-7 text-xs tracking-tight font-semi 
        ${theme === "dark" ? "text-gray-200" : "text-gray-700"} `}
          >
            {new Date().toDateString()}
          </span>
        </div>

        <div className={`w-full flex justify-end items-center `}>
          <div
            className={
              title !== "Dashboard"
                ? `hidden`
                : `w-[48px] h-[48px] max-md:w-[38px] max-md:h-[38px] max-md:p-[0px] max-md:border-none rounded-full 
              border-2 p-[1px]  
              ${
                theme === "dark"
                  ? "bg-purple-500 border-purple-300"
                  : "border-green-300 bg-green-500"
              }`
            }
          >
            <img
              src={userData?.about?.avatar?.url}
              className={`object-cover rounded-full max-md:border-b-green-500`}
              alt="Profile Pic"
            />
          </div>
          <button
            className={`ml-5 ${
              theme === "dark" ? "text-white" : "text-zinc-700"
            }`}
            type="button"
            onClick={() => setToggleLogoutMenu(!toggleLogoutMenu)}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
        <div
          className={`absolute top-[18px] right-3 h-8 w-24 rounded-l-md rounded-tr-md p-1 font-semibold text-center
        ${
          theme === "dark"
            ? "bg-neutral-600 text-white hover:bg-neutral-800"
            : "bg-gray-100 text-gray-600 hover:bg-gray-400"
        }
        cursor-pointer tracking-wider transition-all duration-150
        ${!toggleLogoutMenu && "hidden"}`}
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
