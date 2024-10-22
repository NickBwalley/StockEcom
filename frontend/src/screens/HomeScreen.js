import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Ensure 'products' is an array before mapping
  const productArray = Array.isArray(products) ? products : [];

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {productArray.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
