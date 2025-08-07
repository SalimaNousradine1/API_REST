const mongoose = require('mongoose');

// Les statuts autorisés pour le stock
const stockStatusEnum = ['en stock', 'petite stock', 'pas en stock'];

// Schéma du produit
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Le nom du produit est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit faire au moins 2 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est obligatoire'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  stockStatus: {
    type: String,
    required: [true, 'Le statut en stock est obligatoire'],
    enum: {
      values: stockStatusEnum,
      message: 'Statut invalide. Doit être "en stock", "petite stock" ou "pas en stock"'
    }
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt
});

// Création du modèle
const Product = mongoose.model('Product', productSchema);

module.exports = Product;