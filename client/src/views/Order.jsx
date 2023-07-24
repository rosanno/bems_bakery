import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import usePrivateRequest from "../hooks/usePrivateRequest";
import Section from "../components/ui/Section";
import Loader from "../components/ui/Loader";

const Order = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { fetchData: getOrders, loading } = usePrivateRequest(token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token]);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrders("GET", "order/customer/orders");
      setOrders(res?.order);
    };

    fetchOrder();
  }, []);

  return (
    <Container className="mx-md-0 mx-lg-auto">
      <Section className="px-xl-5 mt-3 mt-md-5">
        <h3 className="order-header">My order</h3>

        <div className="border-top mb-3" />

        {!loading ? (
          <div>
            {orders?.products?.map((item) => (
              <Card key={item._id} className="w-100 h-100 rounded-0 border-0 shadow-sm my-4">
                <Card.Header className="py-2 d-flex justify-content-end align-items-center gap-3">
                  <Card.Text className="payment-badge rounded-5 m-0 text-muted">
                    {item.paymentStatus}
                  </Card.Text>
                  <Card.Text className="payment-badge rounded-5 m-0 text-muted">
                    {item.isDelivered ? "Received" : ""}
                  </Card.Text>
                </Card.Header>
                <Card.Body className="d-flex flex-column flex-md-row gap-3 gap-md-0 align-items-md-center justify-content-between">
                  <div className="d-flex justify-content-between gap-2 card-container">
                    <div className="h-100 d-flex gap-3">
                      <img
                        src={item.orderItem.imageURL}
                        alt=""
                        className="product-image object-fit-contain"
                      />
                      <p>{item.orderItem.name}</p>
                    </div>
                    <p>₱{item.orderItem.price}</p>
                    <p className="text-muted">
                      Qty:
                      <span className="block ms-2">{item.quantity}</span>
                    </p>
                  </div>
                  {item.isDelivered && item.paymentStatus === "Paid" && !item.isReview && (
                    <button
                      onClick={() => navigate(`/customer/review/${item.orderItem._id}`)}
                      className="review-btn rounded-5"
                    >
                      Add Review
                    </button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </Section>
    </Container>
  );
};

export default Order;
