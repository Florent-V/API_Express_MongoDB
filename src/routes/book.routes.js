import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/book.controller.js';
import { validateBook } from '../middleware/validator.js';
import { verifyToken, addUserId, verifyUser } from '../middleware/auth.js';
import { getBookOwner } from '../middleware/books.middleware.js';

const router = express.Router();

router.get('', getBooks);
router.get('/:id', getBookById);

// Necessite un token
router.use(verifyToken);

router.post('/', addUserId, validateBook, createBook);
router.put('/:id', getBookOwner, verifyUser, addUserId, validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
