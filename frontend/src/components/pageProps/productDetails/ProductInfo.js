import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productInfo._id, // Ensure you're passing the correct product ID here
        name: productInfo.productName,
        quantity: 1,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
      })
    );
  };

  return (
    <div className="flex flex-col gap-5 dark:bg-gray-800 dark:text-white px-4 py-4 rounded-md">
      <h2 className="text-4xl font-semibold dark:bg-gray-800 dark:text-white">
        {productInfo.productName}
      </h2>
      <p className="text-xl font-semibold dark:bg-gray-800 dark:text-white">
        ${productInfo.price}
      </p>
      <p className="text-base dark:bg-gray-800 dark:text-white">
        {productInfo.des}
      </p>
      <p className="text-sm dark:bg-gray-800 dark:text-white">
        Be the first to leave a review.
      </p>
      <p className="font-medium text-lg dark:bg-gray-800 dark:text-white">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 hover:bg-black duration-300 text-white text-lg font-titleFont bg-green-500 rounded-md"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
