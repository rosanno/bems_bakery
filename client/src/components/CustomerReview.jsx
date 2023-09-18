import { FaStarHalf, FaStar } from "react-icons/fa";

/**
 * half star rating component
 */
const HalfStarRating = ({ rating, textSize }) => {
  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className={`text-yellow-400 ${textSize}`} />);
    } else if (i - 0.5 === rating) {
      stars.push(
        <FaStarHalf key={i} className={`text-yellow-400 ${textSize}`} />
      );
    } else {
      stars.push(<FaStar key={i} className={`text-gray-400 ${textSize}`} />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

/**
 * review item component
 */
const ReviewItem = ({ item }) => {
  return (
    <div className="border-b border-gray-400/10 last:border-0 px-5">
      <HalfStarRating rating={item.rating} textSize={"text-sm"} />
      <h4 className="text-xs text-gray-400/80 pt-1">{item.customerName}</h4>
      <p className="text-sm my-4">{item.reviewText}</p>
    </div>
  );
};

const CustomerReview = ({ product, reviews, rating, reviewCount }) => {
  return (
    <section className="mt-10 bg-gray-100/50 rounded-sm">
      <div className="py-5 px-5">
        <h1 className="text-base font-semibold">
          Rating & Reviews of {product}
        </h1>
      </div>

      {reviews.length !== 0 ? (
        <>
          <div className="pt-6 px-5">
            <div className="text-5xl font-medium mb-2">
              {rating}
              <span className="text-2xl font-normal text-gray-400">/5</span>
            </div>
            <HalfStarRating rating={rating} textSize={"text-3xl"} />
            <div className="text-sm text-gray-400 pt-2 pb-2">
              {reviewCount} review (s)
            </div>
          </div>
          <div className="border-t border-gray-300/30 border-b px-5 py-2">
            <h2 className="text-base font-semibold">Cake Review</h2>
          </div>
          <div className="py-4 space-y-2">
            {reviews?.map((item) => (
              <ReviewItem key={item._id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-3">
          <h3 className="text-sm text-gray-400">
            No review(s) for this product
          </h3>
        </div>
      )}
    </section>
  );
};

export default CustomerReview;
