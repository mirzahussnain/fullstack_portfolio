import { useContext } from "react"
import { AppContext } from "../../utils/context/store"
import { handleThemeToggle } from "../../utils/theme/ThemeUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const ThemeToggler = () => {
    const {theme:[theme,setTheme]}=useContext(AppContext)
  return (
    <div className={`fixed top-4 right-2 px-3 py-2  rounded-full
    transition-transform duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'} cursor-pointer`}
    onClick={()=>{setTheme(handleThemeToggle(theme))}}>
    <FontAwesomeIcon icon={theme==='dark'?faSun:faMoon} className={`${theme==='dark'?'text-yellow-400':'text-zinc-600'} text-xl`}/>
    </div>
  )
}

export default ThemeToggler