import { useContext} from 'react'
import { AppContext } from '../../../utils/context/store'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EducationCard from '../../../components/Cards/EducationCard';

const Education = () => {
    const {theme:[theme],userData:[userData]}=useContext(AppContext)
    
    
  return (
    <section name="education" 
    className={`font-CentraNo2 overflow-hidden
    ${theme==='dark'?'bg-black':'bg-white'}`}>
    <div className={`flex flex-col items-center justify-between
    ${theme==='dark'?'bg-dark_about_bg':'bg-light_about_bg bg-right-top'} bg-no-repeat bg-cover `}>
    <div className={`w-full h-56 flex flex-col items-center gap-3`}>
    <h1  className={`text-[2.625rem] text-center font-semibold mt-5 max-md:mt-3 max-md:text-[2rem]
    ${
     theme === "dark"
       ? "bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-700  "
       : "bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500 "
   } bg-clip-text text-transparent `}>Education</h1>
     <p className={`text-center ${theme==='dark'?'text-neutral-400':'text-neutral-600'} text-xl w-[38rem] max-sm:w-[22rem] max-sm:text-lg max-sm:px=10`}>My education has been a journey of self-discovery and growth. My educational details are as follows.</p>
    </div>
    <div className={`w-full mx-auto -mt-10 flex flex-col items-center justify-center gap-12 mb-4  
             `}>
             <Timeline>
             {userData?.educations?.map((education)=>(
               <TimelineItem key={education?._id} >
               <TimelineContent >
               <EducationCard education={education}/>
               </TimelineContent>
               <TimelineSeparator>
               <TimelineDot variant="outlined" style={theme==='dark'?{borderColor:'#854CE6'}:{borderColor:'#22B3A2'}}/>
               <TimelineConnector style={theme==='dark'?{ background: '#854CE6' }:{background:'#22B3A2'}} />
               </TimelineSeparator>

               </TimelineItem>
             ))}
            
           </Timeline>
    </div>
    </div>
    </section>
  
  );
}

export default Education