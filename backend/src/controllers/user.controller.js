const getProfile = async (req, res) => {

    res.status(200).json({
        message: 'Access granted',
        user: req.user
    });

};

module.exports = {
    getProfile
};