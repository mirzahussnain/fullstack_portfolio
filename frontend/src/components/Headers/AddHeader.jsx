import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd,faBackward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddHeader = ({theme,title}) => {
    const navigateTo=useNavigate()
  return (
    <div className={`w-full h-[70px] ${theme==='dark'?'border-b-white bg-gradient-to-l from-purple-600 to-purple-500':'border-b bg-gradient-to-l from-teal-600 to-teal-500'} 
     flex justify-between items-center  px-4 rounded-t-lg`}>
    <button className={`w-[50px] h-[40px] max-lg:w-[40px] max-lg:p-0 p-2
    ${theme==='dark'?'bg-purple-500 hover:bg-white/70 hover:text-purple-700':'bg-teal-500 hover:bg-black/60 hover:text-white'} 
     text-white rounded-md`}
     onClick={()=>{navigateTo(-1)}}>
     <FontAwesomeIcon icon={faBackward}/>
     </button>
     <div className={`w-[250px] h-full font-OpenSans font-semibold text-white py-3 text-xl flex justify-center items-center max-sm:w-[190px]`}>
      <h2 >Existing {title}</h2>
    </div>

    <button className={`w-[170px] h-[40px] max-lg:w-[40px] max-lg:p-0 p-2
     ${theme==='dark'?'bg-purple-500 hover:bg-white/70 hover:text-purple-700':'bg-teal-500 hover:bg-black/60 hover:text-white'} 
      text-white rounded-md`}
      onClick={()=>{navigateTo(`/admin/${title.toLowerCase()}/add`,{
        replace:true
      })}}>
      <span className='mr-2 max-lg:hidden'>Add {title}</span>
      <FontAwesomeIcon icon={faAdd}/>
    </button>
  </div>
  )
}

export default AddHeader