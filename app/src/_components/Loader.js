import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen bg-white/30 backdrop-blur-md flex items-center justify-center">
      <ImSpinner2 className="text-4xl text-black animate-spin transition" />
    </div>
  );
};

export default Loader;
