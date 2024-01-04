import { useContext } from 'react'
import { AppContext } from '../../utils/context/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
const EditHeader = ({title,id}) => {
    const {theme:[theme]}=useContext(AppContext)
    const navigateTo=useNavigate()
  return (
    <>
    <div className={`w-full h-[50px] 
    flex justify-between items-center
    ${theme==='dark'?'border-b-white bg-gradient-to-l from-purple-600 to-purple-500':'border-b bg-gradient-to-l from-teal-600 to-teal-500'}
      text-white  p-3 font-semibold font-NotoSansJP text-lg`}>
      <button className={`w-[50px] h-[40px] max-lg:w-[40px] max-lg:p-0 p-2
      ${theme==='dark'?'bg-purple-500 hover:bg-white/70 hover:text-purple-700':'bg-teal-500 hover:bg-black/60 hover:text-white'} 
       text-white rounded-md`}
       onClick={()=>{navigateTo(-1)}}>
       <FontAwesomeIcon icon={faBackward}/>
       </button>
      <h1 className='text-center'>{title} Details</h1>
    <h1 className='text-md max-md:w-[130px]
    max-md:overflow-hidden
    max-md:text-ellipsis max-md:whitespace-nowrap'>
    ID:<span className='text-sm font-semibold'>{id}</span></h1>
    </div>
   
    </>
  )
}

export default EditHeader