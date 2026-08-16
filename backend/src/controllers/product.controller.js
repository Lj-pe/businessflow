const productService = require('../services/product.service');


const getAllProducts = async (req, res) => {

    try {

        const products = await productService.getAllProducts();

        res.status(200).json({
            products
        });

    } catch (error) {

        console.error('Get products error:', error.message);

        res.status(500).json({
            message: 'Error retrieving products'
        });
    }
};


const getProductById = async (req, res) => {

    try {

        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {

        console.error('Get product error:', error.message);

        res.status(500).json({
            message: 'Error retrieving product'
        });
    }
};


const createProduct = async (req, res) => {

    try {

        const {
            category_id,
            name,
            description,
            price,
            stock
        } = req.body;


        if (
            !category_id ||
            !name ||
            price === undefined ||
            stock === undefined
        ) {

            return res.status(400).json({
                message: 'Category, name, price and stock are required'
            });
        }


        if (price < 0) {

            return res.status(400).json({
                message: 'Price cannot be negative'
            });
        }


        if (stock < 0) {

            return res.status(400).json({
                message: 'Stock cannot be negative'
            });
        }


        const product = await productService.createProduct(
            category_id,
            name,
            description,
            price,
            stock
        );


        res.status(201).json({
            message: 'Product created successfully',
            product
        });

    } catch (error) {

        console.error('Create product error:', error.message);


        if (error.message === 'CATEGORY_NOT_FOUND') {

            return res.status(400).json({
                message: 'Category not found'
            });
        }


        if (error.message === 'PRODUCT_ALREADY_EXISTS') {

            return res.status(409).json({
                message: 'Product already exists'
            });
        }


        res.status(500).json({
            message: 'Error creating product'
        });
    }
};


const updateProduct = async (req, res) => {

    try {

        const {
            category_id,
            name,
            description,
            price,
            stock,
            status
        } = req.body;


        if (
            !category_id ||
            !name ||
            price === undefined ||
            stock === undefined ||
            !status
        ) {

            return res.status(400).json({
                message: 'Category, name, price, stock and status are required'
            });
        }


        if (price < 0) {

            return res.status(400).json({
                message: 'Price cannot be negative'
            });
        }


        if (stock < 0) {

            return res.status(400).json({
                message: 'Stock cannot be negative'
            });
        }


        if (
            status !== 'ACTIVE' &&
            status !== 'INACTIVE'
        ) {

            return res.status(400).json({
                message: 'Invalid product status'
            });
        }


        const product = await productService.updateProduct(
            req.params.id,
            category_id,
            name,
            description,
            price,
            stock,
            status
        );


        res.status(200).json({
            message: 'Product updated successfully',
            product
        });

    } catch (error) {

        console.error('Update product error:', error.message);


        if (error.message === 'PRODUCT_NOT_FOUND') {

            return res.status(404).json({
                message: 'Product not found'
            });
        }


        if (error.message === 'CATEGORY_NOT_FOUND') {

            return res.status(400).json({
                message: 'Category not found'
            });
        }


        if (error.message === 'PRODUCT_ALREADY_EXISTS') {

            return res.status(409).json({
                message: 'Product already exists'
            });
        }


        res.status(500).json({
            message: 'Error updating product'
        });
    }
};


const deleteProduct = async (req, res) => {

    try {

        await productService.deleteProduct(
            req.params.id
        );


        res.status(200).json({
            message: 'Product deleted successfully'
        });

    } catch (error) {

        console.error('Delete product error:', error.message);


        if (error.message === 'PRODUCT_NOT_FOUND') {

            return res.status(404).json({
                message: 'Product not found'
            });
        }


        res.status(500).json({
            message: 'Error deleting product'
        });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};