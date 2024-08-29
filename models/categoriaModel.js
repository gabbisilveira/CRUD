const db = require('../config/db');

const Categoria = {
    // Cria um novo produto
    create: (categoria, callback) => {
        const query = 'INSERT INTO categorias (name) VALUES (?)';
        db.query(query, [categoria.name], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Encontra um produto por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Atualiza um produto existente
    update: (id, categoria, callback) => {
        const query = 'UPDATE categorias SET nome = ? WHERE id = ?';
        db.query(query, [categoria.name, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Deleta um produto por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM categorias WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Obtém todos os produtos
    getAll: (callback) => {
        const query = 'SELECT * FROM categorias';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Categoria;
