import { Menu } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiMapPinLine } from "react-icons/ri";
import { StateContext } from "@/context";

const CountryDropdown = () => {
  const { city, setCity, cities } = useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as={"div"} className={"dropdown relative "}>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-btn w-full text-left "}
      >
        <RiMapPinLine className="dropdown-icon-primary " />
        <div className="">
          <div className="text-[15px] font-medium leading-tight ">{city}</div>
          <div className="text-[13px] ">Select Your Place</div>
        </div>
        {isOpen ? (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className={"dropdown-menu"}>
        {cities.map((city, index) => {
          return (
            <Menu.Item
              onClick={() => setCity(city)}
              as={"li"}
              key={index}
              className={"cursor-pointer hover:text-violet-700 transition"}
            >
              {city}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
