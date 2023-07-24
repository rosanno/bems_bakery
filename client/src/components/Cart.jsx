import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { deleteCartItem, setCart } from "../features/cartSlice";

const CartItem = ({ item, handleDelete, dispatch }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const { token } = useSelector((state) => state.auth);
  const { fetchData: updateQuantity } = usePrivateRequest(token);
  const { fetchData: refetchCart } = usePrivateRequest(token);

  const updateCart = async () => {
    const res = await refetchCart("GET", "cart");
    dispatch(setCart({ cartItem: res?.cartItems }));
  };

  const updateQty = async (newQuantity) => {
    const data = {
      product_id: item?.productId._id,
      quantity: newQuantity,
    };

    await updateQuantity("PUT", "cart/update", data);
    updateCart();
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQty(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    updateQty(quantity + 1);
  };

  return (
    <div className="d-flex my-2 py-2 border-bottom">
      <div className="w-75 h-100">
        <Image src={item?.productId?.imageURL} className="w-100 h-75 object-fit-contain" />
      </div>
      <div className="w-100">
        <p className="m-0 fw-semibold">{item?.productId?.name}</p>
        <p>₱{item?.totalAmount}</p>
        <div className="d-flex align-items-center gap-2">
          <button className="qty-btn rounded-2" onClick={handleDecrease} disabled={quantity === 1}>
            <AiOutlineMinus />
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="qty-input text-center d-flex w-25 border-0"
          />
          <button className="qty-btn rounded-2" onClick={handleIncrease}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div
        onClick={() => handleDelete(item?.productId?._id)}
        className="delete-btn d-flex justify-content-center align-items-center"
      >
        <BsTrash />
      </div>
    </div>
  );
};

const Cart = ({ onCartOpen, setOnCartOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { loading, fetchData } = usePrivateRequest(token);

  const handleDelete = async (productId) => {
    await fetchData("DELETE", `cart/delete/${productId}`);
    dispatch(deleteCartItem({ productId: productId }));
  };

  return (
    <>
      <Offcanvas show={onCartOpen} onHide={setOnCartOpen} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex h-75 flex-column h-100">
            <div className="overflow-y-scroll cart-container">
              {cartItems?.length === 0 && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "500px",
                  }}
                >
                  <h3 className="text-muted">Cart is Empty</h3>
                </div>
              )}
              {cartItems?.map((item) => (
                <CartItem
                  key={item?._id}
                  item={item}
                  handleDelete={handleDelete}
                  dispatch={dispatch}
                />
              ))}
            </div>
            {cartItems?.length !== 0 && (
              <Button
                variant="danger"
                className="mt-auto py-2"
                onClick={() => {
                  navigate("/checkout");
                  setOnCartOpen(false);
                }}
              >
                Checkout
              </Button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
