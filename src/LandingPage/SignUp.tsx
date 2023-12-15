import React, { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiPath from "../ApiPath";
import { User } from "../types";

type InputType = "username" | "password" | "email";

const USER_API_PATH = `${ApiPath}/user`;

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signUpError, setSignUpError] = useState<boolean>(false);

  const signUpUser = async () => {
    try {
      const response = await axios.post(`${USER_API_PATH}/sign-up`, {
        username,
        password,
        email,
      } as User);
      if (response) {
        navigate("/user");
      }
    } catch (err) {
      setSignUpError(true);
    }
  };
  const updateSignUpValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = event.target.id as InputType;

    let updateStateMethod = null;

    if (inputType === "username") {
      updateStateMethod = setUsername;
    } else if (inputType === "password") {
      updateStateMethod = setPassword;
    } else if (inputType === "email") {
      updateStateMethod = setEmail;
    }

    if (updateStateMethod !== null) {
      updateStateMethod(event.target.value);
    }
    // for reset signUpError
    setSignUpError(false);
  };

  return (
    <div>
      <input
        id="username"
        type="text"
        placeholder="username"
        onChange={updateSignUpValue}
      />
      <input
        id="password"
        type="text"
        placeholder="password"
        onChange={updateSignUpValue}
      />
      <input
        id="email"
        type="text"
        placeholder="email"
        onChange={updateSignUpValue}
      />
      <Button onClick={signUpUser}> Register from here</Button>
      {signUpError && (
        <div className="alert alert-danger" role="alert">
          username, password, email are required
        </div>
      )}
    </div>
  );
};

export default SignUp;
