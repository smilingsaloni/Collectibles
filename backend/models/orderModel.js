const { Schema, model } = require('../connection');

const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    paymentMethod: { type: String, required: true, default: 'Cash on Delivery' },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('orders', orderSchema);
