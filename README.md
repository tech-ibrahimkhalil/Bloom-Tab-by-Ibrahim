Bloom Tab by Ibrahim Browser web extension inspired by the Material You Theme.
🌸 Bloom Tab

A clean, glassy new tab page for Chrome with a clock, live weather, air quality, a smart search bar, quick links and more. Built with plain HTML, CSS, and JavaScript. No frameworks and no build step.

Version: 5.1
Developed by: Ibrahim Khalil

Show Image

✨ Features
🔍 Search
Search with Google, DuckDuckGo, Bing, Brave, YouTube or GitHub (pick one under "Search With")
Live suggestions while you type, with ↑ ↓ + Enter keyboard selection
Engine shortcuts: start your query with a prefix to use that engine once
Prefix	Engine
g	Google
d	DuckDuckGo
b	Bing
br	Brave
yt	YouTube
gh	GitHub
Example: yt lofi music, gh react
Press Tab in the search box to switch engines quickly
Search history: click the empty search box to see recent searches
Smart answers: type 25*4.5 or 5 km to mile and get the answer instantly (length, weight, °C/°F)
Voice search with the microphone button (Chrome / Edge)
🌤️ Weather
Current temperature, condition, humidity and "feels like"
Day / night icon (☀️ by day, 🌙 at night)
Air quality (AQI) chip with colour levels
5-day forecast panel with wind, humidity, sunrise and sunset
Auto-detects your location, or set a city manually
°C / °F option
🎨 Look and feel
Multiple colour themes and a custom accent colour
Solid or glass style, with adjustable glass strength
Analog or digital clock, 12 h / 24 h
Auto dark mode at night (optional)
Editable greeting name
⚡ Productivity
Tasks and Focus timer buttons
Quick links dock
AI Tools menu (ChatGPT, Claude, Gemini, Perplexity, Copilot)
Google apps menu
Export / import settings as a backup

Every feature can be switched on or off from the Settings panel.

📦 Installation

Bloom Tab is not on the Chrome Web Store, so install it as an unpacked extension:

Download this repository (green Code button → Download ZIP) and unzip it.
Open Chrome and go to chrome://extensions.
Turn on Developer mode (top right).
Click Load unpacked and select the folder that contains manifest.json.
Open a new tab. Bloom Tab is now your start page. 🎉

Works in Chrome, Edge and other Chromium browsers. Voice search needs a browser with speech recognition support (Chrome or Edge). Brave and Opera do not support it.

Updating

Download the new version, replace the old folder, then click the reload icon on the extension card in chrome://extensions.

🔐 Permissions and privacy

Bloom Tab has no tracking, no analytics and no account. Settings, tasks and history are stored locally in your browser.

Permission	Why it is needed
geolocation	Find your city for the weather (optional, you can set a city manually)
api.open-meteo.com, geocoding-api.open-meteo.com	Weather and forecast data
air-quality-api.open-meteo.com	Air quality (AQI)
ipapi.co, ipwho.is, api.bigdatacloud.net	Approximate location when GPS is unavailable
suggestqueries.google.com	Search suggestions

Voice search uses your browser's speech recognition, which sends audio to the browser vendor's speech service. You will be asked for microphone permission the first time.

🗂️ Project structure
startpage/
├── manifest.json   # Extension manifest (Manifest V3)
├── newtab.html     # New tab page markup
├── style.css       # Themes and styling
├── script.js       # All the logic
└── photo.jpg       # Image used by the page
🛠️ Customize
Search engines: edit the ENGINES list in script.js.
Quick links / AI tools: edit the AI list and the shortcuts list in script.js.
Colours and styles: edit the CSS variables in style.css.
🗒️ Changelog
5.1 Fixed voice search (microphone permission and error messages)
5.0 Keyboard navigation, engine shortcuts, search history, smart answers, AQI
4.9 Search engines shown 3 per row
4.8 Added GitHub search
4.6 Day / night weather icon
4.5 Brighter suggestion box, same-size engine buttons, layering fix
📄 License

Released under the MIT License. Add a LICENSE file to the repo, or change this line to your preferred license.

Made with ❤️ by Ibrahim Khalil, Dhaka, Bangladesh
