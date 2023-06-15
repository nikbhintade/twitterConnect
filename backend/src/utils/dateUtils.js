const is24HoursAgo = (date) => {
	const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
	const now = new Date();
	return now - date >= twentyFourHours;
};

module.exports = {
	is24HoursAgo,
};
