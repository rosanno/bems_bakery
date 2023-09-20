import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const SearchInput = ({ isSearhOpen, setIsSearchOpen }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchClassName = isSearhOpen
    ? "ease-out opacity-100 pointer-events-auto"
    : "ease-in opacity-0 pointer-events-none";

  const onClose = () => {
    if (ref.current) {
      setIsSearchOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/cakes/${search}`);
    setIsSearchOpen(false);
    setSearch("");
  };

  return (
    <div
      ref={ref}
      onClick={onClose}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${searchClassName} overflow-auto bg-black/20 backdrop-blur-sm`}
    >
      <div className="fixed top-28 inset-x-0 flex items-center justify-center z-50 px-2">
        <form onSubmit={handleSearch}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-3 bg-white px-4 rounded-md"
          >
            <HiMiniMagnifyingGlass className="text-xl text-gray-400" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              value={search}
              placeholder="Search for cakes product"
              className="w-72 md:w-[480px] bg-transparent outline-none py-3 text-xs md:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
