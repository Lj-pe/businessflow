const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const loginUser = async (email, password) => {

    const [users] = await pool.execute(
        `SELECT id, name, email, password_hash, role_id
         FROM users
         WHERE email = ?`,
        [email]
    );

    if (users.length === 0) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role_id: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};