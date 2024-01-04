import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AppContext } from "../../utils/context/store"

const ErrorHandler = () => {

    const {error}=useLocation().state
    const {authenticated:[,setIsAuthenticated]}=useContext(AppContext)
   
    const handleLoginError=()=>{
        
        return(
            <a href="/login">
            <button className={`text-white w-20 h-10 mt-5 bg-zinc-400 rounded-md hover:bg-black
            transition-colors duration-75`}>Login</button>
            </a>
        )
    }

    useEffect(() => {
    
        if (error?.status === 401) {
          // Move the state update out of the rendering phase
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
        }
      }, [error?.status, setIsAuthenticated]);

    
        return (
            <div className={`w-screen h-screen bg-dark bg-cover bg-no-repeat flex flex-col justify-center items-center transition-all duration-150`}>
            <h1 className='font-extrabold font-NotoSansJP text-white text-2xl'>{error?.status ||  `404` }</h1>
            <span className='font-NotoSansJP font-bold text-gray-400 text-lg'>{error?.message || `NOT FOUND` }</span>
            {
                error?.status===401
                && handleLoginError()
              
            }
            </div>
           
            )
  
  
}

export default ErrorHandler