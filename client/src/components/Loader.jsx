import React from "react";

const Loader = ({ label }) => {
  return (
    <div className="flex flex-col space-y-1.5 justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-4 border-b-white border-rose-600" />
      {label && <p className="text-sm text-gray-400">{label}</p>}
    </div>
  );
};

export default Loader;
