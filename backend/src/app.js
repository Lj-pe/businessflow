const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes');

const app = express();

// CORS
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);

// Middleware
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'BusinessFlow API'
    });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Server error:', err);

    res.status(500).json({
        message: 'Internal server error'
    });
});

module.exports = app;