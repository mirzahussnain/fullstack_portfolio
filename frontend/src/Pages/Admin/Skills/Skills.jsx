import AdminHeader from "../../../components/Headers/AdminHeader";
import useFetchData from "../../../utils/hooks/useFetchData";
import { useContext } from "react";
import { AppContext } from "../../../utils/context/store";
import useFilterData from "../../../utils/hooks/useFilterData";
import AddHeader from "../../../components/Headers/AddHeader";
import Table from "../../../components/Tables/AdminTable";
import Loader from "../../../components/Loader/Loader";

const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const Skills = () => {
  const { data,error } = useFetchData(`${BASE_URL}admin/skills`);
  const {
    loader: [isLoading],
    theme: [theme],
    sideNav: [isExpanded],
    responseError:[,setError]
  } = useContext(AppContext);
  const { columnNames, isAvailable } = useFilterData(data, "skills");
  return isLoading ? (
    <Loader />
  ) :error?setError(error) :(
    <div className="w-full flex flex-col justify-start items-start h-screen px-10">
      <AdminHeader title={"Skills"} />
      <AddHeader theme={theme} title={"Skills"} />
      <div
      className={`w-full h-full flex flex-col justify-start items-center rounded-lg overflow-auto`}
    >
      {isAvailable ? (
        <div className="w-full h-screen rounded-b-xl">
          <Table
            theme={theme}
            data={data.skills}
            columnNames={columnNames}
            isExpanded={isExpanded}
            title={"skills"}
          />
        </div>
      ) : (
        <div
          className={`w-full h-full bg-transparent 
          flex justify-center items-center text-white
          text-2xl font-semibold font-NotoSansJP tracking-wide`}
        >
          No Skill Exists Yet...
        </div>
      )}
    </div>
    </div>
  );
};

export default Skills;
