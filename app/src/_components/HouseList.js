"use client";
import React, { useContext } from "react";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import House from "./House";
import { StateContext } from "@/context";

const HouseList = () => {
  const { properties, isLoading } = useContext(StateContext);

  if (isLoading || properties === undefined) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl my-[200px]" />
    );
  }

  if (properties && properties.length < 1) {
    return (
      <div className="text-center text-3xl text-gray-400 my-48">
        Sorry, Nothing Found
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {properties?.map((item, index) => (
            <Link key={index} href={`/propertyDetails/${item.productId}`}>
              <House house={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
