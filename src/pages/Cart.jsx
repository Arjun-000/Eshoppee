import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({
  cart,
  setCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // For navigation to home page

  useEffect(() => {
    // Fetch cart data from the API when the component mounts
    axios
      .get("https://dummyjson.com/carts")
      .then((response) => {
        const fetchedCart = response.data.products.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price || 0, // Default price to 0 if missing
          thumbnail: product.thumbnail || "https://via.placeholder.com/150",
          quantity: product.quantity || 0, // Default quantity to 0 if missing
          totalPrice: (product.price || 0) * (product.quantity || 0), // Calculate total price
        }));
        setCart(fetchedCart); // Sync fetched cart with local state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setIsLoading(false);
      });
  }, [setCart]);

  // Calculate the total price of all items in the cart
  // Calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0; // Return 0 if cart is empty or invalid
    }
    return cart
      .reduce((total, item) => {
        const itemTotal = item.price * item.quantity || 0; // Ensure valid calculation
        return total + itemTotal;
      }, 0)
      .toFixed(2); // Limit to 2 decimal places
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit order ID
    const totalPrice = calculateTotalPrice(); // Get the total price
    alert(
      `Order placed successfully! Your order ID is ${orderId} and total is ₹${totalPrice}`
    );
    setCart([]); // Clear the cart
    navigate("/"); // Redirect to the home page
  };

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div style={{ paddingTop: "30px" }} className="container-fluid bg-white" >
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="row p-3 justify-content-center">
  {cart.map((item) => (
    <div
      key={item.id}
      className="col-12 col-md-5 col-lg-5 m-3 border rounded p-3 d-flex bg-black gap-3"
    >
      <div className="p-1">
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="d-flex flex-column justify-content-between ">
        <div>
          <h3 className="text-white">{item.title}</h3>
          <p>Total: ₹{item.price * item.quantity}</p>
          <div className="d-flex mt-1 align-items-center">
            <button
              className="btn btn-light"
              onClick={() => decrementQuantity(item.id)}
            >
              -
            </button>
            <p
              className="m-0 bg-black px-4 rounded mx-1 text-white"
              style={{ paddingTop: "6px", paddingBottom: "6px" }}
            >
              {item.quantity}
            </p>
            <button
              className="btn btn-light"
              onClick={() => incrementQuantity(item.id)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <button
            className="btn btn-danger mt-2"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          {/* Total Price and Place Order */}
          <div className="mt-4 p-3 border-top ">
            <h4 className="text-black ">Total Price: ₹{calculateTotalPrice()}</h4>
            <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
