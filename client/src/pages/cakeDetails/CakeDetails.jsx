import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

import Container from "../../components/ui/Container";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useGetProductQuery,
} from "../../services/cakeApi";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import useAddToCart from "../../hooks/useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../features/cart/cartSlice";
import useScrollTop from "../../hooks/useScrollTop";
import Loader from "../../components/Loader";
import CustomerReview from "../../components/CustomerReview";
import QuantityInput from "../../components/ui/QuantityInput";

const CakeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cakeId } = useParams();
  const { data, isLoading: isItemLoading } = useGetProductQuery({ cakeId });
  const { data: items } = useGetCartItemsQuery();
  const { accessToken } = useSelector((state) => state.authenticated);
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart, { isLoading }] = useAddToCartMutation();
  const { addToCart } = useAddToCart(accessToken, navigate, addItemToCart);

  useScrollTop(); // scroll to top

  const ingredientNames = data?.product?.ingredients.map(
    (ingredient) => ingredient.name
  );
  const ingredientListString = ingredientNames?.join(", ");

  useEffect(() => {
    if (accessToken && items) {
      dispatch(setCartItems({ cartItems: items?.cartItems }));
    }
  }, [accessToken, data, dispatch]);

  return (
    <Container>
      {isItemLoading ? (
        <div className="flex flex-col justify-center items-center space-y-2 h-[600px]">
          <Loader label="Loading product..." />
        </div>
      ) : (
        <>
          <section className="mt-10">
            <article className="flex flex-col md:flex-row md:gap-10">
              <div className="flex flex-1 items-center justify-center border border-gray-300/30 rounded-md">
                <img
                  src={data?.product?.imageURL}
                  alt={data?.product?.name}
                  className="w-72 h-72 object-contain"
                />
              </div>
              <div className="mt-4 md:mt-0 flex flex-col flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {data?.product?.name}
                </h2>
                <div className="flex items-center gap-2 mt-2 pb-2">
                  <p className="text-sm font-semibold">
                    {data?.product?.overallRating}
                  </p>
                  <AiFillStar className="text-yellow-300" />
                  <p className="text-xs text-gray-400">
                    {data?.product?.reviewsCount} Reviews
                  </p>
                </div>
                <h2 className="text-2xl md:text-3xl text-[#FF5E42] font-bold">
                  ₱{data?.product?.price}
                </h2>
                <div className="mt-6">
                  <h3 className="font-bold text-lg">Description</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {data?.product?.description}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg">Ingredients</h3>
                  <p className="text-xs text-gray-500">
                    {ingredientListString}
                  </p>
                </div>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                <div className="mt-4 md:mt-auto flex gap-4">
                  <Button className="w-full">Buy Now</Button>
                  <Button
                    className="w-full"
                    variant="danger"
                    disabled={isLoading}
                    onClick={(event) =>
                      addToCart(
                        event,
                        data?.product?._id,
                        data?.product?.price,
                        quantity
                      )
                    }
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </article>
          </section>
          <CustomerReview
            product={data?.product?.name}
            reviews={data?.product?.customerReviews}
            rating={data?.product?.overallRating}
            reviewCount={data?.product?.reviewsCount}
          />
        </>
      )}
    </Container>
  );
};

export default CakeDetails;
