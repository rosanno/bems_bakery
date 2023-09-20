import React from "react";
import PaymentButton from "./PaymentButton";
import Button from "./ui/Button";

const CheckoutSummary = ({
  itemCount,
  itemTotal,
  selectedPayment,
  onPaymentSelect,
  handlePlaceOrder,
  isLoading,
}) => {
  return (
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
              Subtotal <span>({itemCount} items)</span>
            </p>
            <p className="text-sm">₱{itemTotal}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-gray-500 font-normal">Shipping Fee</p>
            <p className="text-sm">₱10.00</p>
          </div>
          <div className="border-t border-gray-200 mt-4 mb-3 py-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm">Total:</h4>
              <p className="text-[#FF5E42]">₱{itemTotal + 10}</p>
            </div>
          </div>
          <Button
            onClick={handlePlaceOrder}
            variant="danger"
            className="w-full"
            disabled={isLoading}
          >
            PLACE ORDER NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
