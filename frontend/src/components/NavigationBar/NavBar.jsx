import { useState, useEffect, useContext } from "react";
import { Link} from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, faMoon, faSun, faX } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { dark_mode, light_mode } from "../../utils/theme/ThemePack";
import { AppContext } from "../../utils/context/store";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { handleThemeToggle } from "../../utils/theme/ThemeUtils";

const NavBar = () => {
  const {
    theme: [theme,setTheme],
  } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [verticalNav, setVerticalNav] = useState(false);
  const [toggleNav,setToggleNav]=useState(false)
  useEffect(() => {
    const handleResize = () => {
  
      setVerticalNav(window.innerWidth <= 600); // Update verticalNav based on width
    };

    window.addEventListener("resize", handleResize);

    return() =>window.removeEventListener("resize", handleResize);
  }, [])


  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <>
      <nav
        className={`${
          !verticalNav
            ? `max-xl:hidden flex w-full ${
                !scrolled
                  ? "bg-transparent"
                  : `${theme === "dark" ? "bg-black" : "bg-zinc-100"}`
              }`
            : `${toggleNav ? 'max-lg:visible':''} flex flex-col w-72 ${
                theme === "dark" ? "bg-zinc-600/90" : "bg-slate-600/90"
              } right-0 rounded-l-3xl`
        } 
    fixed z-[10] items-center justify-between`}
      >
        <div
          className={`w-full h-full ${
            verticalNav ? "flex flex-col" : "flex"
          } items-center  px-4 transition-all duration-100`}
        >
          <img
            src={theme === "dark" ? dark_mode.logo : light_mode.logo}
            className={`
        ${verticalNav ? "mb-2 w-[100px] h-[100px]" : "w-[100px] h-[80px]"}`}
          />
          <ul
            className={`${
              verticalNav
                ? "flex flex-col border-t-black border-t-2 py-3 w-full"
                : "flex px-2"
            } items-center justify-between text-xl  leading-tight 
        ${
          theme === "dark" ? "text-white/70" : "text-black"
        }  ml-6 font-CentraNo2 mr-7 `}
          >
            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="home" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : ` mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Home
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'} `} 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : `  mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              About
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="skills" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : ` mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Skills
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="education" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : `  mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Education
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="experience" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : `  mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Experience
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="projects" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer  ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : `  mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Portfolio
            </Link>

            <Link
            activeClass={`border-b-[3px] font-semibold ${theme==='dark'?'text-purple-500 border-purple-500':'text-teal-600 border-teal-500'}`} 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
              className={` cursor-pointer ${
                  verticalNav
                    ? `p-2 w-full text-center  mx-auto
                ${
                  theme === "dark"
                    ? "hover:bg-zinc-200/60"
                    : "hover:bg-zinc-200/30"
                }`
                    : `  mr-5 hover:border-b-[3px]
                     ${
                        theme === "dark" ? " hover:border-purple-500" : "hover:border-teal-500"
                      }`
                }
                
               
                `}

              
            >
              Contact
            </Link>
   
          </ul>
        </div>
        <div className={`w-full h-full flex items-center justify-between`}>
          <div className="w-full h-full flex flex-wrap items-center justify-evenly relative px-3">
            <div
              className={`inline-block ${verticalNav ? "mx-auto" : "ml-14"}`}
            >
              <a
                className={`relative inline-flex items-center justify-center w-12 h-12 
       ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"}  rounded-full mr-6 
        border-[1px] border-[rgba(255, 255, 255, 0.5)] group`}
                href="https://www.linkedin.com/in/hussnain-ali-202738191/"
                target="new"
              >
                <span
                  className={`absolute  w-12 h-12 bg-white rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100 `}
                />
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className={`w-6 h-6 z-10 text-zinc-400 group-hover:text-black transition-colors duration-75`}
                />
              </a>

              <a
                className={`relative inline-flex items-center justify-center w-12 h-12 
              ${
                theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
              } rounded-full mr-6 
            border-[1px] border-[rgba(255, 255, 255, 0.5)] group`}
                href="https://github.com/mirzahussnain"
                target="new"
              >
                <span
                  className={`absolute  w-12 h-12 bg-white rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100 `}
                />
                <FontAwesomeIcon
                  icon={faGithub}
                  className={`w-6 h-6 z-10 text-zinc-400 group-hover:text-black transition-colors duration-75`}
                />
              </a>
            </div>
            <a href="/login">
              <button
                className={`font-bold ${theme==='dark'?'text-white hover:text-black border-white':'text-zinc-600 border-[#ae9f9f] hover:text-zinc-300'} border-2  w-36  
              ${
                verticalNav
                  ? `mt-3 h-[40px] mb-6 ${
                      theme === "dark"
                        ? "hover:bg-purple-400"
                        : "hover:bg-teal-300"
                    }`
                  : "mr-4 h-[60px] bg-transparent"
              }
              relative transition duration-300 ease-in-out group  text-xl`}
              >
                <span
                  className={`${
                    verticalNav ? "hidden" : `${theme==='dark'?'before-element':'before-element-light'}`
                  } text-center mx-auto`}
                ></span>
                Admin
              </button>
            </a>
            {verticalNav? (<div
              className={`inline-flex justify-center rounded-xl p-2 items-center text-white hover:font-bold hover:bg-white ${
                theme === "dark"
                  ? "hover:bg-neutral-300 hover:text-purple-500"
                  : "hover:text-green-400 hover:bg-white"
              } cursor-pointer transition-all duration-200 mb-3`}
              onClick={() => setTheme(handleThemeToggle(theme))}
            >
              
              <FontAwesomeIcon icon={theme==='dark'?faSun:faMoon}
              className={`w-[20px] h-[20px] rounded-full transition-transform duration-500
              ${
                theme === "dark" ? "rotate-0 text-yellow-500" : "rotate-180 text-zinc-500"
              }`}
              />
            </div>): <ThemeToggler/>}
             
          </div>
        </div>
      </nav>
      <button
        className={` xl:hidden fixed top-6 right-4  text-xl z-[10] ${
          verticalNav
            ? `text-zinc-400 `
            : `${theme === "dark" ? "text-white" : "text-zinc-500"}`
        }`}
        onClick={(e) => {
          e.preventDefault()
          setVerticalNav(!verticalNav)
          setToggleNav(!toggleNav)
        }}
      >
        {verticalNav ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
    </>
  );
};

export default NavBar;
