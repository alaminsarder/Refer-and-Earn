import { useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { registerUser } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", referralCode: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: "40px auto" }}>
      <h2>Register</h2>
      {msg ? <p style={{ color: "crimson" }}>{msg}</p> : null}

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <input name="referralCode" placeholder="Referral Code (optional)" value={form.referralCode} onChange={onChange} />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}