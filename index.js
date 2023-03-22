import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import bookRoutes from './src/routes/book.routes.js';
//import userRoutes from './src/routes/user.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware pour parser les données de la requête en JSON
app.use(express.json());

// Routes pour les livres
//app.use('/api/books', bookRoutes);

// Routes pour les utilisateurs
//app.use('/api/users', userRoutes);

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

// Middleware pour gérer les autres erreurs
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message
      }
   });
});

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_CONNECT, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
   console.log('Connexion à la base de données réussie !');
   // Lancement de l'application
   app.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}.`));
})
.catch(err => console.log(err));
