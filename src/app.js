import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB, migrateBook, migrateUser } from './config/database.js';

//import mongoose from 'mongoose';
import bookRoutes from './routes/book.routes.js';
import movieRoutes from './routes/movie.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

// Middleware pour parser les données de la requête en JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes pour les livres
app.use('/api/books', bookRoutes);
// Routes pour les films
app.use('/api/movies', movieRoutes);
// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  console.log('ok');
  res.send("Welcome to this Express_Mongo API")
});

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

await connectDB();
await migrateBook();
await migrateUser();

export default app

// Connexion à la base de données MongoDB
// mongoose.connect(process.env.DB_CONNECT, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// })
// .then(() => {
//    console.log('Connexion à la base de données réussie !');
//    // Lancement de l'application
//    app.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}.`));
// })
// .catch(err => console.log(err));
