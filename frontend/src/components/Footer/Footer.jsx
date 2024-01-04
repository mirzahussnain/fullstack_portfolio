import { useContext } from "react"
import { AppContext } from "../../utils/context/store"
import { dark_mode, light_mode } from "../../utils/theme/ThemePack";
import {Link} from 'react-scroll'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    const {theme:[theme]}=useContext(AppContext)
  return (
    <div className={`w-full py-[2rem] px-0 flex justify-center 
    ${theme==='dark'?'bg-black':'bg-white'}`}>
    {/*Footer Wrapper*/}
    <footer className={`w-full max-w-[75rem] flex flex-col gap-[0.875rem] items-center p-4
    ${theme==='dark'?'text-zinc-500':'text-neutral-600'}`}>
    <img src={theme==='dark'?dark_mode.logo:light_mode.logo}
    className="w-[100px] h-[100px]"/>
    <nav className={`w-full max-w-[50rem] mt-2 flex flex-row gap-[2rem] justify-center
    max-md:flex-wrap max-md:gap-4 max-md:justify-center max-md:items-center max-md:text-xs`}>
    <Link 
    activeClass="active" 
    to="home" 
    spy={true} 
    smooth={true} 
    offset={-10} 
    duration={700}
    className={`cursor-pointer`} 
    
  >
    Home
  </Link>
    
    <Link 
      activeClass="active" 
      to="about" 
      spy={true} 
      smooth={true} 
      offset={-30} 
      duration={700} 
      className="cursor-pointer"
    >
      About
    </Link>

    <Link 
      activeClass="active" 
      to="skills" 
      spy={true} 
      smooth={true} 
      offset={-70} 
      duration={500} 
      className="cursor-pointer"
    >
      Skills
    </Link>

    <Link 
      activeClass="active" 
      to="experience" 
      spy={true} 
      smooth={true} 
      offset={-70} 
      duration={500} 
      className="cursor-pointer"
    >
      Experience
    </Link>

    <Link 
      activeClass="active" 
      to="projects" 
      spy={true} 
      smooth={true} 
      offset={-70} 
      duration={500} 
      className="cursor-pointer"
    >
      Projects
    </Link>


    <Link 
      activeClass="active" 
      to="education" 
      spy={true} 
      smooth={true} 
      offset={-70} 
      duration={500} 
      className="cursor-pointer"
    >
      Education
    </Link>
    </nav>
    <div className={`flex mt-4`}>
    <a className={`inline-block my-0 mx-[1rem] text-[1.5rem] transition-colors ease-in-out duration-[0.2s]
    ${theme==='dark'?'hover:text-zinc-500':'hover:text-zinc-600'}`} target="display" href="https://www.linkedin.com/in/hussnain-ali-202738191/"><FontAwesomeIcon icon={faLinkedin}/></a>
    <a className={`inline-block my-0 mx-[1rem] text-[1.5rem] transition-colors ease-in-out duration-[0.2s]
    ${theme==='dark'?'hover:text-zinc-500':'hover:text-zinc-600'}`} target="display" href="https://github.com/mirzahussnain"><FontAwesomeIcon icon={faGithub}/></a>
    <a className={`inline-block my-0 mx-[1rem] text-[1.5rem] transition-colors ease-in-out duration-[0.2s]
    ${theme==='dark'?'hover:text-zinc-500':'hover:text-zinc-600'}`} target="display" href="https://www.instagram.com/mrzahussnain/?hl=en"><FontAwesomeIcon icon={faInstagram}/></a>
    <a className={`inline-block my-0 mx-[1rem] text-[1.5rem] transition-colors ease-in-out duration-[0.2s]
    ${theme==='dark'?'hover:text-zinc-500':'hover:text-zinc-600'}`} target="display" href="https://www.facebook.com/hussnain.ali.52459615"><FontAwesomeIcon icon={faFacebook}/></a>
    </div>
    <p className={`mt-[1.5rem] text-[0.9rem] text-center
    ${theme==='dark'?'text-zinc-400':'text-zinc-600'}`}> &copy; 2024 Hussnain Ali. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Footer