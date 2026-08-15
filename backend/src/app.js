const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes');

const app = express();

app.use(express.json());


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);


// Health check
app.get('/api/health', (req, res) => {

    res.status(200).json({
        status: 'ok',
        service: 'BusinessFlow API'
    });

});


// Health check de base de datos
app.get('/api/health/db', async (req, res) => {

    try {

        await pool.execute('SELECT 1');

        res.status(200).json({
            status: 'ok',
            database: 'connected'
        });

    } catch (error) {

        console.error(
            'Database connection error:',
            error.message
        );

        res.status(500).json({
            status: 'error',
            database: 'disconnected'
        });

    }

});


module.exports = app;