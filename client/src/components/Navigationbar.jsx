import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsSearch, BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";

import usePrivateRequest from "../hooks/usePrivateRequest";
import { setCart } from "../features/cartSlice";
import Cart from "./Cart";
import { resetAuthUser } from "../features/authSlice";
import { persistor } from "../store";

const Navigationbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { data: protectedData, fetchData: privateFetch } =
    usePrivateRequest(token);
  const [onCartOpen, setOnCartOpen] = useState(false);

  useEffect(() => {
    if (protectedData?.cartItems && token) {
      dispatch(setCart({ cartItem: protectedData?.cartItems }));
    }
  }, [protectedData, token]);

  useEffect(() => {
    if (token) {
      privateFetch("GET", "cart");
    }
  }, [token]);

  const handleLogout = () => {
    privateFetch("POST", "auth/logout");
    dispatch(resetAuthUser());
    persistor.purge();
  };

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
          <div className="d-flex align-items-center gap-3 d-block d-lg-none">
            <Button variant="outline" className="p-0">
              <BsSearch className="fs-3" />
            </Button>
            <div
              className="position-relative"
              onClick={() => setOnCartOpen(true)}
            >
              <BsBag className="fs-4" />
              <div className="position-absolute translate-middle-y start-50 top-0 end-0 mt-1">
                <Badge
                  pill
                  bg="danger"
                  className="py-1"
                  style={{ fontSize: ".6rem" }}
                >
                  {cartItems?.length}
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="p-0" onClick={handleShow}>
              <RxHamburgerMenu className="fs-3" />
            </Button>
          </div>
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
                      <Badge
                        pill
                        bg="danger"
                        className="py-1"
                        style={{ fontSize: ".6rem" }}
                      >
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
                <Dropdown>
                  <Dropdown.Toggle
                    variant="none"
                    className="d-flex flex-column align-items-center p-0 shadow-none border-0"
                    style={{
                      width: "max-content",
                    }}
                  >
                    <FaRegUserCircle className="fs-4" />
                    <span className="cart-label text-truncate">
                      {user?.name}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Account</Dropdown.Item>
                    <Dropdown.Item href="/customer/order">
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar
        expand="lg"
        className="bg-white d-none d-lg-block border border-top-0 p-0"
      >
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
              <Nav.Link href="/faq">
                <span className="sub-nav fw-semibold">FAQ</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="cart-canva d-flex align-items-center">
            <span className="logo-1">Cake</span>
            <span className="logo-2">Delights</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav-item list-unstyled">
            <li className="border-bottom" onClick={handleClose}>
              <Link
                to="/"
                className="text-decoration-none text-black d-inline-block py-1"
              >
                Home
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link
                to="/products"
                className="text-decoration-none text-black d-inline-block py-1"
              >
                Cakes
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link
                to="/"
                className="text-decoration-none text-black d-inline-block py-1"
              >
                About
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link
                to="/"
                className="text-decoration-none text-black d-inline-block py-1"
              >
                Contact Us
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link
                to="/"
                className="text-decoration-none text-black d-inline-block py-1 border-bottom"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigationbar;
