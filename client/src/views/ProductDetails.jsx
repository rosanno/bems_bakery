import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import { setProduct } from "../features/productSlice";
import Section from "../components/ui/Section";
import usePublicRequest from "../hooks/usePublicRequest";
import CustomBadge from "../components/ui/CustomBadge";
import Spinner from "react-bootstrap/esm/Spinner";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { setCart } from "../features/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { productId } = useParams();
  const { data, loading, error, fetchData } = usePublicRequest();
  const {
    data: cartData,
    loading: isLoading,
    error: isError,
    fetchData: fetchCart,
  } = usePrivateRequest(token);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    fetchData("GET", `product/${productId}`);
  }, []);

  useEffect(() => {
    dispatch(setProduct({ product: data?.result }));
  }, [data?.result]);

  useEffect(() => {
    if (cartData?.cartItems) {
      dispatch(setCart({ cartItem: cartData?.cartItems }));
    }
  }, [cartData]);

  useEffect(() => {
    const getCartItems = () => {
      fetchCart("GET", "cart");
    };

    getCartItems();
  }, [cartData?.cart]);

  const handleAddToCart = () => {
    const data = {
      product_id: productId,
      quantity: 1,
    };
    fetchCart("POST", "cart", data);
  };

  return (
    <Section>
      <Container>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="d-flex flex-column flex-lg-row gap-4 mt-lg-4">
            <div className="px-5 w-100 h-100 py-1 product-image rounded-3">
              <Image src={product?.imageURL} alt={product?.name} className="w-100 h-100" />
            </div>
            <div className="mb-5 w-100">
              <h1 className="product-name">{product?.name}</h1>
              <div className="border-top" />
              <div>
                <CustomBadge />
                <p className="text-price mt-lg-4">₱{product?.price}</p>
                <div>
                  <h2>Description</h2>
                  <p className="text-muted product-decription">{product?.description}</p>
                </div>
              </div>

              <div className="d-flex align-align-items-center gap-2 mt-lg-5">
                <Button
                  onClick={handleAddToCart}
                  variant="outline-danger"
                  className="px-4 py-2 w-75"
                  disabled={isLoading}
                >
                  {isLoading && (
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
                  {isLoading ? "Adding..." : "Add To Cart"}
                </Button>
                <Button variant="danger" className="px-4 py-2 w-75">
                  Buy Now
                </Button>
              </div>

              <div className="border-top mt-4" />

              <div>
                <h3 className="review-label mt-3 text-center text-lg-start">Rating & Reviews</h3>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default ProductDetails;
