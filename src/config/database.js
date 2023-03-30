import mongoose from 'mongoose';

const connectDB = async () => {
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

export default connectDB;