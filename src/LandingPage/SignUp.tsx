import { startRegistration } from "@simplewebauthn/browser";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import ApiPath from "../ApiPath";
import { User } from "../types";

interface Verified {
  verified: Boolean;
}

export type InputType = "username" | "password" | "email";

const USER_API_PATH = `${ApiPath}/user`;

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  const signUpUser = async () => {
    let response;
    try {
      response = await axios.post(`${USER_API_PATH}/sign-up`, {
        username,
        password,
        email,
      } as User);

      const option = response.data;

      const authenticatorResponse = await startRegistration(option);

      const verificationResponse: AxiosResponse<Verified> = await axios.post(
        `${USER_API_PATH}/verify-registration`,
        { authenticatorResponse, userID: option.user.id }
      );

      if (verificationResponse.data.verified) {
        navigate("/user");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setSignUpError("User already exists");
      }
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
    setSignUpError("");
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
      {signUpError !== "" && (
        <div className="alert alert-danger" role="alert">
          {signUpError}
        </div>
      )}
    </div>
  );
};

export default SignUp;
