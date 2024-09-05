const Category = require('../models/categoryModel'); // Supondo que você tem um modelo para categorias

const categoryController = {
    // Renderiza o formulário de criação de uma nova categoria
    renderCreateForm: (req, res) => {
        res.render('categories/create'); // Renderiza o formulário de criação de categoria
    },

    // Cria uma nova categoria
    createCategory: (req, res) => {
        const newCategory = {
            name: req.body.name,
        };

        Category.create(newCategory, (err, categoryId) => {
            if (err) {
                console.error('Error creating category:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.redirect('/categories');
        });
    },

    // Obtém uma categoria por ID
    getCategoryById: (req, res) => {
        const categoryId = req.params.id;
        Category.findById(categoryId, (err, category) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.render('categories/show', { category }); // Passa a variável `category` para a view
        });
    },

    // Obtém todas as categorias
    getAllCategories: (req, res) => {
        Category.getAll((err, categories) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.render('categories/index', { categories });
        });
    },

    // Renderiza o formulário de edição de uma categoria
    renderEditForm: (req, res) => {
        const categoryId = req.params.id;

        Category.findById(categoryId, (err, category) => {
            if (err) {
                console.error('Error fetching category for editing:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.render('categories/edit', { category });
        });
    },

    // Atualiza uma categoria
    updateCategory: (req, res) => {
        const categoryId = req.params.id;
        const updatedCategory = {
            name: req.body.name,
        };

        Category.update(categoryId, updatedCategory, (err) => {
            if (err) {
                console.error('Error updating category:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.redirect('/categories');
        });
    },

    // Deleta uma categoria
    deleteCategory: (req, res) => {
        const categoryId = req.params.id;

        Category.delete(categoryId, (err) => {
            if (err) {
                console.error('Error deleting category:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.redirect('/categories');
        });
    },
};

module.exports = categoryController;
