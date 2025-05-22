const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  specifications: {
    material: String,
    width: String,
    length: String,
    thickness: String,
    colors: String,
  },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
