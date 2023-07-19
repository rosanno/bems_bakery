import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    redirect();
  }, [token]);

  const redirect = () => {
    if (!token) {
      return navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
