const mongoose = require('mongoose');

const FoodItemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  CategoryName: { type: String, required: true },
  options: { type: Array, required: true },
  img: { type: String, required: true }
});

module.exports = mongoose.model('FoodItems', FoodItemsSchema);
