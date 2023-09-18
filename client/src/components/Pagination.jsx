import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination mt-4 flex justify-center space-x-2">
      <button
        className={`px-2 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
            : "bg-[#F8605F] text-white"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsChevronLeft />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-3 py-1 rounded ${
            pageNumber === currentPage
              ? "bg-[#F8605F] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`px-2 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
            : "bg-[#F8605F] text-white"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
