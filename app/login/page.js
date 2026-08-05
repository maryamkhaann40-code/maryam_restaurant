"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();


  const handleLogin = () => {

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }


  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );


  if (
    savedUser &&
    savedUser.email === email &&
    savedUser.password === password
  ) {

    alert("Login Successfully 🎉");

    router.push("/");

  } else {

    alert("Invalid Email or Password ❌");

  }

};


  return (

    <div className="login-page">
<div className="login-box">

  <h2>
    🍴 Maryam Restaurant
  </h2>

  <h1>
    Welcome Back 🔐
  </h1>

  <p className="login-text">
    Login to continue your delicious journey
  </p>
      


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


            <button onClick={handleLogin}>
          Login
        </button>


        <p>
          Don't have an account?{" "}
          <a href="/signup">
            Signup
          </a>
        </p>


      </div>

    </div>

  );

}