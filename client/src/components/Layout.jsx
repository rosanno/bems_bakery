import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navigationbar from "./Navigationbar";
import Container from "react-bootstrap/esm/Container";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../features/authSlice";
import Footer from "./Footer";

const Layout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { fetchData } = usePrivateRequest(token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchData("GET", "auth/user");
        if (userData?.user) {
          dispatch(setCurrentUser({ user: userData.user }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., show an error message or retry)
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token, dispatch]);

  return (
    <>
      <ToastContainer />
      <Navigationbar />
      <Container fluid>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
