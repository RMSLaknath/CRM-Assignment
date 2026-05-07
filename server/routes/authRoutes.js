import express from "express";
import { body, validationResult } from "express-validator";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",

  [
    body("email").isEmail().withMessage("Valid email required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  register,
);

export default router;
