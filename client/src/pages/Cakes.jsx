import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import Sorting from "@/components/Sorting";
import { useGetProductsQuery } from "@/services/cakeApi";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { toggleFilterSidebar } from "@/features/filterSidebar/filterSidebarSlice";
import useScrollTop from "@/hooks/useScrollTop";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

const Cakes = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const optionalProps = {
    sort: sort || "",
    category: category || "",
    page: currentPage || 1,
    search: search || "",
  };
  const { data, isFetching } = useGetProductsQuery(optionalProps);
  const dispatch = useDispatch();

  useScrollTop(); // scroll top top

  const onOpen = () => dispatch(toggleFilterSidebar());

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <FilterSidebar />
      <div className="mx-auto max-w-7xl px-3 pt-20">
        <header className="flex items-center justify-between mt-4 md:mt-8">
          <h1 className="text-xl md:text-2xl font-semibold capitalize">
            {!search ? "Cakes" : `Results for "${search}"`}
          </h1>
          <div className="flex gap-2">
            <Sorting onChange={handleChange} />
            {/* <IconButton icon={<HiAdjustmentsHorizontal />} onClick={onOpen} /> */}
          </div>
        </header>
        <section className="mt-7">
          {data?.products?.length === 0 && (
            <div className="flex flex-col justify-center items-center space-y-2 h-[450px]">
              <p className="text-neutral-500 text-xl font-semibold">
                Product not found
              </p>
            </div>
          )}
          {isFetching ? (
            <div className="flex flex-col justify-center items-center space-y-2 h-[450px]">
              <Loader label="Loading products..." />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data?.products?.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
              {data?.totalPages !== 1 && data?.products?.length !== 0 && (
                <div className="my-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data?.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Cakes;
