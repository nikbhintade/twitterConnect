document.addEventListener("DOMContentLoaded", function () {
	const toggleButton = document.getElementById("toggleButton");

	chrome.storage.sync.get("extensionActive", function (data) {
		toggleButton.innerText = data.extensionActive
			? "Deactivate"
			: "Activate";
	});

	toggleButton.addEventListener("click", function () {
		chrome.storage.sync.get("extensionActive", function (data) {
			const extensionActive = !data.extensionActive;
			chrome.storage.sync.set(
				{ extensionActive: extensionActive },
				function () {
					toggleButton.innerText = extensionActive
						? "Deactivate"
						: "Activate";
					chrome.runtime.sendMessage({
						message: "updateExtensionState",
						extensionActive: extensionActive,
					});
				}
			);
		});
	});
});
