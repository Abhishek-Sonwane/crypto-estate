// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstate {
    // State Variables

    struct Property {
        uint256 productID;
        address owner;
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string city;
        string subDistrict;
        OwnershipHistory[] ownershipHistory;
        string district;
        uint256 pincode;
        string state;
        string country;
        uint256 area;
        bool propertyStatus;
        uint256 purchaseDate;
        string description;
        address[] reviewers;
        string[] reviews;
    }

    struct PropertyInput {
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string city;
        string subDistrict;
        string district;
        uint256 pincode;
        string state;
        string country;
        uint256 area;
        bool propertyStatus;
        string description;
    }

    struct OwnershipHistory {
        address owner;
        uint256 transferTime;
        uint256 pricePaid;
    }

    address payable contractOwner =
        payable(0xfF0c78B914127c57C45Bfc675D4346bDe685509a);
    uint256 public listingPrice = 0.025 ether;
    // Mapping
    mapping(uint256 => Property) private properties;
    uint256 public propertyIndex;

    // ReviewSection
    struct Review {
        address reviewer;
        uint256 productId;
        uint256 rating;
        string comment;
        uint256 likes;
        uint256 reviewIndex;
    }

    struct Product {
        uint256 productId;
        uint256 totalRating;
        uint256 numReviews;
    }

    mapping(uint256 => Review[]) private reviews;
    mapping(address => uint256[]) private userReviews;
    mapping(uint256 => Product) private products;
    mapping(uint256 => mapping(address => bool)) public hasReviewed;
    mapping(uint256 => mapping(uint256 => mapping(address => bool)))
        public likedReviews;

    uint256 public reviewsCounter;

    //Events
    event PropertyListed(
        uint256 indexed id,
        address indexed owner,
        uint256 price
    );
    event PropertySold(
        uint256 indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 price
    );
    event PropertyResold(
        uint256 indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 price
    );

    event ReviewAdded(
        uint256 indexed productId,
        address indexed reviewer,
        uint8 rating,
        string comment
    );
    event ReviewLiked(
        uint256 indexed productId,
        uint256 indexed reviewIndex,
        address indexed liker,
        uint256 likes
    );

    // MODIFIER
    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only Owner of the contract can change the listing price"
        );
        _;
    }

    // Function In Contract
    function listProperty(
        address owner,
        PropertyInput memory input
    )
        external
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(input.price > 0, "Price Must be grater than 0.");
        propertyIndex++;
        uint256 productId = propertyIndex;
        Property storage property = properties[productId];

        property.productID = productId;
        property.owner = owner;
        property.price = input.price;
        property.propertyTitle = input.propertyTitle;
        property.category = input.category;
        property.images = input.images;
        property.propertyAddress = input.propertyAddress;
        property.city = input.city;
        property.subDistrict = input.subDistrict;
        property.district = input.district;
        property.pincode = input.pincode;
        property.state = input.state;
        property.country = input.country;

        property.area = input.area;
        property.propertyStatus = input.propertyStatus;
        property.purchaseDate = 0;
        property.description = input.description;

        emit PropertyListed(productId, owner, input.price);

        return (
            productId,
            input.propertyTitle,
            input.description,
            input.images,
            input.category
        );
    }

    function updateProperty(
        address owner,
        uint256 productID,
        string memory propertyTitle,
        string memory category,
        string memory images,
        string memory description
    ) external returns (Property memory) {
        Property storage property = properties[productID];
        require(property.owner == owner, "You are not the Owner");

        property.propertyTitle = propertyTitle;
        property.category = category;
        property.images = images;
        property.description = description;

        return property;
    }

    function updatePrice(
        address owner,
        uint256 productId,
        uint256 price
    ) external returns (string memory) {
        Property storage property = properties[productId];

        require(property.owner == owner, "You are not the Owner");

        property.price = price;

        return "Your Property price is updated.";
    }

    function updatePropertyStatus(
        address owner,
        uint256 productId,
        bool newStatus
    ) external {
        Property storage property = properties[productId];
        require(property.owner == owner, "You are not the owner");

        property.propertyStatus = newStatus;
    }

    function buyProperty(uint256 id, address buyer) external payable {
        Property storage property = properties[id];
        uint256 amount = msg.value;
        address oldOwner = property.owner;
        require(
            buyer != oldOwner,
            "You are already the owner of this property"
        );
        require(amount == properties[id].price, "Insuffiecient Funds.");

        (bool sent, ) = payable(oldOwner).call{value: amount}("");

        require(sent, "Payment Failed");

        property.ownershipHistory.push(
            OwnershipHistory({
                owner: property.owner,
                transferTime: block.timestamp,
                pricePaid: amount
            })
        );

        property.owner = buyer;
        property.purchaseDate = block.timestamp; // Set purchase date on sale
        emit PropertySold(id, oldOwner, buyer, amount);
    }

    function getAllProperties() public view returns (Property[] memory) {
        Property[] memory items = new Property[](propertyIndex);
        for (uint256 i = 0; i < propertyIndex; i++) {
            items[i] = properties[i + 1];
        }
        return items;
    }

    function getProperty(uint256 id) external view returns (Property memory) {
        return properties[id];
    }

    function getUserProperties(
        address user
    ) external view returns (Property[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < propertyIndex; i++) {
            if (properties[i + 1].owner == user) {
                itemCount += 1;
            }
        }

        Property[] memory items = new Property[](itemCount);
        for (uint256 i = 0; i < propertyIndex; i++) {
            if (properties[i + 1].owner == user) {
                items[currentIndex++] = properties[i + 1];
            }
        }

        return items;
    }

    // Property History

    function getOwnershipHistory(
        uint256 propertyId
    ) external view returns (OwnershipHistory[] memory) {
        return properties[propertyId].ownershipHistory;
    }

    // Reviews Function

    function addReview(
        uint256 productId,
        uint8 rating,
        string calldata comment,
        address user
    ) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5.");
        require(
            !hasReviewed[productId][user],
            "You already reviewed this property."
        );

        Property storage property = properties[productId];

        property.reviewers.push(user);
        property.reviews.push(comment);

        // ReviewSection
        reviews[productId].push(
            Review(user, productId, rating, comment, 0, reviewsCounter)
        );
        userReviews[user].push(productId);
        products[productId].totalRating += rating;
        products[productId].numReviews++;
        hasReviewed[productId][user] = true;

        emit ReviewAdded(productId, user, rating, comment);

        reviewsCounter++;
    }

    function getProductReviews(
        uint256 productId
    ) external view returns (Review[] memory) {
        return reviews[productId];
    }

    function getUserReviews(
        address user
    ) external view returns (Review[] memory) {
        uint256 totalReviews;

        // First, count how many reviews the user has
        for (uint256 i = 1; i <= propertyIndex; i++) {
            uint256 productId = userReviews[user][i];
            Review[] memory propertyReviews = reviews[productId];
            for (uint256 j = 0; j < propertyReviews.length; j++) {
                if (propertyReviews[j].reviewer == user) {
                    totalReviews++;
                }
            }
        }

        // Now, collect those reviews
        Review[] memory userReviewsArray = new Review[](totalReviews);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= userReviews[user].length; i++) {
            uint256 productId = userReviews[user][i];
            Review[] memory propertyReviews = reviews[productId];
            for (uint256 j = 0; j < propertyReviews.length; j++) {
                if (propertyReviews[j].reviewer == user) {
                    userReviewsArray[currentIndex++] = propertyReviews[j];
                }
            }
        }

        return userReviewsArray;
    }

    function likeReview(
        uint256 productId,
        uint256 reviewIndex,
        address user
    ) external {
        require(
            !likedReviews[productId][reviewIndex][user],
            "You already liked this review."
        );
        Review storage review = reviews[productId][reviewIndex];

        review.likes++;
        likedReviews[productId][reviewIndex][user] = true;
        emit ReviewLiked(productId, reviewIndex, user, review.likes);
    }

    function getHighestRatedProduct() external view returns (uint256) {
        uint256 highestRating = 0;
        uint256 highestRatedProductId = 0;

        for (uint256 i = 1; i <= propertyIndex; i++) {
            if (products[i].numReviews > 0) {
                uint256 avgRating = products[i].totalRating /
                    products[i].numReviews;
                if (avgRating > highestRating) {
                    highestRating = avgRating;
                    highestRatedProductId = i;
                }
            }
        }
        return highestRatedProductId;
    }

    // RETURN LISTING PRICE
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // UPDATES THE LISTING PRICE OF THE CONTRACT
    function updateListingPrice(
        uint256 _listingPrice,
        address owner
    ) public payable onlyOwner {
        require(
            contractOwner == owner,
            "Only Contract Owner can update Listing Price"
        );
        listingPrice = _listingPrice;
    }
}
