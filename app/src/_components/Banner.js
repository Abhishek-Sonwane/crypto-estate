import { images } from "@/assets";
import Image from "next/image";
import React from "react";
import Search from "./Search";

const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24 ">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0 ">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6 ">
            <span className="text-violet-700">Rent</span> Your Dream House With
            Us.
          </h1>
          <p className="max-w-[480px] mb-8 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            in, odit obcaecati eum aspernatur neque veritatis unde nesciunt,
            quia enim quae sapiente nobis repellat. Et odio natus voluptate
            nostrum sequi?
          </p>
        </div>

        {/* Image */}
        <div className="hidden flex-1 lg:flex justify-end items-end ">
          <Image src={images.banner_img} alt="" />
        </div>
      </div>
      <Search />
    </section>
  );
};

export default Banner;
