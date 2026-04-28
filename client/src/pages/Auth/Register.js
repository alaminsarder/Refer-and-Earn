import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const h = React.createElement;
const API_URL = window.location.hostname === "localhost" ? "http://localhost:5000" : "";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", referralCode: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("ref");
    if (code) setFormData(prev => ({ ...prev, referralCode: code }));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "Processing..." });
    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      alert("Account Created Successfully!");
      navigate("/login");
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Registration failed" });
    }
  };

  return h("div", { className: "auth-wrapper" },
    h("div", { className: "auth-glass-card" },
      h("div", { className: "auth-head" },
        h("h2", null, "Join ", h("span", { className: "text-grad" }, "ReferEarn")),
        h("p", null, "Create an account and start earning rewards")
      ),
      msg.text && h("p", { className: `alert ${msg.type}` }, msg.text),
      h("form", { onSubmit: handleSubmit, className: "form-stack" },
        h("div", { className: "field" },
          h("label", null, "Full Name"),
          h("input", { type: "text", name: "name", placeholder: "Enter your full name", required: true, value: formData.name, onChange: handleChange })
        ),
        h("div", { className: "field" },
          h("label", null, "Email Address"),
          h("input", { type: "email", name: "email", placeholder: "name@example.com", required: true, value: formData.email, onChange: handleChange })
        ),
        h("div", { className: "field" },
          h("label", null, "Password"),
          h("input", { type: "password", name: "password", placeholder: "Min 6 characters", required: true, value: formData.password, onChange: handleChange })
        ),
        h("div", { className: "field" },
          h("label", null, "Referral Code (Optional)"),
          h("input", { type: "text", name: "referralCode", placeholder: "Code from your friend", value: formData.referralCode, onChange: handleChange, className: "ref-highlight" })
        ),
        h("button", { type: "submit", className: "btn-gradient" }, "Create Account")
      ),
      h("div", { className: "auth-footer" },
        h("p", null, "Already a member? ", h(Link, { to: "/login" }, "Login here"))
      )
    )
  );
}