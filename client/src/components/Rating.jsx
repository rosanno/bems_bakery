import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ maxRating, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (newRating) => {
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (newRating) => {
    setRating(newRating);

    onRatingChange(newRating);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => (
        <FaStar
          key={index}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
          className={`cursor-pointer ${
            (hoverRating || rating) >= index + 1
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;
