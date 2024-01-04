import { useContext, useMemo, useState, useEffect } from "react";
import { AppContext } from "../context/store";
import axios from "axios";


const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const {
    loader: [, setIsLoading],
  } = useContext(AppContext);
  const memoizedValue = useMemo(() => ({ data, error }), [data, error]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const data = await response.data;
      setData(data);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500).
        setError({
          status: error.response.status,
          message: error.response.data.message || "An error occurred",
        });
      } else if (error.request) {
        // The request was made but no response was received.
        setError({
          status: null,
          message: "No response received from the server",
        });
      } else {
        // Something happened in setting up the request that triggered an Error.
        setError({
          status: null,
          message: "An error occurred while setting up the request",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  return memoizedValue;

  // return { data, error, isLoading};
};

export default useFetchData;
