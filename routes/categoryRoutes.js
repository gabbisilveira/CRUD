// routes/categoryRoutes.js

const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Rota para obter todas as categorias
router.get('/', categoryController.getAllCategories);

// Rota para renderizar o formulário de criação de uma nova categoria
router.get('/new', categoryController.renderCreateForm);

// Rota para criar uma nova categoria
router.post('/', categoryController.createCategory);

// Rota para obter uma categoria específica por ID
router.get('/:id', categoryController.getCategoryById);

// Rota para renderizar o formulário de edição de uma categoria existente
router.get('/:id/edit', categoryController.renderEditForm);

// Rota para atualizar uma categoria existente
router.put('/:id', categoryController.updateCategory);

// Rota para deletar uma categoria
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
