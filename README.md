# Mathfinder
Mathfinder is a Pathfinder 1st Edition character sheet web app with basic automation of routine math such as adding Attack Bonus and Initiative modifiers, and a friendly mobile-first interface that allows for play on a mobile device even under circumstances where pen and paper or a computer arent available, e.g. a power outage.

Since this project purely employs browser based code, there are no build requirements. Simply open `index.html` in your browser, or use the hot reload feature or equivalent extension available to your IDE.

This project uses ES6 syntax extensively, but does not use ES imports available in the browser. Due to CORS limitations modules can only be served by a web server, and can not be loaded from the project folder or file system via `fetch()`.

This project also makes no use of third party code other than `reset.css` from https://meyerweb.com/eric/tools/css/reset/.
