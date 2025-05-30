export const convertToFIAT = async (amount, currency = "inr") => {
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=${currency}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const avaxPrice = data["avalanche-2"][currency.toLowerCase()];

    if (!avaxPrice) {
      throw new Error("Invalid currency or data not available");
    }

    const avaxAmount = amount * avaxPrice;
    return avaxAmount;
  } catch (error) {
    console.error("Error converting to AVAX:", error.message);
    return null;
  }
};
