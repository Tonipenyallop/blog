import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
const LandingPage = () => {
  return (
    <div>
      <h1 className="page-title"> WELCOME TO TONI BLOG</h1>
      <Login />
      <SignUp />
    </div>
  );
};

export default LandingPage;
