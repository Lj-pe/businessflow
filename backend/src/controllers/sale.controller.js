const saleService = require('../services/sale.service');


// GET /api/sales
const getAllSales = async (req, res) => {

    try {

        const sales = await saleService.getAllSales();

        res.status(200).json({
            sales
        });

    } catch (error) {

        console.error('Get sales error:', error.message);

        res.status(500).json({
            message: 'Error getting sales'
        });
    }
};


// GET /api/sales/:id
const getSaleById = async (req, res) => {

    try {

        const { id } = req.params;

        const sale = await saleService.getSaleById(id);

        if (!sale) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        res.status(200).json({
            sale
        });

    } catch (error) {

        console.error('Get sale error:', error.message);

        res.status(500).json({
            message: 'Error getting sale'
        });
    }
};


// POST /api/sales
const createSale = async (req, res) => {

    try {

        const { user_id, details } = req.body;


        if (!user_id || !details) {
            return res.status(400).json({
                message: 'User and sale details are required'
            });
        }


        const sale = await saleService.createSale(
            user_id,
            details
        );


        res.status(201).json({
            message: 'Sale created successfully',
            sale
        });

    } catch (error) {

        console.error('Create sale error:', error.message);


        if (error.message === 'USER_NOT_FOUND') {
            return res.status(400).json({
                message: 'User not found'
            });
        }


        if (error.message === 'SALE_DETAILS_REQUIRED') {
            return res.status(400).json({
                message: 'Sale details are required'
            });
        }


        if (error.message === 'INVALID_SALE_DETAIL') {
            return res.status(400).json({
                message: 'Invalid sale detail'
            });
        }


        if (error.message === 'INVALID_QUANTITY') {
            return res.status(400).json({
                message: 'Quantity must be greater than zero'
            });
        }


        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(400).json({
                message: 'Product not found'
            });
        }


        if (error.message === 'PRODUCT_INACTIVE') {
            return res.status(400).json({
                message: 'Product is inactive'
            });
        }


        if (error.message === 'INSUFFICIENT_STOCK') {
            return res.status(400).json({
                message: 'Insufficient stock'
            });
        }


        res.status(500).json({
            message: 'Error creating sale'
        });
    }
};


// DELETE /api/sales/:id
const cancelSale = async (req, res) => {

    try {

        const { id } = req.params;

        await saleService.cancelSale(id);

        res.status(200).json({
            message: 'Sale cancelled successfully'
        });

    } catch (error) {

        console.error('Cancel sale error:', error.message);


        if (error.message === 'SALE_NOT_FOUND') {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }


        if (error.message === 'SALE_ALREADY_CANCELLED') {
            return res.status(400).json({
                message: 'Sale is already cancelled'
            });
        }


        res.status(500).json({
            message: 'Error cancelling sale'
        });
    }
};


module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    cancelSale
};