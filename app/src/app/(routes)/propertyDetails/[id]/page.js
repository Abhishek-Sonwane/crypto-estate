"use client";
import ProfileCard from "@/_components/ProfileCard";
import { StateContext } from "@/context";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PiSpinner } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa";
import { convertToFIAT } from "@/utils";
import ReviewForm from "@/_components/ReviewForm";
import { ImSpinner2 } from "react-icons/im";
import Review from "@/_components/Review";

const Page = () => {
  const { id } = useParams();
  const {
    getPropertyFunction,
    contract,
    address,
    buyPropertyFunction,
    addReviewFunction,
    getProductReviewsFunction,
    likeReviewFunction,
  } = useContext(StateContext);
  const [property, setProperty] = useState();
  const [fiatPrice, setFiatPrice] = useState(property ? property.price : 0);
  const [fiatCurrency, setFiatCurrency] = useState("inr");

  // loading states
  const [isBuyingComplete, setIsBuyingComplete] = useState(false);
  const [isReviewComplete, setIsReviewComplete] = useState(false);

  // Dropdown States
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [addReview, setAddReview] = useState(false);

  // Review States
  const [reviewCount, setReviewCount] = useState(1);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewData, setReviewData] = useState();

  const onReviewSubmit = async () => {
    const data = {
      productID: property.productID,
      rating: reviewCount,
      comment: reviewContent,
    };
    setIsReviewComplete(true);
    try {
      await addReviewFunction(data);

      setIsReviewComplete(false);
      setReviewCount(1);
      setReviewContent("");
      setAddReview(false);
      fetchReviewData(property.productID);
    } catch (error) {
      console.log(error);
      setIsReviewComplete(false);
    }
  };

  const onReviewLike = async (reviewIndex, productID) => {
    // console.log(reviewIndex, productID);
    try {
      const data = {
        productID: productID,
        reviewIndex: reviewIndex,
      };
      await likeReviewFunction(data);
      fetchReviewData(productID);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchdata() {
    const data = await getPropertyFunction(id);
    setProperty(data);
  }

  async function fetchReviewData(id) {
    const data = await getProductReviewsFunction(id);
    setReviewData(data);
  }

  useEffect(() => {
    if (contract) fetchdata();
  }, [contract, address]);

  useEffect(() => {
    if (property) priceConversion();
  }, [fiatCurrency, property]);

  useEffect(() => {
    if (property) fetchReviewData(property.productID);
  }, [contract, property]);

  const buyProperty = async () => {
    if (property.owner === address) return;
    setIsBuyingComplete(true);
    try {
      const buying = {
        productID: property?.productID,
        amount: property?.price,
      };
      await buyPropertyFunction(buying);
      fetchdata();
      setIsBuyingComplete(false);
    } catch (error) {
      console.log(error);
      setIsBuyingComplete(false);
      toast.error(error.message);
    }
  };

  const priceConversion = async () => {
    if (fiatCurrency === "avax") {
      setFiatPrice(Number(property.price));
      return;
    }

    const price = await convertToFIAT(property?.price, fiatCurrency);
    setFiatPrice(price);
  };

  console.log(property);

  return (
    <>
      {property ? (
        <section>
          <div className="container mx-auto min-h-[800px] mb-14  ">
            {/* Headline */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {property.propertyTitle}
                </h2>
                <h2 className="text-lg mb-4">
                  {property.propertyAddress +
                    ", " +
                    property.city +
                    ", " +
                    property.subDistrict +
                    ", " +
                    property.district}
                </h2>
              </div>
              <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                <div className="bg-green-500 text-white px-3 rounded-full">
                  {property.category}
                </div>
                <div className="bg-violet-500 text-white px-3 rounded-full">
                  {property?.city}
                </div>
              </div>
              <div className="text-3xl font-semibold text-violet-600">
                {property.price} AVAX
              </div>
            </div>

            {/* Property Data and Buy Button */}
            <div className="flex flex-col items-start gap-8 lg:flex-row ">
              <div className="max-w-[768px] ">
                <div className="mb-8">
                  <Image
                    src={property.images}
                    width={768}
                    height={600}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex-1 bg-white w-full h-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
                <ProfileCard user={property.owner} />

                <div className="mx-6">
                  <h2 className="text-2xl font-semibold">{property.title}</h2>
                  <h2 className="text-lg mb-4">
                    {property.propertyAddress +
                      ", " +
                      property.city +
                      ", " +
                      property.subDistrict +
                      ", " +
                      property.district}
                  </h2>
                  <h2 className="text-lg mb-4">{property.description}</h2>
                  <h2 className="text-lg mb-4">
                    Area:{" "}
                    <span className="font-semibold text-violet-400">
                      {property.area.toNumber()} sqft.
                    </span>
                  </h2>

                  <div className="flex items-center gap-x-6 text-lg mb-4">
                    Amount in{" : "}
                    <div className="relative">
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdownId"
                        className="text-white bg-violet-600 hover:bg-violet-600/80  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                        type="button"
                        onClick={() => setCurrencyDropdown(!currencyDropdown)}
                      >
                        {fiatCurrency}
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      {/* Dropdown menu  */}
                      {currencyDropdown && (
                        <div
                          id="dropdownId"
                          className="z-10 absolute right-0 mt-2 bg-violet-200  rounded-lg shadow-sm w-44  "
                        >
                          <ul
                            className="py-2 text-sm text-gray-700  "
                            aria-labelledby="dropdownDefaultButton"
                          >
                            <li>
                              <span
                                href="#"
                                onClick={() => {
                                  setFiatCurrency("inr");
                                  setCurrencyDropdown(false);
                                }}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer "
                              >
                                Indian Rupees
                              </span>
                            </li>
                            <li>
                              <span
                                href="#"
                                onClick={() => {
                                  setFiatCurrency("usd");
                                  setCurrencyDropdown(false);
                                }}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer "
                              >
                                American Dollar
                              </span>
                            </li>
                            <li>
                              <span
                                href="#"
                                onClick={() => {
                                  setFiatCurrency("avax");
                                  setCurrencyDropdown(false);
                                }}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer "
                              >
                                Avalanche Fuji (AVAX)
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className="text-lg mb-4">
                    <span className="text-2xl font-semibold text-violet-400">
                      {fiatPrice ? fiatPrice : "?"}
                    </span>{" "}
                    {fiatCurrency}
                  </h2>
                </div>

                <div>
                  {property.propertyStatus ? (
                    <button
                      className={`w-full bg-violet-600 text-white mx-1 px-8 py-4 text-xl font-semibold rounded-full cursor-pointer hover:bg-violet-500 transition shadow-xl shadow-violet-200 `}
                      onClick={() => buyProperty()}
                    >
                      {property.owner === address ? (
                        "You Owned this property"
                      ) : isBuyingComplete ? (
                        <PiSpinner className="mx-auto transition animate-spin text-xl" />
                      ) : (
                        "Buy Property"
                      )}
                    </button>
                  ) : (
                    <button
                      className={`w-full bg-violet-600 text-white mx-1 px-8 py-4 text-xl font-semibold rounded-full cursor-pointer hover:bg-violet-500 transition shadow-xl shadow-violet-200 `}
                    >
                      Not For Sale
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-semibold">Reviews</h2>
                <button
                  onClick={() => setAddReview(true)}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer"
                >
                  ADD REVIEW
                </button>
              </div>
              {
                // Add Review
                addReview && (
                  <ReviewForm
                    setAddReview={setAddReview}
                    reviewCount={reviewCount}
                    setReviewCount={setReviewCount}
                    setReviewContent={setReviewContent}
                    isReviewComplete={isReviewComplete}
                    setIsReviewComplete={setIsReviewComplete}
                    onReviewSubmit={onReviewSubmit}
                  />
                )
              }
              <div className="w-full min-h-20">
                {reviewData === undefined ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImSpinner2 className="animate-spin text-lg text-violet-700" />
                  </div>
                ) : (
                  <>
                    {reviewData &&
                      (reviewData.length > 0 ? (
                        <div>
                          {reviewData.map((item, index) => (
                            <div key={index}>
                              <Review
                                review={item}
                                index={index}
                                onReviewLike={onReviewLike}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>No Review</div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Loader
        <div className="w-full h-[70vh] flex items-center justify-center">
          <FaSpinner className="text-violet-600 animate-spin transition text-5xl" />
        </div>
      )}
    </>
  );
};

export default Page;
