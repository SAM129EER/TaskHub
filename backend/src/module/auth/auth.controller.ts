import { Request, Response } from "express";
import { signInService, signUpService } from "./auth.service.js";

export const signUpController = async (req: Request, res: Response) => {
  const result = await signUpService(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(201).json({
    success: true,

    message: "User created successfully",

    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};

export const signInController = async (req: Request, res: Response) => {
  const result = await signInService(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged in sucesfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};
