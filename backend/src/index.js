// library imports
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// route imports
const twitterRoutes = require("./routes/twitterRoutes");

// setting up the app
const PORT = process.env.PORT || 3001;
const DB_NAME = "twitterConnect";

const app = express();

// Middleware
app.use(express.json());
app.use("*", cors({
    origin: "*"
}));

// Routes
app.use("/api", twitterRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
	mongoose
		.connect(process.env.MONGODB_URI, {
			dbName: DB_NAME,
		})
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.error(`error connecting to MongoDB: ${error}`);
			process.exit(1);
		});
});
