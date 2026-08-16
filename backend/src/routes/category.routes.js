const express = require('express');

const categoryController = require('../controllers/category.controller');

const { authenticateToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');


const router = express.Router();


// Obtener todas las categorías - SOLO ADMIN
router.get(
    '/',
    authenticateToken,
    authorizeRole([1]),
    categoryController.getAllCategories
);


// Obtener una categoría por ID - SOLO ADMIN
router.get(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    categoryController.getCategoryById
);


// Crear categoría - SOLO ADMIN
router.post(
    '/',
    authenticateToken,
    authorizeRole([1]),
    categoryController.createCategory
);


// Actualizar categoría - SOLO ADMIN
router.put(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    categoryController.updateCategory
);


// Eliminar categoría - SOLO ADMIN
router.delete(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    categoryController.deleteCategory
);


module.exports = router;