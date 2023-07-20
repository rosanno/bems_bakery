import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import HeroCarousel from "../components/HeroCarousel";
import usePublicRequest from "../hooks/usePublicRequest";
import { setProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error, fetchData } = usePublicRequest();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    fetchData("GET", "product");
  }, []);

  useEffect(() => {
    dispatch(setProducts({ products: data?.products }));
  }, [data?.products]);

  return (
    <>
      <section className="px-xl-5 mt-3 mt-md-5">
        <HeroCarousel />
      </section>
      <section className="px-xl-5 mt-3 mt-md-5">
        <Container>
          <Row className="row-gap-3 row-gap-lg-4">
            {products?.map((product) => (
              <Col xs={6} sm={4} md={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
