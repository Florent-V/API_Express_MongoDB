import express from "express";
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "../controllers/movie.controller.js";
import { validateMovie } from "../middleware/validator.js";
import { verifyToken, addUserId, verifyUser } from "../middleware/auth.js";
import { getMovieOwner } from "../middleware/movies.middleware.js";
import { uploadCover } from "../middleware/upload.js";

const router = express.Router();

// Necessite un token
router.use(verifyToken);

router.get('', getMovies);
router.get('/:id', getMovieOwner, verifyUser, getMovieById);

router.post('', uploadCover, validateMovie, createMovie);
router.put('/:id', getMovieOwner, verifyUser, uploadCover, validateMovie, updateMovie);

router.delete('/:id', getMovieOwner, verifyUser, deleteMovie);

export default router;
