import AdminHeader from "../../../components/Headers/AdminHeader";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/context/store";
import useFetchData from "../../../utils/hooks/useFetchData";
import Loader from "../../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEdit, faParagraph, faSubscript, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
const AboutMe = () => {
  const { data,error } = useFetchData(`${BASE_URL}admin/dashboard`);
  const [aboutData, setAboutData] = useState({ } );
  const [isEditable, setIsEditable] = useState(false);
  const {
    theme: [theme],
    sideNav: [isExpanded],
    loader: [isLoading, setIsLoading],
    responseError:[,setError]
  } = useContext(AppContext);
  const navigateTo = useNavigate();
 
 
  const handleDataChange=(e)=>{
    e.preventDefault();
    const {name,value,files}=e.target
    if(name.includes("avatar")){
      const reader=new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload=()=>{
        if(reader.readyState===2){
          setAboutData({
            ...aboutData,
            avatar:reader.result
          })
        }
      }
    }
    else{
      setAboutData({
        ...aboutData,
        [name]:value
      })
    }
  }

  const updateAbout=async(e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const response=await axios.put(`${BASE_URL}admin/about/update`,
      aboutData,
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials: true
      })

      toast.success(response.data.message)
      setAboutData({
        name: "",
        title: "",
        subtitle: "",
        quote: "",
        description: "",
        avatar:""
      })
    } catch (error) {
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
      setIsLoading(false)
    }
  }
 
 useEffect(()=>{
  setAboutData({
    name:data?.user?.about?.name||"",
    title:data?.user?.about?.title||"",
    subtitle:data?.user?.about?.subtitle||"",
    quote:data?.user?.about?.quote||"",
    description:data?.user?.about?.description||"",
    avatar:data?.user?.about?.avatar||""
  })
 },[data])

  return isLoading ? (
    <Loader />
  ) :error?setError(error): (
    <div className="w-full flex flex-col justify-start items-start h-screen px-10">
      <AdminHeader title={"About Me"} />
      <div
        className={`relative w-full h-full p-3 ${
          theme === "dark" ? "bg-black/80 text-white" : "bg-white/40 text-black"
        } rounded-t-2xl flex flex-col justify-center items-center`}
      >
      {isEditable?( 
        <div
        className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
  items-center p-2 ${isExpanded?'-left-12 max-lg:left-0':null} my-4 focus-within:border-b-2 
  ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
  relative transition-colors duration-300`}
      >
        
        <button className={`${theme==='dark'?'bg-gradient-to-r from-purple-400 to-purple-600'
        :'bg-gradient-to-r from-teal-300 to-teal-600'}
        max-lg:w-[48px] px-1
        rounded-lg w-[90px] h-[34px]   text-xs tracking-wide absolute -right-2 top-0`}
        type='button'
        id='imageButton'
        onClick={()=>{document.getElementById('avatar').click()}}>Select Image</button>
        <input
          id="avatar"
          type="file"
          name="avatar"
          placeholder="Select Avatar"
          autoComplete="off"
          accept='image/*'
          className={`ml-2 w-[250px] placeholder-transparent peer outline-none  bg-transparent imageButton`}
          onChange={(e)=>handleDataChange(e)}
          />
         
        <label
          htmlFor="avatar"
          className={`${
            theme === "dark"
              ? "text-purple-600 font-bold"
              : "text-green-700"
          } 
  cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
  peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
  transition-all`}
        >
          Avatar
        </label>
      </div> ):
      ( <div
        className={`w-[160px] h-[200px] mt-2  border-gray-500 bg-white border rounded-full text-white`}
      >
        <img
        className={`object-cover w-[160px] h-[160px] rounded-full`}
        src={aboutData?.avatar?.url}
        alt="Profile Pic"
      />
     
      </div>)}
       
       
        <hr
          className={`${theme === "dark" ? "bg-purple-500" : "bg-teal-500  "} 
         h-1 w-full mt-4`}
        />

        <div
          className={`w-full h-full mt-2 p-5  flex justify-evenly items-center flex-wrap
          ${
            isEditable
              ? "bg-transparent"
              : `${
                  theme === "dark"
                    ? "bg-neutral-800/30 rounded-lg"
                    : "bg-zinc-500/70 rounded-lg"
                }`
          }`}
        >
          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
          p-2 my-2 focus-within:border-b-2 
           ${
             isEditable
               ? `${
                   theme === "dark"
                     ? "border-b-purple-600"
                     : "border-b-green-700"
                 } `
               : `${
                   theme === "dark"
                     ? "border-b-gray-600 text-gray-700/40"
                     : "border-b-gray-400 text-gray-900/60"
                 }`
           }
          relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faBook} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            {isEditable ? (
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                value={aboutData?.name}
                autoComplete="off"
                onChange={(e)=>handleDataChange(e)}
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            ) : (
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                value={aboutData?.name}
                disabled
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            )}
            <label
              htmlFor="name"
              className={`${
                theme === "dark"
                  ? `${isEditable && "text-purple-600 font-bold"}`
                  : `${isEditable && "text-green-700 font-bold"}`
              } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
            >
              Name
            </label>
          </div>
          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
p-2 my-2 focus-within:border-b-2 
 ${
   isEditable
     ? `${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} `
     : `${
         theme === "dark"
           ? "border-b-gray-600 text-gray-700/40"
           : "border-b-gray-400 text-gray-900/60"
       }`
 }
relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faBook} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            {isEditable ? (
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Title"
                value={aboutData?.title}
                required
                onChange={(e)=>handleDataChange(e)}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            ) : (
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Title"
                required
                disabled
                value={aboutData?.title}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            )}
            <label
              htmlFor="title"
              className={`${
                theme === "dark"
                  ? `${isEditable && "text-purple-600 font-bold"}`
                  : `${isEditable && "text-green-700 font-bold"}`
              } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
            >
              Title
            </label>
          </div>

          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
          p-2 my-2 focus-within:border-b-2 
           ${
             isEditable
               ? `${
                   theme === "dark"
                     ? "border-b-purple-600"
                     : "border-b-green-700"
                 } `
               : `${
                   theme === "dark"
                     ? "border-b-gray-600 text-gray-700/40"
                     : "border-b-gray-400 text-gray-900/60"
                 }`
           }
          relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faSubscript} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            {isEditable ? (
              <input
                id="subtitle"
                type="text"
                name="subtitle"
                placeholder="Enter Subtitle"
                value={aboutData?.subtitle}
                required
                onChange={(e)=>handleDataChange(e)}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            ) : (
              <input
                id="subtitle"
                type="text"
                name="subtitle"
                placeholder="Enter Subtitle"
                value={aboutData?.subtitle}
                required
                disabled
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            )}
            <label
              htmlFor="subtitle"
              className={`${
                theme === "dark"
                  ? `${isEditable && "text-purple-600 font-bold"}`
                  : `${isEditable && "text-green-700 font-bold"}`
              } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
            >
              SubTitle
            </label>
          </div>

          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
p-2 my-2 focus-within:border-b-2 
 ${
   isEditable
     ? `${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} `
     : `${
         theme === "dark"
           ? "border-b-gray-600 text-gray-700/40"
           : "border-b-gray-400 text-gray-900/60"
       }`
 }
relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faParagraph} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            {isEditable ? (
              <input
                id="quote"
                type="text"
                name="quote"
                placeholder="Enter Quote"
                value={aboutData?.quote}
                onChange={(e)=>handleDataChange(e)}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            ) : (
              <input
                id="quote"
                type="text"
                name="quote"
                placeholder="Enter Quote"
                required
                value={aboutData?.quote}
                disabled
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            )}
            <label
              htmlFor="quote"
              className={`${
                theme === "dark"
                  ? `${isEditable && "text-purple-600 font-bold"}`
                  : `${isEditable && "text-green-700 font-bold"}`
              } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
            >
              Quote
            </label>
          </div>

          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
        p-2 my-2 focus-within:border-b-2 
         ${
           isEditable
             ? `${
                 theme === "dark" ? "border-b-purple-600" : "border-b-green-700"
               } `
             : `${
                 theme === "dark"
                   ? "border-b-gray-600 text-gray-700/40"
                   : "border-b-gray-400 text-gray-900/60"
               }`
         }
        relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faPagelines} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            {isEditable ? (
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Enter Description"
                required
                value={aboutData?.description}
                onChange={(e)=>handleDataChange(e)}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            ) : (
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Enter Description"
                required
                disabled
                value={aboutData?.description}
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              />
            )}
            <label
              htmlFor="description"
              className={`${
                theme === "dark"
                  ? `${isEditable && "text-purple-600 font-bold"}`
                  : `${isEditable && "text-green-700 font-bold"}`
              } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
            >
              Description
            </label>
          </div>
        </div>
        <button
          className={`mt-2 w-44 h-11 p-2
        ${
          theme === "dark"
            ? "bg-purple-500 hover:bg-purple-700"
            : "bg-teal-500 hover:bg-teal-700"
        } 
        text-white rounded-md font-semibold
        ${isEditable ? "visible" : "hidden"}`}
        onClick={(e)=>updateAbout(e)}
        >
          Update
        </button>

        <button
          className={`absolute top-0 right-0 w-10 h-10 p-2 ${
            theme === "dark" ? "text-white" : "text-gray-500"
          } 
rounded-xl hover:text-green-600`}
          onClick={() => {setIsEditable(!isEditable)
          navigateTo('/admin/about')
          }}
        >
          {isEditable ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faEdit} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
