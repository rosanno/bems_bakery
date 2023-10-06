import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col-reverse md:flex-row items-start">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              delay: 0.3,
              type: "tween",
            },
            animation: "ease-in",
          }}
          className="flex-1 mt-10 md:mt-28"
        >
          <h1 className="text-base text-[#916045] font-[500] leading-10 md:leading-none">
            Suggested for you
          </h1>
          <h2 className="text-6xl md:text-7xl font-[600] leading-[1.1] md:leading-[1.2] lg:leading-[1.4]">
            Stawberry <span className="text-[#916045]">Cake</span>
          </h2>
          <p className="mt-4 text-sm text-gray-500 leading-[1.9]">
            A delectable strawberry mini cake is a bite-sized delight that
            combines the sweet and juicy essence of ripe strawberries with a
            moist, fluffy cake. This miniature dessert offers a burst of fruity
            flavor in every bite, topped with a luscious strawberry glaze or
            frosting for an extra layer of indulgence.
          </p>
          <div className="mt-10">
            <button
              onClick={() => navigate("/cakes")}
              className="border border-rose-500 hover:bg-rose-600 hover:text-white transition py-2.5 px-4 rounded-md font-[600] capitalize text-sm"
            >
              order now
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              delay: 0.3,
              type: "tween",
            },
            animation: "ease-in",
          }}
          className="mt-5"
        >
          <img
            src="/assets/images/hero-bg.png"
            alt=""
            loading="lazy"
            className="w-[390px] h-[390px] sm:w-[470px] sm:h-[470px] md:w-[550px] md:h-[490px] object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
