import { Link } from "react-router-dom";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";

import Logo from "./ui/Logo";

const navItems = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Cakes",
    route: "/cakes",
  },
  {
    label: "Contact",
    route: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="border-t mt-10 bg-gray-100">
      <div className="flex items-center justify-between py-7 px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 md:gap-4">
          <Logo />
          <p className="text-xs text-gray-400">
            © 2023 Cake house. All rights reserve
          </p>
        </div>
        <div className="flex items-center gap-7">
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                to={item.route}
                key={item.route}
                className="text-xs text-neutral-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <BsInstagram className="text-[#F8605F]" />
            <BiLogoFacebook className="text-[#F8605F]" />
            <BsTwitter className="text-[#F8605F]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
