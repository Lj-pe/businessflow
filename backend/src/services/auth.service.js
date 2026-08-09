const bcrypt = require('bcrypt');
const pool = require('../config/database');

const registerUser = async (name, email, password, role_id) => {

    const [existingUser] = await pool.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
    );

    if (existingUser.length > 0) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }

    const [existingRole] = await pool.execute(
        'SELECT id FROM roles WHERE id = ?',
        [role_id]
    );

    if (existingRole.length === 0) {
        throw new Error('ROLE_NOT_FOUND');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
        `INSERT INTO users 
        (role_id, name, email, password_hash)
        VALUES (?, ?, ?, ?)`,
        [role_id, name, email, passwordHash]
    );

    return {
        id: result.insertId,
        name,
        email,
        role_id
    };
};

module.exports = {
    registerUser
};