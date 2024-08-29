const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

// Rota para obter todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para renderizar o formulário de criação de um novo produto
router.get('/new', produtoController.renderCreateForm);

// Rota para criar um novo produto
router.post('/', produtoController.createProduto);

// Rota para obter um produto específico por ID
router.get('/:id', produtoController.getProdutoById);

// Rota para renderizar o formulário de edição de um produto existente
router.get('/:id/edit', produtoController.renderEditForm);

// Rota para atualizar um produto existente
router.put('/:id', produtoController.updateProduto);

// Rota para deletar um produto
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
