import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";

import { toggleFilterSidebar } from "../features/filterSidebar/filterSidebarSlice";
import { useGetCategoriesQuery } from "../services/cakeApi";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.filterSidebar);
  const { data } = useGetCategoriesQuery();

  const onClose = () => dispatch(toggleFilterSidebar());

  return (
    <>
      <div
        className={`fixed z-30 top-0 right-0 bg-white shadow-md ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/5`}
      >
        <div className="px-3 py-2 flex justify-end">
          <IconButton icon={<GrClose />} onClick={onClose} />
        </div>
        <div className="px-4 py-5">
          <h3 className="font-semibold text-lg">Categories</h3>
          <div className="border-b my-2" />
          <div className="flex flex-wrap gap-2 mt-4">
            {data?.categories?.map((item) => (
              <Button key={item._id}>{item.name}</Button>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={onClose}
        className={`fixed z-20 top-0 ${
          isSidebarOpen ? "bg-black/50 w-full h-full" : ""
        } transition duration-500 `}
      />
    </>
  );
};

export default FilterSidebar;
