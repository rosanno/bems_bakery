import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetUserQuery } from "../services/bakeryApi";
import { setCurrentUser } from "../features/authSlice";

const Layout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { data } = useGetUserQuery();

  useEffect(() => {
    redirect();
  }, [token]);

  useEffect(() => {
    const setUser = () => {
      dispatch(setCurrentUser({ user: data?.user }));
      console.log("set user");
    };

    user === null && setUser();
  }, [dispatch]);

  const redirect = () => {
    if (!token) {
      return navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          marginBottom: "30px",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
