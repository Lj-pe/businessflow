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


const updateUser = async (id, name, email, role_id) => {

    const [existingUser] = await pool.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
    );

    if (existingUser.length === 0) {
        throw new Error('USER_NOT_FOUND');
    }


    const [existingEmail] = await pool.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, id]
    );

    if (existingEmail.length > 0) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }


    const [existingRole] = await pool.execute(
        'SELECT id FROM roles WHERE id = ?',
        [role_id]
    );

    if (existingRole.length === 0) {
        throw new Error('ROLE_NOT_FOUND');
    }


    await pool.execute(
        `UPDATE users
        SET name = ?, email = ?, role_id = ?
        WHERE id = ?`,
        [name, email, role_id, id]
    );


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


    return users[0];
};


const deleteUser = async (id) => {

    // Verificar que el usuario exista
    const [existingUser] = await pool.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
    );

    if (existingUser.length === 0) {
        throw new Error('USER_NOT_FOUND');
    }


    // Eliminar usuario
    await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
    );


    return true;
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};