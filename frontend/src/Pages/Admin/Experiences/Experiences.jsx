import AdminHeader from "../../../components/Headers/AdminHeader";
import useFetchData from "../../../utils/hooks/useFetchData";
import { useContext } from "react";
import { AppContext } from "../../../utils/context/store";
import useFilterData from "../../../utils/hooks/useFilterData";
import AddHeader from "../../../components/Headers/AddHeader";
import Table from "../../../components/Tables/AdminTable";
import Loader from "../../../components/Loader/Loader";

const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const Experiences = () => {
  const { data,error } = useFetchData(`${BASE_URL}admin/experiences`);
  const {
    loader: [isLoading],
    theme: [theme],
    sideNav: [isExpanded],
    responseError:[,setError]
  } = useContext(AppContext);
  const { columnNames, isAvailable } = useFilterData(data, "experiences");
  return isLoading ? (
    <Loader />
  ) : error?setError(error):(
    <div className="w-full flex flex-col justify-start items-start h-screen px-10">
      <AdminHeader title={"Experiences"} />
      <AddHeader theme={theme} title={"Experiences"} />
      <div
      className={`w-full h-full  bg-transparent flex flex-col justify-start items-center rounded-t-lg`}
    >
      
      {isAvailable ? (
        <div className="w-full h-full overflow-scroll">
          <Table
            theme={theme}
            data={data.experiences}
            columnNames={columnNames}
            isExpanded={isExpanded}
            title={"experiences"}
          />
        </div>
      ) : (
        <div
          className={`w-full h-full bg-transparent 
          flex justify-center items-center text-white
          text-2xl font-semibold font-NotoSansJP tracking-wide`}
        >
          No Experience Exists Yet...
        </div>
      )}
    </div>
    </div>
  );
}

export default Experiences