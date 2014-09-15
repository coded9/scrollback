module.exports = function () {
	var app, pushNotification = window.plugins && window.plugins.pushNotification;
	app = {
		successHandler: function (result) {
			alert('Callback Success! Result = ' + result)
		},
		errorHandler: function (error) {
			alert(error);
		},
		onNotificationGCM: function (e) {
			switch (e.event) {
			case 'registered':
				if (e.regid.length > 0) {
					console.log("Regid " + e.regid);
					alert('registration id = ' + e.regid);
				}
				break;
			}
		}
	};
	alert("check 1 :hi", window.plugins, "trying something here");
	if (pushNotification) {
		pushNotification.register(app.successHandler, app.errorHandler, {
			"senderID": "824841663931",
			"ecb": "app.onNotificationGCM"
		});
	}else{
		alert("no phonegap init.");
	}
};