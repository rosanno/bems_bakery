import React from "react";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

function Contact() {
  return (
    <div className="m-0">
      <div className="contact-head m-0 row ">
        <h1 className="text-white text-center p-4 ">Contact Us</h1>
      </div>

      <div className="my-5 container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="border my-2  ps-4 p-3 d-flex align-items-center sm">
              <BsTelephone />
              <span className="ms-3 ">
                Call Us: <strong>+639996710543</strong>
              </span>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 ">
            <div className="border  ps-4 p-3 d-flex align-items-center my-2 sm">
              <HiOutlineMail />
              <span className="ms-3">
                Email: <strong>Group5@gmail.com</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="border mt-3  ps-4 p-3 d-flex align-items-center sm rounded">
              <span>
                Call and Email Support: <strong>08:00 AM - 05:00 PM</strong>
              </span>
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="border mt-3  ps-4 p-3 d-flex align-items-center sm">
              <span>
                WhatsApp Support: <strong>05:00 PM - 11:00 PM</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="row container">
          <div className="col-6 p-5 d-md-block d-none">
            <img src="./contact-image.png" alt="" className="image-fluid w-100 h-100" />
          </div>
          <div className="col-sm-12 col-md-6">
            <p className="h1 ms-2 mt-5">Enter your Details:</p>

            <form action="" method="post">
              <div className="row d-flex">
                <div className=" col-sm-12 col-md-6">
                  <label>Your Name:</label>
                  <input type="text" name="name" className="form-control" required />
                </div>
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="email">Phone Number:</label>
                  <input type="number" name="phone" className="form-control" required />
                </div>
              </div>
              <div className="col-12 mt-2">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" className="form-control" />
              </div>
              <div className="col-12 mt-2 d-flex flex-column">
                <label htmlFor="message">Message:</label>
                <textarea
                  name="message"
                  id=""
                  cols="60"
                  rows="10"
                  className="form-control"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-lg col-12 mt-4" id="btn-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
