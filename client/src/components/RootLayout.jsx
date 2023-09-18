import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./Navbar";
import Footer from "./Footer";

export const RootLayout = () => {
  const { pathname } = useLocation();
  const { isSidebarOpen } = useSelector((state) => state.filterSidebar);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <Navbar />
      <Toaster />
      <main
        className="transition-all duration-700"
        style={{
          minHeight: "629px",
        }}
      >
        <Outlet />
      </main>
      {pathname !== "/login" && pathname !== "/register" && <Footer />}
    </div>
  );
};
