const express = require('express');

const saleController = require('../controllers/sale.controller');

const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();


// Listar todas las ventas
router.get(
    '/',
    authenticateToken,
    saleController.getAllSales
);


// Obtener una venta por ID
router.get(
    '/:id',
    authenticateToken,
    saleController.getSaleById
);


// Crear una venta
router.post(
    '/',
    authenticateToken,
    saleController.createSale
);


// Cancelar una venta
router.delete(
    '/:id',
    authenticateToken,
    saleController.cancelSale
);


module.exports = router;