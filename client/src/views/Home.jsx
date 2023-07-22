import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import HeroCarousel from "../components/HeroCarousel";
import usePublicRequest from "../hooks/usePublicRequest";
import { setProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";

const Home = () => {
  const navigate = useNavigate();
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
          <div className="border-top mb-3  mb-md-5" />
          <h1 className="fs-2 text-capitalize">Surprise you loved one</h1>
          {!loading ? (
            <div className="mt-lg-3">
              <Row className="row-gap-3 row-gap-lg-4">
                {products?.map((product) => (
                  <Col xs={6} sm={4} md={4} lg={3} key={product._id}>
                    <Link to={`/product/details/${product._id}`} className="text-decoration-none">
                      <ProductCard product={product} />
                    </Link>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-center mt-4">
                <Button
                  onClick={() => navigate("/products")}
                  variant="outline-danger"
                  className="custom-btn rounded-5 fw-semibold"
                >
                  View all
                </Button>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Container>
      </section>
    </>
  );
};

export default Home;
