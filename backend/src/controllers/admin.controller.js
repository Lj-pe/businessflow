const getAdminData = async (req, res) => {

    res.status(200).json({
        message: 'Admin access granted',
        user: req.user
    });

};

module.exports = {
    getAdminData
};