import React from "react";

const CheckoutItem = ({ item }) => {
  return (
    <div className="my-3 py-2 first:pt-0 first:mt-0 border-b border-gray-200/60 last:border-b-0">
      <div className="flex justify-between font-medium gap-2">
        <div className="flex gap-4">
          <div className="w-16">
            <img
              src={item?.product?.imageURL || item.imageURL}
              alt={item?.product?.name || item.name}
              className="w-full h-full object-contain"
            />
          </div>
          <h4 className="text-sm truncate">
            {item?.product?.name || item.name}
          </h4>
        </div>
        <p className="text-[#FF5E42] font-semibold">
          ₱{item?.product?.price || item.price}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Qty:</span> {item?.quantity}
        </p>
      </div>
    </div>
  );
};

export default CheckoutItem;
