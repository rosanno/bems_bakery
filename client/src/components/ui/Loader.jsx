import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-3"
      style={{
        height: "350px",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
