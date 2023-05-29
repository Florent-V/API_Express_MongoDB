import express from "express";
import { deleteById, getUserForAuth, getUsers, register, updateById } from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validator.js";
import { hashPassword, verifyPassword, verifyToken, verifyAccess } from "../middleware/auth.js";

const router = express.Router();

// swagger jsodc pour le schema du model user
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour les opérations liées aux utilisateurs
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *     AccessToken:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *            id:
 *             type: string
 *            username:
 *             type: string
 *            email:
 *             type: string
 *            role:
 *             type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// routes pour login et register

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     tags: [Users]
 *     description: Permet à l'utilisateur de s'authentifier et d'obtenir un token d'accès
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             items:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Succès - Token d'accès obtenu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 */
router.post("/login", getUserForAuth, verifyPassword)

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Inscription de l'utilisateur
 *     tags: [Users]
 *     description: Permet à l'utilisateur de s'inscrire sur l'API
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             items:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Succès - Token d'accès obtenu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/register", validateUser, hashPassword, register)

// necessite un token
router.use(verifyToken)
router.put("/update/:id", verifyAccess, validateUser, hashPassword, updateById)
router.delete("/:id", verifyAccess, deleteById)

//a verrouiller pour admin
router.get("", getUsers)

export default router;
