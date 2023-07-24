import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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

const SearchModal = ({ openModal, onCloseModal, search, setSearch, handelSearch }) => {
  return (
    <Modal show={openModal} onHide={onCloseModal}>
      <Modal.Body className="p-0">
        <Form
          onSubmit={handelSearch}
          className="search-bar d-flex align-items-center me-auto pe-3 py-1 rounded-2"
        >
          <Form.Control
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input me-2 border-0 shadow-none bg-transparent"
            aria-label="Search"
          />
          <BsSearch className="fs-5" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Navigationbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { data: protectedData, fetchData: privateFetch } = usePrivateRequest(token);
  const { fetchData: privateFetch } = usePrivateRequest(token);

  const [onCartOpen, setOnCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

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

  const handelSearch = async (e) => {
    e.preventDefault();
    navigate(`search/${search}`);
    setSearch("")
    if (openModal === true) {
      onCloseModal();
    }
  };

  const handleLogout = async () => {
    try {
      await privateFetch("POST", "auth/logout");
      dispatch(resetAuthUser());
      persistor.purge();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const onCloseModal = () => setOpenModal(false);
  const onShowModal = () => setOpenModal(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <SearchModal
        openModal={openModal}
        onCloseModal={onCloseModal}
        search={search}
        setSearch={setSearch}
        handelSearch={handelSearch}
      />
      <Cart onCartOpen={onCartOpen} setOnCartOpen={setOnCartOpen} />
      <Navbar expand="lg" className="bg-white border p-md-0">
        <Container fluid className="mx-xl-5">
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span className="logo-1">Cake</span>
            <span className="logo-2">Delights</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center gap-3 d-block d-lg-none">
            <Button variant="outline" className="p-0">
              <BsSearch className="fs-3" onClick={onShowModal} />
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
            <Form
              onSubmit={handelSearch}
              className="search-bar d-flex align-items-center me-auto ms-auto pe-3 py-1 rounded-2"
            >
              <Form.Control
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input me-2 border-0 shadow-none bg-transparent"
                aria-label="Search"
              />
              <BsSearch className="fs-5" />
            </Form>
            <Nav
              className="my-2 my-lg-0 d-flex align-items-center gap-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div onClick={() => setOnCartOpen(true)} className="py-3 cart-icon">
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
              </div>
              {!token ? (
                <Nav.Link href="/login">
                  <div className="d-flex flex-column align-items-center">
                    <FiUser className="fs-4" />
                    <span className="cart-label">Sign in</span>
                  </div>
                </Nav.Link>
              ) : (

                <div
                  onClick={handleShow}
                  className="d-flex flex-column align-items-center p-0 shadow-none border-0 profile-icon"
                  style={{
                    width: "max-content",
                  }}
                >
                  <FaRegUserCircle className="fs-4" />
                  <span className="cart-label text-truncate">{user?.name}</span>
                </div>
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
              <Nav.Link href="/" className={`border-0 ${pathname === "/" && "text-danger"}`}>
                <span className="sub-nav fw-semibold">Home</span>
              </Nav.Link>
              <Nav.Link
                href="/products"
                className={`border-0 ${pathname === "/products" && "text-danger"}`}
              >
                <span className="sub-nav fw-semibold">Cakes</span>
              </Nav.Link>
              <Nav.Link
                href="/products"
                className={`border-0 ${pathname === "/about" && "text-danger"}`}
              >
                <span className="sub-nav fw-semibold">About Us</span>
              </Nav.Link>
              <Nav.Link href="/faq">
              <Nav.Link
                href="/products"
                className={`border-0 ${pathname === "/faq" && "text-danger"}`}
              >
                <span className="sub-nav fw-semibold">FAQ</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="cart-canva d-flex align-items-center">
            <span className="logo-1">Cake</span>
            <span className="logo-2">Delights</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav-item list-unstyled">

            <li className="border-bottom d-block d-lg-none" onClick={handleClose}>
              <Link
                to="/"
                className={`text-decoration-none text-black d-inline-block py-1 ${
                  pathname === "/" && "sidebar-active"
                }`}
              >
                Home
              </Link>
            </li>

            <li className="border-bottom pt-3 pt-lg-0 d-block d-lg-none" onClick={handleClose}>
              <Link
                to="/products"
                className={`text-decoration-none text-black d-inline-block py-1 ${
                  pathname === "/products" && "text-danger"
                }`}
              >
                Cakes
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Lin
                to={`user/${user?._id}`}
                className={`text-decoration-none text-black d-inline-block py-1 ${
                  pathname === `/user/${user?._id}` && "text-danger"
                }`}
              >
                Account
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link

                to="/customer/order"
                className={`text-decoration-none text-black d-inline-block py-1 ${
                  pathname === "/customer/order" && "text-danger"
                }`}
              >
                My Orders
              </Link>
            </li>
            <li className="border-bottom d-block d-lg-none pt-3" onClick={handleClose}>
              <Link to="/" className="text-decoration-none text-black d-inline-block py-1">
                Contact Us
              </Link>
            </li>
            <li className="border-bottom d-block d-lg-none pt-3" onClick={handleClose}>
              <Link to="/" className="text-decoration-none text-black d-inline-block py-1">
                FAQ
              </Link>
            </li>
            <li className="border-bottom pt-3" onClick={handleClose}>
              <Link
                onClick={handleLogout}
                className="text-decoration-none text-black d-inline-block py-1"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigationbar;
