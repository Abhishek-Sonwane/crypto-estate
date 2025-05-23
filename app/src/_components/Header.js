import { images } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-6 mb-12 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center lg:px-4">
        {/* Logo */}
        <Link href={"/"}>
          <Image src={images.logo} alt="" className=" w-56" />
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-6 ">
          <Link className="hover:text-violet-900 transition" href={""}>
            Log in
          </Link>
          <Link
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"
            href={""}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
