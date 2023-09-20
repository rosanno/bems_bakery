import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../components/ui/Container";
import {
  useCreateOrderMutation,
  useGetCartItemsQuery,
} from "../services/cakeApi";
import Button from "../components/ui/Button";
import PaymentButton from "../components/PaymentButton";
import Loader from "../components/Loader";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading: isItemLoading } = useGetCartItemsQuery();
  const { user } = useSelector((state) => state.authenticated);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const onPaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePlaceOrder = async () => {
    if (selectedPayment === "cod") {
      const orderItems = data?.cartItems?.items?.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        total: data?.cartItems?.total + 10,
      }));

      const newData = {
        items: orderItems,
      };

      const response = await createOrder({ data: newData });

      if (response.data.status === 200) {
        navigate("/success");
      }
    }
  };

  return (
    <Container>
      <div className="mt-4 md:mt-7">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">
          Checkout
        </h1>
        {isItemLoading ? (
          <div className="flex items-center justify-center h-[450px]">
            <Loader label="loading items" />
          </div>
        ) : (
          <div className="mt-5 md:mt-7 lg:grid lg:grid-cols-12 lg:items-start gap-x-4">
            <div className="lg:col-span-8">
              <div className="rounded-lg bg-gray-50 px-4 py-6">
                <h3 className="text-sm">Shipping Address</h3>
                <div className="mt-6 space-y-2">
                  <h4 className="text-sm">{user?.name}</h4>
                  <h4 className="text-sm">{user?.addresses[0]?.address}</h4>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-gray-50 px-4 py-6">
                {data?.cartItems?.items?.map((item) => (
                  <div
                    key={item._id}
                    className="my-3 py-2 first:pt-0 first:mt-0 border-b border-gray-200/60 last:border-b-0"
                  >
                    <div className="flex justify-between font-medium gap-2">
                      <div className="flex gap-4">
                        <div className="w-16">
                          <img
                            src={item.product.imageURL}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm truncate">
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="text-[#FF5E42] font-semibold">
                        ₱{item.product.price}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Qty:</span>{" "}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 px-4 py-6 lg:col-span-4">
              <h3 className="capitalize">Select payment method</h3>
              <div className="space-y-2.5 mt-2.5">
                <PaymentButton
                  icon="/assets/images/cash-icon.svg"
                  label="Cash On Delivery"
                  sublabel="Pay when you receive"
                  paymentMethod="cod"
                  selectedPayment={selectedPayment}
                  onPaymentSelect={onPaymentSelect}
                />
                <PaymentButton
                  icon="/assets/images/gcash-logo.png"
                  label="GCash e-Wallet"
                  sublabel="GCash e-Wallet"
                  paymentMethod="gcash"
                  selectedPayment={selectedPayment}
                  onPaymentSelect={onPaymentSelect}
                  disabled
                />
                <div>
                  <h2 className="mt-6">Order Summary</h2>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 font-normal">
                      Subtotal{" "}
                      <span>({data?.cartItems?.items?.length} items)</span>
                    </p>
                    <p className="text-sm">₱{data?.cartItems?.total}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-500 font-normal">
                      Shipping Fee
                    </p>
                    <p className="text-sm">₱10.00</p>
                  </div>
                  <div className="border-t border-gray-200 mt-4 mb-3 py-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm">Total:</h4>
                      <p className="text-[#FF5E42]">
                        ₱{data?.cartItems?.total + 10}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handlePlaceOrder}
                    variant="danger"
                    className="w-full"
                  >
                    PLACE ORDER NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
