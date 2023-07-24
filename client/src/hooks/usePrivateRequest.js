import { useState } from "react";
import { privateRequest } from "../axiosInstance";

const usePrivateRequest = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add request interceptor to update the authorization token
  privateRequest.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const fetchData = async (method, url, data = {}, options = {}) => {
    setLoading(true);
    try {
      const response = await privateRequest({
        method,
        url,
        data,
        ...options,
      });
      setLoading(false);
      return response.data; // Return the actual response data
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, error, fetchData }; // Return the fetchData function directly
};

export default usePrivateRequest;
