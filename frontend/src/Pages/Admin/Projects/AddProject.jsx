import { useContext,useState} from 'react'
import AdminHeader from "../../../components/Headers/AdminHeader";
import axios from 'axios';
import { AppContext } from '../../../utils/context/store'

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faBackward, faBoltLightning, faBook, faCalendar, faLayerGroup, faLink, faParagraph } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';
const BASE_URL=import.meta.env.VITE_REACT_APP_SERVER_BASE_URL
const AddProject = () => {
    const [projectData,setProjectData]=useState({
        title:"",
        description:"",
        github_url:"",
        demo_url:"",
        techStack:[],
        image:"",
        category:"",
        fromDate:"",
        toDate:"",
    })
    const {theme:[theme],sideNav:[isExpanded],loader:[isLoading,setIsLoading]}=useContext(AppContext)
    const navigateTo=useNavigate()

    const handleDataChange = (e) => {
        e.preventDefault()
            if(e.target.name==='title'){
                setProjectData({
                    ...projectData,
                    title:e.target.value
                })
            }
            if(e.target.name==='description'){
                setProjectData({
                    ...projectData,
                    description:e.target.value
                })
            }
            if(e.target.name==='github'){
                setProjectData({
                    ...projectData,
                    github_url:e.target.value
                })
            }
            if(e.target.name==='demo'){
                setProjectData({
                    ...projectData,
                    demo_url:e.target.value
                })
            }
            if(e.target.name==='tech_stack'){
                const list=e.target.value.split(",")
                setProjectData({
                    ...projectData,
                    techStack:list
                })
            }
            if(e.target.name==='category'){
              setProjectData({
                ...projectData,
                category:e.target.value
              })
            }
            if (e.target.name?.includes("Date")) {
              console.log(e.target.name,e.target.value)
              const formattedDate = format(new Date(e.target.value), "yyyy-MM-dd");
              setProjectData({
                ...projectData,
                [e.target.name]: formattedDate,
              });
            }
            if(e.target.name==='image'){
            const Reader=new FileReader()
            Reader.readAsDataURL(e.target.files[0])
            
            Reader.onload=()=>{
                if(Reader.readyState===2){
                    setProjectData({
                        ...projectData,
                        image:Reader.result
                    })
                }
            }
            }
        
      };
      
    const handleSubmit=async (e)=>{
       e.preventDefault();
        try {
            
                    setIsLoading(true);
                    const response=await axios.post(`${BASE_URL}admin/project/add`,
                    projectData,{headers:{"Content-Type":"application/json"},
                        withCredentials: true
                    })

                    const responseMessage=response.data.message
                    toast.success(responseMessage)
                    setProjectData({
                        title:"", description:"", github_url:"",demo_url:"",techStack:[],image:"",category:"",
                        fromDate:"",toDate:"",
                    })
                    e.target.reset()
            
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

   
  return (
   <>
   <div className="w-full flex flex-col justify-start items-center h-screen px-10">
    <AdminHeader title={'Add Project'}/>
    <div className={`flex flex-col mb-10 max-md:w-[300px] ${theme==='dark'?'bg-black/80':'bg-white/40'} justify-start items-center
     h-[500px] w-full rounded-xl overflow-hidden`}>
    <div className={`w-full h-[50px] flex  justify-start items-center py-3 font-extrabold tracking-wide text-xl font-OpenSans px-2
     ${theme==='dark'?'text-white bg-gradient-to-r from-purple-700 to-purple-400':'bg-gradient-to-r from-teal-700 to-teal-400 text-white'}
     transition-all ease-in-out duration-150 `}>
     <button className={`w-[30px] h-[px] max-lg:w-[40px] max-lg:p-0 
    ${theme==='dark'?'bg-purple-500 hover:bg-white/70 hover:text-purple-700':'bg-teal-500 hover:bg-black/60 hover:text-white'} 
     text-white rounded-md mr-4`}
     onClick={()=>{navigateTo('/admin/projects')}}>
     <FontAwesomeIcon icon={faBackward}/>
     </button>
    <h1 className='w-full'>Project Details</h1></div>
    <form
            className={`w-full h-full flex mt-4 justify-evenly flex-wrap
        items-center font-bold 
        ${theme == "dark" ? "text-white" : "text-black"}
        overflow-y-auto overflow-x-hidden py-3`}
          onSubmit={(e)=>handleSubmit(e)}>
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
        p-2 my-2 focus-within:border-b-2 
        ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
        relative transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faBook} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Title"
                value={projectData.title}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e)=>handleDataChange(e)}
                />
              <label
                htmlFor="title"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
        cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
        peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
        transition-all`}
              >
                Title
              </label>
            </div>

            <br />

            <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
      p-2 my-2 focus-within:border-b-2 
      ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
      relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faLayerGroup} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Enter Category"
              value={projectData.category}
              required
              autoComplete="off"
              className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              onChange={(e)=>handleDataChange(e)}
              />
            <label
              htmlFor="category"
              className={`${
                theme === "dark"
                  ? "text-purple-600 font-bold"
                  : "text-green-700"
              } 
      cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
      peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
      transition-all`}
            >
              Category
            </label>
          </div>
            <br/>
            <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
       p-2 my-2 focus-within:border-b-2 
       ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
       relative transition-colors duration-300 max-md:mt-6`}
          >
          <FontAwesomeIcon icon={faCalendar} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            <input
              id="fromDate"
              type="date"
              name="fromDate"
              placeholder="Enter Starting Date"
              value={projectData.fromDate}
              required
              autoComplete="off"
              className={`ml-2 w-full placeholder-transparent peer outline-none
               ${theme === "dark" ? "darkCalendar" : "lightCalendar"}
               bg-transparent`}
              onChange={(e) => handleDataChange(e)}
            />
            <label
              htmlFor="fromDate"
              className={`${
                theme === "dark"
                  ? "text-purple-600 font-bold"
                  : "text-green-700"
              } 
       cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
       peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
       transition-all`}
            >
              Starting Date
            </label>
          </div>

          <br />

          <div
            className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
       p-2 my-2 focus-within:border-b-2 
       ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
       relative transition-colors duration-300 max-md:mt-6`}
          >
          <FontAwesomeIcon icon={faCalendar} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            <input
              id="toDate"
              type="date"
              name="toDate"
              placeholder="Enter Ending Date"
              value={projectData.toDate}
              required
              autoComplete="off"
              className={`ml-2 w-full placeholder-transparent peer outline-none
               ${
                 theme === "dark" ? "darkCalendar" : "lightCalendar"
               } bg-transparent`}
              onChange={(e) => handleDataChange(e)}
            />
            <label
              htmlFor="toDate"
              className={`${
                theme === "dark"
                  ? "text-purple-600 font-bold"
                  : "text-green-700"
              } 
       cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
       peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
       transition-all`}
            >
              Ending Date
            </label>
          </div>

          <br />

            <div
              className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
        items-center p-2 my-4 focus-within:border-b-2 
        ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
        relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faParagraph} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <textarea
                id="description"
                type="text"
                name="description"
                placeholder="Enter Description"
                required
                value={projectData.description}
                autoComplete="off"
                cols={`30`}
                rows="1"
                className={`ml-2 placeholder-transparent peer outline-none bg-transparent w-full`}
                onChange={(e)=>handleDataChange(e)}
                />
              <label
                htmlFor="description"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
        cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
        peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
        transition-all`}
              >
                Description
              </label>
            </div>

            <br/>

            <div
            className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
      items-center p-2 my-4 focus-within:border-b-2 
      ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
      relative transition-colors duration-300`}
          >
          <FontAwesomeIcon icon={faGithub} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
            <input
              id="github"
              type="text"
              name="github"
              placeholder="Enter Github Url"
              autoComplete="off"
              value={projectData.github_url}
              className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
              onChange={(e)=>handleDataChange(e)}
              />
            <label
              htmlFor="github"
              className={`${
                theme === "dark"
                  ? "text-purple-600 font-bold"
                  : "text-green-700"
              } 
      cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
      peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
      transition-all`}
            >
              Github Link
            </label>
          </div>

          <br/>

          <div
          className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
    items-center p-2 my-4 focus-within:border-b-2 
    ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
    relative transition-colors duration-300`}
        >
        <FontAwesomeIcon icon={faLink} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
          <input
            id="demo"
            type="text"
            name="demo"
            placeholder="Enter Demo Url"
            autoComplete="off"
            value={projectData.demo_url}
            className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
            onChange={(e)=>handleDataChange(e)}
            />
          <label
            htmlFor="demo"
            className={`${
              theme === "dark"
                ? "text-purple-600 font-bold"
                : "text-green-700"
            } 
    cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
    peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
    transition-all`}
          >
            Demo Link
          </label>
        </div>

        <br/>

        <div
        className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
  items-center p-2 ${isExpanded?'-left-5 max-lg:left-0':null} my-4 focus-within:border-b-2 
  ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
  relative transition-colors duration-300`}
      >
      <FontAwesomeIcon icon={faBoltLightning} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
        <input
          id="tech_stack"
          type="text"
          name="tech_stack"
          placeholder="Enter Tech Used"
          value={projectData.techStack}
          required
          autoComplete="off"
          className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
          onChange={(e)=>handleDataChange(e)}
          />
        <label
          htmlFor="tech_stack"
          className={`${
            theme === "dark"
              ? "text-purple-600 font-bold"
              : "text-green-700"
          } 
  cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
  peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
  transition-all`}
        >
          Tech Stack
        </label>
      </div>

      <br/>

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
      onClick={()=>{document.getElementById('image').click()}}>Select Image</button>
      <input
        id="image"
        type="file"
        name="image"
        placeholder="Select Image"
        autoComplete="off"
        accept='image/*'
        className={`ml-2 w-[250px] placeholder-transparent peer outline-none  bg-transparent imageButton`}
        onChange={(e)=>handleDataChange(e)}
        />
       
      <label
        htmlFor="image"
        className={`${
          theme === "dark"
            ? "text-purple-600 font-bold"
            : "text-green-700"
        } 
cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
transition-all`}
      >
        Image
      </label>
    </div>
    <div className='w-full inline-flex justify-center items-center'>
    <button
    type="submit"
    className={`${
      theme === "dark"
        ? "bg-purple-600 hover:bg-purple-700"
        : "bg-green-600 hover:bg-green-700"
    }
    ${isLoading?'disabled':'active'}
text-white w-[300px] max-lg:w-[200px] p-2 mt-6 rounded-lg cursor-pointer`}
>
    {isLoading?'Waiting...':'Add Project'}
  </button>
    </div>

           
          </form>
    </div>
   
    </div>
   </>
  )
}

export default AddProject