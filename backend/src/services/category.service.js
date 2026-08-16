const pool = require('../config/database');

const getAllCategories = async () => {

    const [categories] = await pool.execute(
        `SELECT
            id,
            name,
            description,
            status,
            created_at,
            updated_at
        FROM categories
        ORDER BY id DESC`
    );

    return categories;
};


const getCategoryById = async (id) => {

    const [categories] = await pool.execute(
        `SELECT
            id,
            name,
            description,
            status,
            created_at,
            updated_at
        FROM categories
        WHERE id = ?`,
        [id]
    );

    if (categories.length === 0) {
        return null;
    }

    return categories[0];
};


const createCategory = async (name, description) => {

    const [existingCategory] = await pool.execute(
        'SELECT id FROM categories WHERE name = ?',
        [name]
    );

    if (existingCategory.length > 0) {
        throw new Error('CATEGORY_ALREADY_EXISTS');
    }

    const [result] = await pool.execute(
        `INSERT INTO categories
        (name, description)
        VALUES (?, ?)`,
        [name, description || null]
    );

    return {
        id: result.insertId,
        name,
        description: description || null,
        status: 'ACTIVE'
    };
};


const updateCategory = async (id, name, description, status) => {

    const [existingCategory] = await pool.execute(
        'SELECT id FROM categories WHERE id = ?',
        [id]
    );

    if (existingCategory.length === 0) {
        throw new Error('CATEGORY_NOT_FOUND');
    }

    const [duplicateCategory] = await pool.execute(
        `SELECT id
         FROM categories
         WHERE name = ?
         AND id != ?`,
        [name, id]
    );

    if (duplicateCategory.length > 0) {
        throw new Error('CATEGORY_ALREADY_EXISTS');
    }

    await pool.execute(
        `UPDATE categories
         SET name = ?,
             description = ?,
             status = ?
         WHERE id = ?`,
        [
            name,
            description || null,
            status,
            id
        ]
    );

    return {
        id,
        name,
        description: description || null,
        status
    };
};


const deleteCategory = async (id) => {

    const [existingCategory] = await pool.execute(
        'SELECT id FROM categories WHERE id = ?',
        [id]
    );

    if (existingCategory.length === 0) {
        throw new Error('CATEGORY_NOT_FOUND');
    }

    await pool.execute(
        'DELETE FROM categories WHERE id = ?',
        [id]
    );

    return true;
};


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};