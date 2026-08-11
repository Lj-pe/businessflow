const express = require('express');

const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

const router = express.Router();


// Obtener perfil del usuario autenticado
router.get(
    '/profile',
    authenticateToken,
    userController.getProfile
);


// Obtener todos los usuarios - SOLO ADMIN
router.get(
    '/',
    authenticateToken,
    authorizeRole([1]),
    userController.getAllUsers
);


// Obtener un usuario por ID - SOLO ADMIN
router.get(
    '/:id',
    authenticateToken,
    authorizeRole([1]),
    userController.getUserById
);


module.exports = router;