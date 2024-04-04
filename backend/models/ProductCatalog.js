const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Assuming storing image URL
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    itemName: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
  });

  return schema.validate(product);
}

exports.validateProduct = validateProduct;
exports.Product = Product;
exports.productSchema = productSchema;
