import "reflect-metadata";
import assert from "assert";
import { userRepository } from "../backend/repositories/users";
import { User } from "../backend/entities/user.entity";
import { AppDataSource } from "../backend/db";

describe("signUp", () => {
  beforeEach(async () => {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      console.error(`err in beforeEach init:${err}`);
    }
  });

  afterEach(async () => {
    await UserEntity.delete({ email: testUser.email });
    await AppDataSource.destroy();
  });
  const UserEntity = AppDataSource.getRepository(User);
  const testUser = {
    email: "testEmail",
    password: "testPassword",
    username: "testUsername",
  };

  const tmpUser = new User();

  tmpUser.email = testUser.email;
  tmpUser.password = testUser.password;
  tmpUser.username = testUser.username;

  it("should insert new user", async () => {
    await userRepository.signUp({
      username: testUser.username,
      password: testUser.password,
      email: testUser.email,
    } as User);

    const expectedUser = await UserEntity.findOneBy({ email: tmpUser.email });

    assert.equal(expectedUser?.email, tmpUser.email);
    assert.equal(expectedUser?.username, tmpUser.username);
    assert.notEqual(expectedUser?.password, tmpUser.password);
  });
});

describe("getUserByEmail", () => {
  beforeEach(async () => {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      console.error(`err in beforeEach init:${err}`);
    }
  });

  afterEach(async () => {
    await UserEntity.delete({ email: testUser.email });
    await AppDataSource.destroy();
  });

  const UserEntity = AppDataSource.getRepository(User);

  const testUser = {
    email: "testEmail",
    password: "testPassword",
    username: "testUsername",
  };

  const tmpUser = new User();

  tmpUser.email = testUser.email;
  tmpUser.password = testUser.password;
  tmpUser.username = testUser.username;

  it("should retrieve user by email", async () => {
    try {
      await UserEntity.save(tmpUser);

      const expectedUser = await userRepository.getUserByEmail(tmpUser.email);

      assert.equal(expectedUser?.email, tmpUser.email);
    } catch (err) {
      console.error(`error while initializing data source:${err}`);
      await AppDataSource.destroy();
    }
  });
});
