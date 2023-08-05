import React from "react";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Section from "../components/ui/Section";

function Contact() {
  return (
    <>
      <Container className="py-4 mb-5 text-center bg-color-pink " fluid>
        <Row>
          <h1>Contact Us</h1>
        </Row>
      </Container>

      <Container>
        <Section className="px-4 px-xl-4 mt-3 mt-md-5">
          <Row className="gap-4">
            <Col md={5} lg={5} xl={6} className="border rounded-1 py-2 col-width">
              <div className="d-flex align-items-center gap-3">
                <BsTelephone size="20px" />
                <p className="m-0 contact-details-p">
                  Call us: <strong>+639996710543</strong>
                </p>
              </div>
            </Col>
            <Col md={5} lg={5} xl={6} className="border rounded-1 py-2 col-width">
              <div className="d-flex align-items-center gap-3">
                <HiOutlineMail size="20px" />
                <p className="m-0 contact-details-p">
                  Email:{" "}
                  <span>
                    <strong>cakedelights@email.com</strong>
                  </span>
                </p>
              </div>
            </Col>
            <Col md={5} lg={5} xl={6} className="border py-2 rounded-1 col-width">
              <div className="px-2">
                <p className="m-0 contact-details-p">
                  Call & Email Support <strong>8:45 AM - 11:15 PM</strong>
                </p>
              </div>
            </Col>
            <Col md={5} lg={6} className="border py-2 rounded-1 col-width">
              <div className="px-2">
                <p className="m-0 contact-details-p">
                  WhatsApp Support <strong>9:00 AM - 11:00 PM</strong>
                </p>
              </div>
            </Col>
          </Row>
        </Section>
        <Section className="mt-3 mt-md-5">
          <Container>
            <div className="d-flex flex-column flex-md-row gap-5">
              <div className="w-100 image-container overflow-hidden rounded">
                <img
                  src="/contact-bg.jpg"
                  alt=""
                  className="img-fluid object-fit-contain d-none d-md-block"
                />
              </div>
              <div className="w-100">
                <div>
                  <p className="contact-heading">Enter your Details:</p>
                </div>
                <form action="" method="post">
                  <div className="row d-flex">
                    <div className=" col-sm-12 col-md-6">
                      <label className="text-muted">Your Name:</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control shadow-none mt-2"
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="email" className="text-muted">
                        Phone Number:
                      </label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control shadow-none mt-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="email" className="text-muted">
                      Email:
                    </label>
                    <input type="email" name="email" className="form-control shadow-none mt-2" />
                  </div>
                  <div className="col-12 mt-2 d-flex flex-column">
                    <label htmlFor="message" className="text-muted">
                      Message:
                    </label>
                    <textarea
                      name="message"
                      id=""
                      rows="4"
                      className="form-control shadow-none shadow-none mt-2"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg col-12 mt-4 text-white"
                    id="btn-submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </Container>
    </>
  );
}

export default Contact;
