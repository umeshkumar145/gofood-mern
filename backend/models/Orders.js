const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define a schema for order items to ensure consistent structure
const OrderItemSchema = new Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem', // Assuming you have a FoodItem model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    // Add any other fields related to each order item here
}, { _id: false }); // Disable automatic generation of _id for subdocuments

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email format validation
    },
    order_data: {
        type: [OrderItemSchema], // Use the structured OrderItem schema
        required: true,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Order', OrderSchema); // Use singular model name
