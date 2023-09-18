import React, { useState } from "react";

import ReviewModal from "./ReviewModal";

const OrderItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        itemId={item._id}
        image={item.product.imageURL}
        productId={item.product._id}
        name={item.product.name}
        price={item.product.price}
      />
      <li key={item._id} className="flex py-4 border-b">
        <div className="relative h-16 w-16 rounded-md overflow-hidden sm:h-16 sm:w-16">
          <img
            src={item.product.imageURL}
            alt={item.product.name}
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          {!item.isReview && item.isDelivered && (
            <div className="absolute z-[5] right-0 top-0">
              <button
                onClick={openModal}
                className="outline-none border border-rose-400 hover:bg-rose-700 hover:text-white text-sm text-rose-600 font-medium px-4 py-1 rounded-lg transition-colors duration-300"
              >
                Review
              </button>
            </div>
          )}
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 pointer-events-none">
            <div className="flex flex-col">
              <p className="text-sm md:text-base text-black">
                {item.product.name}
              </p>
              <p className="text-[#FF5E42] font-semibold my-1">
                ₱{item.product.price}
              </p>
              <div className="flex text-sm md:text-base items-center gap-1">
                <span className="text-gray-400 text-sm">
                  qty: {item.quantity}
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-gray-400 text-sm">
                  Total:{" "}
                  <span className="text-[#FF5E42] text-base font-semibold">
                    ₱{item.total}
                  </span>
                </h4>
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <span
                className={`${
                  item.isDelivered ? "bg-green-400/40" : "bg-gray-200"
                } px-4 py-1.5 rounded-full text-black capitalize text-xs`}
              >
                {item.isDelivered ? "delivered" : "pending"}
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderItem;
