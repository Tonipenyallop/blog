import { VerifiedRegistrationResponse } from "@simplewebauthn/server";
import { AppDataSource } from "../../db/index";
import { Authenticator } from "../../entities/authenticator.entity";

const AuthEntity = AppDataSource.getRepository(Authenticator);

export const authRepository = {
  createAuthenticator: (
    verification: VerifiedRegistrationResponse,
    userID: number
  ) => {
    try {
      if (typeof userID !== "number") {
        throw new Error("userID should be provided");
      }
      if (!verification.registrationInfo) {
        throw new Error("registrationInfo should be provided");
      }
      const {
        credentialID,
        credentialPublicKey,
        counter,
        credentialDeviceType,
        credentialBackedUp,
      } = verification.registrationInfo;

      const authenticator = AuthEntity.create({
        credentialID,
        credentialPublicKey,
        counter,
        credentialDeviceType,
        credentialBackedUp,
        userID,
      });

      return AuthEntity.save(authenticator);
    } catch (err) {
      throw new Error("Error while creating authenticator");
    }
  },
};
