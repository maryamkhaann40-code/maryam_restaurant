"use client";
import { MenuContext } from "./context/MenuContext";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "./context/CartContext";
import Link from "next/link";
export default function Home() {

  const { cartItems, setCartItems } = useContext(CartContext);

  const cart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const { menuItems } = useContext(MenuContext);


  const [selectedItem, setSelectedItem] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [cartOpen, setCartOpen] = useState(false);

  const [category, setCategory] = useState("All");
const [user, setUser] = useState(null);

  const updateQuantity = (index, change) => {

    const updatedCart = [...cartItems];

    updatedCart[index].quantity += change;


    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }


    setCartItems(updatedCart);

  };
useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if(savedUser){
    setUser(JSON.parse(savedUser));
  }

}, []);

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === category
        );


  return (

    <main>

      <nav>

        <h2>
          🍴 Maryam Restaurant
        </h2>


        <div>

          <Link href="#home">Home</Link>
<Link href="#menu">Menu</Link>
<Link href="#about">About</Link>
<Link href="#contact">Contact</Link>

{user ? (

  <>
    <span>
      Welcome {user.name} 👋
    </span>

    <button
      onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}
    >
      Logout
    </button>
  </>

) : (

  <Link href="/login">
    Login
  </Link>

)}
<Link href="/orders">
  📦 My Orders
</Link>

<Link href="/cart">
  🛒 Cart ({cart})
</Link>

     
        </div>

      </nav>


<section id="home">

  <div className="hero-content">

    <div className="hero-text">

      <span className="hero-tag">
        🍽 Welcome To Maryam Restaurant
      </span>

      <h1>
        Fresh & Delicious <br />
        Food Delivered <br />
        To Your Door
      </h1>

      <p>
        Enjoy freshly prepared meals made with quality ingredients.
        Fast delivery, amazing taste, and affordable prices.
      </p>

      <div className="hero-buttons">

        <button className="order-btn">
          🍴 Order Now
        </button>

      

      </div>

    </div>


    <div className="hero-image">

      <img
        src="/images/pizza.jpg"
        alt="Pizza"
      />

    </div>

  </div>

</section>
     


      <section id="menu">

        <h1>
          Our Special Menu 🍽️
        </h1>
<div className="category-buttons">

  <button onClick={()=>setCategory("All")}>
    All 🍽️
  </button>

  <button onClick={()=>setCategory("Pizza")}>
    Pizza 🍕
  </button>

  <button onClick={()=>setCategory("Burger")}>
    Burger 🍔
  </button>

  <button onClick={()=>setCategory("Pasta")}>
    Pasta 🍝
  </button>

  <button onClick={()=>setCategory("Drinks")}>
    Drinks 🥤
  </button>

