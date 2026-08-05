"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);

  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = () => {

    if (!name || !phone || !address) {
      alert("Please fill all fields!");
      return;
    }

    const newOrder = {
      name,
      phone,
      address,
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
      status: "🟡 Pending"
    };

    const oldOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    oldOrders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(oldOrders)
    );

    setOrderSuccess(true);

    setCartItems([]);

    setName("");
    setPhone("");
    setAddress("");

    setTimeout(() => {
      router.push("/orders");
    }, 2000);

  };

  return (

    <div className="checkout-container">

      <div className="checkout-box">

        <h1 className="checkout-title">
          Checkout 🛒
        </h1>

        {orderSuccess && (

          <div className="success-message">

            🎉 Your Order has been placed successfully!

            <br />

            Thank you for ordering from
            <strong> Maryam Restaurant ❤️</strong>

          </div>

        )}

        <input
          type="text"
          placeholder="👤 Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="📞 Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="📍 Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="order-summary">

          <h2>
            🛒 Order Summary
          </h2>

          {cartItems.map((item, index) => (

            <div key={index}>

              <div className="checkout-item">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="item-details">

                  <h3>{item.name}</h3>

                  <p>
                    Price:
                    <strong>
                      {" "}Rs {item.price}
                    </strong>
                  </p>

                  <p>
                    Quantity:
                    <strong>
                      {" "}x {item.quantity}
                    </strong>
                  </p>

                  <p>
                    Subtotal:
                    <strong>
                      {" "}
                      Rs {item.price * item.quantity}
                    </strong>
                  </p>

                </div>

              </div>

              <hr />

            </div>

          ))}          <h2 className="total">
            Total: Rs {totalPrice}
          </h2>

        </div>

        <div className="payment payment-box">

          <h3>💳 Payment Method</h3>

          <label className="payment-option">

            <input
              type="radio"
              checked
              readOnly
            />

            Cash on Delivery

          </label>

        </div>

        <div className="order-info">

          <h3>📦 Order Status</h3>

          <p>
            <strong>Status:</strong> 🟡 Pending
          </p>

          <p>
            <strong>Estimated Delivery:</strong> ⏰ 1 hr 20 min
          </p>

        </div>

        <button
          className="order-btn"
          onClick={handleOrder}
        >
          ✅ Place Order
        </button>

      </div>

    </div>

  );

}