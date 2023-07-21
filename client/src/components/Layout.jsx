import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import Container from "react-bootstrap/esm/Container";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../features/authSlice";

const Layout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { data, loading, error, fetchData } = usePrivateRequest(token);

  useEffect(() => {
    fetchData("GET", "auth/user");
  }, []);

  useEffect(() => {
    if (data?.user) {
      dispatch(setCurrentUser({ user: data.user }));
    }
  }, [data, dispatch]);

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
