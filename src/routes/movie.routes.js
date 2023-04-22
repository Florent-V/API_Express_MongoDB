import express from "express";
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "../controllers/movie.controller.js";
import { validateMovie } from "../middleware/validator.js";
import { verifyToken, addUserId } from "../middleware/auth.js";

const router = express.Router();

router.get('', getMovies);
router.get('/:id', getMovieById);

// Necessite un token
router.use(verifyToken);
router.post('', addUserId, validateMovie, createMovie);

router.put('/:id', validateMovie, updateMovie);
router.delete('/:id', deleteMovie);

export default router;
