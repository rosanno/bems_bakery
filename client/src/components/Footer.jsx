import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer text-center">
      <div className="sub-footer mt-5 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="">
          <div className="footer-heading">
            <span className="logo-1">Cake</span>
            <span className="logo-2">Delights</span>
          </div>
          <ul className="d-flex align-items-center gap-4 mt-3 nav-list">
            <li>
              <Link to="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-decoration-none text-muted">
                Cakes
              </Link>
            </li>
            <li>
              <Link to="/" className="text-decoration-none text-muted">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-decoration-none text-muted">
                Faq
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <span className="text-muted footer-buttom"> Copyright ©2023 All rights reserved</span>
    </div>
  );
};

export default Footer;
