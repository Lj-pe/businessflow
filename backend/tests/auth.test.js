const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

        await pool.execute(
            'DELETE FROM users WHERE email = ?',
            [email]
        );

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


describe('GET /api/auth/profile', () => {

    test('should reject access without token', async () => {

        const response = await request(app)
            .get('/api/auth/profile');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');
    });


    test('should reject access with invalid token', async () => {

        const response = await request(app)
            .get('/api/auth/profile')
            .set('Authorization', 'Bearer token-invalido');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Invalid or expired token');
    });


    test('should allow access with valid token', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'test@example.com',
                role_id: 2
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Access granted');

        expect(response.body.user.email)
            .toBe('test@example.com');
    });

});


describe('GET /api/auth/admin', () => {

    test('should reject access without token', async () => {

        const response = await request(app)
            .get('/api/auth/admin');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');
    });


    test('should reject access for non-admin user', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'employee@example.com',
                role_id: 2
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/auth/admin')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');
    });


    test('should allow access for admin user', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'admin@example.com',
                role_id: 1
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/auth/admin')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Admin access granted');

        expect(response.body.user.role_id)
            .toBe(1);
    });

});


describe('GET /api/users', () => {

    test('should reject access without token', async () => {

        const response = await request(app)
            .get('/api/users');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');
    });


    test('should reject access for non-admin user', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'employee@example.com',
                role_id: 2
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');
    });


    test('should allow admin to get all users', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'admin@example.com',
                role_id: 1
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.users)
            .toBeDefined();

        expect(Array.isArray(response.body.users))
            .toBe(true);
    });

});


describe('GET /api/users/:id', () => {

    test('should reject access without token', async () => {

        const response = await request(app)
            .get('/api/users/1');

        expect(response.statusCode).toBe(401);

        expect(response.body.message)
            .toBe('Access token required');
    });


    test('should reject access for non-admin user', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'employee@example.com',
                role_id: 2
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

        expect(response.body.message)
            .toBe('Access denied');
    });


    test('should return 404 when user does not exist', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'admin@example.com',
                role_id: 1
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/users/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('User not found');
    });


    test('should allow admin to get user by id', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'admin@example.com',
                role_id: 1
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const response = await request(app)
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.user)
            .toBeDefined();

        expect(response.body.user.id)
            .toBe(1);

        expect(response.body.user.email)
            .toBeDefined();
    });

});


afterAll(async () => {
    await pool.end();
});