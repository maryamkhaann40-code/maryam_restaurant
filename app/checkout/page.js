"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {

  const { cartItems, setCartItems } = useContext(CartContext);

  const router = useRouter();


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );


  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");


  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);


  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const generateOrderId = () => {

    return (
      "MR-" +
      Math.floor(
        100000 + Math.random() * 900000
      )
    );

  };


  const handleOrder = () => {

    if (!name || !phone || !address) {

      alert(
        "Please fill customer details!"
      );

      return;

    }


    if (cartItems.length === 0) {

      alert(
        "Your cart is empty!"
      );

      return;

    }


    if (paymentMethod === "Debit/Credit Card") {


      if (
        !cardHolder ||
        !cardNumber ||
        !expiry ||
        !cvv
      ) {

        alert(
          "Please complete card details!"
        );

        return;

      }

    }


    setProcessing(true);


    setTimeout(() => {


      const newOrder = {

        orderId: generateOrderId(),

        name,

        phone,

        address,

        paymentMethod,

        items: cartItems,

        total: totalPrice,

        date:
          new Date()
          .toLocaleString(),

        status:
          "🟢 Confirmed"

      };


      const oldOrders =
        JSON.parse(
          localStorage.getItem("orders")
          || "[]"
        );


      oldOrders.push(newOrder);


      localStorage.setItem(
        "orders",
        JSON.stringify(oldOrders)
      );


      setProcessing(false);

      setOrderSuccess(true);

      setCartItems([]);


      setTimeout(() => {

        router.push("/orders");

      }, 2500);


    }, 2000);


  };  return (

    <div className="checkout-container">


      {orderSuccess && (

        <div className="success-message">

          🎉 Payment Successful!

          <br />

          Your order has been confirmed.

          <br />

          Thank you for ordering from
          <strong>
            {" "}Maryam Restaurant ❤️
          </strong>

        </div>

      )}



      <div className="checkout-grid">



        {/* CUSTOMER DETAILS */}


        <div className="checkout-card">


          <h1>
            📝 Customer Details
          </h1>



          <input

            type="text"

            placeholder="👤 Full Name"

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

          />



          <input

            type="text"

            placeholder="📞 Phone Number"

            value={phone}

            onChange={(e)=>
              setPhone(e.target.value)
            }

          />



          <textarea

            placeholder="📍 Delivery Address"

            value={address}

            onChange={(e)=>
              setAddress(e.target.value)
            }

          />





          <div className="payment-box">


            <h2>
              💳 Payment Method
            </h2>



            <label>


              <input

                type="radio"

                value="Cash on Delivery"

                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }

                onChange={(e)=>
                  setPaymentMethod(
                    e.target.value
                  )
                }

              />


              Cash on Delivery


            </label>




            <label>


              <input

                type="radio"

                value="Debit/Credit Card"

                checked={
                  paymentMethod ===
                  "Debit/Credit Card"
                }

                onChange={(e)=>
                  setPaymentMethod(
                    e.target.value
                  )
                }

              />


              💳 Debit / Credit Card


            </label>





            <label>


              <input

                type="radio"

                value="Online Payment"

                checked={
                  paymentMethod ===
                  "Online Payment"
                }

                onChange={(e)=>
                  setPaymentMethod(
                    e.target.value
                  )
                }

              />


              📱 Online Payment


            </label>




          </div>





          {
            paymentMethod ===
            "Debit/Credit Card" && (


              <div className="card-form">


                <h2>
                  💳 Card Details
                </h2>



                <input

                  type="text"

                  placeholder="Card Holder Name"

                  value={cardHolder}

                  onChange={(e)=>
                    setCardHolder(
                      e.target.value
                    )
                  }

                />



                <input

                  type="text"

                  placeholder="Card Number"

                  maxLength="16"

                  value={cardNumber}

                  onChange={(e)=>
                    setCardNumber(
                      e.target.value
                    )
                  }

                />



                <div className="card-row">


                  <input

                    type="text"

                    placeholder="MM/YY"

                    value={expiry}

                    onChange={(e)=>
                      setExpiry(
                        e.target.value
                      )
                    }

                  />



                  <input

                    type="password"

                    placeholder="CVV"

                    maxLength="3"

                    value={cvv}

                    onChange={(e)=>
                      setCvv(
                        e.target.value
                      )
                    }

                  />


                </div>



              </div>


            )
          }



          <button

            className="order-btn"

            onClick={handleOrder}

            disabled={processing}

          >


            {
              processing
              ?
              "⏳ Processing Payment..."
              :
              "✅ Place Order"
            }


          </button>



        </div>        {/* ORDER SUMMARY */}

        <div className="checkout-card">


          <h1>
            🛒 Order Summary
          </h1>



          {
            cartItems.length === 0
            ?

            <p>
              Your cart is empty
            </p>

            :

            cartItems.map((item,index)=>(


              <div
                className="checkout-item"
                key={index}
              >



                <img

                  src={item.image}

                  alt={item.name}

                />



                <div>


                  <h3>
                    {item.name}
                  </h3>



                  <p>
                    Quantity:
                    {" "}
                    {item.quantity}
                  </p>



                  <p>
                    Price:
                    {" "}
                    Rs {item.price}
                  </p>



                  <p>

                    Sub Total:
                    {" "}
                    Rs {
                      item.price *
                      item.quantity
                    }

                  </p>


                </div>



              </div>


            ))

          }




          <hr />



          <h2 className="total">

            Total:
            {" "}
            Rs {totalPrice}

          </h2>





          <div className="order-info">


            <h3>
              📦 Order Information
            </h3>


            <p>

              <strong>
                Payment:
              </strong>

              {" "}
              {paymentMethod}

            </p>



            <p>

              <strong>
                Delivery:
              </strong>

              {" "}
              1 hr 20 min

            </p>



            <p>

              <strong>
                Status:
              </strong>

              🟡 Pending

            </p>



          </div>



        </div>




      </div>



    </div>

  );


}