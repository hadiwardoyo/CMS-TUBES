import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/LoginPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

export default UserRoutes;
