import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./index.css";
const LandingPage = () => {
  return (
    <div>
      <h1 className="page-title"> WELCOME TO TONI BLOG</h1>
      <div className="input-container">
        <Login />
        <SignUp />
      </div>
    </div>
  );
};

export default LandingPage;
