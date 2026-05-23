import {Router } from "express"
import { signInController, signUpController} from "./auth.controller.js"
import { asyncHandler} from "../../utils/asyncHandler.js"

const router = Router();

router.post(
  "/sign-up",
  asyncHandler(signUpController)
);

router.post(
  "/sign-in",
  asyncHandler(signInController)
);

export default router ; 