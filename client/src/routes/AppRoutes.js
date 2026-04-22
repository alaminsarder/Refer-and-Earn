import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing.js";

function Placeholder(props){
  return React.createElement("div", { style: { padding: 24 } }, props.title);
}

export default function AppRoutes() {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, { path: "/", element: React.createElement(Landing, null) }),
    React.createElement(Route, { path: "/login", element: React.createElement(Placeholder, { title: "Login Page" }) }),
    React.createElement(Route, { path: "/register", element: React.createElement(Placeholder, { title: "Register Page" }) })
  );
}