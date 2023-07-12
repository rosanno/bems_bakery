import { Link } from "react-router-dom";
import { BsSearch, BsCart } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import { openModal } from "../features/modalSlice";
import { navItems } from "../constants";
import { useDispatch } from "react-redux";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";

const IconButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-gray-300/20 transition-colors duration-300 p-1.5 rounded-full"
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const [changeNavBg, setChangeNavBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 10) {
        setChangeNavBg(true);
      } else {
        setChangeNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onCloseModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <LoginModal />
      <div
        className={`${
          changeNavBg ? "bg-white h-16 text-black shadow-sm" : "bg-transparent text-white h-20"
        } transition-all duration-500 fixed inset-0 z-20 hidden md:flex items-center`}
      >
        <div className="flex items-center justify-between custom-container">
          <Link to="/">
            <span className="">LOGO</span>
          </Link>
          <nav>
            <ul className="flex items-center gap-16">
              {navItems.map((item) => (
                <li key={item.label} className="font-semibold">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <IconButton>
              <BsSearch className="text-lg font-semibold" />
            </IconButton>
            <IconButton>
              <BsCart className="text-lg font-semibold" />
            </IconButton>
            <IconButton onClick={onCloseModal}>
              <AiOutlineUser className="text-xl font-semibold cursor-pointer" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
