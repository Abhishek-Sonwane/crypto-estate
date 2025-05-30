"use client";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";
import { AvalancheFuji } from "@thirdweb-dev/chains";
import ContextProvider from "@/context";

const Provider = ({ children }) => {
  const clientId = "54817a4a80e6b9e192ec09a150a4e3df";

  return (
    <>
      <ThirdwebProvider clientId={clientId} activeChain={AvalancheFuji}>
        <ContextProvider>
          <div className="max-w-[1440px] min-h-screen mx-auto bg-white flex flex-col ">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ContextProvider>
      </ThirdwebProvider>
    </>
  );
};

export default Provider;
