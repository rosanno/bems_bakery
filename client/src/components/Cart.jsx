import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = ({ onCartOpen, setOnCartOpen }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <Offcanvas show={onCartOpen} onHide={setOnCartOpen} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column h-100">
            {cartItems?.map((item) => (
              <>
                <div key={item?._id} className="d-flex">
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
                </div>
                <div className="border-top my-2" />
              </>
            ))}
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
