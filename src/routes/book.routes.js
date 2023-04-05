import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/book.controller.js';
import { validateBook } from '../middleware/validator.js';

const router = express.Router();

router.get('', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
