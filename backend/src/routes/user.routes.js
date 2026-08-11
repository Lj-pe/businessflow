const express = require('express');

const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

const router = express.Router();

router.get(
    '/profile',
    authenticateToken,
    userController.getProfile
);

router.get(
    '/',
    authenticateToken,
    authorizeRole([1]),
    userController.getAllUsers
);

module.exports = router;