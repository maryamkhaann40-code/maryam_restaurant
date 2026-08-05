"use client";

import { useState, useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export default function AddItem() {

  const { menuItems, setMenuItems } = useContext(MenuContext);

  const [item, setItem] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: ""
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: item.name,
      price: item.price,
      image: item.image,
      desc: item.description,
      category: item.category
    };


    setMenuItems([
      ...menuItems,
      newItem
    ]);


    alert("Item Added Successfully 🍔");


    setItem({
      name: "",
      price: "",
      image: "",
      description: "",
      category: ""
    });


    window.location.href = "/";
  };



  const handleDelete = (index) => {

    const updatedItems = menuItems.filter(
      (item, i) => i !== index
    );


    setMenuItems(updatedItems);


    alert("Item Deleted 🗑️");

  };



  return (

    <div style={{padding:"40px"}}>

      <h1>Add New Item 🍽️</h1>


      <form onSubmit={handleSubmit}>


        <input
          type="text"
          placeholder="Item Name"
          value={item.name}
          onChange={(e)=>
            setItem({...item,name:e.target.value})
          }
        />

        <br/><br/>


        <input
          type="text"
          placeholder="Price"
          value={item.price}
          onChange={(e)=>
            setItem({...item,price:e.target.value})
          }
        />

        <br/><br/>


        <input
          type="text"
          placeholder="Image URL"
          value={item.image}
          onChange={(e)=>
            setItem({...item,image:e.target.value})
          }
        />

        <br/><br/>


        <textarea
          placeholder="Description"
          value={item.description}
          onChange={(e)=>
            setItem({...item,description:e.target.value})
          }
        />

        <br/><br/>


        <select
          value={item.category}
          onChange={(e)=>
            setItem({...item,category:e.target.value})
          }
        >

          <option value="">
            Select Category
          </option>

          <option value="Pizza">
            Pizza 🍕
          </option>

          <option value="Burger">
            Burger 🍔
          </option>

          <option value="Pasta">
            Pasta 🍝
          </option>

          <option value="Fast Food">
            Fast Food 🌯
          </option>

          <option value="Drinks">
            Drinks 🥤
          </option>

        </select>


        <br/><br/>


        <button type="submit">
          Add Item
        </button>


      </form>



      <h2 style={{marginTop:"40px"}}>
        Your Menu Items 🍽️
      </h2>



      {
        menuItems.map((item,index)=>(

          <div key={index}>

            <h3>{item.name}</h3>

            <p>{item.desc}</p>


            <button onClick={()=>handleDelete(index)}>
              Delete 🗑️
            </button>


            <hr/>

          </div>

        ))
      }


    </div>

  );

}