const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Lister tous les produits
router.get('/', productController.getAllProducts);

// @route   GET /api/products/:id
// @desc    Récupérer un produit par son ID
router.get('/:id', productController.getProductById);

// @route   POST /api/products
// @desc    Créer un nouveau produit
router.post('/', productController.createProduct);

// @route   PATCH /api/products/:id
// @desc    Mettre à jour un produit (sauf le stockStatus)
router.patch('/:id', productController.updateProduct);

// @route   PATCH /api/products/:id/:status
// @desc    Mettre à jour uniquement le statut du produit
// Ex: PATCH /api/products/123/pas%20en%20stock
router.patch('/:id/:status', productController.updateStockStatus);

// @route   DELETE /api/products/:id
// @desc    Supprimer un produit
router.delete('/:id', productController.deleteProduct);

// Exporter le routeur
module.exports = router;