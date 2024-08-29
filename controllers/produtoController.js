const Produto = require('../models/produtoModel');

const produtoController = {
    // Renderiza o formulário de criação de um novo produto
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Cria um novo produto
    createProduto: (req, res) => {
        const newProduto = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Produto.create(newProduto, (err, produtoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    // Obtém um produto por ID
    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            produto.price = parseFloat(produto.price);
            res.render('produtos/show', { produto });
        });
    },

    // Obtém todos os produtos
    getAllProdutos: (req, res) => {
        Produto.getAll((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Converter preços para números
            produtos.forEach(produto => {
                produto.price = parseFloat(produto.price);
            });
            res.render('produtos/index', { produtos });
        });
    },

    // Renderiza o formulário de edição de um produto
    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    // Atualiza um produto
    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        const updatedProduto = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    // Deleta um produto
    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },
};

module.exports = produtoController;
