import { useContext,useEffect,useState } from "react";
import {
  dark_mode as dark,
  light_mode as light,
} from "../../../utils/theme/ThemePack";
import { AppContext } from "../../../utils/context/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggler from "../../../components/ThemeToggler/ThemeToggler";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const Login = () => {
  const {theme:[theme]}=useContext(AppContext)
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const {authenticated:[isAuthenticated,setIsAuthenticated]}=useContext(AppContext)
  const [loginButtonText,setLoginButtonText]=useState("Sign In")
  const [toggleShowPassword,setToggleShowPassword]=useState(false)
  const navigateTo=useNavigate()

  const handleChange=(e)=>{
    e.preventDefault()
    if(e.target.name==='email'){
      setEmail(e.target.value)
    }
    else{
      setPassword(e.target.value)
    }
  }

  const handleSubmit=async (e)=>{
   e.preventDefault()
   setLoginButtonText('Waiting...')
   try {
    const response=await axios.post(`${BASE_URL}login`,{
      email:email,
      password:password
     },{
      withCredentials:true
     })

     const {message}=await response.data
     toast.success(message,{
      icon:"🎉",
     })
     setTimeout(()=>{
       localStorage.setItem('isAuthenticated','true')
       setIsAuthenticated(localStorage.getItem('isAuthenticated')==='true')

     },2000)

    
     
    
   } catch (error) {
    setIsAuthenticated(false)
    if (error.response) {
      toast.error(error.response.data.message)
    
   }
   else if(error.request){
    toast.error("No response Received from server")
   }
   else{
    toast.error("An error occurred while setting up the request")
   }
  
  }
  finally{
    setLoginButtonText('Sign In')
  }
}

useEffect(() => {
  const checkAuthentication = () => {
    if(localStorage.getItem('isAuthenticated')==='true' && isAuthenticated){
      
      navigateTo('/admin/dashboard',{replace:true})
    }

  };

  checkAuthentication();
}, []);
  
  return (
    <>
      <div
        className={`${theme === "dark" ? "bg-black" : "bg-light-4"} 
        bg-cover h-screen w-screen flex justify-center overflow-hidden relative lg:justify-between lg:items-center`}
      >
        <div className={`h-full w-1/2  relative max-lg:hidden`}>
          <img
            src={theme === "dark" ? dark.wave_img : light.wave_img}
            className={`object-fill h-full inset-0 w-full`}
          />
          <img
            src={theme === "dark" ? dark.login_img : light.login_img}
            className={`h-[300px] w-[300px] absolute bottom-[calc(100%-85%)] right-[calc(100%-91%)]`}
          />
        </div>
        <div
          className={`${
            theme === "dark"
              ? " bg-neutral-950 shadow-sm shadow-blue-200"
              : " bg-neutral-100 opacity-15 shadow-md shadow-green-500"
          }
         h-[500px] w-[500px] max-sm:w-[25rem] flex flex-col items-center justify-center px-10 m-20 rounded-lg`}
        >
          <div
            className={`inset-0 flex flex-col items-center justify-start 
            ${theme==='dark'?'text-white':'text-black'} text-4xl font-bold max-sm:text-2xl`}
          >
            <h1 className="">
              Welcome <strong>Admin!</strong>
            </h1>
            <img
              className={`w-[150px] h-[150px] my-4`}
              src={theme === "dark" ? dark.avatar_img : light.avatar_img}
            />
          </div>

          <form
            className={`w-[15rem] flex flex-col justify-center 
        items-center font-bold 
        ${theme == "dark" ? "text-zinc-300" : "text-zinc-600"}
        `}
          onSubmit={(e)=>handleSubmit(e)}>
            <div
              className={`border-b max-sm:w-full w-[350px] inline-flex justify-start items-center 
        p-2 my-2 focus-within:border-b-2 
        ${theme === "dark" ? "border-b-purple-600" : "border-b-teal-700"} 
        relative transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faUser} className={`${theme==='dark'?'text-purple-500':'text-teal-500'}`}/>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                value={email}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e)=>handleChange(e)}
                />
              <label
                htmlFor="email"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-teal-700"
                } 
        cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
        peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
        transition-all`}
              >
                Email
              </label>
            </div>

            <br />

            <div
              className={` border-b w-[350px] max-sm:w-full inline-flex justify-start 
        items-center p-2 my-4 focus-within:border-b-2 
        ${theme === "dark" ? "border-b-purple-600" : "border-b-teal-700"} 
        relative transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faLock} className={`${theme==='dark'?'text-purple-500':'text-teal-500'}`}/>
              <input
                id="password"
                type={toggleShowPassword?'text':'password'}
                name="password"
                placeholder="Enter Password"
                required
                value={password}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e)=>handleChange(e)}
                />
              <label
                htmlFor="password"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-teal-700"
                } 
        cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
        peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
        transition-all`}
              >
                Password
              </label>


              <button className={`absolute top-2 right-5
              ${theme==='dark'?'text-purple-600':'text-teal-600'}`}
              type="button"
              onClick={()=>setToggleShowPassword(!toggleShowPassword)}
              >
              <FontAwesomeIcon icon={toggleShowPassword?faEye:faEyeLowVision}/>
              </button>
           
              </div>

            <button
              type="submit"
              className={`${
                theme === "dark"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-teal-600 hover:bg-teal-700"
              }
        text-white w-[300px] max-sm:w-full p-2 mt-6 rounded-lg`}
            >
              {loginButtonText}
            </button>
          </form>
        </div>
       <ThemeToggler/>
       <Link className={`absolute top-4 left-7 cursor-pointer ${theme==='dark'?'bg-white/10 text-purple-500 hover:bg-purple-500/40':'bg-teal-400/10 text-teal-600 hover:bg-teal-400/40'}
       rounded-md p-1 font-semibold`}
       to="/">
       Home
       </Link>
      </div>
    </>
  );
};

export default Login;
