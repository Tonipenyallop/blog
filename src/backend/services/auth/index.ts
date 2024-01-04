import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { userRepository } from "../../repositories/users";
import { authRepository } from "../../repositories/auth";
import dotenv from "dotenv";
import { Authenticator } from "../../entities/authenticator.entity";
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server/script/deps";

dotenv.config();

const isProduction = process.env.REACT_APP_IS_PRODUCTION ?? false;

// Human-readable title for your website
const rpName = "Toni blog";
// A unique identifier for your website
const rpID = isProduction
  ? (process.env.PRODUCTION_DOMAIN as string)
  : "localhost";
// The URL at which registrations and authentications should occur
const origin = isProduction ? `https://${rpID}` : `http://${rpID}:3001`;

export const AuthService = {
  createRegistrationOption: async (email: string) => {
    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return null;
      }

      const userAuthenticators: Authenticator[] =
        await authRepository.getUserAuthenticators(user.id);

      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: user.id.toString(),
        userName: user.username,
        // Don't prompt users for additional information about the authenticator
        // (Recommended for smoother UX)
        attestationType: "none",
        // Prevent users from re-registering existing authenticators
        excludeCredentials: userAuthenticators.map((authenticator) => ({
          id: authenticator.credentialID,
          type: "public-key",
        })),
        // See "Guiding use of authenticators via authenticatorSelection" below
        authenticatorSelection: {
          // Defaults
          residentKey: "preferred",
          userVerification: "preferred",
          // Optional
          authenticatorAttachment: "platform",
        },
      });

      // (Pseudocode) Remember the challenge for this user
      await userRepository.setUserCurrentChallenge(user.id, options.challenge);

      return options;
    } catch (err) {
      throw new Error(`Error while create registration option: ${err}`);
    }
  },
  verifyRegistration: async (
    authenticatorResponse: RegistrationResponseJSON,
    userID: string
  ) => {
    const user = await userRepository.getUserByID(Number(userID));
    if (!user) {
      return null;
    }

    const expectedChallenge = user.current_challenge as string;

    let verification;

    try {
      verification = await verifyRegistrationResponse({
        response: authenticatorResponse,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`error while verifying registration: ${error}`);
    }

    if (!verification) {
      return null;
    }
    const { verified } = verification;

    await authRepository.createUserAuthenticator(verification, Number(userID));

    return { verified };
  },
  generateAuthenticationOptions: async (email: string) => {
    if (!email) {
      return null;
    }
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const userAuthenticators: Authenticator[] =
      await authRepository.getUserAuthenticators(user.id);

    const options = await generateAuthenticationOptions({
      rpID,
      // Require users to use a previously-registered authenticator
      allowCredentials: userAuthenticators.map((authenticator) => ({
        id: authenticator.credentialID,
        type: "public-key",
      })),
      userVerification: "preferred",
    });

    await userRepository.setUserCurrentChallenge(user.id, options.challenge);

    return options;
  },
  verifyAuthentication: async (
    email: string,
    authenticationResponse: AuthenticationResponseJSON
  ) => {
    if (!email || !authenticationResponse) {
      return null;
    }
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const expectedChallenge = user.current_challenge as string;

    const userAuthenticator = await authRepository.getSingleUserAuthenticator(
      Number(user.id),
      authenticationResponse.id
    );

    if (!userAuthenticator) {
      return null;
    }

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: authenticationResponse,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: userAuthenticator,
      });
    } catch (err) {
      throw new Error(`Error while verifying user: ${err}`);
    }
    const { verified } = verification;
    return verified;
  },

  setRawID: async (email: string, authenticatorRawID: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    try {
      return authRepository.setUserAuthenticateRawID(
        user.id,
        authenticatorRawID
      );
    } catch (err) {
      throw new Error(`Error while setting raw ID`);
    }
  },
};
