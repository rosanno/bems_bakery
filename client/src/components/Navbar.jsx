import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

import { resetState, setUser } from "../features/auth/authSlice";
import { persistor } from "../app/store";
import { setCartItems } from "../features/cart/cartSlice";
import {
  useGetCartItemsQuery,
  useGetUserQuery,
  useLogoutMutation,
} from "../services/cakeApi";
import NavLink from "./ui/NavLink";
import IconButton from "./ui/IconButton";
import MobileSidebar from "./MobileSidebar";
import Logo from "./ui/Logo";
import { toggleSidebar } from "../features/mobileSidebar/mobileSidebarSlice";

const navItems = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Cakes",
    route: "/cakes",
  },
  {
    label: "Contact Us",
    route: "/contact",
  },
  {
    label: "About",
    route: "/about",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { accessToken } = useSelector((state) => state.authenticated);
  const { data } = useGetCartItemsQuery({}, { skip: !accessToken });
  const { data: user } = useGetUserQuery({}, { skip: !accessToken });
  const { cartItems } = useSelector((state) => state.cart);
  const [logout] = useLogoutMutation();

  const onOpen = () => dispatch(toggleSidebar());

  const onLogout = async () => {
    await logout();
    dispatch(resetState());
    persistor.purge();
    window.location.reload();
  };

  useEffect(() => {
    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add an event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (accessToken && user) {
      dispatch(setUser({ user: user?.user }));
    }
  }, [accessToken, user, dispatch]);

  useEffect(() => {
    if (accessToken && data) {
      dispatch(setCartItems({ cartItems: data?.cartItems }));
    }
  }, [accessToken, data, dispatch]);

  return (
    <>
      <MobileSidebar items={navItems} />
      <div
        className={`fixed top-0 left-0 right-0 z-20 bg-white border-b`}
        ref={dropdownRef}
      >
        <div className="flex items-center gap-20 mx-auto max-w-7xl h-16 py-4 px-4 md:px-3">
          <div>
            <Logo />
          </div>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <>
                <nav className="hidden md:flex items-center gap-10">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.route}
                      label={item.label}
                      route={item.route}
                    />
                  ))}
                </nav>
                <div className="flex items-center gap-3 md:gap-4 ml-auto">
                  <HiMiniMagnifyingGlass
                    className="text-[#F8605F] cursor-pointer"
                    size={23}
                  />
                  {accessToken ? (
                    <div className="relative">
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-8 h-8 border-2 rounded-full overflow-hidden cursor-pointer"
                      >
                        <img
                          src="/assets/avatar.webp"
                          alt=""
                          className="h-8 w-8 object-cover"
                        />
                      </div>
                      <div
                        className={`bg-white shadow-md rounded-md w-36 py-2.5 absolute mt-2 right-3 ${
                          isDropdownOpen
                            ? "scale-110 duration-300"
                            : "scale-0 duration-100"
                        } transition-transform`}
                      >
                        <div className="border-b">
                          <div className="px-2 pb-2">
                            <h4 className="text-sm text-gray-500/80 font-medium">
                              {user?.user?.name}
                            </h4>
                            <p className="text-xs text-gray-500/80">
                              {user?.user?.email}
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2 px-2 pt-1.5">
                          <li className="list-item">
                            <Link
                              to="/account"
                              className="block cursor-pointer"
                            >
                              Account
                            </Link>
                          </li>
                          <li className="list-item">
                            <Link
                              to="/orders"
                              onClick={() => setIsDropdownOpen(false)}
                              className="block cursor-pointer"
                            >
                              Orders
                            </Link>
                          </li>
                          <li
                            className="list-item cursor-pointer"
                            onClick={onLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <FiUser
                      className="text-[#F8605F] cursor-pointer"
                      size={20}
                      onClick={() => navigate("/login")}
                    />
                  )}
                  <div className="relative">
                    <IconButton
                      icon={<BsHandbag />}
                      count={cartItems?.items?.length}
                      isCart
                      variant="danger"
                      onClick={() => navigate("/cart")}
                    />
                    <span className="absolute -top-2 -right-1 text-xs text-black text-center font-semibold bg-white shadow-md rounded-full h-4 w-4 transition-all duration-300">
                      {cartItems?.items?.length || 0}
                    </span>
                  </div>
                  <div className="md:hidden">
                    <IconButton
                      icon={<RxHamburgerMenu size={18} />}
                      onClick={onOpen}
                    />
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
