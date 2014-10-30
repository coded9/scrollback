/* global $, document, currentState*/
module.exports = function(libsb) {
	var clearClicked = false;
	
	libsb.on('config-show', function(tabs, next) {
		var $div = $('<div>'),
			button = $("<button>").addClass("button").attr("id", "room-clear-log").text("clear chat log");
		$div.append(button);
		tabs["clear-log"] = {
			text: "clear logs (Danger zone)",
			html: $div,
			prio: 10
		};
		next();
	}, 100);

	$(document).on("click", "#room-clear-log", function() {
		if (currentState.mode === "conf") {
			clearClicked = true;
		}
	});
	
	libsb.on("config-save", function(room, next) {
		if(clearClicked) {
			room.guides.clearTime = "NOW";
		}
		next();
	}, 100);
	libsb.on("room-dn", function(action, next) {
		if(clearClicked) {
			clearClicked = false;
			libsb.say(action.to, "/me cleared the room");
		}
		next();
	}, 100);
	libsb.on("navigate", function(state, next) {
		if (state.source === "conf-cancel") clearClicked = false;
		next();
	}, 100);
};