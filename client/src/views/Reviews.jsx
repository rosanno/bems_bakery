import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating-stars-component";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import Section from "../components/ui/Section";
import usePublicRequest from "../hooks/usePublicRequest";
import usePrivateRequest from "../hooks/usePrivateRequest";
import useScrollTop from "../hooks/useScrollTop";

const RatingComponent = ({ onChange }) => {
  return <Rating count={5} onChange={onChange} size={24} activeColor="#ffd700" edit />;
};

const Reviews = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { token, user } = useSelector((state) => state.auth);
  const { fetchData } = usePublicRequest();
  const { fetchData: postProductReview } = usePrivateRequest(token);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");

  useScrollTop();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetchData("GET", `product/${productId}`);
      setProduct(res.result);
    };

    getProduct();
  }, []);

  const onSave = async () => {
    const data = {
      customerName: user?.name,
      rating,
      reviewText: message,
    };
    if (rating !== null && message !== "") {
      const res = await postProductReview("POST", `customer-review/${productId}`, data);
      if (res.status === 200) {
        toast.success("Review added!", {
          position: "top-center",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        navigate(`/product/details/${productId}`);
      }
    } else {
      toast.error("All fields required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Container>
      <Section className="px-xl-5 mt-3 mt-md-5">
        <Card className="w-100 h-100 rounded-0 border-0 shadow-sm my-4">
          <Card.Body>
            <div className="d-flex justify-content-between gap-2 card-container">
              <div className="h-100 d-flex gap-3">
                <img src={product?.imageURL} alt="" className="w-25 h-25 object-fit-contain" />
                <p className="fs-5">{product?.name}</p>
              </div>
            </div>
            <div className="mt-3 product-heading">
              <h4>Description</h4>
              <p className="product-desc text-muted">{product?.description}</p>
            </div>
          </Card.Body>
        </Card>
      </Section>
      <Section className="px-xl-5 mt-3 mt-md-5">
        <Card className="w-100 h-100 rounded-0 border-0 shadow-sm my-4">
          <Card.Body>
            <RatingComponent onChange={handleRatingChange} />
            <FloatingLabel controlId="floatingTextarea2" label="Review" className="mt-4">
              <Form.Control
                as="textarea"
                placeholder="Leave a review here"
                style={{ height: "100px" }}
                className="shadow-none"
                onChange={(e) => setMessage(e.target.value)}
              />
            </FloatingLabel>
            <Button onClick={onSave} variant="danger" className="mt-3">
              Save
            </Button>
          </Card.Body>
        </Card>
      </Section>
    </Container>
  );
};

export default Reviews;
