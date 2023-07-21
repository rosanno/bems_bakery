import { useState } from "react";
import { publicRequest } from "../axiosInstance";

const usePublicRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (method, url, data = {}, options = {}) => {
    setLoading(true);
    try {
      const response = await publicRequest({
        method,
        url,
        data,
        ...options,
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default usePublicRequest;
