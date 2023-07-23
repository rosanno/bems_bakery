import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import usePrivateRequest from "../hooks/usePrivateRequest";
import Section from "../components/ui/Section";
import Loader from "../components/ui/Loader";

const Order = () => {
  const { token } = useSelector((state) => state.auth);
  const { fetchData: getOrders, loading } = usePrivateRequest(token);
  const [orders, setOrders] = useState([]);

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
                  <Card.Text className="payment-badge rounded-5 m-0 text-muted">Received</Card.Text>
                </Card.Header>
                <Card.Body>
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
