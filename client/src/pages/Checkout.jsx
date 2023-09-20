import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Container from "../components/ui/Container";
import {
  useCreateOrderMutation,
  useGetCartItemsQuery,
} from "../services/cakeApi";
import Loader from "../components/Loader";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutSummary from "../components/CheckoutSummary";

const Checkout = () => {
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
                  <CheckoutItem key={item._id} item={item} />
                ))}
              </div>
            </div>
            <CheckoutSummary
              itemCount={data?.cartItems?.items?.length}
              itemTotal={data?.cartItems?.total}
              selectedPayment={selectedPayment}
              onPaymentSelect={onPaymentSelect}
              handlePlaceOrder={handlePlaceOrder}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
