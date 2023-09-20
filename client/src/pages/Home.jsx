import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGetProductsQuery } from "../services/cakeApi";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";
import useScrollTop from "../hooks/useScrollTop";
import Loader from "../components/Loader";
import Hero from "../components/Hero";

import "swiper/css";

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery({
    sort: "",
  });

  useScrollTop(); // scroll to top

  return (
    <Container>
      <section>
        <Hero />
      </section>

      <section className="sm:p-6 lg:p-8 lg:mt-16">
        <div className="flex justify-center text-center my-10">
          <h2 className="text-2xl lg:text-3xl font-bold capitalize mt-2">
            Featured Cakes
          </h2>
        </div>
        {isLoading && <Loader label="Loading products..." />}
        <Swiper
          slidesPerView={2}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="py-5"
        >
          {data?.products?.slice(0, 5).map((item) => (
            <SwiperSlide key={item._id} className="px-2.5">
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center my-10">
          <Button
            variant="danger"
            className="w-28"
            onClick={() => navigate("/cakes")}
          >
            See all
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default Home;
