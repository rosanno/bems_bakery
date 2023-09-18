import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const CategoryCard = ({ data }) => {
  const decodedText = decodeURIComponent(data.label);
  const category = decodedText.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`cakes/${category}`}
      className="w-56 h-60 px-10 mt-28 rounded-lg block"
      style={{
        backgroundColor: `${data.bgColor}`,
      }}
    >
      <div className="flex flex-col justify-center items-center -translate-y-20">
        <img
          src={data.img}
          alt={data.label}
          className="w-44 h-48 object-contain"
        />
        <div className="text-center mt-3">
          <h4 className="text-lg text-black/60 font-semibold">{data.label}</h4>
        </div>
        <button className="bg-white shadow-md rounded-full p-2 mt-7 scale-95 hover:scale-105 transition duration-200">
          <BsArrowRight />
        </button>
      </div>
    </Link>
  );
};

export default CategoryCard;
