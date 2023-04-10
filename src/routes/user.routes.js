import express from "express";
import { getUserForAuth, register } from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validator.js";
import { hashPassword, verifyPassword } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", getUserForAuth, verifyPassword)
router.post("/register", validateUser, hashPassword, register)

export default router;
