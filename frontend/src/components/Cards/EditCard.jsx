import { useState,useEffect, useContext} from "react";
import { AppContext } from "../../utils/context/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {format} from 'date-fns'
import toast from "react-hot-toast";

const BASE_URL=import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const EditCards = ({ data,title }) => {
  const [changeImage, setChangeImage] = useState(false);
  const [changeFromDate,setChangeFromDate]=useState(false)
  const [changeToDate,setChangeToDate]=useState(false)
  let fields;
  if(data){
    fields = Object.keys(data).reverse().sort().filter((fieldName)=>(
      fieldName!=='_id'
    ));
    fields.map((fieldName)=>{
      if(fieldName.includes("Date")){
        data[fieldName]=format(new Date(data[fieldName]),'yyyy-MM-dd')
      }
     
    })
  }
  const itemId=data?._id
  const [updatedData,setUpdatedData]=useState(data)
  const navigateTo=useNavigate()
  const {theme:[theme],loader:[isLoading,setIsLoading],sideNav:[isExpanded]}=useContext(AppContext)
  
  
  
  const handleDataChange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    if(name?.includes("image")){
      const Reader=new FileReader()
      Reader.readAsDataURL(e.target.files[0])
      
      Reader.onload=()=>{
          if(Reader.readyState===2){
              setUpdatedData((prev)=>({
                  ...prev,
                  image:Reader.result
              }))
          }
      }
    }
    else if(name?.includes("date") ||name?.includes("Date")){
      const formattedDate = format(new Date(value), 'yyyy-MM-dd');
      setUpdatedData({
        ...updatedData,
        [name]: formattedDate,
      });
    }

    else{
      setUpdatedData((prev)=>(
        {
          ...prev,
          [name]:value
        }
      ))
    }
    
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const response=await axios.put(`${BASE_URL}admin/${title.toLowerCase()}/update/${itemId}`,
      updatedData,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(response.status===200)
      {
        toast.success(response.data.message)
        navigateTo(`/admin/${title.toLowerCase()}s`,{
          replace:true
        })
      }

    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500).
        setError({
          status: error.response.status,
          message: error.response.data.message || "An error occurred",
        });
      } else if (error.request) {
        // The request was made but no response was received.
        setError({
          status: null,
          message: "No response received from the server",
        });
      } else {
        // Something happened in setting up the request that triggered an Error.
        setError({
          status: null,
          message: "An error occurred while setting up the request",
        });
      }
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <>
      <form
        className={`w-full h-full flex mt-4 justify-evenly max-md:flex-col max-md:flex-nowrap flex-wrap
  items-center font-semibold 
  ${theme == "dark" ? "text-white" : "text-black"}
  overflow-y-auto overflow-x-hidden py-3`}
     onSubmit={(e)=>handleSubmit(e)} >
        {fields?.map((fieldName, index) => (
          <div
            key={index}
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
      p-2 my-2 focus-within:border-b-2 
      ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
      relative transition-colors duration-300
      
      ${fieldName.includes("Date") && 'mt-4'}`}
          >
          
            {
              fieldName.includes("image") ? (
              changeImage ? (
                <>
                  <button
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
                        : "bg-gradient-to-r from-teal-300 to-teal-600 text-gray-700"
                    }
      max-lg:w-[48px] px-1
      rounded-lg w-[90px] h-[34px]   text-xs tracking-wide absolute -right-2 top-0
      hover:scale-105 transition-all ease-in-out duration-150`}
                    type="button"
                    id="imageButton"
                    onClick={() => {
                      document.getElementById("image").click();
                    }}
                  >
                    Select Image
                  </button>
                  <input
                    id={fieldName}
                    type="file"
                    name={fieldName}
                    placeholder={`Select ${fieldName}`}
                    autoComplete="off"
                    accept="image/*"
                    className={`ml-2 w-[250px] placeholder-transparent peer outline-none  bg-transparent imageButton`}
                    onChange={(e) => handleDataChange(e)}
                  />
                </>
              ) :(
                <>
                  <div
                    className={`w-full h-[110px] max-lg:h-[80px] flex justify-evenly items-center p-3 max-md:flex-wrap`}
                  >
                  {data[fieldName].url!==null?
                    (<img
                      className={`object-cover w-[150px] h-[90px]
            max-lg:h-[70px] max-md:w-[75px] max-lg:w-[100px]  rounded-xl`}
                      src={data[fieldName].url}
                    />)
                  :
                (<h1>Image not Available</h1>)
              }
                    
                    <button
                      className={`
            ${
              theme === "dark"
                ? "bg-gradient-to-l from-purple-400 to-purple-600 text-white"
                : "bg-gradient-to-r from-teal-300 to-teal-600 text-gray-700"
            }
            w-[80px] h-[30px] max-lg:w-[60px]  m-1 max-lg:mb-3 rounded-md 
            hover:scale-105 transition-all ease-in-out duration-150`}
                      type="button"
                      id="imageButton"
                      onClick={() => setChangeImage(true)}
                    >
                      Change
                    </button>
                  </div>
                </>
              )
            ) :fieldName.includes("Date") || fieldName.includes("date") 
            ?
            (
                <div className={`w-full bg-transparent dateContainer inline-flex items-center`}>
                <input
                id={fieldName}
                type={fieldName.includes("from")?changeFromDate?"date":"text":changeToDate?"date":"text"}
                name={fieldName}
                placeholder={`Select ${fieldName}`}
                autoComplete="off"
                value={updatedData[fieldName]?updatedData[fieldName]:"dd/mm/yy"}
               
                className={`ml-2 w-full placeholder-transparent peer outline-none  bg-transparent
                ${theme==='dark'?'darkCalendar':'lightCalendar'}`}
                onChange={(e) => handleDataChange(e)}
              />
              {fieldName.includes('from') && !changeFromDate && (
                <button
                  className={`w-[20px] h-[20px] bottom-2`}
                  type="button"
                  onClick={() => setChangeFromDate(true)}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                </button>
              )}
              {fieldName.includes('to') && !changeToDate && (
                <button
                  className={`w-[20px] h-[20px] bottom-2`}
                  type="button"
                  onClick={() => setChangeToDate(true)}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                </button>
              )}
                
                </div>
                
              ):
            (
              <input
              id={fieldName}
              type="text"
              name={fieldName}
              placeholder={`Enter ${fieldName}`}
              value={updatedData[fieldName]}
              autoComplete="off"
              className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              onChange={(e) => handleDataChange(e)}
            />)
          }

            <label
              htmlFor={fieldName}
              className={`${
                theme === "dark"
                  ? "text-purple-600 font-bold"
                  : "text-green-700"
              } 
        cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
        peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
        transition-all`}
            >
              {
                fieldName.includes("fromDate")?"Starting Date"
                :
                fieldName.includes("toDate")?"Ending Date":
                fieldName[0].toUpperCase() +
                fieldName.replace("_", " ").slice(1)}
            </label>
          </div>
        ))}
        <button
    type="submit"
    className={`${
      theme === "dark"
        ? "bg-purple-600 hover:bg-purple-700"
        : "bg-green-600 hover:bg-green-700"
    }
    ${isLoading?'disabled':'active'}
text-white w-[300px] max-lg:w-[200px]
 p-2 mt-6 rounded-lg cursor-pointer
 ${isExpanded?'ml-40 mr-40 max-lg:mx-0':''}`}
>
    {isLoading?'Waiting...':`Update ${title}`}
  </button>
        
      </form>
    </>
  );
};

export default EditCards;
