import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FeaturedCategory } from "../constant";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          620: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {FeaturedCategory.map((item) => (
          <SwiperSlide key={item.category}>
            <Link
              to={`/product/${item.category}`}
              className="hero-img d-block position-relative overflow-hidden"
            >
              <img src={item.img_path} alt="" className="rounded-4" />
              <div className="position-absolute z-2 feature-label">
                <h1 className="text-capitalize">{item.category}</h1>
              </div>
              <div className="bg-black opacity-25 position-absolute top-0 h-100 w-100 rounded-4" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroCarousel;
