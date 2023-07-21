import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { setProduct } from "../features/productSlice";
import Section from "../components/ui/Section";
import usePublicRequest from "../hooks/usePublicRequest";
import CustomBadge from "../components/ui/CustomBadge";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { data, loading, error, fetchData } = usePublicRequest();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    fetchData("GET", `product/${productId}`);
  }, []);

  useEffect(() => {
    dispatch(setProduct({ product: data?.result }));
  }, [data?.result]);

  return (
    <Section>
      <Container>
        <div className="d-flex flex-column flex-md-row gap-5">
          <div className="px-5 w-100 h-100 mh-100 py-1 product-image rounded-3">
            <Image src={product?.imageURL} alt="" className="w-100 h-100" />
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

            <div className="product-cta position-fixed bg-white d-flex justify-content-lg-end align-align-items-center gap-2 mx-2 py-2">
              <Button variant="outline-danger" className="px-4 py-2">
                Add To Cart
              </Button>
              <Button variant="danger" className="px-4 py-2">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProductDetails;
