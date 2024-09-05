// models/categoryModel.js
const db = require('../config/db'); // Supondo que você tenha um módulo para configurar a conexão com o banco de dados

const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    create: (newCategory, callback) => {
        const { name } = newCategory;
        db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId); // Retorna o ID do novo registro
        });
    },

    update: (id, updatedCategory, callback) => {
        const { name } = updatedCategory;
        db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (id, callback) => {
        db.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Category;
