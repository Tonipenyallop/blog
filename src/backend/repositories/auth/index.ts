import { VerifiedRegistrationResponse } from "@simplewebauthn/server";
import { AppDataSource } from "../../db/index";
import { Authenticator } from "../../entities/authenticator.entity";

const AuthEntity = AppDataSource.getRepository(Authenticator);

export const authRepository = {
  createUserAuthenticator: (
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

  getSingleUserAuthenticator: async (
    userID: number,
    authenticatorID: string
  ) => {
    if (typeof userID !== "number" || !authenticatorID) {
      throw new Error("userID or authenticatorID should be provided");
    }

    return AuthEntity.findOneBy({
      userID,
      rawID: authenticatorID,
    });
  },

  getUserAuthenticators: (userID: number) => {
    try {
      if (typeof userID !== "number") {
        throw new Error("userID should be provided");
      }

      return AuthEntity.findBy({ userID });
    } catch (err) {
      throw new Error("Error while getting user authenticators");
    }
  },
  setUserAuthenticateRawID: async (
    userID: number,
    authenticatorRawID: string
  ) => {
    if (typeof userID !== "number" || !authenticatorRawID) {
      throw new Error("userID or authenticatorRawID should be provided");
    }
    try {
      return AuthEntity.update({ userID }, { rawID: authenticatorRawID });
    } catch (err) {
      throw new Error("Error while setting user authenticator raw ID");
    }
  },
};
