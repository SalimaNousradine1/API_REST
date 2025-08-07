const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion à MongoDB réussie');
  } catch (err) {
    console.error('❌ Échec de connexion à MongoDB :', err.message);
    process.exit(1); // Arrête le serveur si la base échoue
  }
};

module.exports = connectDB;