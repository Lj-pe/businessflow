const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');

const {
    createTestUser,
    getTestCategory
} = require('./test-data');

describe('Product API', () => {

    let token;
    let categoryId;

    beforeAll(async () => {

        const testUser = await createTestUser();

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(loginResponse.statusCode).toBe(200);

        token = loginResponse.body.token;

        categoryId = await getTestCategory();

    });

    test('GET /api/products - should return all products', async () => {

        const response = await request(app)
            .get('/api/products')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
    });

    test('GET /api/products/:id - should return a product', async () => {

        const [products] = await pool.execute(
            `SELECT id
             FROM products
             ORDER BY id
             LIMIT 1`
        );

        expect(products.length).toBeGreaterThan(0);

        const productId = products[0].id;

        const response = await request(app)
            .get(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('product');
    });

    test('GET /api/products/:id - should return 404 when product does not exist', async () => {

        const response = await request(app)
            .get('/api/products/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    test('POST /api/products - should create a product', async () => {

        const uniqueName = `Test Product ${Date.now()}`;

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category_id: categoryId,
                name: uniqueName,
                description: 'Producto creado mediante prueba',
                price: 5.50,
                stock: 10
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Product created successfully');
        expect(response.body).toHaveProperty('product');
    });

    test('POST /api/products - should reject invalid category', async () => {

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category_id: 99999,
                name: `Invalid Category Product ${Date.now()}`,
                description: 'Producto de prueba',
                price: 5.50,
                stock: 10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Category not found');
    });

    test('POST /api/products - should reject negative price', async () => {

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category_id: categoryId,
                name: `Negative Price ${Date.now()}`,
                description: 'Producto de prueba',
                price: -5,
                stock: 10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Price cannot be negative');
    });

    test('POST /api/products - should reject negative stock', async () => {

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category_id: categoryId,
                name: `Negative Stock ${Date.now()}`,
                description: 'Producto de prueba',
                price: 5.50,
                stock: -10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Stock cannot be negative');
    });

    test('PUT /api/products/:id - should return 404 when product does not exist', async () => {

        const response = await request(app)
            .put('/api/products/99999')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category_id: categoryId,
                name: 'Producto inexistente',
                description: 'Prueba',
                price: 5.50,
                stock: 10,
                status: 'ACTIVE'
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    test('DELETE /api/products/:id - should return 404 when product does not exist', async () => {

        const response = await request(app)
            .delete('/api/products/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    test('GET /api/products - should reject unauthenticated request', async () => {

        const response = await request(app)
            .get('/api/products');

        expect(response.statusCode).toBe(401);
    });

});