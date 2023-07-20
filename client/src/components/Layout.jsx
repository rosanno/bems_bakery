import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const Layout = () => {
  return (
    <>
      <Navigationbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
