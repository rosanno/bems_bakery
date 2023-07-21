import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import usePublicRequest from "../hooks/usePublicRequest";
import Section from "../components/ui/Section";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { data, loading, error, fetchData } = usePublicRequest();
  const products = useSelector((state) => state.product.products);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchData("GET", "product");
  }, []);

  useEffect(() => {
    dispatch(setProducts({ products: data?.products }));
  }, [data?.products]);

  useEffect(() => {
    if (sort) {
      fetchData("GET", `product?sort=${sort}`);
    }
  }, [sort]);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Section>
      <Container>
        <div>
          <h1 className="fs-2 text-capitalize fw-bold">Finest Cakes Await</h1>
          <div className="mt-lg-4">
            <Form.Select
              aria-label="Sort"
              className="shadow-none"
              style={{
                width: "max-content",
              }}
              onChange={(e) => handleSort(e)}
            >
              <option value="nameDesc">Sort By: Name Desc</option>
              <option value="nameAsc">Sort By: Name Asc</option>
              <option value="priceHigh">Sort By: Price High</option>
              <option value="priceLow">Sort By: Price Low</option>
            </Form.Select>
          </div>
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
            <div className="d-flex justify-content-center align-align-items-center mt-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Products;
