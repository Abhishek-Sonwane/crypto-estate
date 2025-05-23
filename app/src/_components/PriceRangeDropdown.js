import { Menu } from "@headlessui/react";
import React, { useContext, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiWallet3Line,
} from "react-icons/ri";
import { StateContext } from "@/context";

const PriceRangeDropdown = () => {
  const { price, setPrice } = useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);

  const prices = [
    {
      value: "Price Range (any)",
    },
    {
      value: "100000 - 130000",
    },
    {
      value: "130000 - 160000",
    },
    {
      value: "160000 - 190000",
    },
    {
      value: "190000 - 220000",
    },
    {
      value: "10000 - 30000",
    },
    {
      value: "30000 - 40000",
    },
  ];

  return (
    <Menu as={"div"} className={"dropdown relative "}>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-btn w-full text-left "}
      >
        <RiWallet3Line className="dropdown-icon-primary " />
        <div className="">
          <div className="text-[15px] font-medium leading-tight ">{price}</div>
          <div className="text-[13px] ">Choose Price Range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className={"dropdown-menu"}>
        {prices.map((price, index) => {
          return (
            <Menu.Item
              onClick={() => setPrice(price.value)}
              as={"li"}
              key={index}
              className={"cursor-pointer hover:text-violet-700 transition"}
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
