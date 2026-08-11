const userService = require('../services/user.service');


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


module.exports = {
    getProfile,
    getAllUsers,
    getUserById
};