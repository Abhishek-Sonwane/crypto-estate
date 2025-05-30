import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const ReviewForm = ({
  setAddReview,
  reviewCount,
  setReviewCount,
  setReviewContent,
  isReviewComplete,
  onReviewSubmit,
}) => {
  const onClose = () => {
    setReviewCount(1);
    setReviewContent("");
    setAddReview(false);
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen bg-white/30 backdrop-blur-md flex items-center justify-center transition">
      <div className="w-xs sm:w-lg lg:w-xl bg-gray-100 rounded-xl shadow-md border border-gray-300 p-4">
        <div className="flex items-center justify-between mb-4 ">
          <h1 className="text-2xl font-medium">Submit Your Review</h1>
          <IoClose
            className="text-xl cursor-pointer transition"
            onClick={onClose}
          />
        </div>
        <div>
          <div className="flex mb-4 gap-2 flex-col">
            <label className="text-base font-light text-black/60">
              Add Your Rating
            </label>
            <div className="flex gap-x-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  onClick={() => setReviewCount(i + 1)}
                  className={`w-5 h-5  ms-1 cursor-pointer ${
                    reviewCount > i ? "text-yellow-300" : "text-gray-300"
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
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label className="text-base font-light text-black/60 ">
              Write Your Review
            </label>
            <textarea
              onChange={(e) => setReviewContent(e.target.value)}
              className="w-full bg-white text-base font-normal rounded-xl shadow outline-none px-1 py-0.5 border border-gray-300 "
              rows={7}
            ></textarea>
          </div>
          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg outline-none w-[150px] cursor-pointer disabled:cursor-not-allowed transition duration-200"
            disabled={isReviewComplete}
            type="button"
            aria-busy={isReviewComplete}
            onClick={() => onReviewSubmit()}
          >
            {!isReviewComplete ? (
              "Submit Review"
            ) : (
              <ImSpinner2 className="mx-auto text-lg animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
