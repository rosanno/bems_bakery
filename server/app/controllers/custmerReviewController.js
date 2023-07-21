import CustomerReview from "../models/customerReview.js";
import Product from "../models/product.js";

export const addReviewToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { customerName, rating, reviewText } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newReview = new CustomerReview({
      customerName,
      rating,
      reviewText,
    });

    const savedReview = await newReview.save();

    product.reviews.push(savedReview);
    await product.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error adding review to product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { customerName, rating, reviewText } = req.body;

    const existingReview = await CustomerReview.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (customerName) existingReview.customerName = customerName;
    if (rating) existingReview.rating = rating;
    if (reviewText) existingReview.reviewText = reviewText;

    const updatedReview = await existingReview.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating customer review:", error);
    res.status(500).json({ error: "Failed to update customer review" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const existingReview = await CustomerReview.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    await existingReview.remove();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer review:", error);
    res.status(500).json({ error: "Failed to delete customer review" });
  }
};
