import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";

import { setProduct } from "../features/productSlice";
import Section from "../components/ui/Section";
import usePublicRequest from "../hooks/usePublicRequest";
import CustomBadge from "../components/ui/CustomBadge";
import Spinner from "react-bootstrap/esm/Spinner";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { setCart } from "../features/cartSlice";
import Loader from "../components/ui/Loader";
import Review from "../components/Review";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { productId } = useParams();
  const { loading, error, fetchData } = usePublicRequest();
  const { loading: isLoading, error: isError, fetchData: fetchCart } = usePrivateRequest(token);
  const { loading: isAdding, fetchData: addToCart } = usePrivateRequest(token);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const data = await fetchData("GET", `product/${productId}`);
        dispatch(setProduct({ product: data?.result }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductData();
  }, [productId]);

  const getCartData = async () => {
    try {
      const cartData = await fetchCart("GET", "cart");
      if (cartData?.cartItems) {
        dispatch(setCart({ cartItem: cartData.cartItems }));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      // Handle error (e.g., show an error message or retry)
    }
  };

  useEffect(() => {
    if (token) {
      getCartData();
    }
  }, [token, dispatch]);

  const handleAddToCart = async (price) => {
    if (!token) {
      return navigate("/login"); // Redirect to the login page if the user is not logged in
    }

    const data = {
      product_id: productId, // Replace productId with the actual product ID
      quantity: 1,
      totalAmount: price,
    };
    const res = await addToCart("POST", "cart", data);
    if (res?.cart) {
      toast.success(`${res?.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getCartData();
    }
  };

  return (
    <Container>
      <Section className="px-xl-5 mt-3 mt-md-5">
        {!loading ? (
          <>
            <div className="d-flex flex-column flex-lg-row gap-4 mt-lg-4">
              <div className="px-5 w-100 h-100 py-1 product-image rounded-3">
                <Image src={product?.imageURL} alt={product?.name} className="w-100 h-100" />
              </div>
              <div className="mb-5 w-100">
                <h1 className="product-name">{product?.name}</h1>
                <div className="border-top" />
                <div>
                  <CustomBadge
                    overallRating={product?.overallRating}
                    reviewCount={product?.reviewsCount}
                  />
                  <p className="text-price mt-lg-4">₱{product?.price}</p>
                  <div>
                    <h2>Description</h2>
                    <p className="text-muted product-decription">{product?.description}</p>
                  </div>
                </div>

                <div className="d-flex align-align-items-center gap-2 mt-lg-5">
                  <Button
                    onClick={() => handleAddToCart(product?.price)}
                    variant="outline-danger"
                    className="px-4 py-2 w-75"
                    disabled={isLoading}
                  >
                    {isAdding && (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </>
                    )}
                    {isAdding ? "Adding..." : "Add To Cart"}
                  </Button>
                  <Button variant="danger" className="px-4 py-2 w-75">
                    Buy Now
                  </Button>
                </div>

                <div className="border-top mt-4" />

                <div>
                  <div>
                    <h3 className="review-label mt-3 text-center text-lg-start">
                      Rating & Reviews
                    </h3>
                    <div className="d-flex align-items-center">
                      <h4 className="p-0 m-0">{product?.overallRating}</h4>
                      <AiFillStar size={"20px"} className="text-warning" />
                    </div>
                  </div>
                  <div>
                    {product?.customerReviews?.length > 0 ? (
                      product.customerReviews.map((review) => (
                        <Review key={review._id} review={review} />
                      ))
                    ) : (
                      <p>No review for this product</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Section className="px-xl-5 mt-3 mt-md-2">
              <h3 className="review-label mt-3 text-center">You may also like</h3>
            </Section>
          </>
        ) : (
          <Loader />
        )}
      </Section>
    </Container>
  );
};

export default ProductDetails;
