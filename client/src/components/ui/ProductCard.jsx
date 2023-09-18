import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import IconButton from "./IconButton";
import { useAddToCartMutation } from "../../services/cakeApi";
import useAddToCart from "../../hooks/useAddToCart";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.authenticated);
  const [addItemToCart, { isLoading }] = useAddToCartMutation();
  const { addToCart } = useAddToCart(
    accessToken,
    navigate,
    addItemToCart,
    toast
  );

  const onNavigate = () => navigate(`/cake-details/${item._id}`);

  return (
    <div
      onClick={onNavigate}
      className="shadow-sm rounded-md bg-gray-100/75 cursor-pointer group relative"
    >
      <div className="flex items-center justify-center px-2">
        <img
          src={item.imageURL}
          alt={item.name}
          loading="lazy"
          className="w-36 h-36 object-contain"
        />
      </div>
      {item.overallRating > 4 && (
        <div className="bg-rose-600/80 text-white py-0.5 px-4 rounded-tl-lg rounded-br-lg absolute top-0 left-0 transform -translate-y-1/2">
          <span className="text-xs">Best seller</span>
        </div>
      )}
      <div className="p-2 md:px-4">
        <h5 className="text-xs md:text-sm font-medium truncate">{item.name}</h5>
        <div className="flex items-center gap-1 pt-2">
          <p className="text-xs font-bold">{item.overallRating}</p>
          <AiFillStar className="text-yellow-300" />
          <p className="text-xs font-semibold text-gray-400">
            {item.reviewsCount} Reviews
          </p>
        </div>
        <div className="pt-3 flex items-center justify-between">
          <p className="text-sm md:text-lg font-bold text-[#FF5E42]">
            ₱{item.price}
          </p>
          <div className="scale-0 group-hover:scale-110 transition-transform duration-300">
            <IconButton
              icon={<BsHandbag />}
              disabled={isLoading}
              variant="danger"
              onClick={(event) => addToCart(event, item._id, item.price)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
