const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');
const jwt = require('jsonwebtoken');


const createToken = (role_id) => {

    return jwt.sign(
        {
            id: 1,
            email: 'test@example.com',
            role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

};


describe('GET /api/categories', () => {

    test('should reject access without token', async () => {

        const response = await request(app)
            .get('/api/categories');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');

    });


    test('should reject access for non-admin user', async () => {

        const token = createToken(2);

        const response = await request(app)
            .get('/api/categories')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');

    });


    test('should allow admin to get all categories', async () => {

        const token = createToken(1);

        const response = await request(app)
            .get('/api/categories')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.categories)
            .toBeDefined();

        expect(Array.isArray(response.body.categories))
            .toBe(true);

    });

});


describe('GET /api/categories/:id', () => {

    test('should allow admin to get category by id', async () => {

        const token = createToken(1);

        const response = await request(app)
            .get('/api/categories/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.category)
            .toBeDefined();

        expect(response.body.category.id)
            .toBe(1);

    });


    test('should return 404 when category does not exist', async () => {

        const token = createToken(1);

        const response = await request(app)
            .get('/api/categories/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('Category not found');

    });

});


describe('POST /api/categories', () => {

    const testCategoryName = 'Categoría Test BusinessFlow';


    afterEach(async () => {

        await pool.execute(
            'DELETE FROM categories WHERE name = ?',
            [testCategoryName]
        );

    });


    test('should reject category creation without token', async () => {

        const response = await request(app)
            .post('/api/categories')
            .send({
                name: testCategoryName
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');

    });


    test('should reject category creation for non-admin user', async () => {

        const token = createToken(2);

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: testCategoryName
            });

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');

    });


    test('should reject category creation without name', async () => {

        const token = createToken(1);

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: 'Category without name'
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Category name is required');

    });


    test('should create category successfully', async () => {

        const token = createToken(1);

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: testCategoryName,
                description: 'Category created during testing'
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.message)
            .toBe('Category created successfully');

        expect(response.body.category)
            .toBeDefined();

        expect(response.body.category.name)
            .toBe(testCategoryName);

    });


    test('should reject duplicate category', async () => {

        const token = createToken(1);

        await pool.execute(
            `INSERT INTO categories
            (name, description)
            VALUES (?, ?)`,
            [
                testCategoryName,
                'Existing category'
            ]
        );

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: testCategoryName,
                description: 'Duplicate category'
            });

        expect(response.statusCode).toBe(409);

        expect(response.body.message)
            .toBe('Category already exists');

    });

});


describe('PUT /api/categories/:id', () => {

    let categoryId;

    beforeEach(async () => {

        const [result] = await pool.execute(
            `INSERT INTO categories
            (name, description)
            VALUES (?, ?)`,
            [
                'Category Update Test',
                'Category for update testing'
            ]
        );

        categoryId = result.insertId;

    });


    afterEach(async () => {

        await pool.execute(
            'DELETE FROM categories WHERE id = ?',
            [categoryId]
        );

    });


    test('should update category successfully', async () => {

        const token = createToken(1);

        const response = await request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Category',
                description: 'Updated description',
                status: 'ACTIVE'
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Category updated successfully');

        expect(response.body.category.name)
            .toBe('Updated Category');

        expect(response.body.category.status)
            .toBe('ACTIVE');

    });


    test('should reject update when category does not exist', async () => {

        const token = createToken(1);

        const response = await request(app)
            .put('/api/categories/9999')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Category',
                description: 'Updated description',
                status: 'ACTIVE'
            });

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('Category not found');

    });


    test('should reject update with invalid status', async () => {

        const token = createToken(1);

        const response = await request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Category',
                description: 'Updated description',
                status: 'INVALID'
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Invalid category status');

    });

});


describe('DELETE /api/categories/:id', () => {

    let categoryId;

    beforeEach(async () => {

        const [result] = await pool.execute(
            `INSERT INTO categories
            (name, description)
            VALUES (?, ?)`,
            [
                'Category Delete Test',
                'Category for delete testing'
            ]
        );

        categoryId = result.insertId;

    });


    afterEach(async () => {

        await pool.execute(
            'DELETE FROM categories WHERE id = ?',
            [categoryId]
        );

    });


    test('should reject delete without token', async () => {

        const response = await request(app)
            .delete(`/api/categories/${categoryId}`);

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');

    });


    test('should reject delete for non-admin user', async () => {

        const token = createToken(2);

        const response = await request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');

    });


    test('should delete category successfully', async () => {

        const token = createToken(1);

        const response = await request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Category deleted successfully');

    });


    test('should return 404 when deleting non-existent category', async () => {

        const token = createToken(1);

        const response = await request(app)
            .delete('/api/categories/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('Category not found');

    });

});


afterAll(async () => {

    await pool.end();

});