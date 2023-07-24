import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Section from "../components/ui/Section";
import { BsCash } from "react-icons/bs";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { clearCart, setCart } from "../features/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const { fetchData: postCheckout } = usePrivateRequest(token);
  const { fetchData: privateFetch } = usePrivateRequest(token);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const protectedData = await privateFetch("GET", "cart");
        if (protectedData?.cartItems) {
          dispatch(setCart({ cartItem: protectedData.cartItems }));
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (token) {
      fetchCartItems();
    }
  }, [token, dispatch]);

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.productId.price * item.quantity;
    });
    return totalPrice;
  };

  const totalCartPrice = calculateTotalPrice(cartItems);

  const handleCheckout = async () => {
    if (selectedPayment === "cod") {
      const productsData = cartItems.map((item) => ({
        orderItem: item.productId._id,
        quantity: item.quantity,
        totalAmount: totalCartPrice,
      }));

      const data = {
        products: productsData,
        totalPrice: totalCartPrice,
      };

      const res = await postCheckout("POST", "customer/checkout", data);
      if (res.status === 200) {
        console.log("redirect");
        dispatch(clearCart());
        navigate("/success");
      }
    } else if (selectedPayment === "stripe") {
      const res = await postCheckout("POST", "customer/checkout/create-checkout-session", {
        cartItems,
      });

      if (res.url) {
        window.location.href = res.url;
      }
      console.log(res);
    } else {
      console.log("Invalid payment method selected!");
    }
  };

  return (
    <Container className="mx-md-0 mx-lg-auto">
      <Section className="px-xl-5 mt-3 mt-md-5">
        <div className="d-lg-flex gap-4">
          <div className="w-100">
            <Card className="border p-1 p-xl-2 rounded-0">
              <Card.Text className="px-2 card-heading-fs">Shipping Address</Card.Text>
              <Card.Body className="px-2">
                <Card.Text className="p-0 m-0 card-heading-fs">{user?.name}</Card.Text>
                <Card.Text className="card-heading-fs">{user?.addresses[0].address}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="border p-1 p-xl-2 rounded-0 mt-2">
              <Card.Body className="px-2">
                {cartItems?.map((item) => (
                  <div
                    key={item?._id}
                    className="d-flex justify-content-between gap-2 card-container py-3 border-bottom w-100"
                  >
                    <div className="h-100 d-flex gap-3">
                      <img
                        src={item?.productId?.imageURL}
                        alt={item?.productId?.name}
                        className="product-image object-fit-contain"
                      />
                      <p>{item?.productId?.name}</p>
                    </div>
                    <p>₱{item?.productId?.price}</p>
                    <p className="text-muted">
                      Qty:
                      <span className="block ms-2">{item?.quantity}</span>
                    </p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
          <Card className="custom-card h-100 border p-1 p-xl-2 rounded-0 mt-3 mt-md-0">
            <Card.Title className="p-2">Select Payment Method</Card.Title>
            <Card.Body className="p-2">
              <div
                className={`${selectedPayment === "cod" && "active"} payment-wrap rounded-1 p-3`}
                onClick={() => setSelectedPayment("cod")}
              >
                <div className="payment-method d-flex align-items-center gap-2">
                  <BsCash size={"20px"} />
                  <p className="p-0 m-0">Cash On Delivery</p>
                </div>
                <span className="text-muted p-0 d-block mt-3 payment-text">
                  Pay when you receive
                </span>
              </div>
              {/* <div
                className={`${
                  selectedPayment === "stripe" && "active"
                } payment-wrap rounded-1 p-3 mt-2`}
                onClick={() => setSelectedPayment("stripe")}
              >
                <div className="payment-method d-flex align-items-center gap-2">
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    }
                    className="paypal-logo"
                  />
                  <p className="p-0 m-0">Stripe</p>
                </div>
                <span className="text-muted d-block mt-3 payment-text">Paypal e-wallet</span>
              </div> */}
              <div className="mt-4">
                <h4 className="order-summary">Order Summary</h4>
                <div className="d-flex justify-content-between mt-4">
                  <p className="text-muted order-info">
                    Subtotal <span className="text-muted">({cartItems?.length} items)</span>
                  </p>
                  <span>₱{totalCartPrice}</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-3">
                  <p className="text-muted order-info">Total</p>
                  <span>₱{totalCartPrice}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="order-btn text-capitalize">
                place order
              </button>
            </Card.Body>
          </Card>
        </div>
      </Section>
    </Container>
  );
};

export default Checkout;
