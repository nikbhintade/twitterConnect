let scheduledCheck = null;
let addressElement = null;

function checkForProfilePage() {
	const isProfileUrl = /^https:\/\/twitter\.com\/[^/]+\/?$/.test(
		window.location.href
	);

	if (isProfileUrl) {
		const targetSelector =
			"#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-yfoy6g.r-18bvks7.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l";

		const targetElement = document.querySelector(targetSelector);

		if (targetElement) {
			// Clear the previous address
			if (addressElement && addressElement.parentNode) {
				addressElement.parentNode.removeChild(addressElement);
			}

			// Create a new address element
			const address = getRandomEvmAddress();
			addressElement = document.createElement("div");
			addressElement.innerText = `Address: ${address}`;
			addressElement.style.padding = "10px 0px";
			addressElement.classList.add("r-115tad6", "r-37j5jr"); // Add the desired classes
			targetElement.appendChild(addressElement);
		} else {
			// Target selector not found, continue checking
			console.log("Target selector not found. Retrying in 1 second...");
			scheduledCheck = setTimeout(checkForProfilePage, 1000);
		}
	} else {
		console.log("Not a valid Twitter profile URL:", window.location.href);
	}
}

function getRandomEvmAddress() {
	const hexCharacters = "0123456789abcdef";
	let address = "0x";

	for (let i = 0; i < 40; i++) {
		address +=
			hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
	}

	return address;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "twitterProfile") {
		console.log("Received message in content script:", request);

		// Cancel the previously scheduled execution if it exists
		if (scheduledCheck !== null) {
			clearTimeout(scheduledCheck);
		}

		// Schedule the new execution after a short delay
		scheduledCheck = setTimeout(checkForProfilePage, 100); // Adjust the delay as needed
	}
});
