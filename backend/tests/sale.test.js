const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');

const {
    createTestUser,
    getTestProduct
} = require('./test-data');

describe('Sale API', () => {

    let token;
    let saleId;
    let productId;
    let userId;
    let initialStock;

    beforeAll(async () => {

        const testUser = await createTestUser();

        userId = testUser.id;

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(loginResponse.statusCode).toBe(200);

        token = loginResponse.body.token;

        const product = await getTestProduct();

        productId = product.id;

        initialStock = product.stock;
    });

    test('GET /api/sales - should return all sales', async () => {

        const response = await request(app)
            .get('/api/sales')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('sales');

        expect(Array.isArray(response.body.sales)).toBe(true);
    });

    test('GET /api/sales/:id - should return 404 when sale does not exist', async () => {

        const response = await request(app)
            .get('/api/sales/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message).toBe('Sale not found');
    });

    test('POST /api/sales - should reject missing sale details', async () => {

        const response = await request(app)
            .post('/api/sales')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: userId
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('User and sale details are required');
    });

    test('POST /api/sales - should reject invalid user', async () => {

        const response = await request(app)
            .post('/api/sales')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: 99999,
                details: [
                    {
                        product_id: productId,
                        quantity: 1
                    }
                ]
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('User not found');
    });

    test('POST /api/sales - should reject invalid product', async () => {

        const response = await request(app)
            .post('/api/sales')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: userId,
                details: [
                    {
                        product_id: 99999,
                        quantity: 1
                    }
                ]
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Product not found');
    });

    test('POST /api/sales - should reject invalid quantity', async () => {

        const response = await request(app)
            .post('/api/sales')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: userId,
                details: [
                    {
                        product_id: productId,
                        quantity: 0
                    }
                ]
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Quantity must be greater than zero');
    });

    test('POST /api/sales - should create sale successfully', async () => {

        const response = await request(app)
            .post('/api/sales')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: userId,
                details: [
                    {
                        product_id: productId,
                        quantity: 1
                    }
                ]
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.message)
            .toBe('Sale created successfully');

        expect(response.body).toHaveProperty('sale');

        expect(response.body.sale).toHaveProperty('id');

        expect(response.body.sale.status)
            .toBe('COMPLETED');

        expect(response.body.sale.total)
            .toBeDefined();

        saleId = response.body.sale.id;

        const [updatedProducts] = await pool.execute(
            `SELECT stock
             FROM products
             WHERE id = ?`,
            [productId]
        );

        expect(updatedProducts[0].stock)
            .toBe(initialStock - 1);
    });

    test('GET /api/sales/:id - should return the created sale', async () => {

        const response = await request(app)
            .get(`/api/sales/${saleId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('sale');

        expect(response.body.sale.id)
            .toBe(saleId);

        expect(response.body.sale.details)
            .toBeDefined();

        expect(Array.isArray(response.body.sale.details))
            .toBe(true);
    });

    test('DELETE /api/sales/:id - should cancel the sale', async () => {

        const response = await request(app)
            .delete(`/api/sales/${saleId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Sale cancelled successfully');
    });

    test('DELETE /api/sales/:id - should return 404 when sale does not exist', async () => {

        const response = await request(app)
            .delete('/api/sales/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('Sale not found');
    });

    test('GET /api/sales - should reject unauthenticated request', async () => {

        const response = await request(app)
            .get('/api/sales');

        expect(response.statusCode).toBe(401);
    });

});