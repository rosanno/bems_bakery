import { useSelector } from "react-redux";
import { PiMapPinLight } from "react-icons/pi";

import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.authenticated);
  const navigation = useNavigate();

  return (
    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="border-b border-gray-300/25">
        <h4 className="text-gray-500 mb-2 text-base">Location</h4>
        <div className="pt-3 pb-6 flex items-center gap-2">
          <PiMapPinLight className="text-2xl text-gray-500" />
          <h5 className="text-xs">{user?.addresses[0]?.address}</h5>
        </div>
      </div>
      <h2 className="text-lg font-medium text-gray-900 pt-2.5">
        Order Summary
      </h2>
      <span className="text-xs text-gray-500/70">*Same day delivery</span>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-300/25 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <h4 className="font-semibold">₱{cartItems?.total}</h4>
        </div>
      </div>
      <Button
        onClick={() => navigation("/proceed-cart-item-checkout")}
        variant="danger"
        className="w-full mt-4"
      >
        Proceed to checkout
      </Button>
    </div>
  );
};

export default Summary;
