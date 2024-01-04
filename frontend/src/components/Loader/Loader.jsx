import { useContext } from 'react'
import { RingLoader } from 'react-spinners'
import { AppContext } from '../../utils/context/store'
import './Loader.css'
const Loader = () => {
  const {theme:[theme]}=useContext(AppContext)
  return (
    <div className={`${theme==='dark'?'dark-body':'light-body'} fixed w-screen h-screen z-10`}>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className={` w-full h-full flex flex-col justify-center items-center 
    ${theme==='dark'?'text-zinc-400':'text-neutral-100'} font-kaushan`}>
    <RingLoader color={theme!=='dark'?'#40e0d0':'#BF40BF'} size={100}/>
    <h1 className={` mt-10 font-bold text-2xl animate-pulse`}>Loading.....</h1>
    </div>
    
  
 </div>
  )
}

export default Loader