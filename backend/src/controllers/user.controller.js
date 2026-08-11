const userService = require('../services/user.service');
const authService = require('../services/auth.service');


const getProfile = async (req, res) => {

    res.status(200).json({
        message: 'Access granted',
        user: req.user
    });

};


const getAllUsers = async (req, res) => {

    try {

        const users = await userService.getAllUsers();

        res.status(200).json({
            users
        });

    } catch (error) {

        console.error('Get users error:', error.message);

        res.status(500).json({
            message: 'Error retrieving users'
        });
    }

};


const getUserById = async (req, res) => {

    try {

        const user = await userService.getUserById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        res.status(200).json({
            user
        });

    } catch (error) {

        console.error('Get user error:', error.message);

        res.status(500).json({
            message: 'Error retrieving user'
        });
    }

};


const createUser = async (req, res) => {

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
            message: 'User created successfully',
            user
        });

    } catch (error) {

        console.error('Create user error:', error.message);


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
            message: 'Error creating user'
        });
    }

};


const updateUser = async (req, res) => {

    try {

        const { name, email, role_id } = req.body;
        const { id } = req.params;


        if (!name || !email || !role_id) {

            return res.status(400).json({
                message: 'All fields are required'
            });

        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                message: 'Invalid email format'
            });

        }


        const user = await userService.updateUser(
            id,
            name,
            email,
            role_id
        );


        res.status(200).json({
            message: 'User updated successfully',
            user
        });

    } catch (error) {

        console.error('Update user error:', error.message);


        if (error.message === 'USER_NOT_FOUND') {

            return res.status(404).json({
                message: 'User not found'
            });

        }


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
            message: 'Error updating user'
        });
    }

};


const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await userService.deleteUser(id);

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {

        console.error('Delete user error:', error.message);


        if (error.message === 'USER_NOT_FOUND') {

            return res.status(404).json({
                message: 'User not found'
            });

        }


        res.status(500).json({
            message: 'Error deleting user'
        });
    }

};


module.exports = {
    getProfile,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};