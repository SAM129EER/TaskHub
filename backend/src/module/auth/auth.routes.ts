import { Router } from "express";
import { signInController, signUpController } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middleware/validate.middleware.js";
import { SignUpSchema, signInSchema } from "./auth.schema.js";
const router = Router();

// Signup must validate the registration-only fields before creating a user.
router.post("/sign-up", validate(SignUpSchema), asyncHandler(signUpController));
router.post("/sign-in", validate(signInSchema), asyncHandler(signInController));

export default router;
