import React, { useState } from "react";
import { loginUser } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>
      {msg ? <p style={{ color: "crimson" }}>{msg}</p> : null}

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}