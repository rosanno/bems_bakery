import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { deleteCartItem } from "../features/cartSlice";

const Cart = ({ onCartOpen, setOnCartOpen }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { data, error, loading, fetchData } = usePrivateRequest(token);

  const handleDelete = (productId) => {
    fetchData("DELETE", `cart/delete/${productId}`);
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
            <div className="overflow-y-scroll">
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
                <div key={item?._id} className="d-flex my-2 py-2 border-bottom">
                  <div className="w-75 h-100">
                    <Image
                      src={item?.productId?.imageURL}
                      className="w-100 h-75 object-fit-contain"
                    />
                  </div>
                  <div className="w-100">
                    <p className="m-0 fw-semibold">{item?.productId?.name}</p>
                    <p>₱{item?.productId?.price}</p>
                    <div className="d-flex align-items-center gap-2">
                      <div className="qty-btn rounded-2">
                        <AiOutlineMinus />
                      </div>
                      <input
                        type="number"
                        value={item?.quantity}
                        className="qty-input text-center d-flex w-25 border-0"
                      />
                      <div className="qty-btn rounded-2">
                        <AiOutlinePlus />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDelete(item?.productId?._id)}
                    className="delete-btn d-flex justify-content-center align-items-center"
                  >
                    <BsTrash />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="danger" className="mt-auto py-2">
              Checkout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
