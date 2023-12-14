import React from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <input type="text" placeholder="username" />
      <input type="text" placeholder="password" />
      <Button onClick={() => navigate("/user")}> Login button</Button>
    </div>
  );
};
export default Login;
