"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);


  // Load Cart from LocalStorage
  useEffect(() => {

    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setLoaded(true);

  }, []);



  // Save Cart to LocalStorage
  useEffect(() => {

    if (loaded) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );
    }

  }, [cartItems, loaded]);



  return (

    <CartContext.Provider
      value={{
        cartItems,
        setCartItems
      }}
    >

      {children}

    </CartContext.Provider>

  );

}