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

module.exports = {
    getProfile,
    getAllUsers
};