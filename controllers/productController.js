const Product = require('../models/productModel');
const Category = require('../models/categoryModel'); // Supondo que você tem um modelo para categorias

const productController = {
    // Renderiza o formulário de criação de um novo produto com categorias
    renderCreateForm: (req, res) => {
        Category.getAll((err, categories) => { // Obtenha todas as categorias
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('products/create', { categories }); // Passe as categorias para o template
        });
    },

    // Cria um novo produto
    createProduct: (req, res) => {
        const newProduct = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Product.create(newProduct, (err, productId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    // Obtém um produto por ID
    getProductById: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            product.price = parseFloat(product.price);
            res.render('products/show', { product });
        });
    },

    // Obtém todos os produtos
    getAllProducts: (req, res) => {
        Product.getAll((err, products) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Converter o preço para número antes de renderizar
            products.forEach(product => {
                product.price = parseFloat(product.price);
            });
            res.render('products/index', { products });
        });
    },

    // Renderiza o formulário de edição de um produto
    renderEditForm: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            Category.getAll((err, categories) => { // Obtenha todas as categorias para a edição
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('products/edit', { product, categories }); // Passe o produto e as categorias para o template
            });
        });
    },

    // Atualiza um produto
    updateProduct: (req, res) => {
        const productId = req.params.id;
        const updatedProduct = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Product.update(productId, updatedProduct, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    // Deleta um produto
    deleteProduct: (req, res) => {
        const productId = req.params.id;

        Product.delete(productId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },
};

module.exports = productController;
