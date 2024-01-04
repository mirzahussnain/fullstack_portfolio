import { useContext } from 'react';
import { AppContext } from '../../utils/context/store';
import { format, parseISO } from 'date-fns';

const ExperienceCard = ({experience}) => {
    const {theme:[theme]}=useContext(AppContext)
  return (
    <div className={` ${theme==='dark'?'text-white border-purple-500 shadow-purple-500':'text-black border-teal-500 shadow-teal-500'}
     border shadow-md relative overflow-hidden gap-3 flex flex-col justify-between  py-[0.75rem] px-[1rem] mb-4
     rounded-xl w-[40.625rem] hover:shadow-lg  hover:-translate-y-[5px] max-md:p-[10px] max-md:gap-2 max-md:w-[18.75rem]
     group transition-transform duration-700`}>
      <div className='w-full flex gap-3' >
        <img src={experience.image.url}
        className={`h-[3.25rem] rounded-[10px] mt-[0.625rem] max-md:h-[2.5rem] ${theme==='dark'?'bg-white/90':'bg-zinc-300'}`} alt="Experience" />
        <div className={`w-full flex flex-col`} >
          <div className={`text-lg font-semibold ${theme==='dark'?'text-zinc-400':'text-neutral-500'} max-md:text-sm`}>{experience.position}</div>
          <div className={`text-sm font-medium font-CentraNo2 max-md:text-xs ${theme==='dark'?'text-zinc-500':'text-neutral-600'}`}>{experience.company}</div>
          <div className={`text-xs font-[400] font-CentraNo2 max-md:text-[10px] ${theme==='dark'?'text-zinc-600':'text-neutral-700'}`}>{`${format(parseISO(experience.fromDate),'MMM yyyy')}-${format(parseISO(experience.toDate),'MMM yyyy')}`}</div>
        </div>
      </div>
      <div className={`w-full text-[0.9375rem] font-[400] mb-10 max-md:text-xs font-NotoSansJP
      ${theme==='dark'?'text-zinc-400':'text-neutral-500'}`}>
        <span className={`overflow-hidden line-clamp-4 group-hover:line-clamp-none group-hover:overflow-visible
        transition-all duration-700`} >{experience.description}</span>
      </div>
      <div className={`text-sm font-medium max-md:text-xs font-CentraNo2
      flex items-center -mt-10`} >
      <b className={`text-lg max-md:text-[0.9375rem]
      ${theme==='dark'?'text-zinc-400':'text-neutral-600'}`}>Skills: </b>
      <ul className={`flex items-center list-disc flex-wrap max-md:text-xs
      ${theme==='dark'?'text-zinc-500':'text-neutral-500'}`}>{experience.skills.map((skill,index)=>(<li key={`${skill?._id}-${index}`}  className='ml-6 font-normal'>{skill}</li>))}</ul></div>
      
    </div>
  )
}

export default ExperienceCard