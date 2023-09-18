import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { accessToken } = useSelector(
    (state) => state.authenticated
  );

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
