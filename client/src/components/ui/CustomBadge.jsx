import React from "react";
import { AiFillStar } from "react-icons/ai";

const CustomBadge = () => {
  return (
    <div className="d-flex align-items-center gap-2 mt-3 mt-lg-3">
      <div className="custom-badge d-flex align-items-center">
        <span>4.9</span>
        <AiFillStar
          style={{
            color: "#15723D",
          }}
        />
      </div>
      <p className="badge-text d-none d-md-block mb-0 fw-semibold">330 Reviews</p>
    </div>
  );
};

export default CustomBadge;
