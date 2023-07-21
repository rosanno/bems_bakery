import { useState } from "react";

import { privateRequest } from "../axiosInstance";

const usePrivateRequest = (token) => {
  const [data, setData] = useState(null);
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
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default usePrivateRequest;
