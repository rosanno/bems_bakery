import { Link, useLocation } from "react-router-dom";

const NavLink = ({ label, route }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={route}
      className={`text-sm font-medium ${
        pathname === route && "text-[#e8c249]"
      } hover:text-[#e8c249] transition-colors duration-200`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