</div>

        <div className="cards">


          {filteredItems.map((item,index)=>(

            <div
              className="card"
              key={index}
              onClick={()=>{
                setSelectedItem(item);
                setQuantity(1);
              }}
            >

              <img
                src={item.image}
                alt={item.name}
              />


              <h3>
                {item.name}
              </h3>


              <p>
                Rs. {item.price}
              </p>


            </div>

          ))}


        </div>

      </section>



      {selectedItem && (

        <div className="modal-bg">

          <div className="modal">


            <button
              className="close"
              onClick={()=>setSelectedItem(null)}
            >
              ✖
            </button>


            <img
              src={selectedItem.image}
              alt={selectedItem.name}
            />


            <h2>
              {selectedItem.name}
            </h2>


            <p>
              {selectedItem.desc}
            </p>


            <h3>
              Rs. {selectedItem.price}
            </h3>


            <div className="quantity">

              <button
                onClick={()=>{
                  if(quantity > 1){
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>


              <span>
                {quantity}
              </span>


              <button
                onClick={()=>{
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>


            </div>


            <h3>
              Total: Rs. {selectedItem.price * quantity}
            </h3>


            <button
  className="add-cart"
  onClick={()=>{

    const existingItem = cartItems.find(
      (item)=> item.name === selectedItem.name
    );


    let updatedCart;


    if(existingItem){

      updatedCart = cartItems.map((item)=>{

        if(item.name === selectedItem.name){

          return {
            ...item,
            quantity: item.quantity + quantity
          };

        }

        return item;

      });


    } else {


    updatedCart = [
  ...cartItems,
  {
    name: selectedItem.name,
    image: selectedItem.image,
    quantity: quantity,
    price: selectedItem.price
  }
];

    }


    setCartItems(updatedCart);



    setSelectedItem(null);

  }}
>
  Add To Cart 🛒
</button>
<button
  className="cancel-btn"
  onClick={()=>setSelectedItem(null)}
>
  Cancel ❌
</button>

</div>

</div>
)}

<section id="featured">

  <h1>
    Featured Dishes ⭐
  </h1>


  <div className="featured-cards">


    <div className="featured-card">

      <img 
        src="/images/pizza.jpg"
        alt="Pizza"
      />

      <h2>
        Special Pizza 🍕
      </h2>

      <p>
        Fresh cheese pizza with delicious toppings.
      </p>

    </div>



    <div className="featured-card">

      <img 
        src="/images/zinger.jpg"
        alt="Burger"
      />

      <h2>
        Zinger Burger 🍔
      </h2>

      <p>
        Crispy chicken burger with special sauce.
      </p>

    </div>



    <div className="featured-card">

      <img 
        src="/images/pasta.jpg"
        alt="Pasta"
      />

      <h2>
        Chicken Pasta 🍝
      </h2>

      <p>
        Creamy pasta made with fresh ingredients.
      </p>

    </div>


  </div>


</section>
<section id="why-us">

  <h1>
    Why Choose Us ❤️
  </h1>


  <div className="why-cards">


    <div className="why-card">
      <h2>🍽️ Fresh Food</h2>
      <p>
        We use fresh ingredients for every meal.
      </p>
    </div>


    <div className="why-card">
      <h2>🚚 Fast Delivery</h2>
      <p>
        Quick and safe delivery at your doorstep.
      </p>
    </div>


    <div className="why-card">
      <h2>👨‍🍳 Expert Chefs</h2>
      <p>
        Our chefs prepare food with passion.
      </p>
    </div>


  </div>
</section>
<section id="gallery">

  <h1>
    Our Food Gallery 📸
  </h1>


  <div className="gallery-grid">


    <img src="/images/pizza.jpg" alt="Pizza" />

    <img src="/images/burger.jpg" alt="Burger" />

    <img src="/images/zinger.jpg" alt="Zinger Burger" />

    <img src="/images/pasta.jpg" alt="Pasta" />

    <img src="/images/fries.jpg" alt="Fries" />

    <img src="/images/snackes.jpg" alt="Snacks" />

    <img src="/images/mint.jpg" alt="Mint Drink" />

    <img src="/images/coke.jpg" alt="Coke" />

    <img src="/images/bbq pizza.jpg" alt="BBQ Pizza" />

    <img src="/images/shawarma.jpg" alt="Shawarma" />

    <img src="/images/hawai pizza.jpg" alt="Hawai Pizza" />

    <img src="/images/oreo.jpg" alt="Oreo" />


  </div>

</section>
      <section id="about">

        <h1>
          About Us
        </h1>


        <p>
          Maryam Restaurant provides fresh food,
          quality service and amazing taste for our customers.
        </p>


      </section>



      <section id="chef">

        <h1>
          Our Chef 👨‍🍳
        </h1>


        <p>
          Professional chefs prepare every dish
          with love and fresh ingredients.
        </p>


      </section>



      <section id="reviews">

        <h1>
          Customer Reviews ⭐
        </h1>


        <div className="review-box">

          <p>
            "Amazing food and excellent service!"
          </p>


          <p>
            "Best restaurant experience."
          </p>


        </div>


      </section>



      <section id="contact">

        <h1>
          Contact Us
        </h1>


        <p>
          📞 0300-0000000
        </p>


        <p>
          📧 maryamrestaurant@gmail.com
        </p>


        <p>
          📍 Pakistan
        </p>


      </section>




      {cartOpen && (

        <div className="modal-bg">

          <div className="modal">


            <button
              className="close"
              onClick={()=>setCartOpen(false)}
            >
              ✖
            </button>


            <h2>
              Your Cart 🛒
            </h2>



            {cartItems.length === 0 ? (

              <p>
                Cart is empty
              </p>

            ) : (

              cartItems.map((item,index)=>(

                <div key={index}>

                  <h3>
                    {item.name}
                  </h3>


              <div className="quantity">

  <button
    onClick={()=>updateQuantity(index,-1)}
  >
    -
  </button>


  <span>
    {item.quantity}
  </span>


  <button
    onClick={()=>updateQuantity(index,1)}
  >
    +
  </button>

</div>


                  <p>
                    Price: Rs. {item.price * item.quantity}
                  </p>


                  <hr/>

                </div>

              ))

            )}



          </div>

        </div>

      )}




      <footer>

  <div className="footer-content">


    <div>
      <h2>
        🍴 Maryam Restaurant
      </h2>

      <p>
        Delicious food with best taste and quality.
      </p>
    </div>


    <div>
      <h3>
        Quick Links
      </h3>

      <p>Home</p>
      <p>Menu</p>
      <p>About</p>
      <p>Contact</p>
    </div>


    <div>
      <h3>
        Contact
      </h3>

      <p>📞 0300-0000000</p>
      <p>📧 maryamrestaurant@gmail.com</p>
      <p>📍 Pakistan</p>
    </div>


  </div>


  <div className="copyright">

    <p>
      © 2026 Maryam Restaurant | All Rights Reserved
    </p>

  </div>


</footer>


    </main>

  );

}