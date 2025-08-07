// Importer le modèle Product
const Product = require('../models/productModel');

/**
 * @desc    Récupérer tous les produits
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des produits'
    });
  }
};

/**
 * @desc    Récupérer un produit par son ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID invalide'
      });
    }
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

/**
 * @desc    Créer un nouveau produit
 * @route   POST /api/products
 * @access  Public
 */
exports.createProduct = async (req, res) => {
  try {
    const { productName, price, stockStatus } = req.body;

    const product = await Product.create({
      productName,
      price,
      stockStatus
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du produit'
    });
  }
};

/**
 * @desc    Mettre à jour un produit (sauf le stockStatus)
 * @route   PATCH /api/products/:id
 * @access  Public
 */
exports.updateProduct = async (req, res) => {
  try {
    // On exclut le champ stockStatus de cette mise à jour
    const updates = { ...req.body };
    delete updates.stockStatus;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour'
    });
  }
};

/**
 * @desc    Mettre à jour uniquement le statut du produit
 * @route   PATCH /api/products/:id/:status
 * @access  Public
 */
exports.updateStockStatus = async (req, res) => {
  const { id, status } = req.params;

  // Vérifier que le statut est valide
  const validStatus = ['en stock', 'petite stock', 'pas en stock'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Statut invalide. Doit être "en stock", "petite stock" ou "pas en stock"'
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { stockStatus: status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du statut'
    });
  }
};

/**
 * @desc    Supprimer un produit
 * @route   DELETE /api/products/:id
 * @access  Public
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression'
    });
  }
};