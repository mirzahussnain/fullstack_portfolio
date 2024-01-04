import { useContext, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import axios from "axios";
import format from "date-fns/format";
import { AppContext } from "../../../utils/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faBook, faCalendar, faListAlt, faParagraph, faProjectDiagram, faSchool } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const AddEducation = () => {
  const navigateTo=useNavigate()
  const [educationData, setEducationData] = useState({
    institution: "",
    degree: "",
    fromDate: "",
    toDate: "",
    description: "",
    field: "",
    grade: "",
    image: "",
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
      setUpdatedData({
        ...educationData,
        [name]: formattedDate,
      });
    } else if (name?.includes("image")) {
      const Reader = new FileReader();
      Reader.readAsDataURL(e.target.files[0]);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setEducationData({
            ...educationData,
            [name]: Reader.result,
          });
        }
      };
    } else {
      setEducationData({
        ...educationData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}admin/education/add`,
        educationData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const responseMessage = response.data.message;
      toast.success(responseMessage);
      setEducationData({
        institution: "",
        degree: "",
        fromDate: "",
        toDate: "",
        description: "",
        grade: "",
        field: "",
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
        <AdminHeader title={"Add Education"} />
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
          <button className={`w-[30px] h-[px] max-lg:w-[40px] max-lg:p-0 
      ${theme==='dark'?'bg-purple-500 hover:bg-white/70 hover:text-purple-700':'bg-teal-500 hover:bg-black/60 hover:text-white'} 
       text-white rounded-md mr-4`}
       onClick={()=>{navigateTo('/admin/education')}}>
       <FontAwesomeIcon icon={faBackward}/>
       </button>
            <h1 className="w-full">Education Details</h1>
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
            <FontAwesomeIcon icon={faSchool} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="institution"
                type="text"
                name="institution"
                placeholder="Enter Institution Name"
                value={educationData.institution}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="institution"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
     cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
     peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
     transition-all`}
              >
                Institution Name
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
                Institution Image
              </label>
            </div>

            <br />

            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
         p-2 my-2 focus-within:border-b-2 
         ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
         relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faBook} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="degree"
                type="text"
                name="degree"
                placeholder="Enter Degree"
                value={educationData.degree}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="degree"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
         cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
         peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
         transition-all`}
              >
                Degree Name
              </label>
            </div>

            <br />
            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
       p-2 my-2 focus-within:border-b-2 
       ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
       relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faProjectDiagram} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="field"
                type="text"
                name="field"
                placeholder="Enter Field Name"
                value={educationData.field}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="field"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
       cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
       peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
       transition-all`}
              >
                Field of Study
              </label>
            </div>

            <br />

            <div
              className={`border-b w-[350px]  max-lg:w-[200px] inline-flex justify-start items-center 
     p-2 my-2 focus-within:border-b-2 
     ${theme === "dark" ? "border-b-purple-600" : "border-b-green-700"} 
     relative transition-colors duration-300`}
            >
            <FontAwesomeIcon icon={faListAlt} className={`${theme==='dark'?'text-purple-500':'text-teal-400'}`}/>
              <input
                id="grade"
                type="text"
                name="grade"
                placeholder="Enter Grade Obtained"
                value={educationData.grade}
                required
                autoComplete="off"
                className={`ml-2 w-full placeholder-transparent peer outline-none bg-transparent`}
                onChange={(e) => handleDataChange(e)}
              />
              <label
                htmlFor="grade"
                className={`${
                  theme === "dark"
                    ? "text-purple-600 font-bold"
                    : "text-green-700"
                } 
     cursor-text absolute -left-4 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:left-8 peer-placeholder-shown:top-2 
     peer-focus:text-sm peer-focus:-left-4 peer-focus:-top-4
     transition-all`}
              >
                Grade Obtained
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
                value={educationData.description}
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
                value={educationData.fromDate}
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
                value={educationData.toDate}
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
                {isLoading ? "Waiting..." : "Add Education"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEducation;
