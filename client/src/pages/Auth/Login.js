import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const h = React.createElement;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // আগের এরর ক্লিয়ার করা

    try {
      // ব্যাকএন্ডে লগইন রিকোয়েস্ট পাঠানো
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        // টোকেন এবং ইউজার ইনফো লোকাল স্টোরেজে সেভ করা
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successful!");
        navigate("/dashboard"); // ড্যাশবোর্ডে নিয়ে যাওয়া
      }
    } catch (err) {
      // ভুল ইমেইল বা পাসওয়ার্ড হলে এরর দেখানো
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return h("div", { className: "auth-container" },
    h("div", { className: "auth-card" },
      h("h2", { className: "auth-title" }, "Welcome Back"),
      h("p", { className: "auth-subtitle" }, "Log in to manage your referrals"),
      
      // এরর মেসেজ দেখানোর জন্য
      error && h("p", { style: { color: "#ef4444", textAlign: "center", fontWeight: "600", marginBottom: "15px" } }, error),

      h("form", { onSubmit: handleSubmit, className: "auth-form" },
        h("div", { className: "input-group" },
          h("label", null, "Email Address"),
          h("input", { 
            type: "email", 
            placeholder: "Enter your email", 
            value: email, 
            onChange: (e) => setEmail(e.target.value), 
            required: true 
          })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Password"),
          h("input", { 
            type: "password", 
            placeholder: "Enter password", 
            value: password, 
            onChange: (e) => setPassword(e.target.value), 
            required: true 
          })
        ),
        h("button", { type: "submit", className: "btn-auth" }, "Login Now")
      ),
      h("p", { className: "auth-switch" }, "Don't have an account? ", h(Link, { to: "/register" }, "Register"))
    )
  );
}