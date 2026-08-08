const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');

describe('POST /api/auth/register', () => {

    test('should reject registration with missing fields', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User'
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('All fields are required');
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