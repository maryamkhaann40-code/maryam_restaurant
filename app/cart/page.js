"use client";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {

  const { cartItems, setCartItems } = useContext(CartContext);


  // Remove item
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };


  // Increase quantity
  const increaseQty = (index) => {
    const updatedCart = [...cartItems];

    updatedCart[index].quantity += 1;

    setCartItems(updatedCart);
  };


  // Decrease quantity
  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    setCartItems(updatedCart);
  };


  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (

    <div className="cart-page">

      <h1>Your Cart 🛒</h1>


      {cartItems.length === 0 ? (

        <h2>Cart is empty 😔</h2>

      ) : (

        <>

          {cartItems.map((item, index) => (

            <div className="cart-card" key={index}>


              <img
                src={item.image}
                alt={item.name}
              />


              <div className="cart-details">


                <h2>{item.name}</h2>


                <p>
                  Price: Rs {item.price}
                </p>


                <div className="quantity-box">

                  <button onClick={() => decreaseQty(index)}>
                    -
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button onClick={() => increaseQty(index)}>
                    +
                  </button>

                </div>


                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove ❌
                </button>


              </div>


            </div>

          ))}



          <div className="cart-total">

            <h2>
              Total: Rs {totalPrice}
            </h2>



            <div className="order-info">


              <h3>
                Order Status
              </h3>


              <p>
                <strong>Status:</strong> 🟡 Pending
              </p>


              <p>
                <strong>Estimated Delivery:</strong> ⏰ 1 hr 20 min
              </p>


            </div>



            <Link href="/checkout">

              <button className="checkout-btn">
                Checkout 🛒
              </button>

            </Link>


          </div>


        </>

      )}


    </div>

  );

}