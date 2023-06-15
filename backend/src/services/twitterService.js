const Twitter = require("../models/twitterModel");
const { is24HoursAgo } = require("../utils/dateUtils");
const { socialConnect } = require("../utils/socialConnect");

async function checkConnection(handle) {
	console.log("Checking Twitter connection for handle:", handle);

	let twitter = await Twitter.findOne({ handle });
    console.log(`Found twitter entries: ${twitter}`)

	if (!twitter) {
		console.log("Twitter handle not found. Creating new entry.");
		twitter = new Twitter({ handle });
	}

	if (twitter.connectedAddresses.length === 0 || is24HoursAgo(twitter.lastUpdated)) {
		console.log(
			"Connected address not found or last updated more than 24 hours ago. Performing social connect."
		);

		const connectedAddresses = await socialConnect(handle);

		if (connectedAddresses) {
			twitter.connectedAddresses = connectedAddresses;
			twitter.lastUpdated = Date.now();
			await twitter.save();
			console.log(
				"Connected address updated for Twitter handle:",
				handle
			);
		} else {
			console.log(
				"No connected address found for Twitter handle:",
				handle
			);
		}
	} else {
		console.log(
			"Connected address found and last updated within 24 hours."
		);
	}

	console.log("Returning Twitter connection details.");
	return {
		handle: twitter.handle,
		connectedAddresses: twitter.connectedAddresses,
	};
}

module.exports = {
	checkConnection,
};
