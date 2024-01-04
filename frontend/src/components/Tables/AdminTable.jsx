import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../PopUps/DeleteConfirmation";
import axios from "axios";
import noImage from "../../assets/images/noImage.jpg";
import { columnsToHide } from "../../utils/enums/responseColumnHeadings";
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
import { format } from "date-fns";
import toast from "react-hot-toast";

const Table = ({ theme, data, columnNames, isExpanded, title }) => {
  const navigateTo = useNavigate();
  const [idToDelete, setIdToDelete] = useState(null);
  const [itemData, setItemData] = useState(data);
  const getUpdatedData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/${title}`, {
        withCredentials: true,
      });
      setItemData(response.data[title]);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500).
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // The request was made but no response was received.
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error.
        toast.error("An error occurred while setting up the request");
      }
    }
  };
  useEffect(() => {
    getUpdatedData();
  }, [idToDelete]);
  return (
    <>
      <div className="w-full h-full  rounded-b-lg relative">
      <table
      className={`w-full h-full
${
  theme === "dark"
    ? "bg-black/40  text-white"
    : "bg-gray-300/60 text-gray-700"
} text-white  table-auto max-lg:w[200px] 
${idToDelete ? "blur-sm disabled pointer-events-none" : "blur-0 active "}
font-NotoSansJP rounded-b-2xl overflow-scroll`}
    >
      <thead
        className={`${
          theme === "dark"
            ? "bg-black/75 shadow-sm shadow-purple-600"
            : "bg-gray-300 shadow-xl shadow-green-200"
        }`}
      >
        <tr
          className={`px-6 py-3 text-xs font-medium tracking-wider text-left ${
            theme === "dark"
              ? "text-gray-500 border-purple-400 "
              : "text-gray-500  border-teal-400 "
          } border-b-2 uppercase`}
        >
        
          {columnNames.map((heading, index) => (
            <th
              key={index}
              className={`text-center py-2
      ${
        columnsToHide[title.toUpperCase()].ON_LARGE.includes(heading)
          ? "max-2xl:hidden"
          : columnsToHide[title.toUpperCase()].ON_MEDIUM.includes(
              heading
            ) ? "max-md:hidden":columnsToHide[title.toUpperCase()].ON_SMALL.includes(
              heading
            ) && "max-sm:hidden"
      }`}
            >
              {heading.replace("_", " ")}
            </th>
          ))}
          <th className="text-center py-2 ">Edit</th>
          <th className="text-center py-2 ">Delete</th>
        </tr>
      </thead>
      <tbody
        className={`w-full bg-transparent divide-y ${
          theme === "dark" ? "divide-purple-300" : "divide-teal-400"
        } rounded-b-2xl`}
      >
        {itemData?.map((item) => (
          <tr key={item._id} className="w-full">
            {columnNames.map((property, index) => (
              <td
                key={`${item?._id}-${index}`}
                className={`${isExpanded ? "px-0" : "px-4"} ${
                  theme === "dark"
                    ? "hover:text-purple-300  text-white"
                    : "text-gray-500 hover:text-teal-600"
                }
          hover:cursor-pointer py-4  inset-0 text-sm font-medium w-[120px] text-center transition-all duration-150
        ${
          columnsToHide[title.toUpperCase()].ON_LARGE.includes(property)
            ? "max-2xl:hidden"
            : columnsToHide[title.toUpperCase()].ON_MEDIUM.includes(
                property
              ) ? "max-md:hidden":columnsToHide[title.toUpperCase()].ON_SMALL.includes(
                property
              ) && "max-sm:hidden"
        }`}
              >
                {item[property] !== null &&
                typeof item[property] === "object" ? (
                  Object.keys(item[property]).map((nestedProperty) =>
                    nestedProperty === "url" ? (
                      <div key={`${item?._id}-${index}-${nestedProperty}`} className="w-[100px]">
                        {item[property][nestedProperty] !== null ? (
                          <img
                            key={nestedProperty}
                            className={`${
                              isExpanded
                                ? "px-2 w-[70px] h-[70px] rounded-md"
                                : "w-[70px] h-[70px] px-0"
                            } object-fill mx-auto rounded-md hover:scale-110 hover:cursor-pointer transition-all duration-150`}
                            src={item[property][nestedProperty]}
                            alt={`${item}-img`}
                            onClick={() =>
                              window.open(
                                `${data[property][nestedProperty]}`,
                                "_blank",
                              )
                            }
                          />
                        ) : (
                          <img
                            key={`${item?._id}-${index}-${nestedProperty}`}
                            className={`${
                              isExpanded
                                ? "px-2 w-[120px] h-[100px] rounded-md"
                                : "w-[100px] h-[100px] px-0"
                            } object-fill mx-auto rounded-md hover:scale-110 hover:cursor-pointer transition-all duration-150`}
                            src={noImage}
                            alt="project-img"
                            onClick={() =>
                              window.open(
                                `${data[property][nestedProperty]}`,
                                "_blank",
                              )
                            }
                          />
                        )}
                      </div>
                    ) : nestedProperty !== "public_id" ? (
                      <div
                        key={`${item?._id}-${index}-${nestedProperty}`}
                        className={`w-[115px] inline-flex overflow-hidden text-ellipsis
                         hover:cursor-pointer  transition-all duration-150`}
                      >
                      <span> {item[property][nestedProperty]}</span>
                       
                      </div>
                    ) : null,
                  )
                ) : (
                  <div
                  key={`${item?._id}-${index}-${property}`}
                    className={`w-[115px] m-auto px-2 self-center  text-ellipsis whitespace-nowrap hover:whitespace-normal hover:cursor-pointer overflow-hidden transition-all duration-150`}
                  >
                    {property.includes("Date")
                      ? format(new Date(item[property]), "yyyy-MM-dd")
                      : item[property]}
                  </div>
                )}
              </td>
            ))}
            <td key={`edit-${item?._id}`} className="text-center w-[50px] p-3 ">
              <button
                className={`w-[20px] h-[30px] ${
                  theme === "dark" ? "text-white" : "text-gray-500"
                } 
      rounded-xl hover:text-green-600`}
                onClick={() =>
                  navigateTo(`/admin/${title}/update`, {
                    state: {
                      itemData: item,
                    },
                    replace: true,
                  })
                }
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </td>
            <td key={`delete-${item?._id}`} className="text-center w-[50px] rounded-br-2xl p-3 ">
              <button
                className={`w-[20px] h-[30px] ${
                  theme === "dark" ? "text-white" : "text-gray-500"
                } 
      rounded-xl hover:text-red-700`}
                onClick={() => {
                  setIdToDelete(item._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        <DeleteConfirmation
          title={title.slice(0, -1)}
          id={idToDelete}
          setIdToDelete={setIdToDelete}
        />
      </div>
    </>
  );
};

export default Table;
