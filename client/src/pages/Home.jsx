import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGetProductsQuery } from "../services/cakeApi";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import useScrollTop from "../hooks/useScrollTop";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import Process from "../components/Process";

import "swiper/css";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({
    sort: "",
  });

  useScrollTop(); // scroll to top

  return (
    <Container>
      <Hero />
      <Process />

      <section className="sm:p-6 lg:p-8 mt-16 lg:mt-36 mb-10">
        <div className="flex justify-center text-center my-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.3,
              },
            }}
            viewport={{
              once: true,
            }}
            className="text-2xl lg:text-3xl font-bold capitalize mt-2"
          >
            Featured Cakes
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          viewport={{
            once: true,
          }}
        >
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
        </motion.div>
      </section>
    </Container>
  );
};

export default Home;
