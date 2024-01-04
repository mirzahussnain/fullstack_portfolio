import { useContext } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import { useLocation } from "react-router-dom";
import EditHeader from "../../../components/Headers/EditHeader";
import EditCards from "../../../components/Cards/EditCard";
import { AppContext } from "../../../utils/context/store";

const UpdateExperiences = () => {
  const { state } = useLocation();
  const {
    theme: [theme],
  } = useContext(AppContext);
  return (
    <>
      <div className="w-full flex flex-col justify-start items-start h-screen px-10">
        <AdminHeader title={"Edit Experience"} />
        <div
          className={`flex flex-col justify-start w-full h-full max-md:w-[300px]
       rounded-lg mb-10
       overflow-y-auto
       ${theme === "dark" ? "bg-black/80" : "bg-white/40"}`}
        >
          <EditHeader title={"Experience"} id={state?.itemData?._id} />
          <EditCards data={state?.itemData} title={"Experience"} />
        </div>
      </div>
    </>
  );
};

export default UpdateExperiences;
