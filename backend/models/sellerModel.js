const {Schema, model} = require('../connection');

const sellerSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    businessName: {type: String, required: true},
    businessAddress: String,
    phone: String,
    productCategories: [String],
    city: {type: String, default: 'No City'},
    createdAt: {type: Date, default: Date.now},
});

module.exports = model('sellers', sellerSchema); 