const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');
const bcrypt = require('bcrypt');

describe('POST /api/auth/register', () => {

    test('should reject registration with missing fields', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User'
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('All fields are required');
    });


    test('should reject password shorter than 6 characters', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test-short@example.com',
                password: '123',
                role_id: 2
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Password must contain at least 6 characters');
    });


    test('should reject invalid email format', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'email-invalido',
                password: '123456',
                role_id: 2
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Invalid email format');
    });


    test('should reject non-existent role', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test-role@example.com',
                password: '123456',
                role_id: 999
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Role does not exist');
    });

});


describe('POST /api/auth/login', () => {

    test('should reject login with missing fields', async () => {

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com'
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Email and password are required');
    });


    test('should reject login with non-existent user', async () => {

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'user-does-not-exist@example.com',
                password: '123456'
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Invalid email or password');
    });


    test('should reject login with incorrect password', async () => {

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrong-password'
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Invalid email or password');
    });


    test('should login successfully with valid credentials', async () => {

        const email = 'login-test@example.com';
        const password = '123456';

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await pool.execute(
            `INSERT INTO users
            (role_id, name, email, password_hash)
            VALUES (?, ?, ?, ?)`,
            [2, 'Login Test User', email, passwordHash]
        );

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Login successful');

        expect(response.body.token)
            .toBeDefined();

        expect(response.body.user.email)
            .toBe(email);

        await pool.execute(
            'DELETE FROM users WHERE id = ?',
            [result.insertId]
        );
    });

});


afterAll(async () => {
    await pool.end();
});