"use client";
import { agent, images } from "@/assets";
import { StateContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

const UserButton = () => {
  const { address, contract, connect, metamask, disconnect, userBalance } =
    useContext(StateContext);

  const [isUserDropdown, setIsUserDropdown] = useState(false);

  return (
    <div className="">
      {address ? (
        <div className="relative">
          <Image
            onClick={() => setIsUserDropdown(!isUserDropdown)}
            type="button"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={agent.Agent1}
            alt="User dropdown"
          />

          {/* Dropdown menu */}
          {isUserDropdown && (
            <>
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute  -right-4">
                <div className="px-4 py-3 text-sm text-gray-900 ">
                  <div className="text-violet-600 truncate font-semibold">
                    {address.slice(0, 12)}...
                  </div>
                  <div className=" ">Available Balance</div>
                  <div className="">
                    <span className="font-semibold">
                      {userBalance.slice(0, 8)}
                    </span>{" "}
                    AVAX
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 "
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="/"
                    onClick={() => {
                      disconnect();
                      setIsUserDropdown(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="max-w-3xs">
          <button
            onClick={async () => {
              await connect(metamask);
            }}
            className="linear flex flex-row items-center rounded-xl px-1 md:px-5 py-3 text-base font-medium text-white transition duration-200 bg-violet-400 hover:bg-violet-600 gap-x-3 max-h-20 cursor-pointer"
          >
            <Image
              src={images.metamask_img}
              alt=""
              className="hidden md:block h-8 w-8 xl:w-12 xl:h-12 text-violet-900"
            />
            <span>Connect to Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
