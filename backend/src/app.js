require('dotenv').config();
const express = require('express');
const pool = require('./config/database');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'BusinessFlow API'
    });
});

app.get('/api/health/db', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        connection.release();

        res.json({
            status: 'ok',
            database: 'connected'
        });
    } catch (error) {
        console.error('Database connection error:', error.message);

        res.status(500).json({
            status: 'error',
            database: 'disconnected'
        });
    }
});

module.exports = app;