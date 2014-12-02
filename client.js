/* jslint browser: true */

var core = new (require("./lib/emitter.js"))();

// third party libraries
require('./public/s/scripts/lib/sockjs.min.js');
require('./public/s/scripts/lib/jquery.velocity.min.js');
require('./public/s/scripts/lib/svg4everybody.min.js');

require('./lib/jquery.attrchange.js');
require('./lib/jquery.setCursorEnd.js');
require('./lib/jquery.isOnScreen.js');
require('./lib/format.js');
require('./lib/swipe-events.js');
require('./lib/jquery.scrollToBottom.js');

// ui widgets
require('./public/s/scripts/lib/jquery.alertbar.js');
require('./public/s/scripts/lib/jquery.modal.js');
require('./public/s/scripts/lib/jquery.multientry.js');
require('./public/s/scripts/lib/jquery.popover.js');
require('./public/s/scripts/lib/jquery.progressbar.js');

// libsb files
var libsb = require('./interface/interface-client')(core);
require('./localStorage/localStorage-client')(libsb);
require('./socket/socket-client')(libsb);
require('./calls-to-action/calls-to-action-client.js');
require('./dialogs/dialogs-client.js');
require('./dialogs/dialogs-listeners.js');

// bootup related
require('./client-init/client-init.js')(libsb);
require('./id-generator/id-generator-client.js')(libsb);
require('./client-entityloader/client-entityloader.js')(libsb);

require('./ui/infinite.js');
require('./ui/hide-scroll.js');
require('./ui/user-area.js');
require('./ui/chat.js');
require('./ui/chat-area.js');

// client uis
require('./translation/translation-client.js').translateAll();
require('./email/email-client.js');
require('./http/notifications-client.js');
require('./authorizer/authorizer-client.js');
require('./http/seo-client.js');
require('./http/roomGeneralSettings-client.js');
require('./http/userProfile-client.js');
require('./embed/embed-client.js')(libsb);
require('./embed/embed-config.js');
require('./irc/irc-client.js');
require('./anti-abuse/anti-abuse-client.js');
require('./twitter/twitter-client.js');
require('./threader/threader-client.js');
require('./customization/customization-client.js');

// user menus
require('./http/logout-client.js');
require('./facebook/facebook-client.js');
require('./google/google-client.js');
require('./github/github-client.js');
require('./persona/persona-client.js');

// phonegap specific
require('./push-notification/push-notification-client.js');
require('./phonegap/phonegap-client.js');

// components
require('./ui/guest-settings.js');
require('./ui/quicknotify.js');
require('./ui/load-indicator.js');
require('./ui/appcache.js');
require('./ui/error-notify.js');
require('./ui/columns.js');
require('./ui/chat-threads.js');
require('./ui/compose.js');
require('./ui/notify-ticker.js');
require('./ui/browser-notify.js');
require('./ui/panes.js');
require('./ui/thread.js');
require('./ui/thread-area.js');
require('./ui/person.js');
require('./ui/people-area.js');
require('./ui/info-area.js');
require('./ui/room-area.js');
require('./ui/search.js');
require('./ui/follow-room.js');
require('./ui/oauth-listener.js');
require('./ui/conf-area.js');
require('./ui/pref-area.js');
require('./ui/noroom-area.js');
require('./ui/persona.js');
require('./ui/message-menu.js');
require('./ui/room-notifications.js');
require('./ui/google-analytics.js');
require('./ui/workarounds.js');

require('./client-init/boot.js')(libsb);
