import {
  faArrowCircleRight,
  faArrowDown,
  faMouse,
  
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import headerImage from "../../../assets/images/banner/header-img.svg";
import headerImageV2 from "../../../assets/images/banner/header-img2.svg";
import ME from "../../../assets/images/banner/MeT.png";
import { useContext, useEffect, useState } from "react";
import "./MainContainer.css";
import { AppContext } from "../../../utils/context/store";
import { Link as ScrollLink} from 'react-scroll';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const {
    theme: [theme],
    userData: [userData],
  } = useContext(AppContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150);
  const period = 2000;
  const [showUnderscore, setShowUnderscore] = useState(true);
  let toRotate = [];
  useEffect(() => {
    
    const title = userData?.about?.title;
    const subtitles = userData?.about?.subtitle?.split(",");
    if (title && subtitles) {
      toRotate = [title, ...subtitles];
    }
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, toRotate]);

  const tick = () => {
    let i = loopNum % toRotate?.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText?.substring(0, text?.length - 1)
      : fullText?.substring(0, text?.length + 1);

    setText(updatedText);
    setShowUnderscore(true);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    }
  };

  return  (
    <section
    name="home"
      className={`w-screen h-screen banner ${
        theme === "dark" ? "bg-dark" : "bg-light-4"
      } bg-top-center
     bg-cover bg-no-repeat  transition-all ease-in-out overflow-hidden`}
    >
      <div className="font-CentraNo2 relative overflow-hidden">
        <div className="flex items-center justify-between  overflow-hidden">
          <div className="w-full h-full  flex flex-col items-start max-lg:items-center  justify-center mt-24 max-md:mt-10 mb-4 py-14 px-10 ">
            {/*<img src={ME} alt="" className={`${theme==='dark'?'bg-gradient-to-b from-purple-500 to-transparent':'bg-gradient-to-b from-teal-500 to-transparent'} p-0 rounded-tl-full rounded-tr-full w-80 h-[21rem] opacity-70`} />*/}
            <h1
              className={`text-6xl font-bold  tracking-wider leading-tight ${
                theme === "dark" ? "text-white" : "text-zinc-600"
              } text-left max-md:text-[2.7rem]  max-lg:text-center font-Poppins`}
            >
              {`Hi,I am`}
            </h1>
           <span className={`text-6xl  font-bold  tracking-wide leading-tight ${
            theme === "dark" ? "text-white" : "text-zinc-600"
          } text-left max-md:text-[2.7rem] max-lg:text-center  font-Poppins`}>{`Hussnain Ali`}</span>
            <div className="flex items-baseline max-lg:justify-center max-lg:flex-wrap max-md:px-4">
            <h2 className={`text-4xl mt-2 font-semibold text-start max-lg:text-center max-md:text-[2rem]  font-Poppins mr-4
            ${
              theme === "dark" ? "text-white" : "text-zinc-600"
            }`}>I am a</h2>
            <span
              className={`max-lg:whitespace-nowrap max-lg:text-ellipsis ${
                theme === "dark" ? "text-purple-500" : "text-teal-500"
              }
              text-4xl font-semibold tracking-wide leading-tighter mb-3 max-lg:text-center max-md:text-[2rem]`}
            >
              {text}
              {showUnderscore && "|"}
            </span>
          </div>
            <q
              className={`wrap ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }
            text-3xl  font-Poppins font-normal tracking-wide leading-relaxed my-6 text-start max-md:text-center max-md:text-[1.92rem] w-[32rem] max-lg:w-[20rem]`}
            >
              {userData?.about?.quote}
            </q>

            <div className="button-div flex">
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                duration={700}
                offset={-70}
                className={`text-white font-bold text-lg cursor-pointer
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 "
                  : "bg-gradient-to-r from-teal-400 via-teal-400 to-teal-600 "
              } 
              border border-white/50 rounded-full px-4 py-2 hover:scale-105 hover:animate-pulse transition-all duration-150
             max-lg:px-4 max-lg:text-md text-center inline-block`}
              >
                Let's Connect
                <FontAwesomeIcon
                  className={`ml-3 max-lg:hidden`}
                  icon={faArrowCircleRight}
                />
              </ScrollLink>
            </div>
          </div>
          <div className="max-lg:hidden lg:w-8/12 xl:w-6/12 ml-6">
            <img
              src={theme === "dark" ? headerImage : headerImageV2}
              alt="heroImage"
              className="BannerImage animation-updown w-[70%] h-[70%]"
            />
          </div>
        </div>
        <ScrollLink
          className={`flex items-center justify-center
       ${theme === "dark" ? "text-purple-400" : "text-zinc-600 brightness-105"} 
       absolute bottom-10 right-4 max-md:bottom-2  max-lg:right-[calc(100%-59%)] max-xl:right-[calc(100%-80%)] max-lg:-bottom-2 max-xl:bottom-20 max-md:right-[calc(100%-65%)]
       cursor-pointer animate-pulse`}
         to="about"
         spy={true}
         smooth={true}
         offset={-40}
         duration={500}
        >
          <FontAwesomeIcon
            icon={faMouse}
            className={`h-7 w-7 ${
              theme === "dark" ? "text-purple-400/30" : "text-zinc-600 brightness-105"
            }`}
          />
          <span className={`text-md mx-2`}>Scroll Down</span>
          <FontAwesomeIcon icon={faArrowDown} className={``} />
        </ScrollLink>
      </div>
    </section>
  );
};
