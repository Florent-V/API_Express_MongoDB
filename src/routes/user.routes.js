import express from "express";
import { deleteById, getUserForAuth, getUsers, register, updateById } from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validator.js";
import { hashPassword, verifyPassword, verifyToken, verifyAccess } from "../middleware/auth.js";

const router = express.Router();


router.post("/login", getUserForAuth, verifyPassword)
router.post("/register", validateUser, hashPassword, register)

// necessite un token
router.use(verifyToken)
router.put("/update/:id", verifyAccess, validateUser, hashPassword, updateById)
router.delete("/:id", verifyAccess, deleteById)

//a verrouiller pour admin
router.get("", getUsers)

export default router;
