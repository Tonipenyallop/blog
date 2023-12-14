import React, { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiPath from "../ApiPath";
import { User } from "../types";

const USER_API_PATH = `${ApiPath}/user`;

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<boolean>(false);

  const signUpUser = async () => {
    try {
      const response = await axios.post(`${USER_API_PATH}/sign-up`, {
        username,
        password,
      } as User);
      if (response) {
        navigate("/user");
      }
    } catch (err) {
      setSignUpError(true);
    }
  };
  const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    // for reset signUpError
    setSignUpError(false);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // for reset signUpError
    setSignUpError(false);
  };
  return (
    <div>
      <input type="text" placeholder="username" onChange={updateUsername} />
      <input type="text" placeholder="password" onChange={updatePassword} />
      <Button onClick={signUpUser}> Register from here</Button>
      {signUpError && (
        <div className="alert alert-danger" role="alert">
          username and password are required
        </div>
      )}
    </div>
  );
};

export default SignUp;
