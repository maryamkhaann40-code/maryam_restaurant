"use client";

import { useEffect, useState } from "react"

export default function OrdersPage(){

  const [orders,setOrders] = useState([]);


  useEffect(()=>{

    const savedOrders = localStorage.getItem("orders");

    if(savedOrders){
      setOrders(JSON.parse(savedOrders));
    }

  },[]);
const markDelivered = (index) => {

  const updatedOrders = [...orders];

  updatedOrders[index].status = "Delivered";

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

};


  return(

    <div className="orders-page">

      <h1>
        My Orders 📦
      </h1>


      {
        orders.length === 0 ? (

          <p>
            No Orders Found
          </p>

        ) : (

          orders.map((order,index)=>(

            <div className="order-card" key={index}>

              <h2>
                Order #{index+1}
              </h2>
<p className="status">
  Status:
  <span>
    {order.status || "Pending"}
  </span>
</p>
              <p>
                Name: {order.name}
              </p>

              <p>
                Address: {order.address}
              </p>


              <h3>
                Items:
              </h3>


              {
                order.items.map((item,i)=>(

                  <p key={i}>
                    {item.name} x {item.quantity}
                  </p>

                ))
              }


              <h3>
                Total: Rs {order.total}
              </h3>


<button
  className="deliver-btn"
  onClick={()=>markDelivered(index)}
>
  Mark as Delivered ✅
</button>

            </div>

          ))

        )
      }


    </div>

  );

}