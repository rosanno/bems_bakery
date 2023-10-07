import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useCreateOrderMutation } from "@/services/cakeApi";
import CheckoutItem from "@/components/CheckoutItem";
import CheckoutSummary from "@/components/CheckoutSummary";

const BuyNowCheckout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authenticated);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const onPaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePlaceOrder = async () => {
    if (selectedPayment === "cod") {
      const orderItems = [
        {
          product: state?.item?.id,
          quantity: state?.item?.quantity,
          total: state?.item?.total,
        },
      ];

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
    <div className="mx-auto max-w-7xl px-3 pt-20">
      <div className="mt-4 md:mt-7">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">
          Checkout
        </h1>

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
              <CheckoutItem item={state?.item} />
            </div>
          </div>
          <CheckoutSummary
            itemCount={state?.item?.length}
            itemTotal={state?.item?.total}
            selectedPayment={selectedPayment}
            onPaymentSelect={onPaymentSelect}
            handlePlaceOrder={handlePlaceOrder}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyNowCheckout;
