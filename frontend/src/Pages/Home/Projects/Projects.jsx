import React, { useContext,useEffect,useState } from "react"
import { AppContext } from "../../../utils/context/store"
import './Projects.css'
import ProjectCard from "../../../components/Cards/ProjectCard"
const Projects = () => {
    const {theme:[theme],userData:[userData]}=useContext(AppContext)
    const [toggle,setToggle]=useState(`all`)
    const [projectCategories,setProjectCategories]=useState([])

    useEffect(()=>{
        let tempList=[]
        userData?.projects?.forEach((project)=>{
            if(!tempList.includes(project.category)){
                tempList.unshift(project.category)
            }
        })
        setProjectCategories(tempList)
    },[userData])
  return (
   <section name="projects"
   className={`font-CentraNo2 ${theme==='dark'?`bg-black`:`
   bg-white`} flex flex-col justify-center items-center relative
   `}>
   <div className={`w-full max-w-[1350px] pt-[0.625rem] pr-0 pb-[6.25rem] pl-0 gap-3 relative flex flex-col justify-between items-center bg-cover bg-no-repeat
   ${theme==='dark'?`bg-dark_about_bg bg-right-top`:`
   bg-light_about_bg bg-top`}`}>
   <div className={`text-[2.625rem] text-center font-semibold mt-5 max-md:mt-3 max-md:text-[2rem]
   ${
    theme === "dark"
      ? "bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-700  "
      : "bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500 "
  } bg-clip-text text-transparent 
   `}>
   Projects
   </div>
   <div className={`text-lg text-center max-w-[37.5rem] max-md:mt-3 max-md:text-[1rem] max-sm:px-10
   ${theme==='dark'?'text-neutral-400':'text-neutral-600'}`}>
   I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
   </div>

   <div className={`flex border-[.09375rem] ${theme==='dark'?'border-purple-500 text-purple-500':'border-teal-500 text-teal-500'}
   text-[1rem] rounded-xl font-[31.25rem] my-[1.375rem] mx-0 max-md:text-xs overflow-hidden`}>
   <button className={`py-2 px-[1.125rem] rounded-md cursor-pointer 
   ${theme==='dark'?`${toggle==='all'?'bg-purple-500/30':'bg-transparent'} hover:bg-purple-400/40`
   :
   `${toggle==='all'?'bg-teal-500/30':'bg-transparent'} hover:bg-teal-400/40`}
   max-md:py-[0.375rem] max-md:px-2 rounded-[0.25rem]`} value={`all`} onClick={()=>setToggle(`all`)}>All</button>
   <div className={`w-[0.09375rem] rounded-[0.25rem] ${theme==='dark'?'bg-purple-600':'bg-teal-600'}`}/>
   
   {
        
        projectCategories.map((category,index)=>(
            <React.Fragment key={`${category}-${index}`}>
            <button  className={`py-2 px-[1.125rem] rounded-md cursor-pointer 
            ${theme==='dark'?`${toggle===category.toLowerCase()?'bg-purple-500/30':'bg-transparent'} hover:bg-purple-400/40`
            :
            `${toggle===category.toLowerCase()?'bg-teal-500/30':'bg-transparent'} hover:bg-teal-400/40`}
            max-md:py-[0.375rem] max-md:px-2 rounded-[0.25rem]`} value={category.toLowerCase()} onClick={()=>setToggle(category.toLowerCase())}>{category}</button>
            
            {index!==projectCategories.length-1 &&<div className={`w-[0.09375rem] rounded-[0.25rem] ${theme==='dark'?'bg-purple-600':'bg-teal-600'}`}/>
            }
            </React.Fragment>
        ))
    }
  

    </div>

    <div className={`flex flex-wrap justify-center items-center gap-7`}>
    {toggle === 'all' && userData?.projects?.map((project,index) => (
      <ProjectCard key={`${project._id}-${index}`} project={project}/>
    ))}
  {userData?.projects?.filter((item) => item.category.toLowerCase() == toggle)
    .map((project,index) => (
      <ProjectCard key={`${project._id}-${index}`} project={project}/>
    ))}
    </div>

    
</div>

   </section>

  )
}

export default Projects