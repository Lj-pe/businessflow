const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('../src/config/database');

const createTestUser = async () => {
    const email = `test-${crypto.randomUUID()}@businessflow.com`;
    const password = 'Test123!';
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
        `INSERT INTO users
        (role_id, name, email, password_hash)
        VALUES (?, ?, ?, ?)`,
        [1, 'Test User', email, passwordHash]
    );

    return {
        id: result.insertId,
        email,
        password
    };
};

const getTestCategory = async () => {
    const [categories] = await pool.execute(
        `SELECT id
         FROM categories
         ORDER BY id
         LIMIT 1`
    );

    if (categories.length === 0) {
        throw new Error('No categories found');
    }

    return categories[0].id;
};

const getTestProduct = async () => {
    const [products] = await pool.execute(
        `SELECT id, stock
         FROM products
         ORDER BY id
         LIMIT 1`
    );

    if (products.length === 0) {
        throw new Error('No products found');
    }

    return products[0];
};

module.exports = {
    createTestUser,
    getTestCategory,
    getTestProduct
};