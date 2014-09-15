var config = require("../config.js");

module.exports = function (deviceIds, notifications) {
	var notification, options;

	notification = {
		registration_ids: deviceIds,
		data: {
			message: notifications
		}
	};
	options = {
		url: 'https://android.googleapis.com/gcm/send',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "key="+config.pushNotifications.key
		},
		body: JSON.stringify(notification)
	}
	console.log("Trying to send: ", notification);
	request.post(options, function (error, response, body) {
		if (error) console.log("error", error);
		if (!error && response.statusCode == 200) {
			console.log("Response from GCM: ", body)
		}
	});
};