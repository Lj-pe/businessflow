const categoryService = require('../services/category.service');


const getAllCategories = async (req, res) => {

    try {

        const categories = await categoryService.getAllCategories();

        res.status(200).json({
            categories
        });

    } catch (error) {

        console.error('Get categories error:', error.message);

        res.status(500).json({
            message: 'Error retrieving categories'
        });
    }
};


const getCategoryById = async (req, res) => {

    try {

        const category = await categoryService.getCategoryById(
            req.params.id
        );

        if (!category) {

            return res.status(404).json({
                message: 'Category not found'
            });
        }

        res.status(200).json({
            category
        });

    } catch (error) {

        console.error('Get category error:', error.message);

        res.status(500).json({
            message: 'Error retrieving category'
        });
    }
};


const createCategory = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name) {

            return res.status(400).json({
                message: 'Category name is required'
            });
        }

        const category = await categoryService.createCategory(
            name,
            description
        );

        res.status(201).json({
            message: 'Category created successfully',
            category
        });

    } catch (error) {

        console.error('Create category error:', error.message);

        if (error.message === 'CATEGORY_ALREADY_EXISTS') {

            return res.status(409).json({
                message: 'Category already exists'
            });
        }

        res.status(500).json({
            message: 'Error creating category'
        });
    }
};


const updateCategory = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        if (!name || !status) {

            return res.status(400).json({
                message: 'Name and status are required'
            });
        }

        if (status !== 'ACTIVE' && status !== 'INACTIVE') {

            return res.status(400).json({
                message: 'Invalid category status'
            });
        }

        const category = await categoryService.updateCategory(
            req.params.id,
            name,
            description,
            status
        );

        res.status(200).json({
            message: 'Category updated successfully',
            category
        });

    } catch (error) {

        console.error('Update category error:', error.message);

        if (error.message === 'CATEGORY_NOT_FOUND') {

            return res.status(404).json({
                message: 'Category not found'
            });
        }

        if (error.message === 'CATEGORY_ALREADY_EXISTS') {

            return res.status(409).json({
                message: 'Category already exists'
            });
        }

        res.status(500).json({
            message: 'Error updating category'
        });
    }
};


const deleteCategory = async (req, res) => {

    try {

        await categoryService.deleteCategory(
            req.params.id
        );

        res.status(200).json({
            message: 'Category deleted successfully'
        });

    } catch (error) {

        console.error('Delete category error:', error.message);

        if (error.message === 'CATEGORY_NOT_FOUND') {

            return res.status(404).json({
                message: 'Category not found'
            });
        }

        res.status(500).json({
            message: 'Error deleting category'
        });
    }
};


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};