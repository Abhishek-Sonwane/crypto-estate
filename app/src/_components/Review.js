import { agent } from "@/assets";
import Image from "next/image";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Review = ({ review, index, onReviewLike }) => {
  return (
    <div className="w-full flex gap-5 py-5 px-3 border border-gray-300 my-2 rounded-xl shadow bg-gray-100 ">
      <div className="min-w-16">
        <Image
          src={agent.Agent11}
          alt=""
          className="w-16 h-16 rounded-full p-0.5"
        />
      </div>
      <div className="w-full flex flex-col items-start gap-2 ">
        <div className="w-full flex items-center justify-between">
          <h2>User Name </h2>
          <div className="flex items-center justify-between gap-2 mr-4">
            <AiOutlineLike
              onClick={() => onReviewLike(index, review.productID)}
              className="text-xl cursor-pointer"
            />

            {review.likes}
          </div>
        </div>
        <div className="flex gap-x-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5  ms-1 ${
                Number(review.rating) > i ? "text-yellow-300" : "text-gray-300"
              } `}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        <p className="text-wrap">{review.comment}</p>
      </div>
    </div>
  );
};

export default Review;
