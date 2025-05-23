const { Schema, model } = require('../connection');

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [String],
  admin: { type: Schema.Types.ObjectId, ref: 'admins', required: true }, // changed from seller to admin
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('products', productSchema);