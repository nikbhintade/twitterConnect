let scheduledCheck = null;
let addressElement = null;
let checkAgain = true;

async function checkForProfilePage() {
	const isProfileUrl = /^https:\/\/twitter\.com\/[^/]+\/?$/.test(
		window.location.href
	);

	const profileUrlRegex = /^https:\/\/twitter\.com\/([^/]+)\/?$/;
	const match = profileUrlRegex.exec(window.location.href);
	const twitterHandle = match ? match[1] : null;
	console.log(`This is the twitter handle: ${twitterHandle}`);

	if (isProfileUrl) {
		const badgeParentSelector =
			"#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div > span > span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-1pos5eu.r-qvutc0 > span";
		const addressParentSelector =
			"#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1habvwh.r-1wbh5a2.r-13hce6t.r-14gqq1x > div > div";
		console.log(`badge parent selector: ${badgeParentSelector}`);
		const badgeParentElement = document.querySelector(badgeParentSelector);
		const addressParentElement = document.querySelector(
			addressParentSelector
		);

		console.log(
			`parent elements: ${badgeParentElement} & ${addressParentElement}`
		);

		if (badgeParentElement && addressParentElement) {
			// Remove existing badge and address elements
			const existingBadgeElement =
				badgeParentElement.querySelector("#scBadge");
			const existingAddressElement = addressParentElement.querySelector(
				"#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div:nth-child(2)"
			);

			if (existingBadgeElement) {
				console.log(`exiting badge element found!`);
				existingBadgeElement.remove();
			}

			if (existingAddressElement) {
				console.log(`exiting address element found!`);
				existingAddressElement.remove();
			}

			try {
				// Call the API to check the Twitter handle
				console.log(`calling api!`);
				const response = await fetch(
					`http://localhost:3000/api/check/${twitterHandle}`
				);

				if (response.ok) {
					// API call successful, parse the JSON response
					const data = await response.json();
					console.log(`reponse data from api call: ${data}`);
					// Check if wallet is connected based on the API response
					if (
						data.connectedAddresses &&
						data.connectedAddresses.length > 0
					) {
						const address = data.connectedAddresses[0];
						console.log(`address found! here: ${address}`);
						// Create a new badge element
						const badgeElement = document.createElement("div");
						badgeElement.setAttribute("id", "scBadge");
						badgeElement.classList.add("css-1dbjc4n", "r-xoduu5");
						badgeElement.innerHTML = `
				<div aria-label="Provides details about verified accounts." role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-6koalj r-9cviqr r-1ny4l3l r-o7ynqc r-6416eg">
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
					class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1yjpyg1 r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
					data-testid="verificationBadge"
					version="1.1"
					id="svg965"
				  >
					<g id="g963" style="fill: #1d9bf0; fill-opacity: 1">
					  <path
						d="M 22.25 12 C 22.25 10.57 21.37 9.33 20.06 8.66 C 20.52 7.27 20.26 5.76 19.25 4.75 C 18.24 3.74 16.73 3.48 15.34 3.94 C 14.68 2.63 13.43 1.75 12 1.75 C 10.57 1.75 9.33 2.63 8.67 3.94 C 7.27 3.48 5.76 3.74 4.75 4.75 C 3.74 5.76 3.49 7.27 3.95 8.66 C 2.64 9.33 1.75 10.57 1.75 12 C 1.75 13.43 2.64 14.67 3.95 15.34 C 3.49 16.73 3.74 18.24 4.75 19.25 C 5.76 20.26 7.27 20.51 8.66 20.06 C 9.33 21.37 10.57 22.25 12 22.25 C 13.43 22.25 14.68 21.37 15.34 20.06 C 16.73 20.51 18.24 20.26 19.25 19.25 C 20.26 18.24 20.52 16.73 20.06 15.34 C 21.37 14.67 22.25 13.43 22.25 12 Z M 10.54 16.2 L 6.8 12.46 L 5.689 14.024 L 10.727 18.393 L 18.511 12.391 L 16.74 9.43 L 10.54 16.2 Z"
						id="path961"
						style="fill: #1d9bf0; fill-opacity: 1"
					  />
					  <text
						x="50%"
						y="55%"
						dominant-baseline="middle"
						text-anchor="middle"
						style="fill: #ffffff; font-size: 8px; font-weight: bold"
					  >
						SC
					  </text>
					</g>
				  </svg>
				</div>
			  `;

						// Create a new address element
						const addressElement = document.createElement("div");
						addressElement.setAttribute("id", "addressElementId");
						addressElement.innerText = `Address: ${address}`;
						addressElement.style.padding = "10px 0px";
						addressElement.classList.add("r-115tad6", "r-37j5jr");

						// Append the badge and address elements to their respective parent elements
						badgeParentElement.appendChild(badgeElement);
						addressParentElement.appendChild(addressElement);
					} else {
						console.log("No address found");
						checkAgain = false;
					}
				} else {
					// API call failed, handle the error
					throw new Error("API request failed");
				}
			} catch (error) {
				console.error("API request failed:", error);
			}
		} else {
			console.log("Parent elements not found. Retrying in 1 second...");
			setTimeout(checkForProfilePage, 1000);
		}
	} else {
		console.log("Not a valid Twitter profile URL:", window.location.href);
	}
}

