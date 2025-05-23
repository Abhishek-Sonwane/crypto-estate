import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import React from "react";

const Provider = ({ children }) => {
  return (
    <div className="max-w-[1440px]  mx-auto bg-white ">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Provider;
