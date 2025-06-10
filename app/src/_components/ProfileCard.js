import { images } from "@/assets";
import Image from "next/image";
import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <section className="mb-4 w-full">
      <div className="flex justify-center gap-x-4 bg-gray-200 w-full px-8 py-4 rounded-xl shadow-xl mx-auto ">
        <Image
          src={images.demo_profile}
          className="w-20 bg-white rounded-full object-cover p-2 "
          alt=""
        />
        <div className="flex flex-col justify-center">
          <h1 className="font-primary font-semibold text-xl">
            {user ? user : "Username"}
          </h1>
          <h3 className="text-base text-gray-500 font-light">Owner</h3>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
