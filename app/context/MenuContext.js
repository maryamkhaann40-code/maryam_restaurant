"use client";

import { createContext, useState, useEffect } from "react";
import { items } from "../items";

export const MenuContext = createContext();

export default function MenuProvider({ children }) {

  const [menuItems, setMenuItems] = useState(null);


  useEffect(() => {

    const savedItems = localStorage.getItem("menuItems");

    if (savedItems) {
      setMenuItems(JSON.parse(savedItems));
    } else {
      setMenuItems(items);
    }

  }, []);



  useEffect(() => {

    if (menuItems !== null) {

      localStorage.setItem(
        "menuItems",
        JSON.stringify(menuItems)
      );

    }

  }, [menuItems]);



  if (menuItems === null) {
    return null;
  }


  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
}