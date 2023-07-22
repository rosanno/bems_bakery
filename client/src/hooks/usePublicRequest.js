import { useState } from "react";
import { publicRequest } from "../axiosInstance";

const usePublicRequest = () => {
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

      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, fetchData };
};

export default usePublicRequest;
