const db = require('../config/db');

const Produto = {
    // Cria um novo produto
    create: (produto, callback) => {
        const query = 'INSERT INTO produtos (nome, price, category) VALUES (?, ?, ?)';
        db.query(query, [produto.name, produto.price, produto.category], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Encontra um produto por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Atualiza um produto existente
    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET nome = ?, price = ?, category = ? WHERE id = ?';
        db.query(query, [produto.name, produto.price, produto.category, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Deleta um produto por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Obtém todos os produtos
    getAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Produto;
