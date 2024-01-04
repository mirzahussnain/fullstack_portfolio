import { useContext } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import DashboardCards from "../../../components/Cards/DashboardCards";
import useFetchData from "../../../utils/hooks/useFetchData";
import { AppContext } from "../../../utils/context/store";
const BASE_URL=import.meta.env.VITE_REACT_APP_SERVER_BASE_URL
import Loader from '../../../components/Loader/Loader';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
 const {data,error}=useFetchData(`${BASE_URL}admin/dashboard`)
 const {loader:[isLoading], userData: [, setUserData],
responseError:[,setError]}=useContext(AppContext)
 const navigateTo=useNavigate()
  useEffect(()=>{
    if(data){

      setUserData(data?.user)
    }
  },[data])
 return (
    isLoading?<Loader/>:
    error?setError(error):
    <>
    <div className="w-full flex flex-col justify-start items-start h-screen px-10">
    <AdminHeader title={'Dashboard'}/>
    <div className="flex justify-start w-full h-full  max-lg:flex-wrap overflow-y-auto">
    <DashboardCards/>
    </div>
   
    </div>
    
  
                
    </>
  );
};

export default Dashboard;
