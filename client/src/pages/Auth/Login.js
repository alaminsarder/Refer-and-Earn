import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const h = React.createElement;
const API_URL = window.location.hostname === "localhost" ? "http://localhost:5000" : "";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return h("div", { className: "auth-container" },
    h("div", { className: "auth-card" },
      h("h2", { className: "auth-title" }, "Welcome Back"),
      error && h("p", { style: { color: "red", textAlign: "center" } }, error),
      h("form", { onSubmit: handleSubmit, className: "auth-form" },
        h("div", { className: "input-group" },
          h("label", null, "Email Address"),
          h("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Password"),
          h("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
        ),
        h("button", { type: "submit", className: "btn-auth" }, "Login Now")
      ),
      h("p", { className: "auth-switch" }, "Don't have an account? ", h(Link, { to: "/register" }, "Register"))
    )
  );
}