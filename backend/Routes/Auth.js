const FoodItems = require('../models/FoodItems');
const FoodCategories = require('../models/FoodCategories');

const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
 // Check the path is correct

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails');

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || "HaHa"; // Use environment variable for JWT secret

// Create a user and store data in MongoDB Atlas (No login required)
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            location: req.body.location
        });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, jwtSecret);
        success = true;

        res.json({ success, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error: Please enter a unique value." });
    }
});

// Authenticate a user (No login required)
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const data = { user: { id: user.id } };
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get logged in user details (Login Required)
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // Exclude password from response
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get location based on lat/long (Login Required)
router.post('/getlocation', async (req, res) => {
    const { lat, long } = req.body.latlong;

    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.OPENCAGE_API_KEY}`);
        const components = response.data.results[0].components;
        const { village, county, state_district, state, postcode } = components;
        
        const location = `${village}, ${county}, ${state_district}, ${state} ${postcode}`;
        res.send({ location });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get food data (Login Required)
router.post('/foodData', async (req, res) => {
    try {
        const foodItems = await FoodItems.find({}); // or however you're fetching data
        const foodCategories = await FoodCategories.find(); // if using a second model
        //console.log("Food Items: ", foodItems);
        //console.log("Food Categories: ", foodCategories);
        res.status(200).json([foodItems, foodCategories]);

    } catch (error) {
        console.error("Error fetching food data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Submit order data (Login Required)
// Submit order data (Login Required)
router.post('/orderData', async (req, res) => {
    const { order_data, order_date, email } = req.body;

    // Directly pass the order date as part of the order document, not within order_data
    try {
        let existingOrder = await Order.findOne({ email });

        // If there's no existing order, create a new one
        if (!existingOrder) {
            await Order.create({
                email,
                order_data,  // This is an array of order items
                order_date   // Order date is now part of the main order document
            });
        } else {
            // If order already exists, append the new order items to the existing order
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: { $each: order_data } } }  // Append order items properly
            );
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Get user order data (Login Required)
router.post('/myOrderData', async (req, res) => {
    const { email } = req.body;

    try {
        let orderData = await Order.findOne({ email });
        res.json({ orderData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
