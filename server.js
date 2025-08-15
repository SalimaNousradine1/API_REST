require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'KoudouSoft Product API - Fonctionne !' });
});

// Connexion des routes
app.use('/api/products', productRoutes); 
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});