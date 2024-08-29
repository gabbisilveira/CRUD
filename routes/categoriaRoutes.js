const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

// Rota para obter todas as categorias
router.get('/', categoriaController.getAllCategorias);

// Rota para renderizar o formulário de criação de uma nova categoria
router.get('/new', categoriaController.renderCreateForm);

// Rota para criar uma nova categoria
router.post('/', categoriaController.createCategoria);

// Rota para obter uma categoria específica por ID
router.get('/:id', categoriaController.getCategoriaById);

// Rota para renderizar o formulário de edição de uma categoria existente
router.get('/:id/edit', categoriaController.renderEditForm);

// Rota para atualizar uma categoria existente
router.put('/:id', categoriaController.updateCategoria);

// Rota para deletar uma categoria
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
