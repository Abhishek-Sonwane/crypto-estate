"use client";
import { convertToFIAT } from "@/utils";
import {
  metamaskWallet,
  useAddress,
  useBalance,
  useConnect,
  useConnectionStatus,
  useContract,
  useContractEvents,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const CONTRACT_ADDRESS = "0xf7D02abac3CE6e68f1eA03E3989f2FBf48BCC434";

  const { contract } = useContract(CONTRACT_ADDRESS);
  const address = useAddress();

  // FRONTEND
  const metamask = metamaskWallet();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const signer = useSigner();

  // STATE VARIABLE
  const [userBalance, setUserBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoProperties, setCryptoProperties] = useState([]);

  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setCryptoProperties(data);
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [contract, address]);

  const [properties, setProperties] = useState();
  const [city, setCity] = useState("Location (any)");
  const [cities, setCities] = useState([]);
  const [propertyType, setPropertyType] = useState("Property Type (any)");
  const [propertiesType, setPropertiesType] = useState([]);
  const [price, setPrice] = useState("Price Range (any)");
  const [loading, setLoading] = useState(false);

  const getAllCity = () => {
    const allCities = cryptoProperties?.map((item) => {
      return item.city;
    });
    setCities(["Location (any)", ...new Set(allCities)]);
  };

  const getPropertyType = () => {
    const allPropertyType = cryptoProperties?.map((item) => {
      return item.category;
    });
    setPropertiesType(["Location (any)", ...new Set(allPropertyType)]);
  };

  useEffect(() => {
    if (cryptoProperties) getAllCity();
  }, [cryptoProperties]);

  useEffect(() => {
    if (cryptoProperties) getPropertyType();
  }, [cryptoProperties]);

  const handleClick = () => {
    setLoading(true);
    // Create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str?.split(" ").includes("(any)");
    };
    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);
    const sortedProperties = cryptoProperties?.filter((item) => {
      const housePrice = parseInt(item.price);

      if (
        item.city === city &&
        item.category === propertyType &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return item;
      }
      if (isDefault(city) && isDefault(propertyType) && isDefault(price)) {
        return item;
      }
      if (!isDefault(city) && isDefault(propertyType) && isDefault(price)) {
        return item.city === city;
      }
      if (isDefault(city) && !isDefault(propertyType) && isDefault(price)) {
        return item.category === propertyType;
      }
      if (isDefault(city) && isDefault(propertyType) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return item;
        }
      }
      if (!isDefault(city) && !isDefault(propertyType) && isDefault(price)) {
        return item.city === city && item.category === propertyType;
      }
      if (!isDefault(city) && isDefault(propertyType) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return item.city === city;
        }
      }
      if (isDefault(city) && !isDefault(propertyType) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return item.category === propertyType;
        }
      }
    });
    setTimeout(() => {
      return (
        sortedProperties.length < 1
          ? setProperties([])
          : setProperties(sortedProperties),
        setLoading(false)
      );
    }, 1000);
  };

  // FUNCTION --------->
  // 1. listProperty() ------->
  const { mutateAsync: listProperty, isLoading: listPropertyLoading } =
    useContractWrite(contract, "listProperty");

  const createPropertyFunction = async (form) => {
    const {
      price,
      propertyTitle,
      category,
      images,
      propertyAddress,
      city,
      subDistrict,
      district,
      pincode,
      state,
      country,
      area,
      propertyStatus,
      description,
    } = form;

    try {
      const data = await contract.call("listProperty", [
        address,
        [
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          city,
          subDistrict,
          district,
          pincode,
          state,
          country,
          area,
          propertyStatus,
          description,
        ],
      ]);
      // console.info("Contract Call Success", data);
      if (data) toast.success("New Property Listed Succesfully");
      return data;
    } catch (err) {
      console.error("Contract Call Failure", err);
    }
  };

  // 2. updateProperty()

  const { mutateAsync: updateProperty } = useContractWrite(
    contract,
    "updateProperty"
  );

  const updatePropertyFunction = async (form) => {
    const { productID, propertyTitle, category, description, images } = form;

    try {
      const data = await contract.call("updateProperty", [
        address,
        productID,
        propertyTitle,
        category,
        description,
        images,
      ]);
      console.log("Contract Call Successfully Update", data);
      toast.success("Property Updated Succesfully");
      return data;
    } catch (err) {
      toast.error("Failed to Update Property");
      console.error("Error while Updating Property Data", err);
    }
  };

  // 3. updatePrice()
  const { mutateAsync: updatePrice } = useContractWrite(
    contract,
    "updatePrice"
  );

  const updatePriceFunction = async (form) => {
    const { productID, price } = form;

    try {
      const data = await updatePrice({
        args: [address, productID, price],
      });
      console.log("Transaction Success", data);
      fetchProperty();
      toast.success("Succesfully Updated Property Price");
    } catch (err) {
      console.log("Transaction Failes", err);
    }
  };

  const updatePropertyStatusFunction = async (form) => {
    const { productID, newStatus } = form;

    try {
      const data = await contract.call("updatePropertyStatus", [
        address,
        productID,
        newStatus,
      ]);
      console.log("Transaction Success", data);
      fetchProperty();
      toast.success("Succesfully Updated Property Status");
    } catch (err) {
      console.log("Transaction Failes", err);
    }
  };

  // 4. buyProperty()
  const { mutateAsync: buyProperty } = useContractWrite(
    contract,
    "buyProperty"
  );

  const buyPropertyFunction = async (buying) => {
    const { productID, amount } = buying;
    // const money = ethers.utils.parseEther(amount?.toString());
    const money = amount;

    try {
      const data = await contract.call("buyProperty", [productID, address], {
        value: money,
      });
      if (data) {
        getPropertiesData();
        toast.success("Property Purchased Successfully");
        // console.log("Buying Successful", data);
      } else {
        toast.error("Failed to Purchase Property");
        console.log("Error in buying function");
      }
    } catch (err) {
      toast.error("Failed to Purchase Property");

      console.log("Buying Failed", err);
    }
  };

  // REVIEW FUNCTION
  // 5. addReview()
  const { mutateAsync: addReview } = useContractWrite(contract, "addReview");

  const addReviewFunction = async (form) => {
    const { productID, rating, comment } = form;
    try {
      const data = await addReview({
        args: [productID, rating, comment, address],
      });
      toast.success("Review Added Successfully");
      console.info("Review Added", data);
    } catch (err) {
      toast.error("Failed to Add Review");
      console.log("Review Not Added", err);
    }
  };

  // 6. likeReview()
  const { mutateAsync: likeReview } = useContractWrite(contract, "likeReview");

  const likeReviewFunction = async (form) => {
    const { productID, reviewIndex } = form;

    try {
      await likeReview({
        args: [productID, reviewIndex, address],
      });
      toast.success("Successfully Liked the Review");
    } catch (err) {
      console.error("Liking Fail", err);
    }
  };

  // GET PROPERTIES DATA SECTION
  // 7. getAllProperties()
  const getPropertiesData = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }
    try {
      // GET ALL PROPERTIES
      const properties = await contract.call("getAllProperties");

      // LISTING PRICE
      // const listingPrice = await contract.call("listingPrice");
      // const changePrice = ethers.utils.formatEther(listingPrice.toString());

      // GET USER BALANCE
      const balance = await signer?.getBalance();
      const parsedBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(parsedBalance);

      // console.log(properties);

      const parsedProperties = properties?.map((property, i) => ({
        owner: property.owner,
        propertyTitle: property.propertyTitle,
        description: property.description,
        category: property.category,
        // price: ethers.utils.formatEther(property.price.toString()),
        price: property.price.toNumber(),
        productId: property.productID.toNumber(),
        reviewers: property.reviews,
        image: property.images,
        propertyAddress: property.propertyAddress,
        city: property.city,
        subDistrict: property.subDistrict,
        district: property.district,
        ownershipHistory: property.ownershipHistory,
        propertyStatus: property.propertyStatus,
        area: property.area,
        purchaseDate: property.purchaseDate,
        pincode: property.pincode,
        state: property.state,
        country: property.country,
      }));
      return parsedProperties;
    } catch (error) {
      console.error("Error whille loading data", error);
    }
  };

  // 8. getHighestRatedProduct()
  const { data: getHighestRatedProduct } = useContractRead(
    contract,
    "getHighestRatedProduct"
  );

  // 9. getProductReviews()
  const getProductReviewsFunction = async (productId) => {
    try {
      const getProductReviews = await contract.call("getProductReviews", [
        productId,
      ]);

      const parsedReviews = getProductReviews?.map((review, i) => ({
        reviewer: review.reviewer,
        likes: review.likes.toNumber(),
        comment: review.comment,
        rating: review.rating,
        productID: review.productId.toNumber(),
        // reviewIndex: review.reviewIndex.toNumber(),
      }));
      return parsedReviews;
    } catch (err) {
      console.log("Fail to get Property Reviews", err);
    }
  };

  // 10. getProperty()
  const getPropertyFunction = async (id) => {
    const productID = id * 1;
    try {
      const propertyItem = await contract.call("getProperty", [productID]);

      // console.log(propertyItem);

      const parsedProperty = {
        productID: propertyItem?.productID.toNumber(),
        owner: propertyItem?.owner,
        propertyTitle: propertyItem?.propertyTitle,
        category: propertyItem?.category,
        description: propertyItem?.description,
        // price: ethers.utils.formatEther(propertyItem?.price.toString()),
        price: propertyItem.price.toNumber(),
        propertyAddress: propertyItem?.propertyAddress,
        images: propertyItem?.images,
        city: propertyItem?.city,
        subDistrict: propertyItem?.subDistrict,
        district: propertyItem?.district,
        ownershipHistory: propertyItem?.ownershipHistory,
        propertyStatus: propertyItem?.propertyStatus,
        area: propertyItem?.area,
        purchaseDate: propertyItem?.purchaseDate,
        pincode: propertyItem?.pincode,
        state: propertyItem?.state,
        country: propertyItem?.country,
      };
      return parsedProperty;
    } catch (error) {
      console.log("Error while getting single Property");
    }
  };

  // 11. getUserProperties()
  const { mutateAsync: getUserProperties } = useContractWrite(
    contract,
    "getUserProperties"
  );

  const getUserPropertiesFunction = async () => {
    try {
      const userProperties = await contract.call("getUserProperties", [
        address,
      ]);

      const parsedUserProperties = userProperties?.map((property, i) => ({
        owner: property?.owner,
        propertyTitle: property?.propertyTitle,
        description: property?.description,
        category: property?.category,
        // price: ethers.utils.formatEther(property.price.toString()),
        price: property.price.toNumber(),
        productID: property?.productID.toNumber(),
        reviewers: property?.reviewers,
        reviews: property?.reviews,
        image: property?.images,
        propertyAddress: property?.propertyAddress,
        city: property.city,
        subDistrict: property.subDistrict,
        district: property.district,
        ownershipHistory: property.ownershipHistory,
        propertyStatus: property.propertyStatus,
        area: property.area,
        purchaseDate: property.purchaseDate,
        pincode: property.pincode,
        state: property.state,
        country: property.country,
      }));

      return parsedUserProperties;
    } catch (error) {
      console.log("Error While Getting User Properties", error);
    }
  };

  // 12. getUserReviews()
  const getUserReviewsFunction = () => {
    try {
      const { data: getUserReviews } = useContractRead({
        functionName: "getUserReviews",
        args: [address],
      });
      return getUserReviews;
    } catch (error) {
      console.log("Error While getting user Reviews", error);
    }
  };

  // 13. totalProperty()
  const totalPropertyFunction = async () => {
    try {
      const totalProperty = await contract.call("propertyIndex");
      return totalProperty.toNumber();
    } catch (error) {
      console.log(error);
    }
  };

  // 14. totalReviews()
  const totalReviewsFunction = async () => {
    try {
      const totalReviews = await contract.call("reviewsCounter");
      return totalReviews.toNumber();
    } catch (error) {
      console.log(error);
    }
  };

  // HOW TO READ DATA WITH EVENTS
  // GET SPECIFIC EVENTS

  const { data: event } = useContractEvents(contract, "PropertyListed");

  // GET ALL EVENTS
  const { data: allEvents } = useContractEvents(contract);

  // SET DEFAULT
  const { data: eventWithoutListner } = useContractEvents(contract, undefined, {
    subscribe: false,
  });

  return (
    <StateContext.Provider
      value={{
        properties,
        setProperties,
        price,
        setPrice,
        loading,
        setLoading,
        handleClick,
        address,
        contract,
        connect,
        signer,
        metamask,
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        addReviewFunction,
        likeReviewFunction,
        getPropertiesData,
        getHighestRatedProduct,
        getProductReviewsFunction,
        updatePropertyStatusFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        getUserReviewsFunction,
        totalPropertyFunction,
        totalReviewsFunction,
        userBalance,
        disconnect,
        cryptoProperties,
        setCryptoProperties,
        isLoading,
        setIsLoading,
        city,
        setCity,
        cities,
        setCities,
        propertyType,
        setPropertyType,
        propertiesType,
        setPropertiesType,
        fetchProperty,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
