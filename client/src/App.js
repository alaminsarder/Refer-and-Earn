import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/User/Dashboard";

const h = React.createElement;

function App() {
  return h(Routes, null,
    // হোম পেজ
    h(Route, { path: "/", element: h(Landing, null) }),
    
    // লগইন পেজ
    h(Route, { path: "/login", element: h(Login, null) }),
    
    // রেজিস্ট্রেশন পেজ
    h(Route, { path: "/register", element: h(Register, null) }),

    // ড্যাশবোর্ড পেজ (লগইন করার পর এখানে যাবে)
    h(Route, { path: "/dashboard", element: h(Dashboard, null) })
  );
}

export default App;