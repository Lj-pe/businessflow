const express = require('express');

const productController = require('../controllers/product.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

const router = express.Router();


// Obtener todos los productos - SOLO ADMIN
router.get(
    '/',
    authenticateToken,
    authorizeRole([1]),
    productController.getAllProducts
);


// Obtener producto por ID - SOLO ADMIN
router.get(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    productController.getProductById
);


// Crear producto - SOLO ADMIN
router.post(
    '/',
    authenticateToken,
    authorizeRole([1]),
    productController.createProduct
);


// Actualizar producto - SOLO ADMIN
router.put(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    productController.updateProduct
);


// Eliminar producto - SOLO ADMIN
router.delete(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    productController.deleteProduct
);


module.exports = router;