const express = require('express');

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const adminController = require('../controllers/admin.controller');

const { authenticateToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get(
    '/profile',
    authenticateToken,
    userController.getProfile
);

router.get(
    '/admin',
    authenticateToken,
    authorizeRole([1]),
    adminController.getAdminData
);

module.exports = router;