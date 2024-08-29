const Categoria = require('../models/categoriaModel');

const categoriaController = {
    // Renderiza o formulário de criação de uma nova categoria
    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    // Cria uma nova categoria
    createCategoria: (req, res) => {
        const newCategoria = {
            name: req.body.name
        };

        Categoria.create(newCategoria, (err, categoriaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    },

    // Obtém uma categoria por ID
    getCategoriaById: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.findById(categoriaId, (err, categoria) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/show', { categoria });
        });
    },

    // Obtém todas as categorias
    getAllCategorias: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('categorias/index', { categorias });
        });
    },

    // Renderiza o formulário de edição de uma categoria existente
    renderEditForm: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.findById(categoriaId, (err, categoria) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/edit', { categoria });
        });
    },

    // Atualiza uma categoria existente
    updateCategoria: (req, res) => {
        const categoriaId = req.params.id;
        const updatedCategoria = {
            name: req.body.name
        };

        Categoria.update(categoriaId, updatedCategoria, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    },

    // Deleta uma categoria
    deleteCategoria: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.delete(categoriaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    },
};

module.exports = categoriaController;
