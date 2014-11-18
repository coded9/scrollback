/* jslint browser: true, indent: 4, regexp: true */

(function() {
	var config = require("../client-config.js"),
		validate = require("../lib/validate.js");

	document.addEventListener("readystatechange", function() {
		var container, iosHack, range, scrollTimer, reposition;

		if (document.readyState === "complete") {
			// Add to iframe url: embed={minimize,path}
			var sb, style, iframe,
				embed = {},
				host = config.server.protocol + config.server.host;

			window.scrollback = window.scrollback || {};

			sb = window.scrollback;

			sb.room = sb.room || ((sb.streams && sb.streams.length) ? sb.streams[0] : "scrollback");

			embed.form = sb.form || "toast";
			embed.theme = /* sb.theme || */ "dark";
			embed.nick = sb.nick || sb.suggestedNick;
			embed.minimize = (typeof sb.minimize === "boolean") ? sb.minimize : false;
			embed.origin = {
				protocol: location.protocol,
				host: location.host,
				path: location.pathname + location.search + location.hash
			};

			embed.titlebarColor = sb.titlebarColor;
			embed.titlebarImage = sb.titlebarImage;

			sb.room = validate(sb.room).sanitized;

			// Insert required styles
			style = document.createElement("link");
			style.rel = "stylesheet";
			style.type = "text/css";
			style.href = host + "/s/styles/dist/embed.css";
			document.head.appendChild(style);

			// Create and append the iframe
			iframe = document.createElement("iframe");

			if (embed.form === "canvas") {
				container = document.getElementById("scrollback-container");
			}

			if (!container) {
				embed.form = sb.embed = "toast";
				document.body.appendChild(iframe);
			} else {
				container.appendChild(iframe);
			}

			// TODO: change "embed" to "context"
			iframe.src = host + "/" + sb.room + (sb.thread ? "/" + sb.thread : "") + "?embed=" + encodeURIComponent(JSON.stringify(embed));
			iframe.className = "scrollback-stream scrollback-" + embed.form + " " + ((sb.minimize && embed.form == "toast") ? " scrollback-minimized" : "");

			window.addEventListener("message", function(e) {
				var data;

				if (e.origin === host) {
					var minReg = /\bscrollback-minimized\b/;
					if (e.data === "focused") {
						iframe.classList.add("scrollback-focused");
					} else if (e.data === "unfocused") {
						iframe.classList.remove("scrollback-focused");
					} else if (e.data === "minimize" && !minReg.test(iframe.className)) {
						iframe.className += " scrollback-minimized";
					} else if (e.data === "maximize") {
						iframe.className = iframe.className.replace(minReg, "").trim();
					} else {
						data = JSON.parse(e.data);
						if (data.type === "domain-challenge") {
							iframe.contentWindow.postMessage(JSON.stringify({
								type: "domain-response",
								token: data.token
							}), host);
						}
					}
				}
			}, false);

			// iOS hacks
			// Danger below, stay away
			if (!(navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
				navigator.userAgent.match(/AppleWebKit/) &&
				navigator.userAgent.match(/Safari/))) {
				return;
			}

			iframe.className += " scrollback-ios";

			// Create the <style> tag
			iosHack = document.createElement("style");
			iosHack.rel = "stylesheet";
			iosHack.type = "text/css";

			// Add the <style> element to the page
			document.head.appendChild(iosHack);

			// WebKit hack :(
			iosHack.appendChild(document.createTextNode(""));

			range = document.createRange();
			range.selectNodeContents(iosHack);
						
			reposition = function () {
				var winHeight = parseInt(window.innerHeight),
					scrollTop = parseInt(document.body.scrollTop),
					topOffset = winHeight + scrollTop;

				range.deleteContents();

				iosHack.appendChild(document.createTextNode(
					".scrollback-stream.scrollback-ios {" +
					"top:" + (topOffset - parseInt(window.getComputedStyle(iframe).height)) + "px;" +
					"}" +
					".scrollback-stream.scrollback-ios.scrollback-focused {" +
					"top:" + scrollTop + "px;" +
					"}" +
					".scrollback-stream.scrollback-ios.scrollback-minimized {" +
					"top:" + (topOffset - 49) + "px;" +
					"}"
				));
			};
			
			window.addEventListener("message", function(e) {
				if (e.origin === host && e.data === "unfocused") {
					reposition();
				}
			}, false);

			window.addEventListener("scroll", function() {
				if (scrollTimer) {
					clearTimeout(scrollTimer);
				}
				/*
				if (iframe.classList.contains("scrollback-focused")) {
					return;
				}*/
				
				scrollTimer = setTimeout(reposition, 150);
			});
		}
	}, false);
})();
