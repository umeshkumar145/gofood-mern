// models/FoodCategories.js

const mongoose = require('mongoose');

const FoodCategoriesSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Categories', FoodCategoriesSchema);
