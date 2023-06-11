let extensionActive = false;

// Retrieve the extension's active state from local storage
chrome.storage.local.get("extensionActive", function (result) {
	extensionActive = result.extensionActive || false;
	console.log(
		"Extension state retrieved from local storage. Active:",
		extensionActive
	);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "updateExtensionState") {
		extensionActive = request.extensionActive;

		// Store the extension's active state in local storage
		chrome.storage.local.set(
			{ extensionActive: extensionActive },
			function () {
				console.log(
					"Extension state updated in local storage. Active:",
					extensionActive
				);
			}
		);

		console.log(
			"Received updateExtensionState message. Active:",
			extensionActive
		);

		if (extensionActive && sender.tab && sender.tab.url) {
			console.log("Checking Twitter profile URL:", sender.tab.url);
			checkTwitterProfileUrl(sender.tab.url, sender.tab.id);
		}
	}
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete" && tab.url.includes("twitter.com")) {
		console.log("Tab updated:", tab);

		if (extensionActive) {
			console.log(
				"Extension is active. Checking Twitter profile URL:",
				tab.url
			);
			checkTwitterProfileUrl(tab.url, tabId);
		} else {
			console.log("Extension is inactive. Skipping message sending.");
		}
	}
});

function checkTwitterProfileUrl(url, tabId) {
	if (isTwitterProfileUrl(url)) {
		console.log("Sending message to content script. Tab ID:", tabId);
		chrome.tabs.sendMessage(tabId, { message: "twitterProfile" });
	} else {
		console.log("URL is not a Twitter profile.");
	}
}

function isTwitterProfileUrl(url) {
	return /^https?:\/\/twitter\.com\/[^/]+\/?$/.test(url);
}
