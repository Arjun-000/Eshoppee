import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all carts data from the API
    axios
      .get("https://dummyjson.com/carts")
      .then((response) => {
        const allProducts = response.data.carts.flatMap((cart) => cart.products);
        setProducts(allProducts); // Combine all products from each cart
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container-fluid bg-white" style={{ paddingTop: "100px" }}>
      <div className="row justify-content-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
          >
            <div
              className="card h-100 d-flex flex-column justify-content-between"
              style={{ border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <div className="p-3 text-center">
                <img
                  src={product.thumbnail || "https://via.placeholder.com/150"}
                  alt={product.title}
                  style={{ maxWidth: "100%", height: "150px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <p
                  className="card-title fw-bold text-center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  {product.title}
                </p>
                <p className="text-center text-muted mb-3">
                  ₹{product.price.toFixed(2)}
                </p>
                <button
                  className="btn btn-primary w-100 mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
