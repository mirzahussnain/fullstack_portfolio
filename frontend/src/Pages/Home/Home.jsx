import { Banner } from "./Banner/MainContainer";
import NavBar from "../../components/NavigationBar/NavBar";
import About from "./About/About";
import Skills from "./Skills/Skills";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Projects from "./Projects/Projects";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../utils/context/store";
import Contact from "./Contact/Contact";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ProjectDetails from "./Projects/ProjectDetails";
import { animateScroll } from "react-scroll";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const {
    projectDetails: [projectWindow],
    theme:[theme],
    loader:[isLoading,setIsLoading]
  } = useContext(AppContext);
  const [isHidden, setIsHidden] = useState(true);
  const previousTheme=useRef(theme)
  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY < 400) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])
  
  useEffect(()=>{

 
    setIsLoading(true)
    const intervalId=setInterval(()=>{
      setIsLoading(false)
      if(previousTheme.current!==theme){
        toast.success(`${theme==='dark'?'Dark':'Light'} Theme Enabled`)
        previousTheme.current=theme
      }
    },2000)
    
    return()=>clearInterval(intervalId)
  },[theme])
  return isLoading?<Loader/>:(
    <>
      <NavBar />
      <Banner />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact/>
      <Footer/>
     
      {
       
        <button className={`up-button fixed z-30 right-4  rounded-lg bottom-8
        py-2 px-3 
        ${theme==='dark'?'bg-purple-700 text-purple-400':'bg-teal-600 text-teal-400'}
        transition-all ease-in-out duration-500 ${
          isHidden ? 'translate-y-[200%]' : '-translate-y-full'
        }`}
        onClick={()=>animateScroll.scrollToTop()}>
        <FontAwesomeIcon icon={faArrowUp}/>
        </button>
      }
      {
        projectWindow?.state && <ProjectDetails/>
      }
     
    </>
  );
};

export default Home;
