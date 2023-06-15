const mongoose = require("mongoose");

const twitterSchema = new mongoose.Schema({
	handle: {
		type: String,
		required: true,
		unique: true,
	},
	connectedAddresses: {
		type: [String],
		default: [],
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
});

const Twitter = mongoose.model("Twitter", twitterSchema, "TwitterHandles");

module.exports = Twitter;
