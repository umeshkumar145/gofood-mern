require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); // Import the connection function
const authRoutes = require('./Routes/Auth'); // Import routes

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

const cors = require('cors');
app.use(cors({
    origin: 'https://gofood-mern-frontend-evd1.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to the database and start the server
const startServer = async () => {
    try {
        await connectDB(); // Wait for the database to connect
        console.log("Database connected successfully");

        // Use routes
        app.use('/api/auth', authRoutes);

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

// Start the server
startServer();
