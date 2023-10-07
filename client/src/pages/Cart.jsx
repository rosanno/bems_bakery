import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import CartItem from "@/components/CartItem";
import Summary from "@/components/Summary";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto max-w-7xl px-3 pt-20">
      <section className="mt-10">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">Cart</h1>
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          {cartItems?.items?.length === 0 || cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-96">
              <img src="/assets/empty-cart.svg" alt="" className="w-52 h-52" />
              <h3 className="text-base text-neutral-500 font-medium">
                Cart is empty
              </h3>
              <Link
                to="/cakes"
                className="mt-2 bg-rose-600 hover:bg-rose-600/60 transition-colors duration-300 px-2 py-1.5 rounded-md"
              >
                <BsArrowRight color="white" size="20" />
              </Link>
            </div>
          ) : (
            <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <ul>
                  {cartItems?.items?.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </ul>
              </div>
              <Summary />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
