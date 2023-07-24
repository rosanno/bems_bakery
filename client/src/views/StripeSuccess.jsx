import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { clearCart } from "../features/cartSlice";

const StripeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { fetchData: postCheckout, loading } = usePrivateRequest(token);

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.productId.price * item.quantity;
    });
    return totalPrice;
  };

  useEffect(() => {
    const handleCheckout = async () => {
      if (!loading) {
        const updatedTotalCartPrice = calculateTotalPrice(cartItems);

        const productsData = cartItems.map((item) => ({
          orderItem: item.productId._id,
          quantity: item.quantity,
          totalAmount: updatedTotalCartPrice, // Use the updated total price here
        }));

        const data = {
          products: productsData,
          totalPrice: updatedTotalCartPrice, // Use the updated total price here
        };

        console.log(data);

        // Rest of the code...
      }
    };

    handleCheckout();
  }, [cartItems, loading]);

  return (
    <div
      className="w-100 d-flex flex-column gap-2 justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <h1 className="text-success">Thank You !</h1>
      <p>Thank you for ordering our delicious cakes!</p>
      <div>
        <Button onClick={() => navigate("/")} variant="outline-success">
          Shop more
        </Button>
      </div>
    </div>
  );
};

export default StripeSuccess;
