import { useContext,useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./utils/context/store.jsx";
import Login from "./Pages/Admin/Login/Login.jsx";
import ErrorHandler from "./Pages/Error/ErrorHandler.jsx";
import BaseTemplate from "./Layouts/Admin/BaseTemplate.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import Home from "./Pages/Home/Home.jsx";
import useFetchData from "./utils/hooks/useFetchData.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
const App = () => {
  const adminRoute = AdminRoutes();
  const {
    authenticated: [isAuthenticated],
    userData: [, setUserData],
    theme:[theme],
    responseError:[,setError]
  } = useContext(AppContext);
  const { data, error } = useFetchData(`${BASE_URL}user`,{
    withCredentials: true
  });

 
  useEffect(() => {
    // Ensure data is available before calling setUserData
    if (data) {
     
      setUserData(data?.user);
    }
    else if(error){
      setError(error)
    }
  }, [data,error]);


  return (
    <>
    <Toaster position="top-center" toastOptions={{
      style:{
        backgroundColor:`${theme==='dark'?'rgb(168, 85, 247)':'rgb(104, 188, 175)'}`,
        color:`white`
      }
    }}/>

    
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />
          }
        />
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <BaseTemplate>{adminRoute}</BaseTemplate>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {adminRoute}
        </Route>

        <Route path="/error" element={<ErrorHandler />} />
      </Routes>
      </BrowserRouter>
    
    </>
   
    
  );
};

export default App;
