import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-100 d-flex flex-column gap-2 justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <h1 className="text-success">Thank You !</h1>
      <p>Thank you for ordering our delicious cakes!</p>
      <div>
        <Button onClick={() => navigate("/")} variant="outline-success">
          Shop more
        </Button>
      </div>
    </div>
  );
};

export default Success;
