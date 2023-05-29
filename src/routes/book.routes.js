import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook, updatePagesRead } from '../controllers/book.controller.js';
import { validateBook } from '../middleware/validator.js';
import { verifyToken, addUserId, verifyUser } from '../middleware/auth.js';
import { getBookOwner } from '../middleware/books.middleware.js';
import { uploadCover } from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Livres
 *   description: API pour les opérations liées aux livres
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         pages:
 *           type: number
 *         isRead:
 *           type: boolean
 *         pagesRead:
 *           type: number
 *         addedBy:
 *           type: string
 *         cover:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// Necessite un token
router.use(verifyToken);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Récupérer la liste des livres
 *     tags: [Livres]
 *     description: Récupère la liste complète des livres
 *     responses:
 *       200:
 *         description: Succès - Liste des livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('', getBooks);



router.get('/:id', getBookOwner, verifyUser, getBookById);

router.post('/', uploadCover, validateBook, createBook);
router.put('/:id', getBookOwner, verifyUser, uploadCover, validateBook, updateBook);

router.patch('/:id/pages-read/:pages', getBookOwner, verifyUser, updatePagesRead);

router.delete('/:id', getBookOwner, verifyUser, deleteBook);

export default router;
