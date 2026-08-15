const pool = require('../config/database');

const getAllSales = async () => {

    const [sales] = await pool.execute(
        `SELECT
            s.id,
            s.user_id,
            u.name AS user_name,
            s.total,
            s.status,
            s.created_at,
            s.updated_at
        FROM sales s
        INNER JOIN users u
            ON s.user_id = u.id
        ORDER BY s.id DESC`
    );

    return sales;
};


const getSaleById = async (id) => {

    const [sales] = await pool.execute(
        `SELECT
            s.id,
            s.user_id,
            u.name AS user_name,
            s.total,
            s.status,
            s.created_at,
            s.updated_at
        FROM sales s
        INNER JOIN users u
            ON s.user_id = u.id
        WHERE s.id = ?`,
        [id]
    );

    if (sales.length === 0) {
        return null;
    }

    const sale = sales[0];

    const [details] = await pool.execute(
        `SELECT
            sd.id,
            sd.sale_id,
            sd.product_id,
            p.name AS product_name,
            sd.quantity,
            sd.unit_price,
            sd.subtotal
        FROM sale_details sd
        INNER JOIN products p
            ON sd.product_id = p.id
        WHERE sd.sale_id = ?
        ORDER BY sd.id ASC`,
        [id]
    );

    return {
        ...sale,
        details
    };
};


const createSale = async (user_id, details) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();


        const [existingUser] = await connection.execute(
            'SELECT id FROM users WHERE id = ? AND status = "ACTIVE"',
            [user_id]
        );

        if (existingUser.length === 0) {
            throw new Error('USER_NOT_FOUND');
        }


        if (!details || details.length === 0) {
            throw new Error('SALE_DETAILS_REQUIRED');
        }


        let total = 0;

        const saleDetails = [];


        for (const detail of details) {

            const {
                product_id,
                quantity
            } = detail;


            // Validar que los campos existan
            if (
                !product_id ||
                quantity === undefined ||
                quantity === null
            ) {
                throw new Error('INVALID_SALE_DETAIL');
            }


            // Validar que la cantidad sea mayor que cero
            if (quantity <= 0) {
                throw new Error('INVALID_QUANTITY');
            }


            const [products] = await connection.execute(
                `SELECT
                    id,
                    name,
                    price,
                    stock,
                    status
                FROM products
                WHERE id = ?`,
                [product_id]
            );


            if (products.length === 0) {
                throw new Error('PRODUCT_NOT_FOUND');
            }


            const product = products[0];


            if (product.status !== 'ACTIVE') {
                throw new Error('PRODUCT_INACTIVE');
            }


            if (product.stock < quantity) {
                throw new Error('INSUFFICIENT_STOCK');
            }


            const subtotal =
                Number(product.price) * Number(quantity);

            total += subtotal;


            saleDetails.push({
                product_id,
                quantity,
                unit_price: product.price,
                subtotal
            });

        }


        const [saleResult] = await connection.execute(
            `INSERT INTO sales
            (
                user_id,
                total,
                status
            )
            VALUES (?, ?, 'COMPLETED')`,
            [
                user_id,
                total
            ]
        );


        const saleId = saleResult.insertId;


        for (const detail of saleDetails) {

            await connection.execute(
                `INSERT INTO sale_details
                (
                    sale_id,
                    product_id,
                    quantity,
                    unit_price,
                    subtotal
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    saleId,
                    detail.product_id,
                    detail.quantity,
                    detail.unit_price,
                    detail.subtotal
                ]
            );


            await connection.execute(
                `UPDATE products
                 SET stock = stock - ?
                 WHERE id = ?`,
                [
                    detail.quantity,
                    detail.product_id
                ]
            );

        }


        await connection.commit();


        return {
            id: saleId,
            user_id,
            total,
            status: 'COMPLETED',
            details: saleDetails
        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();
    }

};


const cancelSale = async (id) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();


        const [sales] = await connection.execute(
            `SELECT
                id,
                status
             FROM sales
             WHERE id = ?`,
            [id]
        );


        if (sales.length === 0) {
            throw new Error('SALE_NOT_FOUND');
        }


        if (sales[0].status === 'CANCELLED') {
            throw new Error('SALE_ALREADY_CANCELLED');
        }


        const [details] = await connection.execute(
            `SELECT
                product_id,
                quantity
             FROM sale_details
             WHERE sale_id = ?`,
            [id]
        );


        for (const detail of details) {

            await connection.execute(
                `UPDATE products
                 SET stock = stock + ?
                 WHERE id = ?`,
                [
                    detail.quantity,
                    detail.product_id
                ]
            );

        }


        await connection.execute(
            `UPDATE sales
             SET status = 'CANCELLED'
             WHERE id = ?`,
            [id]
        );


        await connection.commit();


        return true;

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();
    }

};


module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    cancelSale
};