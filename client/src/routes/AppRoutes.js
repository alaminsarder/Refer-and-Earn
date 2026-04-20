import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* পরে login/register routes add করবেন */}
    </Routes>
  );
}