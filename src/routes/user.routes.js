import express from "express";
import { deleteById, getUserForAuth, getUsers, register, updateById } from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validator.js";
import { hashPassword, verifyPassword } from "../middleware/auth.js";

const router = express.Router();


router.post("/login", getUserForAuth, verifyPassword)
router.post("/register", validateUser, hashPassword, register)

router.put("/update/:id", validateUser, hashPassword, updateById)
router.get("", getUsers)
router.delete("/:id", deleteById)

export default router;
