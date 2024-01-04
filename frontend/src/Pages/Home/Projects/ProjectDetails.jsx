import { useContext } from "react"
import { AppContext } from "../../../utils/context/store"
import { Modal } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { format, parseISO } from "date-fns"
import { faX } from "@fortawesome/free-solid-svg-icons"



const ProjectDetails = () => {
    
    const {theme:[theme],projectDetails:[projectWindow,setProjectWindow]}=useContext(AppContext)
   
  return (
    <Modal open={true} onClose={()=>setProjectWindow({state:false,project:null})}>
    {/*Main Container*/}
    <div className={`w-full h-full fixed top-0 bottom-0 left-0 bg-[#000000a7]
    flex items-start justify-center overflow-y-scroll transition-all ease-in-out duration-[0.5s] z-[1000]`}>
    {/*Wrapper*/}
    <div className={`max-w-[50rem] w-full rounded-2xl my-[3.125rem] mx-4
    h-min p-5 flex flex-col relative
    shadow-lg ${theme==='dark'?'bg-neutral-950 shadow-slate-900/30 text-zinc-500':'bg-zinc-300 shadow-neutral-500/60 text-neutral-500'}
    `}>
    
    <FontAwesomeIcon className={`absolute top-[0.625rem] right-5 cursor-pointer rounded-full text-xl`} icon={faX}
    onClick={()=>{setProjectWindow({state:false,project:null})}}/>
    <img src={projectWindow.project?.image?.url}
    className={`w-full object-cover rounded-xl mt-[1.875rem] shadow-md
    ${theme==='dark'?'shadow-neutral-800':'shadow-neutral-600'}`}/>
    <div className={`text-[1.75rem] font-semibold mt-3 mr-[0.375rem]
    mb-0 ml-[0.375rem] max-sm: text-2xl max-md:mt-[0.375rem]
    ${theme==='dark'?'text-zinc-300':'text-zinc-600'} font-OpenSans`}>
    {projectWindow.project?.title}
    </div>
    <div className={`text-[1rem] my-[0.125rem] mx-[0.375rem] font-normal max-md:text-xs
    ${theme==='dark'?'text-zinc-600':'text-zinc-700'}`}>
    {
        projectWindow.project!==null && `${format(parseISO(projectWindow.project.fromDate),'MMM yyyy')}-${format(parseISO(projectWindow.project.toDate),'MMM yyyy')}`
     }
    </div>
    <div className={`flex flex-wrap my-2 mx-0 max-sm:my-1`}>
    {
        projectWindow?.project?.techStack?.map((technology,index)=>(
            <div key={`${technology}-${index}`} className={`text-sm font-normal m-1 py-1 px-2 rounded-lg max-sm:text-xs
            ${theme==='dark'?'text-purple-500 bg-purple-900':'text-teal-300 bg-teal-600'}`}>{technology}</div>
        ))
    }
    </div> 
    <div className={`font-normal text-[1rem] my-2 mx-[0.375rem]
    max-sm:text-sm max-sm:my-[0.375rem]
    ${theme==='dark'?'text-neutral-500':'text-neutral-700'}`}>{projectWindow.project?.description}</div>
    
    <div className={`flex justify-end my-3 mx-0 gap-3`}>
    
    {projectWindow.project?.github_url!==null &&<a className={`w-full items-center text-center text-[1rem] font-semibold py-3 px-[1rem] rounded-lg
    cursor-pointer transition-all duration-[0.5s] ease-in-out max-sm:text-xs decoration-[none]
    ${theme==='dark'?`bg-zinc-700/40 text-zinc-400 hover:bg-zinc-800/50`:`bg-zinc-400/60 hover:text-neutral-300 text-neutral-500 hover:bg-zinc-600`}`}
    target="new"
    href={projectWindow.project?.github_url}>
    View Code
    </a>}
    {
        projectWindow.project?.demo_url!==null &&<a className={`w-full items-center text-center text-[1rem] font-semibold py-3 px-[1rem] rounded-lg
        cursor-pointer transition-all duration-[0.5s] ease-in-out max-sm:text-xs decoration-[none]
        ${theme==='dark'?`bg-purple-500/80 text-zinc-400 hover:bg-purple-400/50`:`bg-teal-600 text-zinc-200 hover:bg-teal-500`}`}
        target="new"
        href={projectWindow.project?.demo_url}>
        View Live App
        </a>
    }
    
    </div>
    
    
    </div>
   
    
    </div>
    </Modal>
  )
}

export default ProjectDetails