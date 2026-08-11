require('dotenv').config();

const express = require('express');
const pool = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());


// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de usuarios
app.use('/api/users', userRoutes);


// Health check
app.get('/api/health', (req, res) => {

    res.json({
        status: 'ok',
        service: 'BusinessFlow API'
    });

});


// Health check de la base de datos
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