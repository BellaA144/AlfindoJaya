const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Untuk menangani JSON di request body

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alfindo_jaya'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Endpoint untuk mendapatkan semua produk atau produk berdasarkan tipe
app.get('/api/products', (req, res) => {
    const type = req.query.type;
    let sql = 'SELECT * FROM products';
    if (type) {
        sql += ' WHERE type = ?';
    }
    db.query(sql, [type], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint untuk menambahkan produk baru
app.post('/api/products/add', (req, res) => {
    const { name, description, price, image_url, type } = req.body;
    const sql = 'INSERT INTO products (name, description, price, image_url, type) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, image_url, type], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Endpoint untuk memperbarui produk berdasarkan ID
app.put('/api/products/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, price, image_url, type } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, type = ? WHERE id = ?';
    db.query(sql, [name, description, price, image_url, type, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Endpoint untuk menghapus produk berdasarkan ID (opsional)
app.delete('/api/products/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
