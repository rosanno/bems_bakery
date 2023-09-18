import { Link, useLocation } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../features/mobileSidebar/mobileSidebarSlice";
import IconButton from "./ui/IconButton";

const MobileSidebar = ({ items }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  const onClose = () => dispatch(toggleSidebar());

  return (
    <div
      className={`fixed z-30 bg-white h-full w-full shadow-sm ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-700`}
    >
      <div className="py-4 px-5 flex items-center border-b mb-10">
        <div className="ml-auto">
          <IconButton icon={<GrClose />} onClick={onClose} />
        </div>
      </div>
      <div className="flex flex-col px-10">
        {items.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            onClick={onClose}
            className={`text-base uppercase font-semibold ${
              pathname === item.route && "text-[#e8c249]"
            } hover:text-[#e8c249] transition-colors duration-200 py-2.5`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebar;
