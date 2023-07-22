import moment from "moment";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const Review = ({ review }) => {
  const [isFullTextVisible, setFullTextVisible] = useState(false);
  const maxLength = 100;

  const toggleReadMore = () => {
    setFullTextVisible(!isFullTextVisible);
  };

  const reviewMessageSlice = isFullTextVisible
    ? review?.reviewText
    : review?.reviewText.slice(0, maxLength);

  return (
    <div className="border-bottom pb-2">
      <p className="review-name p-0 text-muted my-2">{review.customerName}</p>
      <span className="review-rating rounded-1 text-muted my-2 d-flex align-items-center">
        {review.rating}
        <AiFillStar />
      </span>
      <p className="review-date text-muted p-0 my-1">
        Posted on {moment(review.datePosted).subtract(10, "days").calendar()}
      </p>
      <p className="review-message text-muted p-0 my-1">{reviewMessageSlice}</p>
      {review?.reviewText?.length > maxLength && (
        <div className="read-btn" onClick={toggleReadMore}>
          {isFullTextVisible ? "Read Less" : "Read More"}
        </div>
      )}
    </div>
  );
};

export default Review;
