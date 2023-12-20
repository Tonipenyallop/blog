import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { userRepository } from "../../repositories/users";
import dotenv from "dotenv";
import { Authenticator } from "../../../types";
import { RegistrationResponseJSON } from "@simplewebauthn/server/script/deps";

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
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    // come back here again
    const userAuthenticators: Authenticator[] = []; //getUserAuthenticators(user);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: user.id.toString(),
      userName: user.username,
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: "none",
      // Prevent users from re-registering existing authenticators
      excludeCredentials: [],
      //  userAuthenticators.map(authenticator => ({
      //   id: authenticator.credentialID,
      //   type: 'public-key',
      //   // Optional
      //   transports: authenticator.transports,
      // }))
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
  },
  verifyRegistration: async (
    authenticatorResponse: RegistrationResponseJSON,
    userID: string
  ) => {
    const user = await userRepository.getUserByID(Number(userID));
    if (!user) {
      return null;
    }
    console.log("authenticatorResponse");
    console.log(authenticatorResponse);

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

    const { verified } = verification;
    console.log("verification");
    console.log(verification);
    return verified;
  },
};
