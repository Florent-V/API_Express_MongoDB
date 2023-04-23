import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/book.controller.js';
import { validateBook } from '../middleware/validator.js';
import { verifyToken, addUserId, verifyUser } from '../middleware/auth.js';
import { getBookOwner } from '../middleware/books.middleware.js';

const router = express.Router();

// Necessite un token
router.use(verifyToken);

router.get('', getBooks);
router.get('/:id', getBookOwner, verifyUser, getBookById);

router.post('/', addUserId, validateBook, createBook);
router.put('/:id', getBookOwner, verifyUser, addUserId, validateBook, updateBook);

router.delete('/:id', getBookOwner, verifyUser, deleteBook);

export default router;
