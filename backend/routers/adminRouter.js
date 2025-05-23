const express = require('express');
const Model = require('../models/adminModel');
const ProductModel = require('../models/productModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Admin registration
router.post('/add', (req, res) => {
  new Model(req.body).save()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ message: 'Admin Email Already Exists' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
});

// Admin login
router.post('/login', (req, res) => {
  Model.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.password === req.body.password) {
          const token = jwt.sign({
            _id: result._id,
            email: result.email
          }, process.env.JWT_SECRET);

          res.status(200).json({
            message: 'Login Successful',
            token: token,
            admin: {
              _id: result._id,
              name: result.name,
              email: result.email
            }
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      } else {
        res.status(404).json({ message: 'Admin Not Found' });
      }
    }).catch((err) => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Get all admins
router.get('/getall', (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Admin adds a new product (only admin can add)
router.post('/add-product', (req, res) => {
  // req.body should include admin id as 'admin'
  new ProductModel(req.body).save()
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Admin gets all products
router.get('/products', (req, res) => {
  ProductModel.find({})
    .populate('admin', 'name email')
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Admin deletes a product
router.delete('/delete-product/:id', (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id)
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
