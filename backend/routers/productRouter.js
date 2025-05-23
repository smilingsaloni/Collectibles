const express = require('express');
const Model = require('../models/productModel');

const router = express.Router();

// Add a new product
router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then(result => res.status(200).json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Get all products
router.get('/getall', (req, res) => {
    Model.find()
        .then(result => res.status(200).json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Get product by ID
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json(result);
            else res.status(404).json({ message: 'Product Not Found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Update product by ID
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(result => {
            if (result) res.status(200).json(result);
            else res.status(404).json({ message: 'Product Not Found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Delete product by ID
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result) res.status(200).json({ message: 'Product Deleted' });
            else res.status(404).json({ message: 'Product Not Found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

module.exports = router;