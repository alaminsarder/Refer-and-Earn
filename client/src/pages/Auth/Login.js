import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const h = React.createElement;
const API_URL = window.location.hostname === "localhost" ? "http://localhost:5000" : "";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Try again!");
    }
  };

  return h("div", { className: "auth-wrapper" },
    h("div", { className: "auth-glass-card" },
      h("div", { className: "auth-head" },
        h("h2", null, "Welcome ", h("span", { className: "text-grad" }, "Back")),
        h("p", null, "Log in to your referral dashboard")
      ),
      error && h("p", { className: "alert error" }, error),
      h("form", { onSubmit: handleSubmit, className: "form-stack" },
        h("div", { className: "field" },
          h("label", null, "Email Address"),
          h("input", { type: "email", name: "email", placeholder: "Enter your email", required: true, value: formData.email, onChange: handleChange })
        ),
        h("div", { className: "field" },
          h("label", null, "Password"),
          h("input", { type: "password", name: "password", placeholder: "Enter your password", required: true, value: formData.password, onChange: handleChange })
        ),
        h("button", { type: "submit", className: "btn-gradient" }, "Login Now")
      ),
      h("div", { className: "auth-footer" },
        h("p", null, "New to ReferEarn? ", h(Link, { to: "/register" }, "Create Account"))
      )
    )
  );
}