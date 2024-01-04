import { useContext } from "react";
import { AppContext } from "../../../utils/context/store";
import { useEffect } from "react";
import { useState } from "react";

const Skills = () => {
  const {
    theme: [theme],
    userData: [userData],
  } = useContext(AppContext);
  const [skillCategoryList, setSkillCategoryList] = useState([]);
  useEffect(() => {
    if (userData && userData?.skills) {
      let categoryList = [];
      userData.skills.forEach((skill) => {
        // Check if the category is already in the list
        if (!categoryList.includes(skill.category)) {
          // If not, add it to the list
          categoryList.push(skill.category);
        }
      });
       // Custom sorting logic
  categoryList.sort((a, b) => {
    const order = ['frontend', 'backend'];
    const indexA = order.indexOf(a.toLowerCase());
    const indexB = order.indexOf(b.toLowerCase());

    // If both categories are in the order array, sort them accordingly
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one of them is in the order array, prioritize it
    if (indexA !== -1) {
      return -1;
    }

    if (indexB !== -1) {
      return 1;
    }

    // If none of them are in the order array, sort alphabetically
    return a.localeCompare(b);
  });

      setSkillCategoryList(categoryList);
    }
  }, [userData]);
  return (
    <section
    name="skills"
      className={`font-CentraNo2 overflow-hidden
    ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div
        className={`flex flex-col items-center justify-between
    ${
      theme === "dark" ? "bg-dark_about_bg" : "bg-light_about_bg bg-right-top"
    } bg-no-repeat bg-cover `}
      >
        <div className={`w-full h-56 flex flex-col items-center gap-3`}>
          <h1
          className={`text-[2.625rem] text-center font-semibold mt-5 max-md:mt-3 max-md:text-[2rem]
          ${
           theme === "dark"
             ? "bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-700  "
             : "bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500 "
         } bg-clip-text text-transparent `}
          >
            Skills
          </h1>
          <p
            className={`text-center 
            ${theme==='dark'?'text-neutral-400':'text-neutral-600'}
             text-xl w-[38rem] max-sm:w-[22rem] max-sm:text-lg`}
          >
            Here are some of my skills on which I have been working on for the
            more than one and half years.
          </p>
        </div>
        <div
          className={`w-full max-md:w-5/6 max-md:mt-5 flex flex-wrap  justify-evenly mt-30  gap-30
             `}
        >
          {skillCategoryList?.map((category, index) => {
            return (
              <div
                key={`category-${index}`}
                className={`${
                  theme === "dark"
                    ? "border-purple-500 bg-gray-950/80 shadow-purple-500/20"
                    : "border-teal-500 bg-zinc-200/40 shadow-teal-500/20"
                } shadow-xl 
            border pb-10 w-[34rem] h-[24rem] max-md:h-auto  overflow-hidden
            rounded-3xl mb-16 flex flex-col gap-3`}
              >
                <h1
                  className={`${
                    theme === "dark" ? "text-zinc-300" : "text-neutral-500"
                  } text-center mx-auto mt-[12px] text-3xl font-semibold font-NotoSansJP
            tracking-tight`}
                >
                  {category}
                </h1>
                <div
                  className={`flex flex-wrap mt-[30px] gap-4 justify-center items-center px-10`}
                >
                  {userData?.skills?.map((skill, index) => {
                    if (skill.category === category) {
                      return (
                        <div
                          key={`skill-${index}`}
                          className={`inline-flex justify-center items-center border font-NotoSansJP
                         ${
                           theme === "dark"
                             ? "border-zinc-600 text-zinc-500"
                             : "border-zinc-700 text-neutral-500"
                         }  rounded-2xl  h-[34px] max-md:h-[30px]
                          px-4 max-md:px-3 py-7 max-md:py-5 whitespace-nowrap max-md:text-ellipsis overflow-hidden`}
                        >
                          <img
                            src={skill?.image?.url}
                            className={`object-cover w-[1.7rem] h-[1.7rem] rounded-md`}
                          />
                          <span className={`ml-3 text-lg`}>{skill?.name}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
