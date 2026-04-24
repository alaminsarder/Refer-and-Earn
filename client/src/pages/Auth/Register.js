import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // API কলের জন্য
import "./auth.css";

const h = React.createElement;

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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        referralCode: refCode
      });
      alert("Registration Successful! Your Code: " + res.data.myCode);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return h("div", { className: "auth-container" },
    h("div", { className: "auth-card" },
      h("h2", { className: "auth-title" }, "Create Account"),
      message && h("p", { style: { color: "red", textAlign: "center" } }, message),
      h("form", { onSubmit: handleSubmit, className: "auth-form" },
        h("div", { className: "input-group" },
          h("label", null, "Full Name"),
          h("input", { type: "text", placeholder: "John Doe", value: name, onChange: (e) => setName(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Email Address"),
          h("input", { type: "email", placeholder: "name@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Password"),
          h("input", { type: "password", placeholder: "Min 6 characters", value: password, onChange: (e) => setPassword(e.target.value), required: true })
        ),
        h("div", { className: "input-group" },
          h("label", null, "Referral Code (Optional)"),
          h("input", { type: "text", className: "ref-highlight", placeholder: "Code from friend", value: refCode, onChange: (e) => setRefCode(e.target.value) })
        ),
        h("button", { type: "submit", className: "btn-auth" }, "Create My Account")
      ),
      h("p", { className: "auth-switch" }, "Already have an account? ", h(Link, { to: "/login" }, "Login"))
    )
  );
}