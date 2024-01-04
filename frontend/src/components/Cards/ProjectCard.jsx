import { useContext } from "react"
import { AppContext } from "../../utils/context/store"
import { format, parseISO } from "date-fns"

const ProjectCard = ({project}) => {
    const {theme:[theme],projectDetails:[,setProjectWindow]}=useContext(AppContext)
  return (
    <div onClick={()=>setProjectWindow({
        state:true,
        project:project
    })}
    className={`w-[20.625rem] h-[30.625rem] cursor-pointer rounded-[0.625rem] overflow-hidden
    shadow-lg ${theme==='dark'?'bg-slate-800/40 shadow-slate-900/30 hover:shadow-slate-950/70':'bg-zinc-200 shadow-neutral-500/60 hover:shadow-neutral-600'}
    py-[1.625rem] px-5 flex flex-col gap-[0.875rem] transition-all ease-in-out duration-[0.5s]
    hover:-translate-y-[0.625rem] hover:brightness-[1.1] hover:shadow-2xl group relative`}>
    <img src={project.image.url} alt={project?.title}
    className={`w-full h-[11.25rem] rounded-[0.625rem]
    ${theme==='dark'?'bg-white/90 shadow-neutral-900/30':'bg-zinc-300 shadow-neutral-500/60'} shadow-xl`}/>
    <div className={`w-full flex items-center flex-wrap gap-2 mt-1`}>
    {
        project?.techStack?.map((technology,index)=>(
            <span key={`${technology}-${index}`}
            className={`text-xs font-normal py-[0.225rem] px-2 rounded-[0.625rem]
            ${theme==='dark'?'text-purple-500 bg-purple-900':'text-teal-300 bg-teal-600'}`}>{technology}</span>))
    }
    </div>
    { /* Project Details */}
    <div className={`w-full flex flex-col gap-0 py-0 px-[0.125rem]`}>
    <div className={`text-xl font-semibold tracking-wide overflow-hidden max-w-full line-clamp-2 text-ellipsis
    ${theme==='dark'?'text-zinc-300':'text-zinc-600'}`}>{project.title}</div>
    <div className={`text-xs ml-[0.125rem] font-normal max-md:font-[0.625rem]
    ${theme==='dark'?'text-zinc-600':'text-zinc-700'}`}>
    {`${format(parseISO(project.fromDate),'MMM-yyyy')}-${format(parseISO(project.toDate),'MMM-yyyy')}`}
    </div>
    <div className={`font-normal overflow-hidden mt-2 line-clamp-3 text-ellipsis font-NotoSansJP
    ${theme==='dark'?'text-neutral-500':'text-neutral-700'}`}>{project.description}</div>
    </div>
    </div>
  )
}

export default ProjectCard