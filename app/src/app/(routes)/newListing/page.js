"use client";
import { StateContext } from "@/context";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";

const NewListing = () => {
  const { register, handleSubmit } = useForm();
  const { createPropertyFunction, fetchProperty } = useContext(StateContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNewProperty = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const response = await createPropertyFunction(data);
      if (response) {
        console.log(response);
        setLoading(false);
        fetchProperty();
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section>
      <div>
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 ">
              Add Property
            </h2>
            <form onSubmit={handleSubmit(handleNewProperty)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="propertyTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Property Title
                  </label>
                  <input
                    type="text"
                    name="propertyTitle"
                    id="propertyTitle"
                    {...register("propertyTitle", {
                      required: "Property Title is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type Property Title"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="propertyAddress"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Property Address
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    id="propertyAddress"
                    {...register("propertyAddress", {
                      required: "Property Address is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type Product Address"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Village/City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    {...register("city", { required: "City is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Village/City"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Pincode
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    id="pincode"
                    minLength={6}
                    maxLength={6}
                    {...register("pincode", {
                      required: "Pincode is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="411014"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="subDistrict"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Sub-District
                  </label>
                  <input
                    type="text"
                    name="subDistrict"
                    id="subDistrict"
                    {...register("subDistrict", {
                      required: "Sub-District is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Sub-District"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    {...register("district", {
                      required: "District is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="District"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    {...register("state", {
                      required: "State is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="State"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Country"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    {...register("category", {
                      required: "Property Category is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  >
                    <option value="">Select category</option>
                    <option value="housing">Housing</option>
                    <option value="office">Office</option>
                    <option value="farmland">FarmLand</option>
                    <option value="emptyland">EmptyLand</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    {...register("price", {
                      required: "Property Price is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="area"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Area
                  </label>
                  <input
                    type="number"
                    name="area"
                    id="area"
                    {...register("area", {
                      required: "Property Area is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Area of property (sqft)"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="isAvailable"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Property For Sale
                  </label>
                  <select
                    id="propertyStatus"
                    name="propertyStatus"
                    {...register("propertyStatus")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  >
                    <option defaultValue={""}>Select category</option>
                    <option value={""}>Not Available</option>
                    <option value={"true"}>Available</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="images"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Image
                  </label>
                  <input
                    type="url"
                    name="images"
                    id="images"
                    {...register("images", {
                      required: "Property Image is required",
                    })}
                    onChange={(e) => setImage(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Image of Property"
                    required=""
                  />
                </div>
                {image && (
                  <div className="sm:col-span-2">
                    <img src={image} alt="" />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="8"
                    {...register("description", {
                      required: "Property Description is required",
                    })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                    placeholder="Your description here"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-10 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800 cursor-pointer"
              >
                {loading ? (
                  <ImSpinner className="animate-spin text-lg text-white mx-auto" />
                ) : (
                  "Add"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default NewListing;