function getAddress() {
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

// TODO: Show popup what this badge means

// // Create the popup HTML
// var popupHTML = `
// <div class="css-1dbjc4n r-xoduu5 r-u8s1d" style="left: 469.7px; top: 368.65px; display: none;"><div class="css-1dbjc4n r-1pz39u2 r-xoduu5 r-16y2uox r-1wbh5a2"><div tabindex="0" class="css-1dbjc4n r-xoduu5"></div><div role="group" tabindex="0" class="css-1dbjc4n r-xoduu5"><div style=""><div class="css-1dbjc4n r-xoduu5"><div class="css-1dbjc4n r-yfoy6g r-1867qdf r-xnswec r-xoduu5 r-1udh08x" data-testid="HoverCard"><div class="css-1dbjc4n r-xoduu5 r-1azx6h r-7mdpej r-1vsu8ta r-ek4qxl r-1dqxon3"><div class="css-1dbjc4n r-xoduu5 r-eqz5dr r-1ssbvtb r-1pcd2l5"><span dir="ltr" class="css-901oao css-16my406 r-vlxjld r-37j5jr r-1blvdjr r-b88u0q r-vrz42v r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Verified account</span></span><div class="css-1dbjc4n r-xoduu5 r-18u37iz r-1ssbvtb"><svg
// 	xmlns="http://www.w3.org/2000/svg"
// 	viewBox="0 0 24 24"
// 	aria-hidden="true"
// 	class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1yjpyg1 r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
// 	data-testid="verificationBadge"
// 	version="1.1"
// 	id="svg965"
// >
// 	<g id="g963" style="fill: #1d9bf0; fill-opacity: 1">
// 		<path
// 			d="M 22.25 12 C 22.25 10.57 21.37 9.33 20.06 8.66 C 20.52 7.27 20.26 5.76 19.25 4.75 C 18.24 3.74 16.73 3.48 15.34 3.94 C 14.68 2.63 13.43 1.75 12 1.75 C 10.57 1.75 9.33 2.63 8.67 3.94 C 7.27 3.48 5.76 3.74 4.75 4.75 C 3.74 5.76 3.49 7.27 3.95 8.66 C 2.64 9.33 1.75 10.57 1.75 12 C 1.75 13.43 2.64 14.67 3.95 15.34 C 3.49 16.73 3.74 18.24 4.75 19.25 C 5.76 20.26 7.27 20.51 8.66 20.06 C 9.33 21.37 10.57 22.25 12 22.25 C 13.43 22.25 14.68 21.37 15.34 20.06 C 16.73 20.51 18.24 20.26 19.25 19.25 C 20.26 18.24 20.52 16.73 20.06 15.34 C 21.37 14.67 22.25 13.43 22.25 12 Z M 10.54 16.2 L 6.8 12.46 L 5.689 14.024 L 10.727 18.393 L 18.511 12.391 L 16.74 9.43 L 10.54 16.2 Z"
// 			id="path961"
// 			style="fill: #1d9bf0; fill-opacity: 1"
// 		/>
// 		<text
// 			x="50%"
// 			y="55%"
// 			dominant-baseline="middle"
// 			text-anchor="middle"
// 			style="fill: #ffffff; font-size: 8px; font-weight: bold"
// 		>
// 			SC
// 		</text>
// 	</g>
// </svg><span dir="ltr" class="css-901oao css-16my406 r-115tad6 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">This account is verified. </span></span><a href="https://help.twitter.com/managing-your-account/about-twitter-verified-accounts" rel="noopener noreferrer nofollow" target="_blank" role="link" class="css-4rbku5 css-18t94o4 css-901oao css-16my406 r-1cvl2hr r-1loqt21 r-poiln3 r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Learn more</span></a></span></div><div class="css-1dbjc4n r-xoduu5 r-18u37iz r-1ssbvtb"><svg viewBox="0 0 24 24" aria-hidden="true" class="r-vlxjld r-4qtqp9 r-yyyyoo r-1q142lx r-1inkyih r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" data-testid="protectedIcon"><g><path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path></g></svg><span dir="ltr" class="css-901oao css-16my406 r-115tad6 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Verified since March 2023.</span></span></div><a href="/i/twitter_blue_sign_up?referring_page=verification_reason_dialog" role="link" class="css-4rbku5 css-18t94o4 css-1dbjc4n r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1loqt21 r-xoduu5 r-knv0ih r-15ysp7h r-4wgw6l r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr" style="background-color: rgb(239, 243, 244);"><span dir="ltr" class="css-901oao css-16my406 r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0" style="color: rgb(15, 20, 25);"><span class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-1b43r93 r-1cwl3u0 r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Get verified</span></span></span></a></div></div></div></div></div></div><div tabindex="0" class="css-1dbjc4n r-xoduu5"></div></div></div>
// `;

// // Add the popup HTML to the document
// document.body.insertAdjacentHTML("beforeend", popupHTML);

// // Function to hide the popup
// function hidePopup() {
// 	var popup = document.getElementById("verificationPopup");
// 	popup.style.display = "none";

// 	// Remove the click event listener from the document
// 	document.removeEventListener("click", hidePopup);
// }
