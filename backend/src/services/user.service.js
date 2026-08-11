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


const getUserById = async (id) => {

    const [users] = await pool.execute(
        `SELECT 
            id,
            role_id,
            name,
            email
        FROM users
        WHERE id = ?`,
        [id]
    );

    if (users.length === 0) {
        return null;
    }

    return users[0];
};


module.exports = {
    getAllUsers,
    getUserById
};