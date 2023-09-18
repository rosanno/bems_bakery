import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header>
      <div
        className="h-96 w-full md:h-auto aspect-[1/1] md:aspect-[2/1] bg-cover relative"
        style={{
          backgroundImage: "url(/assets/hero-bg.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="flex flex-col justify-center items-center gap-y-1 md:gap-y-3 px-5 md:px-20 h-96 md:h-[630px] relative z-10">
          <h3 className="uppercase text-base md:text-xl text-white font-medium pointer-events-none">
            Don&apos;t miss today&apos;s featured deals
          </h3>
          <h1 className="text-4xl md:text-6xl text-white font-semibold pointer-events-none">
            Amazing Cakes
          </h1>
          <h2 className="text-lg md:text-xl text-white pointer-events-none">
            Here to brings life style to the next level.
          </h2>
          <Link
            to="/cakes"
            className="border-2 border-white px-4 md:px-6 py-1.5 md:py-2 mt-2.5 text-white text-xs hover:bg-white hover:text-black rounded-sm uppercase transition-colors duration-300"
          >
            shop now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
