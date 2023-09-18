import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  useAddProductReviewMutation,
  useGetUserQuery,
} from "../services/cakeApi";
import Rating from "./Rating";

const ReviewModal = ({
  isOpen,
  onClose,
  itemId,
  image,
  productId,
  name,
  price,
}) => {
  const modalClassName = isOpen
    ? "ease-out opacity-100 pointer-events-auto"
    : "ease-in opacity-0 pointer-events-none";

  const { data: user } = useGetUserQuery();
  const [itemRating, setItemRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [postReview] = useAddProductReviewMutation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup effect on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleRatingChange = (newRating) => {
    setItemRating(newRating);
  };

  const closeModal = () => {
    setItemRating(0); // Reset the rating to 0
    setReviewMessage("");
    onClose();
  };

  const onSaveReview = async () => {
    const data = {
      itemId,
      customerName: user.user.name,
      rating: itemRating,
      reviewText: reviewMessage,
    };

    const response = await postReview({ productId, data });

    if (response) {
      toast.success("Review added!");
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${modalClassName} overflow-auto bg-black/20 backdrop-blur-lg`}
    >
      <div className="fixed inset-0 flex items-center justify-center z-50 px-2">
        <div className="relative bg-white w-96 md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg shadow-lg">
          <div className="absolute top-0 right-0 pt-2 pr-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-lg font-semibold">Review</h2>
          <div className="pt-4 mb-2 md:mb-4">
            <div className="flex gap-2 mb-3">
              <div className="w-12 h-12">
                <img src={image} alt={name} />
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-[#FF5E42] font-semibold">₱{price}</p>
              </div>
            </div>
            <div className="mb-4">
              <Rating
                maxRating={5}
                initialRating={itemRating}
                onRatingChange={handleRatingChange}
              />
            </div>
            <textarea
              onChange={(e) => setReviewMessage(e.target.value)}
              value={reviewMessage}
              rows="5"
              placeholder="Write your review here..."
              className="w-full p-2.5 text-xs text-gray-500 outline-none border rounded-md"
            ></textarea>
          </div>
          <button
            onClick={onSaveReview}
            className="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 text-white px-5 py-1.5 rounded-md float-right"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
