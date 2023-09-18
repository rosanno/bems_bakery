import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="h-[550px] flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl text-gray-400 font-semibold">Order recieved</h1>
      <Link
        to="/cakes"
        className="bg-rose-600 text-sm uppercase px-4 py-2 text-white rounded-md"
      >
        shop more cakes
      </Link>
    </div>
  );
};

export default Success;
