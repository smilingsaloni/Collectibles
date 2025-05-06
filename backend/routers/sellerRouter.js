const express = require('express');
const Model = require('../models/sellerModel'); //importing seller model
const jwt = require('jsonwebtoken'); //importing jsonwebtoken
require('dotenv').config(); //importing dotenv

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({message: 'Seller Email Already Exists'});
            }
            else {
                res.status(500).json({message: 'Internal Server Error'});
            }
        });
})

router.post('/login', (req, res) => {
    console.log(req.body);
    // Finding the seller using the email
    Model.findOne({email: req.body.email})
        .then((result) => {
            if(result){
                // If seller exists, verify the password
                if(result.password === req.body.password){
                    // If password is correct, create a JWT token
                    const token = jwt.sign({
                        _id: result._id,
                        email: result.email
                    }, process.env.JWT_SECRET);

                    // Return the token and seller data
                    res.status(200).json({
                        message: 'Login Successful',
                        token: token,
                        seller: {
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            businessName: result.businessName
                        }
                    });
                } else {
                    // If password is incorrect
                    res.status(401).json({message: 'Invalid Credentials'});
                }
            } else {
                // If seller does not exist
                res.status(404).json({message: 'Seller Not Found'});
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        });
})

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

module.exports = router; 