import ApiError from "../../errors/api-error.js";

import {
  findUserByEmail,
  createSession,
  createUser,
} from "./auth.repository.js";

import {
  generateRefreshToken,
  generateAccessToken,
  hashPassword,
  compareHashPassword,
} from "./auth.utils.js";

export const signUpService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const userExist = await findUserByEmail(data.email);

  if (userExist) {
    throw new ApiError(409, "user already exist");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  const { password, ...safeuser } = user;

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  await createSession({
    userId: user.id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: safeuser,
    accessToken,
    refreshToken,
  };
};

export const signInService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await compareHashPassword(
    data.password,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { password, ...safeuser } = user;
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await createSession({
    userId: user.id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user: safeuser, accessToken, refreshToken };
};
