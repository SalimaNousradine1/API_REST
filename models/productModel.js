const mongoose = require('mongoose');

// Schéma du produit
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    
  },
  stockStatus: {
    type: String,
    required: true,
    enum: ['en stock', 'petite stock', 'pas en stock']
  }
}, {
  timestamps: true 
});

// Création du modèle
const Product = mongoose.model('Product', productSchema);

module.exports = Product;