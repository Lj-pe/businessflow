const pool = require('../config/database');

const getAllUsers = async () => {

    const [users] = await pool.execute(
        `SELECT 
            id,
            role_id,
            name,
            email
        FROM users
        ORDER BY id DESC`
    );

    return users;
};

module.exports = {
    getAllUsers
};