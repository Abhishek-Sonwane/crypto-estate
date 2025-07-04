import Image from "next/image";
import React from "react";
import { BiArea, BiBath, BiBed } from "react-icons/bi";

const House = ({ house }) => {
  const { image, category, city, propertyTitle, area, propertyAddress, price } =
    house;

  return (
    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition ">
      <Image
        src={image}
        alt=""
        width={350}
        height={350}
        className="mb-8 rounded-tl-[90px]"
      />
      <div className="mb-4 flex gap-x-2 text-sm ">
        <div className="bg-green-500 rounded-full text-white px-3">
          {category}
        </div>
        <div className="bg-violet-500 rounded-full text-white px-3 ">
          {city}
        </div>
      </div>
      <div className="text-lg font-semibold max-w-[260px]">{propertyTitle}</div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] ">
            <BiArea />
          </div>
          <div>{area.toNumber()} sqft</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-violet-600 mb-4">
        {price} AVAX
      </div>
    </div>
  );
};

export default House;
