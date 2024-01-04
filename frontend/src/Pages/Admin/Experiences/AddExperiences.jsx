import { useContext, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import axios from "axios";
import format from "date-fns/format";
import { AppContext } from "../../../utils/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning, faBuilding, faCalendar, faLevelUpAlt, faParagraph } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const AddExperiences = () => {
  const [experienceData, setExperienceData] = useState({
    company: "",
    position: "",
    fromDate: "",
    toDate: "",
    description: "",
    skills: [],
  });

  const {
    theme: [theme],
    sideNav: [isExpanded],
    loader: [isLoading, setIsLoading],
  } = useContext(AppContext);

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name?.includes("date" || "Date")) {
      const formattedDate = format(new Date(value), "yyyy-MM-dd");
      setExperienceData({
        ...experienceData,
        [name]: formattedDate,
      });
    } else if (name?.includes("skills")) {
      const skillsList = value.split(",");
      setExperienceData({
        ...experienceData,
        [name]: skillsList,
      });
    } else if (name?.includes("image")) {
      const Reader = new FileReader();
      Reader.readAsDataURL(e.target.files[0]);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setExperienceData({
            ...experienceData,
            [name]: Reader.result,
          });
        }
      };
    } else {
      setExperienceData({
        ...experienceData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}admin/experience/add`,
        experienceData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const responseMessage = response.data.message;
      toast.success(responseMessage);
      setExperienceData({
        company: "",
        position: "",
        fromDate: "",
        toDate: "",
        description: "",
        skills: [],
      });
      e.target.reset();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response Received from server");
      } else {
        toast.error("An error occurred while setting up the request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center h-screen px-10">
        <AdminHeader title={"Add Experience"} />
        <div
          className={`flex flex-col mb-10 max-md:w-[300px] ${
            theme === "dark" ? "bg-black/80" : "bg-white/40"
          } justify-start items-center
          h-[500px] w-full rounded-xl overflow-hidden`}
        >
          <div
            className={`w-full h-[50px] flex  justify-start items-center py-3 font-extrabold tracking-wide text-xl font-OpenSans px-2
          ${
            theme === "dark"
              ? "text-white bg-gradient-to-r from-purple-700 to-purple-400"
              : "bg-gradient-to-r from-teal-700 to-teal-400 text-white"
          }
          transition-all ease-in-out duration-150 `}
          >
            <h1 className="w-full">Experience Details</h1>
          </div>
          <form
            className={`w-full h-full flex mt-4 justify-evenly flex-wrap
             items-center font-bold 
             ${theme == "dark" ? "text-white" : "text-black"}
             overflow-y-auto overflow-x-hidden py-3`}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
             p-2 my-2 focus-within:border-b-2 
             ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
             relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faLevelUpAlt} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="position"
                type="text"
                name="position"
                placeholder="Enter Position"
                value={experienceData.position}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="position"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
             cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
             peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
             transition-all`}
              >
                Position
              </label>
            </div>

            <br />
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
             p-2 my-2 focus-within:border-b-2 
             ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
             relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faBuilding} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="company"
                type="text"
                name="company"
                placeholder="Enter Company Name"
                value={experienceData.company}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="company"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
             cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
             peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
             transition-all`}
              >
                Company
              </label>
            </div>

            <br />
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
           p-2 my-2 focus-within:border-b-2 
           ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
           relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faBoltLightning} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="skills"
                type="text"
                name="skills"
                placeholder="Enter Company Name"
                value={experienceData.skills}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="skills"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
           cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
           peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
           transition-all`}
              >
                Skills
              </label>
            </div>
            <br />
            <div
              className={` border-b w-[350px] max-lg:w-[200px] inline-flex justify-start 
           items-center p-2 ${
             isExpanded ? "-left-12 max-lg:left-0" : null
           } my-4 focus-within:border-b-2 
           ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
           relative transition-colors duration-300`}
            >
              <button
                className={`${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-400 to-purple-600"
                    : "bg-gradient-to-r from-teal-300 to-teal-600"
                }
                 max-lg:w-[48px] px-1
                 rounded-lg w-[90px] h-[34px]   text-xs tracking-wide absolute -right-2 top-0`}
                type="button"
                id="imageButton"
                onClick={() => {
                  document.getElementById("image").click();
                }}
              >
                Select Image
              </button>
              <input
                id="image"
                type="file"
                name="image"
                placeholder="Select Image"
                autoComplete="off"
                accept="image/*"
                className={`ml-2 w-[250px] placeholder-transparent peer outline-none  bg-transparent imageButton`}
                onChange={(e) => handleDataChange(e)}
              />

              <label
                htmlFor="image"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
           cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
           peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
           transition-all`}
              >
                Company Image
              </label>
            </div>
            <br />
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
             p-2 my-2 focus-within:border-b-2 
             ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
             relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faCalendar} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="fromDate"
                type="date"
                name="fromDate"
                placeholder="Enter Starting Date"
                value={experienceData.fromDate}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none
                     ${theme === "dark" ? "darkCalendar" : "lightCalendar"}
                     bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="fromDate"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
             cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
             peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
             transition-all`}
              >
                Starting Date
              </label>
            </div>

            <br />

            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
             p-2 my-2 focus-within:border-b-2 
             ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
             relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faCalendar} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="toDate"
                type="date"
                name="toDate"
                placeholder="Enter Ending Date"
                value={experienceData.toDate}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none
                     ${
                       theme === "dark" ? "darkCalendar" : "lightCalendar"
                     } bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="toDate"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
             cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
             peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
             transition-all`}
              >
                Ending Date
              </label>
            </div>

            <br />

            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
             p-2 my-2 focus-within:border-b-2 
             ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
             relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faParagraph} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <textarea
                id="description"
                type="text"
                cols={24}
                rows={1}
                name="description"
                placeholder="Enter Description"
                value={experienceData.description}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="description"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
             cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
             peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
             transition-all`}
              >
                Description
              </label>
            </div>

            <div className="w-full inline-flex justify-center items-center">
              <button
                type="submit"
                className={`${
                  theme === "dark"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-600 hover:bg-green-700"
                }
         ${isLoading ? "disabled" : "active"}
     text-white w-[300px] max-lg:w-[200px] p-2 mt-6 rounded-lg cursor-pointer`}
              >
                {isLoading ? "Waiting..." : "Add Experience"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExperiences;
