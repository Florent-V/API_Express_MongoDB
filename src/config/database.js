import mongoose from 'mongoose';
import Book from '../models/book.model.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import { users, books, movies } from './data.js';
import argon2 from "argon2";

// Hashing options
const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  hashLength: 50
};

const hashOptions = {
  type: argon2.argon2id, // Algorithme de hachage (argon2d, argon2i, argon2id)
  memoryCost: 2 ** 16, // Taille de la mémoire (en Kibioctets)
  timeCost: 4, // Nombre d'itérations
  parallelism: 1, // Parallélisme
  hashLength: 64, // Longueur du hash en octets
  saltLength: 16 // Longueur du sel en octets
};



export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.DB_CONNECT, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      console.log('Connexion à la base de données réussie !');
   } catch (error) {
      console.log(`Erreur de connexion à la base de données : ${error.message}`);
   }
};

// Fonction qui vider la collection user et qui la rempli à l'aide du fichier data.js
export const migrateUser = async () => {
    try {
      // Suppression de tous les utilisateurs
      await User.deleteMany({});
      // hash du mot de passe des users et ajout en BDD
      // for (const user of users) {
      //   user.password = await argon2.hash(user.password, hashOptions);
      //   console.log(user)
      //   const hashedUser = new User(user);
      //   await hashedUser.save();
      // }

      const hashedUsers = await Promise.all(users.map(async user => {
        user.password = await argon2.hash(user.password, options);
        return new User(user);
      }));
      // Ajout des users en Base de données
      await User.insertMany(hashedUsers);

      console.log('Migration Utilisateurs réussie !');
    } catch (error) {
      console.log(`Erreur de migration (users) : ${error}`);
    }
};

export const migrateBook = async () => {
   try {
      // Suppression de tous les livres
      await Book.deleteMany({});
      // Récupération des utilisateurs avec le role "user" dans un tableau
      const users = await User.find({ role: 'user' });

      // Ajout des livres en Base de données
      const preparedBooks = await Promise.all(books.map(async book => {
        book.addedBy = users[Math.floor(Math.random() * users.length)]._id;
        return new Book(book);
      }));

      await Book.insertMany(preparedBooks);
        
      console.log('Migration Livres réussie !');
    } catch (error) {
      console.log(`Erreur de migration (books) : ${error.message}`);
    }
};

export const migrateMovie = async () => {
    try {
        // Suppression de tous les films
        await Movie.deleteMany({});
        // Récupération des utilisateurs avec le role "user" dans un tableau
        const users = await User.find({ role: 'user' });
  
        // Ajout des films en Base de données
        const preparedMovies = await Promise.all(movies.map(async movie => {
          movie.addedBy = users[Math.floor(Math.random() * users.length)]._id;
          return new Movie(movie);
        }));
  
        await Movie.insertMany(preparedMovies);
          
        console.log('Migration Films réussie !');
      } catch (error) {
        console.log(`Erreur de migration (movies) : ${error.message}`);
      }
  }

export const addCoverToBook = async () => {
  try {
    const result = await Book.updateMany(
      { cover: { $exists: false } },
      { $set: { cover: '' } });
    console.log('Mise à jour effectuée avec succès !');
    console.log('Nombre d\'entités mises à jour :', result.modifiedCount);
  } catch (error) {
    console.error(`Erreur de mise à jour : ${error.message}`);
  }
};
