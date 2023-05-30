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
 *     NewBook:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: titre du livre
 *         author:
 *           type: string
 *           description: auteur du livre
 *         pages:
 *           type: number
 *           description: nombre de pages du livre
 *         pagesRead:
 *           type: number
 *           description: nombre de pages lues du livre
 *         isRead:
 *           type: boolean
 *           description: livre lu ou non
 *         image:
 *            type: string
 *            format: binary
 *            description: image de couverture du livre
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

// Token nécessaire pour les routes ci-dessous
router.use(verifyToken);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Récupérer la liste des livres de l'utilisateur
 *     tags: [Livres]
 *     description: Récupère la liste complète des livres de l'utilisateur
 *     security:
 *      - bearerAuth: []
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
router.get('/', getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Crée un nouveau livre
 *     tags: [Livres]
 *     description: Crée un nouveau livre en utilisant les informations fournies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       201:
 *         description: Succès - Livre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Requête invalide - Certaines informations requises sont manquantes ou invalides
 *       500:
 *         description: Erreur interne du serveur - Impossible de créer le livre
 */
router.post('/', uploadCover, validateBook, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Récupère un livre par son identifiant
 *     tags: [Livres]
 *     description: Récupère les détails d'un livre en utilisant son identifiant
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identifiant du livre à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès - Détails du livre récupérés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', getBookOwner, verifyUser, getBookById);


/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Met à jour un livre existant
 *     tags: [Livres]
 *     description: Met à jour un livre existant en utilisant les informations fournies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du livre à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       200:
 *         description: Succès - Livre mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Requête invalide - Certaines informations requises sont manquantes ou invalides
 *       404:
 *         description: Livre non trouvé - Aucun livre trouvé avec l'identifiant spécifié
 *       500:
 *         description: Erreur interne du serveur - Impossible de mettre à jour le livre
 */
router.put('/:id', getBookOwner, verifyUser, uploadCover, validateBook, updateBook);


/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Supprime un livre
 *     tags: [Livres]
 *     description: Supprime un livre existant avec l'identifiant spécifié
 *     security:
 *       - bearerAuth: []  # Spécifie que cette route nécessite l'authentification Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du livre à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Succès - Livre supprimé avec succès
 *       404:
 *         description: Livre non trouvé - Aucun livre trouvé avec l'identifiant spécifié
 *       500:
 *         description: Erreur interne du serveur - Impossible de supprimer le livre
 */
router.delete('/:id', getBookOwner, verifyUser, deleteBook);

/**
 * @swagger
 * /api/books/{id}/pages-read/{pages}:
 *   patch:
 *     summary: Met à jour le nombre de pages lues d'un livre
 *     tags: [Livres]
 *     description: Met à jour le nombre de pages lues d'un livre existant avec l'identifiant spécifié
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du livre à mettre à jour
 *         schema:
 *           type: string
 *       - in: path
 *         name: pages
 *         required: true
 *         description: Nouveau nombre de pages lues du livre
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Spécifie que cette route nécessite l'authentification Bearer Token
 *     responses:
 *       200:
 *         description: Succès - Nombre de pages lues du livre mis à jour avec succès
 *       400:
 *         description: Requête incorrecte - Le nombre de pages doit être un entier positif
 *       404:
 *         description: Livre non trouvé - Aucun livre trouvé avec l'identifiant spécifié
 *       500:
 *         description: Erreur interne du serveur - Impossible de mettre à jour le nombre de pages lues du livre
 */
router.patch('/:id/pages-read/:pages', getBookOwner, verifyUser, updatePagesRead);

export default router;


/*
 * /api/books:
 *   post:
 *     summary: Crée un nouveau livre
 *     description: Crée un nouveau livre avec les détails fournis
 *     requestBody:
 *       description: Détails du livre à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Livre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

