import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import usePublicRequest from "../hooks/usePublicRequest";
import { setProducts } from "../features/productSlice";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";
import Section from "../components/ui/Section";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { search } = useParams();
  const products = useSelector((state) => state.product.products);
  const { loading, error, fetchData } = usePublicRequest();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchData("GET", `product?search=${search}`);
        dispatch(setProducts({ products: productsData?.products }));
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [dispatch, search]);

  return (
    <Container className="mx-md-0 mx-lg-auto">
      <Section className="px-xl-5 mt-3 mt-md-5">
        <div>
          <h1 className="fs-2 text-capitalize fw-bold">Search Result For &quot;{search}&quot;</h1>
          {products.length === 0 && (
            <div className="order-result d-flex justify-content-center align-items-center">
              <h3 className="text-muted">Results found</h3>
            </div>
          )}
          {!loading ? (
            <div className="mt-2 mt-lg-3">
              <Row className="row-gap-3 row-gap-lg-4">
                {products?.map((product) => (
                  <Col xs={6} sm={4} md={4} lg={3} key={product._id}>
                    <Link to={`/product/details/${product._id}`} className="text-decoration-none">
                      <ProductCard product={product} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Section>
    </Container>
  );
};

export default SearchResults;
