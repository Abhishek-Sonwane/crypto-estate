"use client";
import { StateContext } from "@/context";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";

const UpdatePropertyPage = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { updatePropertyFunction, fetchProperty, getPropertyFunction } =
    useContext(StateContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState();
  const { id } = useParams();

  const router = useRouter();

  const fetchdata = useCallback(async () => {
    const data = await getPropertyFunction(id);
    if (data) {
      // Set individual form fields
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value);
      });

      if (data.images) {
        setImage(data.images);
      }
    }
    setProperty(data);
  }, []);

  useEffect(() => {
    fetchdata();
  }, []);

  const handleUpdateProperty = async (data) => {
    const parsedData = {
      productID: data.productID,
      propertyTitle: data.propertyTitle,
      category: data.category,
      images: data.images,
      description: data.description,
    };
    console.log(parsedData);

    setLoading(true);
    try {
      const response = await updatePropertyFunction(parsedData);
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
  //   console.log(property);
  return (
    <section>
      <div>
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 ">
              Add Property
            </h2>
            <form onSubmit={handleSubmit(handleUpdateProperty)}>
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

export default UpdatePropertyPage;
