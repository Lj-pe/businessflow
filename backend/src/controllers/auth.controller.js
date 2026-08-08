const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {

        const { name, email, password, role_id } = req.body;

        if (!name || !email || !password || !role_id) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must contain at least 6 characters'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        const user = await authService.registerUser(
            name,
            email,
            password,
            role_id
        );

        res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (error) {

        console.error('Register error:', error.message);

        if (error.message === 'EMAIL_ALREADY_EXISTS') {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        if (error.message === 'ROLE_NOT_FOUND') {
            return res.status(400).json({
                message: 'Role does not exist'
            });
        }

        res.status(500).json({
            message: 'Error registering user'
        });
    }
};

module.exports = {
    register
};