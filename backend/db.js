const mongoose = require('mongoose');
require('dotenv').config(); // Import dotenv to manage environment variables

const mongoURI = "mongodb+srv://umeshanand1452001:Umesh2001@cluster0.8vjuk.mongodb.net/Customer?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true // Recommended to avoid deprecation warnings
        });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("fooditems");
        const data = await foodCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.db.collection("foodCategories");
        const Catdata = await categoryCollection.find({}).toArray();

        return { data, Catdata }; // Return both data collections

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow error for further handling if necessary
    }
};

// Export the connection function
module.exports = connectDB;
