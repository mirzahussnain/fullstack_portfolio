import React, { useContext } from 'react'
import { AppContext } from '../../utils/context/store'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import { Navigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const BASE_URL=import.meta.env.VITE_REACT_APP_SERVER_BASE_URL
const DeleteConfirmation = ({title,id,setIdToDelete}) => {
  const {theme:[theme],loader:[isLoading,setIsLoading]}=useContext(AppContext)

  const handleDelete=async(e)=>{
    e.preventDefault()
    try {
        setIsLoading(true)
        const response=await axios.delete(`${BASE_URL}admin/${title.toLowerCase()}/delete/${id}`,
        {
            withCredentials:true
        })
        if(response.status===200){
            setIdToDelete(null)
            alert(response.data.message)
            
            return <Navigate to={`/admin/${title.toLowerCase()}s`}/>
            
            
            
        }
        
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500).
       toast.error(error.response.data.message || "An error occurred")
         
      } else if (error.request) {
        // The request was made but no response was received.
        toast.error("No response received from the server")
       
      } else {
        // Something happened in setting up the request that triggered an Error.
        toast.error("An error occurred while setting up the request")
      }
    }
    finally{
        setIsLoading(false)
    }
   } 
  
  return isLoading?<Loader/>:id && (
    <>
    <div className={`absolute p-3 top-[calc(100%-80%)] left-[calc(100%-70%)]
    max-md:top-2 max-md:left-8 rounded-xl
    max-md:p-0
    ${theme==='dark'?'bg-gradient-to-r from-purple-500 to-purple-600 shadow-purple-400'
    :'bg-gradient-to-r from-teal-400 to-teal-500 shadow-teal-400'}
    w-[400px] h-[120px] max-md:w-[250px] max-sm:w-[200px] text-white 
    flex flex-col justify-center items-center shadow-lg`}>
    <h1 className='max-md:text-center font-semibold'>Are you sure you want to delete this {title}?</h1>
   <div className={`flex justify-center items-center mt-8`}>
   <button className={`w-[80px] h-[25px] p-0
   ${theme==='dark'?'bg-purple-400/40  hover:bg-purple-600'
   :'bg-teal-400/40 hover:bg-teal-600 '}
   text-white rounded-xl`}
   onClick={(e)=>handleDelete(e)}>Yes</button>
   <button className={`w-[80px] h-[25px] p-0 ml-10
   ${theme==='dark'?'bg-purple-400/40  hover:bg-purple-600'
   :'bg-teal-400/40 hover:bg-teal-600 '}
   text-white rounded-xl`}
   onClick={()=>setIdToDelete(null)}>No</button>
   </div>
    </div>
    </>
  )
}

export default DeleteConfirmation