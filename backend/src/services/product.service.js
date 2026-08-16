const pool = require('../config/database');


const getAllProducts = async () => {

    const [products] = await pool.execute(
        `SELECT
            p.id,
            p.category_id,
            c.name AS category_name,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.status,
            p.created_at,
            p.updated_at
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        ORDER BY p.id DESC`
    );

    return products;
};


const getProductById = async (id) => {

    const [products] = await pool.execute(
        `SELECT
            p.id,
            p.category_id,
            c.name AS category_name,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.status,
            p.created_at,
            p.updated_at
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        WHERE p.id = ?`,
        [id]
    );

    if (products.length === 0) {
        return null;
    }

    return products[0];
};


const createProduct = async (
    category_id,
    name,
    description,
    price,
    stock
) => {

    const [existingCategory] = await pool.execute(
        'SELECT id FROM categories WHERE id = ?',
        [category_id]
    );

    if (existingCategory.length === 0) {
        throw new Error('CATEGORY_NOT_FOUND');
    }


    const [existingProduct] = await pool.execute(
        `SELECT id
         FROM products
         WHERE name = ?`,
        [name]
    );

    if (existingProduct.length > 0) {
        throw new Error('PRODUCT_ALREADY_EXISTS');
    }


    const [result] = await pool.execute(
        `INSERT INTO products
        (
            category_id,
            name,
            description,
            price,
            stock
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            category_id,
            name,
            description || null,
            price,
            stock
        ]
    );


    return {
        id: result.insertId,
        category_id,
        name,
        description: description || null,
        price,
        stock,
        status: 'ACTIVE'
    };
};


const updateProduct = async (
    id,
    category_id,
    name,
    description,
    price,
    stock,
    status
) => {

    const [existingProduct] = await pool.execute(
        'SELECT id FROM products WHERE id = ?',
        [id]
    );

    if (existingProduct.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND');
    }


    const [existingCategory] = await pool.execute(
        'SELECT id FROM categories WHERE id = ?',
        [category_id]
    );

    if (existingCategory.length === 0) {
        throw new Error('CATEGORY_NOT_FOUND');
    }


    const [duplicateProduct] = await pool.execute(
        `SELECT id
         FROM products
         WHERE name = ?
         AND id != ?`,
        [name, id]
    );

    if (duplicateProduct.length > 0) {
        throw new Error('PRODUCT_ALREADY_EXISTS');
    }


    await pool.execute(
        `UPDATE products
         SET category_id = ?,
             name = ?,
             description = ?,
             price = ?,
             stock = ?,
             status = ?
         WHERE id = ?`,
        [
            category_id,
            name,
            description || null,
            price,
            stock,
            status,
            id
        ]
    );


    return {
        id,
        category_id,
        name,
        description: description || null,
        price,
        stock,
        status
    };
};


const deleteProduct = async (id) => {

    const [existingProduct] = await pool.execute(
        'SELECT id FROM products WHERE id = ?',
        [id]
    );

    if (existingProduct.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND');
    }


    await pool.execute(
        'DELETE FROM products WHERE id = ?',
        [id]
    );


    return true;
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};