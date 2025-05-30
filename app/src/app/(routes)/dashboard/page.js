"use client";
import House from "@/_components/House";
import { StateContext } from "@/context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const {
    getUserPropertiesFunction,
    address,
    updatePriceFunction,
    updatePropertyStatusFunction,
  } = useContext(StateContext);
  const [userProperties, setUserProperties] = useState([]);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState();
  const [newPrice, setNewPrice] = useState();
  const [priceLoading, setPriceLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [status, setStatus] = useState(false);

  async function fetchUserProperties() {
    const data = await getUserPropertiesFunction();
    setUserProperties(data);
  }

  useEffect(() => {
    fetchUserProperties();
  }, [address]);

  const updatePriceHandler = async () => {
    const data = {
      productID: selectedProperty.productID,
      price: parseInt(newPrice),
    };

    try {
      setPriceLoading(true);
      await updatePriceFunction(data);

      setPriceLoading(false);
      fetchUserProperties();
      setPriceDialogOpen(false);
    } catch (error) {
      console.log(error);
      setPriceLoading(false);
      setPriceDialogOpen(false);
    }
  };

  const propertyStatusHandler = async (data) => {
    const requestData = {
      productID: data.productID,
      newStatus: !data.propertyStatus,
    };
    setStatusLoading(true);
    try {
      await updatePropertyStatusFunction(requestData);
      fetchUserProperties();
      setStatusLoading(false);
    } catch (error) {
      console.log(error);
      setStatusLoading(false);
    }
  };

  // console.log(status);

  return (
    <div>
      <section className="mb-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-medium text-violet-400 pb-6 border-b border-gray-200 flex items-center justify-between px-2">
            <span>Owned Property</span>{" "}
            <Link href={"/newListing"}>
              <button className="px-5 py-2 bg-violet-600 text-white text-lg font-medium rounded-xl shadow border border-gray-300 cursor-pointer">
                New Listing
              </button>
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {userProperties && userProperties.length > 0 ? (
              userProperties?.map((property, index) => (
                <div key={index} className="relative">
                  <Link href={`/propertyDetails/${property.productID}`}>
                    <House house={property} />
                  </Link>
                  <Link
                    href={`updateProperty/${property.productID}`}
                    className="absolute bottom-10 right-6 shadow shadow-violet-300 bg-white text-violet-600 font-medium hover:shadow-md rounded-full px-4 py-0.5 hover:text-white hover:bg-violet-600 transition"
                  >
                    Update Credentials
                  </Link>
                  <div
                    onClick={() => {
                      setPriceDialogOpen(true);
                      setSelectedProperty(property);
                    }}
                    className="absolute bottom-20 right-6 shadow shadow-violet-300 bg-white text-violet-600 font-medium hover:shadow-md rounded-full px-4 py-0.5 hover:text-white hover:bg-violet-600 transition cursor-pointer"
                  >
                    Update Price
                  </div>
                  {priceDialogOpen && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-2xl flex items-center justify-center">
                      <div className="w-md px-4 py-6 h-fit bg-white rounded-xl shadow flex flex-col gap-y-5">
                        <h1 className="text-3xl font-semibold text-violet-600 flex items-center justify-between pr-2 ">
                          <span>{property.propertyTitle}</span>
                          <IoClose
                            onClick={() => setPriceDialogOpen(false)}
                            className="text-black text-4xl cursor-pointer"
                          />
                        </h1>
                        <h2 className="text-xl font-normal ">
                          {property.propertyAddress +
                            ", " +
                            property.city +
                            ", " +
                            property.subDistrict +
                            ", " +
                            property.district}
                        </h2>
                        <input
                          type="number"
                          min={0}
                          placeholder="Enter New Price"
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="border border-gray-300 shadow text-lg font-medium rounded-xl px-4 py-1 outline-none"
                        />
                        <button
                          onClick={updatePriceHandler}
                          className="bg-violet-600 text-white shadow rounded-md px-4 py-1 cursor-pointer hover:bg-violet-600/80 transition "
                        >
                          {priceLoading ? (
                            <ImSpinner className="mx-auto text-xl transition animate-spin  text-white" />
                          ) : (
                            "Change Price"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-30 right-10">
                    {statusLoading ? (
                      <ImSpinner className="text-xl animate-spin transition text-violet-600 " />
                    ) : (
                      <label className="flex cursor-pointer select-none items-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={property?.propertyStatus}
                            onChange={() => propertyStatusHandler(property)}
                            className="sr-only"
                          />
                          <div
                            className={`block h-8 w-14 rounded-full transition-colors ${
                              property?.propertyStatus
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <div
                            className={`dot absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                              property?.propertyStatus
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-3xl col-span-2 lg:col-span-3 text-gray-400 my-48">
                Sorry, Nothing Found
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
