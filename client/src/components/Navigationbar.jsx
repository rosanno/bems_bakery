import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsSearch, BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

const Navigationbar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-white border p-0">
        <Container fluid className="mx-xl-5">
          <Navbar.Brand href="#">Cake Shop</Navbar.Brand>
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
              <Nav.Link href="#action1">
                <div className="d-flex flex-column align-items-center">
                  <div className="position-relative">
                    <BsBag className="fs-4" />
                    <div className="position-absolute translate-middle-y start-50 top-0 end-0 mt-1">
                      <Badge pill bg="danger" className="py-1" style={{ fontSize: ".6rem" }}>
                        0
                      </Badge>
                    </div>
                  </div>
                  <span className="cart-label">Cart</span>
                </div>
              </Nav.Link>
              <Nav.Link href="#action2">
                <div className="d-flex flex-column align-items-center">
                  <FiUser className="fs-4" />
                  <span className="cart-label">Sign in</span>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar expand="lg" className="bg-white border border-top-0 p-0">
        <Container>
          <Navbar.Collapse className="d-flex justify-content-center">
            <Nav
              className="my-2 my-lg-0 d-flex align-items-center gap-5"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="#action1">
                <span className="sub-nav">Home</span>
              </Nav.Link>
              <Nav.Link href="#action1">
                <span className="sub-nav">Cakes</span>
              </Nav.Link>
              <Nav.Link href="#action1">
                <span className="sub-nav">About Us</span>
              </Nav.Link>
              <Nav.Link href="#action1">
                <span className="sub-nav">FAQ</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
