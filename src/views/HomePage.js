import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, Sidebar } from "../components";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Sidebar />
      <Footer />
    </>
  );
};

export default HomePage;
