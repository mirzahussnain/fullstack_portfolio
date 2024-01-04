import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ME from "../../../assets/images/banner/MeT.png";
import { useContext, useState, useEffect } from "react";
import cv from "../../../assets/Hussnain_Ali.pdf";
import "./About.css";
import { AppContext } from "../../../utils/context/store";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const {
    theme: [theme],
    userData: [userData],
  } = useContext(AppContext);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100 && window.scrollY <= 1200) {
        setAnimationComplete(true);
      } else {
        setAnimationComplete(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      name="about"
      className={`banner ${
        theme === "dark" ? "bg-black" : "bg-white"
      } w-screen py-8 px-10 bg-top-center bg-cover bg-no-repeat overflow-hidden font-CentraNo2`}
    >
      <div className=" flex flex-col items-center relative w-full gap-4">
        <h1
          className={`text-[2.625rem] text-center font-semibold mt-5 max-md:mt-3 max-md:text-[2rem]
        ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-700  "
            : "bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500 "
        } bg-clip-text text-transparent `}
        >
          About
        </h1>
        <p
          className={`text-center ${
            theme === "dark" ? "text-neutral-400" : "text-neutral-600"
          } text-xl w-[38rem] max-sm:w-[22rem] max-sm:text-lg`}
        >
          Experienced Professional: Bridging Skills and Expertise for Impactful
          Work.
        </p>
        <div
          id="about-section"
          className={`flex items-center max-md:flex-col justify-between mt-5 w-full ${
            theme === "dark"
              ? "border-purple-500 bg-gray-950/80 shadow-purple-500/20"
              : "border-teal-500 bg-zinc-200/40 shadow-teal-500/20"
          } shadow-xl border  rounded-3xl overflow-hidden`}
        >
          <div className="w-full md:w-1/2 lg:w-7/12 xl:w-7/12 flex flex-col items-center mt-4 mb-12 h-full p-8">
            <img
              src={ME}
              alt=""
              className={`${
                theme === "dark"
                  ? "bg-gradient-to-b from-purple-500 to-transparent"
                  : "bg-gradient-to-b from-teal-600 to-transparent"
              } rounded-tl-md rounded-tr-md p-0  w-80 h-[20rem] `}
            />
          </div>
          <div
            className={`h-full w-full md:w-1/2 lg:w-7/12 xl:w-7/12 flex flex-col items-center justify-center
             mt-4 px-10
        ${
          theme === "dark"
            ? "text-white bg-dark_about_bg"
            : "text-zinc-700 bg-light_about_bg bg-right-top"
        } 
         font-CentraNo2 pb-10 bg-cover bg-no-repeat`}
          >
            <p className={`text-xl text-justify max-sm:text-sm `}>
              {userData?.about?.description}
            </p>
            <div
              className={`grid grid-cols-3 grid-rows-1 mt-8 max-lg:grid-cols-2 max-lg:grid-rows-2`}
            >
              <div className={`flex flex-col items-center justify-center`}>
                <h2
                  className={`text-5xl font-bold text-center mx-auto ${
                    theme === "dark"
                      ? "text-purple-500 h2-shadow-dark"
                      : "text-teal-500 h2-shadow-light"
                  }
                  ${animationComplete ? "fill-animation" : ""}
                  `}
                >
                  1+
                </h2>
                <span className={`wrap text-center mx-auto inline-block`}>
                  Years of Experience
                </span>
              </div>
              <div className={`flex flex-col items-center justify-center mx-6`}>
                <h2
                  className={`text-5xl font-bold text-center mx-auto ${
                    theme === "dark"
                      ? "text-purple-500 h2-shadow-dark"
                      : "text-teal-500 h2-shadow-light"
                  }
                  ${animationComplete ? "fill-animation" : ""}
                  `}
                >
                  {`${userData?.projects?.length}+`}
                </h2>
                <span className={`wrap text-center mx-auto inline-block`}>
                  Major Projects Completed
                </span>
              </div>
              <div className={`flex flex-col items-center justify-center mx-6`}>
                <h2
                  className={`text-5xl font-bold text-center mx-auto ${
                    theme === "dark"
                      ? "text-purple-500 h2-shadow-dark"
                      : "text-teal-500 h2-shadow-light"
                  }
                  ${animationComplete ? "fill-animation" : ""}
                  `}
                >
                  2+
                </h2>
                <span className={`wrap text-center mx-auto inline-block`}>
                  Companies Worked
                </span>
              </div>
            </div>
            <a href={cv} target="_blank">
              <button
                className={`w-44 h-12 ${
                  theme === "dark"
                    ? "bg-gradient-to-tr from-purple-600 via-purple-500 to-purple-600"
                    : "bg-gradient-to-tr from-teal-600 via-teal-400 to-teal-600"
                }
            rounded-xl mt-10  self-center text-white text-lg font-semibold hover:scale-105`}
              >
                Download CV
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={`ml-4 font-bold animate-bounce`}
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
