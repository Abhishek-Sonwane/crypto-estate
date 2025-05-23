"use client";
import { housesData } from "@/assets";
import React, { createContext, useEffect, useState } from "react";

export const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property Type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range (any)");
  const [loading, setLoading] = useState(false);

  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    setCountries(uniqueCountries);
  }, []);

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    const uniqueProperties = ["Property Type (any)", ...new Set(allProperties)];

    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);

    // Create a function that checks if the string includes '(any)'

    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }

      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      if (isDefault(country) && !isDefault(price) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  const CONTRACT_ADDRESS = "0xFaBBEba99d2A947F1AB98A0b013bC2ce3ded011d";

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
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(!isLoading);
    if (address) fetchProperty();
  }, [contract, address]);

  // console.log(properties);

  // FUNCTION --------->
  // 1. listProperty() ------->
  const { mutateAsync: listProperty, isLoading: listPropertyLoading } =
    useContractWrite(contract, "listProperty");

  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    // e.preventDefault();

    // console.log(form);

    try {
      //   const listingPrice = await contract.call("listingPrice");
      const data = await contract.call("listProperty", [
        address,
        price,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description,
      ]);
      console.info("Contract Call Success", data);
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
    const {
      productId,
      propertyTitle,
      description,
      category,
      images,
      propertyAddress,
    } = form;

    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.log("Contract Call Successfully Update", data);
    } catch (err) {
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
        args: [address, productID, ethers.utils.parseEther(price)],
      });
      console.log("Transaction Success", data);
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
    const money = ethers.utils.parseEther(amount?.toString());

    try {
      const data = await contract.call("buyProperty", [productID, address], {
        value: money,
      });
      console.log("Buying Successful", data);
      window.location.reload();
    } catch (err) {
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
      console.info("Review Added", data);
      window.location.reload();
    } catch (err) {
      console.log("Review Not Added", err);
    }
  };

  // 6. likeReview()
  const { mutateAsync: likeReview } = useContractWrite(contract, "likeReview");

  const likeReviewFunction = async (form) => {
    const { productID, reviewIndex } = form;

    console.log(productID);
    console.log(reviewIndex);

    try {
      const data = await likeReview({
        args: [productID, reviewIndex, address],
      });
      console.info("Successfully Liked the Comment", data);
      window.location.reload();
    } catch (err) {
      console.error("Liking Fail", err);
    }
  };

  // GET PROPERTIES DATA SECTION
  // 7. getAllProperties()
  const getPropertiesData = async () => {
    try {
      // GET ALL PROPERTIES
      const properties = await contract.call("getAllProperties");

      // LISTING PRICE
      // const listingPrice = await contract.call("listingPrice");
      // const changePrice = ethers.utils.formatEther(listingPrice.toString());

      // GET USER BALANCE
      const balance = await signer?.getBalance();
      const userBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(userBalance);

      const parsedProperties = properties?.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviews,
        image: property.images,
        address: property.propertyAddress,
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

      const parsedProperty = {
        productID: propertyItem?.[0].toNumber(),
        owner: propertyItem?.[1],
        title: propertyItem?.[3],
        category: propertyItem?.[4],
        description: propertyItem?.[7],
        price: ethers.utils.formatEther(propertyItem?.[2].toString()),
        address: propertyItem?.[6],
        images: propertyItem?.[5],
      };
      return parsedProperty;
    } catch (error) {
      console.log("Error while getting single Property");
    }
  };

  // 11. getUserProperties()
  const getUserPropertiesFunction = async () => {
    try {
      const userProperties = await contract.call("getUserProperties", [
        address,
      ]);

      const parsedUserProperties = userProperties?.map((property, i) => ({
        owner: property?.owner,
        title: property?.propertyTitle,
        description: property?.description,
        category: property?.category,
        price: ethers.utils.formatEther(property?.price?.toString()),
        productID: property?.productID.toNumber(),
        reviewers: property?.reviewers,
        reviews: property?.reviews,
        image: property?.images,
        address: property?.propertyAddress,
      }));

      return parsedUserProperties;
    } catch (error) {
      console.log("Error While Getting User Properties", error);
    }
  };

  // 12. getUserReviews()
  const getUserReviewsFunction = () => {
    try {
      const { data: getUserReviews } = useContractRead("getUserReviews", [
        address,
      ]);
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
        houses,
        setHouses,
        country,
        setCountry,
        countries,
        setCountries,
        property,
        setProperty,
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
        getPropertyFunction,
        getUserPropertiesFunction,
        getUserReviewsFunction,
        totalPropertyFunction,
        totalReviewsFunction,
        userBalance,
        disconnect,
        cryptoProperties,
        setCryptoProperties,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
