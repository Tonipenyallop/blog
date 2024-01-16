import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ApiPath from "../ApiPath";

import { startAuthentication } from "@simplewebauthn/browser";

import axios, { AxiosResponse } from "axios";
import { InputType } from "./SignUp";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/server/script/deps";

type Options = {
  options: PublicKeyCredentialRequestOptionsJSON;
};

const USER_API_PATH = `${ApiPath}/user`;
export const AUTH_API_PATH = `${ApiPath}/auth`;

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  const updateLoginValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = event.target.id as InputType;

    let updateStateMethod = null;

    if (inputType === "password") {
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

  async function sendLoginRequest() {
    try {
      const loginResponse = await axios.post(`${USER_API_PATH}/login`, {
        password,
        email,
      });
      const { loginStatus } = loginResponse.data;

      if (!loginStatus) {
        return setSignUpError("Email or Password is wrong");
      }

      const generateAuthenticationOptionResponse = (await axios.post(
        `${USER_API_PATH}/generate-authentication-options`,
        { email }
      )) as AxiosResponse<Options>;

      const { options } = generateAuthenticationOptionResponse.data;

      let authenticationResponse;
      try {
        authenticationResponse = await startAuthentication(options);
      } catch (err) {
        // Some basic error handling
        console.error(`error while authenticating options: ${err}`);
      }
      if (!authenticationResponse) {
        return null;
      }

      // store authenticator_id to user and auth entities for being able to retrieve userAuthenticator
      await axios.post(`${USER_API_PATH}/authenticate`, {
        email,
        authenticatorRawID: authenticationResponse.id,
      });

      const verifyAuthenticationResponse = await axios.post(
        `${USER_API_PATH}/verify-authentication`,
        { email, authenticationResponse }
      );

      const { verification } = verifyAuthenticationResponse.data;

      if (!verification) {
        return setSignUpError("Failed to authenticate");
      }
      // call new api to store user
      const userID = authenticationResponse.response.userHandle as string;

      // store jwt token to cookie
      await axios.post(`${AUTH_API_PATH}/token`, { userID });

      navigate("/user");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(`err happened: ${err}`);
      }
    }
  }

  return (
    <div>
      <input
        id="email"
        // for auto fill in browser
        name="username"
        type="text"
        placeholder="email"
        onChange={updateLoginValue}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        onChange={updateLoginValue}
      />
      <Button onClick={sendLoginRequest}> Login button</Button>
      {signUpError !== "" && (
        <div className="alert alert-danger" role="alert">
          {signUpError}
        </div>
      )}
    </div>
  );
};
export default Login;
