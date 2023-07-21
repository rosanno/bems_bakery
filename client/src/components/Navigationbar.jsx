import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsSearch, BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { setCart } from "../features/cartSlice";
import Cart from "./Cart";

const Navigationbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { data: cartData, fetchData: fetchCart } = usePrivateRequest(token);
  const [onCartOpen, setOnCartOpen] = useState(false);

  useEffect(() => {
    if (cartData?.cartItems) {
      dispatch(setCart({ cartItem: cartData?.cartItems }));
    }
  }, [cartData]);

  useEffect(() => {
    const getCartItems = () => {
      fetchCart("GET", "cart");
    };

    getCartItems();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Cart onCartOpen={onCartOpen} setOnCartOpen={setOnCartOpen} />
      <Navbar expand="lg" className="bg-white border p-md-0">
        <Container fluid className="mx-xl-5">
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span className="logo-1">Cake</span>
            <span className="logo-2">Delights</span>
          </Navbar.Brand>
          <Button variant="outline" className="d-block d-lg-none" onClick={handleShow}>
            <RxHamburgerMenu className="fs-2" />
          </Button>
          <Navbar.Collapse id="navbarScroll">
            <div className="search-bar d-flex align-items-center me-auto ms-auto pe-3 py-1 rounded-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input me-2 border-0 shadow-none bg-transparent"
                aria-label="Search"
              />
              <BsSearch className="fs-5" />
            </div>
            <Nav
              className="my-2 my-lg-0 d-flex align-items-center gap-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => setOnCartOpen(true)}>
                <div className="d-flex flex-column align-items-center">
                  <div className="position-relative">
                    <BsBag className="fs-4" />
                    <div className="position-absolute translate-middle-y start-50 top-0 end-0 mt-1">
                      <Badge pill bg="danger" className="py-1" style={{ fontSize: ".6rem" }}>
                        {cartItems?.length}
                      </Badge>
                    </div>
                  </div>
                  <span className="cart-label">Cart</span>
                </div>
              </Nav.Link>
              {!token ? (
                <Nav.Link href="/login">
                  <div className="d-flex flex-column align-items-center">
                    <FiUser className="fs-4" />
                    <span className="cart-label">Sign in</span>
                  </div>
                </Nav.Link>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <FaRegUserCircle className="fs-4" />
                  <span className="cart-label text-truncate">{user?.name}</span>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar expand="lg" className="bg-white d-none d-lg-block border border-top-0 p-0">
        <Container>
          <Navbar.Collapse className="d-flex justify-content-center">
            <Nav
              className="my-2 my-lg-0 d-flex align-items-center gap-5"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="/">
                <span className="sub-nav fw-semibold">Home</span>
              </Nav.Link>
              <Nav.Link href="/products">
                <span className="sub-nav fw-semibold">Cakes</span>
              </Nav.Link>
              <Nav.Link href="#action1">
                <span className="sub-nav fw-semibold">About Us</span>
              </Nav.Link>
              <Nav.Link href="#action1">
                <span className="sub-nav fw-semibold">FAQ</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigationbar;
