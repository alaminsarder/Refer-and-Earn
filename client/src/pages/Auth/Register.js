import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const h = React.createElement;
const API_URL = window.location.hostname === "localhost" ? "http://localhost:5000" : "";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("ref");
    if (code) setRefCode(code);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password, referralCode: refCode });
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return h("div", { className: "auth-container" },
    h("div", { className: "auth-card" },
      h("h2", { className: "auth-title" }, "Create Account"),
      message && h("p", { style: { color: "red" } }, message),
      h("form", { onSubmit: handleSubmit, className: "auth-form" },
        h("div", { className: "input-group" },
          h("label", null, "Full Name"),
          h("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Email Address"),
          h("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Password"),
          h("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Referral Code"),
          h("input", { type: "text", className: "ref-highlight", value: refCode, onChange: (e) => setRefCode(e.target.value) })
        ),
        h("button", { type: "submit", className: "btn-auth" }, "Create Account")
      ),
      h("p", { className: "auth-switch" }, "Already member? ", h(Link, { to: "/login" }, "Login"))
    )
  );
}