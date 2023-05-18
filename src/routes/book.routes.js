import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook, updatePagesRead } from '../controllers/book.controller.js';
import { validateBook } from '../middleware/validator.js';
import { verifyToken, addUserId, verifyUser } from '../middleware/auth.js';
import { getBookOwner } from '../middleware/books.middleware.js';
import { uploadCover } from '../middleware/upload.js';

const router = express.Router();

// Necessite un token
router.use(verifyToken);

router.get('', getBooks);
router.get('/:id', getBookOwner, verifyUser, getBookById);

router.post('/', uploadCover, validateBook, createBook);
router.put('/:id', getBookOwner, verifyUser, uploadCover, validateBook, updateBook);

router.patch('/:id/pages-read/:pages', getBookOwner, verifyUser, updatePagesRead);

router.delete('/:id', getBookOwner, verifyUser, deleteBook);

export default router;
