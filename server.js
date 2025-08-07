require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes'); // ← Nouvelle ligne

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
app.use('/api/products', productRoutes); // ← Nouvelle ligne

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});