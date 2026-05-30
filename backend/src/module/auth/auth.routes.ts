import { Router } from "express";
import { signInController, signUpController } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middleware/validate.middleware.js";
import { signInSchema } from "./auth.schema.js";
const router = Router();

router.post("/sign-up", validate(signInSchema), asyncHandler(signUpController));
router.post("/sign-in", validate(signInSchema), asyncHandler(signInController));

export default router;
