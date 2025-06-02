const express = require('express');
const Model = require('../models/userModel'); //importing user model
const OrderModel = require('../models/orderModel'); //importing order model
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
                res.status(400).json({message: 'User Email Already Exists'});
            }
            else {
                res.status(500).json({message: 'Internal Server Error'});
            }
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

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if(result){
                // email and password match
                // generate token

                const { _id, email, password} = result;
                const payload = { _id, email, password};

                jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                    if(err){
                        console.log(err);
                        res.status(500).json(err);
                    }else{
                        res.status(200).json({token});
                    }
                } )

            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        });
});

// Order Routes
router.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const result = await new OrderModel(orderData).save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to create order', error: err.message});
    }
});

router.get('/orders/:userId', async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.params.userId })
            .sort({ createdAt: -1 }); // Sort by most recent
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to fetch orders', error: err.message});
    }
});

router.get('/orders/details/:orderId', async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to fetch order details', error: err.message});
    }
});

module.exports = router;