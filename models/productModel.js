const db = require('../config/db');

const Product = {
    // Cria um novo produto
    create: (product, callback) => {
        // Verifica se a categoria é válida
        const checkCategoryQuery = 'SELECT COUNT(*) AS count FROM categories WHERE id = ?';
        db.query(checkCategoryQuery, [product.category], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results[0].count === 0) {
                return callback(new Error('Categoria inválida'));
            }

            // Inserir o novo produto
            const query = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
            db.query(query, [product.name, product.price, product.category], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            });
        });
    },

    // Encontra um produto por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            // Verifica se o produto foi encontrado
            if (results.length === 0) {
                return callback(new Error('Produto não encontrado'));
            }
            callback(null, results[0]);
        });
    },

    // Atualiza um produto existente
    update: (id, product, callback) => {
        // Verifica se a categoria é válida
        const checkCategoryQuery = 'SELECT COUNT(*) AS count FROM categories WHERE id = ?';
        db.query(checkCategoryQuery, [product.category], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results[0].count === 0) {
                return callback(new Error('Categoria inválida'));
            }

            // Atualiza o produto
            const query = 'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?';
            db.query(query, [product.name, product.price, product.category, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                // Verifica se o produto foi atualizado
                if (results.affectedRows === 0) {
                    return callback(new Error('Produto não encontrado ou não atualizado'));
                }
                callback(null, results);
            });
        });
    },

    // Deleta um produto por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            // Verifica se o produto foi deletado
            if (results.affectedRows === 0) {
                return callback(new Error('Produto não encontrado'));
            }
            callback(null, results);
        });
    },

    // Obtém todos os produtos
    getAll: (callback) => {
        const query = `
            SELECT products.id, products.name, products.price, categories.name AS categoryName
            FROM products
            JOIN categories ON products.category = categories.id
        `;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Product;
