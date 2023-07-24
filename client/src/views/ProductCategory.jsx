import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";
import Section from "../components/ui/Section";
import { useDispatch, useSelector } from "react-redux";
import usePublicRequest from "../hooks/usePublicRequest";
import { setProducts } from "../features/productSlice";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";

const ProductCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { loading, error, fetchData } = usePublicRequest();
  const products = useSelector((state) => state.product.products);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchData("GET", `product/category/${category}`);
        dispatch(setProducts({ products: productsData?.products }));
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [dispatch]);

  useEffect(() => {
    const fetchSortedProducts = async () => {
      try {
        if (sort) {
          const sortedData = await fetchData("GET", `product?sort=${sort}`);
          dispatch(setProducts({ products: sortedData?.products }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSortedProducts();
  }, [sort, dispatch]);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container>
      <Section className="px-xl-5 mt-3 mt-md-5">
        <div>
          <h1 className="fs-2 text-capitalize fw-bold">Finest Cakes Await</h1>
          <div className="mt-lg-4">
            <Form.Select
              aria-label="Sort"
              className="custom-select shadow-none"
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
          {products?.length === 0 && (
            <div className="not-found d-flex justify-content-center align-items-center">
              <h4 className="text-muted">No products found</h4>
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

export default ProductCategory;