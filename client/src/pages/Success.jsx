import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="h-[600px] flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl capitalize text-gray-400">Order recieved</h1>
      <Link
        to="/cakes"
        className="bg-rose-600 text-xs uppercase px-4 py-2 text-white rounded-md"
      >
        shop more cakes
      </Link>
    </div>
  );
};

export default Success;
