import React, { useEffect } from "react";
import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import usePagination from "../../hooks/usePagination";

const Pagination = ({ totalPages, setPage }) => {
  const { currentPage, handlePrevPage, handleNextPage, handlePageClick, getPageNumbers } =
    usePagination(totalPages);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Flex justify="center" mt={4}>
      <ButtonGroup>
        <IconButton
          icon={<BsChevronLeft />}
          size="sm"
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
        />
        {getPageNumbers().map((pageNumber) => (
          <Button
            size="sm"
            key={pageNumber}
            bg={pageNumber === currentPage ? "gray.300" : "gray.100"}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <IconButton
          icon={<BsChevronRight />}
          size="sm"
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default Pagination;
