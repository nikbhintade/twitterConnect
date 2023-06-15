const express = require("express");
const router = express.Router();
const twitterService = require("../services/twitterService");

router.get("/check/:handle", async (req, res) => {
	const handle = req.params.handle;

	console.log(
		"Received request to check Twitter connection for handle:",
		handle
	);

	try {
		const result = await twitterService.checkConnection(handle);

		console.log("Twitter connection checked for handle:", handle);

		console.log("Connected addresses found for the handle:", handle);
		console.log("Connected addresses:", result);

		if (result.connectedAddresses.length === 0) {
			console.log("No connected addresses found for the handle:", handle);

			return res.status(404).json({
				handle: result.handle,
				message: "No connected addresses found for the handle",
			});
		}

		return res.status(200).json({
			handle: result.handle,
			connectedAddresses: result.connectedAddresses,
		});
	} catch (error) {
		console.error("An error occurred:", error);

		return res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
