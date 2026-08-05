"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();


  const handleSignup = () => {

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }


  const user = {
    name: name,
    email: email,
    password: password
  };


  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );


  alert("Account Created Successfully 🎉");


  router.push("/login");

};


  return (

    <div className="login-page">

      <div className="login-box">


      <h2>
  🍴 Maryam Restaurant
</h2>

<h1>
  Create Account 📝
</h1>

<p className="login-text">
  Join us and enjoy delicious food
</p>


        <input
          type="text"
          placeholder="👤 Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="🔒 Create Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button onClick={handleSignup}>
          Signup ✅
        </button>
<p>
  Already have an account?{" "}
  <a href="/login">
    Login
  </a>
</p>

      </div>

    </div>

  );

}