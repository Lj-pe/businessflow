const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes');

const app = express();


// Middleware
app.use(express.json());


// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        message: 'BusinessFlow API is running'
    });
});


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);


// 404
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});


// Error handler
app.use((err, req, res, next) => {

    console.error('Server error:', err);

    res.status(500).json({
        message: 'Internal server error'
    });

});


// Export app
module.exports = app;