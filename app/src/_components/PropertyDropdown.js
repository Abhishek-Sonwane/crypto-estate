import { Menu } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiHome5Line } from "react-icons/ri";
import { StateContext } from "@/context";

const PropertyDropdown = () => {
  const { propertyType, setPropertyType, propertiesType } =
    useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as={"div"} className={"dropdown relative "}>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className={"dropdown-btn w-full text-left "}
      >
        <RiHome5Line className="dropdown-icon-primary " />
        <div className="">
          <div className="text-[15px] font-medium leading-tight ">
            {propertyType}
          </div>
          <div className="text-[13px] ">Select Your Property Type</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className={"dropdown-menu"}>
        {propertiesType.map((propertyType, index) => {
          return (
            <Menu.Item
              onClick={() => setPropertyType(propertyType)}
              as={"li"}
              key={index}
              className={"cursor-pointer hover:text-violet-700 transition"}
            >
              {propertyType}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
