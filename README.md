Pomodoro Focus Timer 🍅⏱️

A lightweight and elegant Chrome extension that implements the Pomodoro Technique to boost your productivity. Stay focused with customizable work sessions, breaks, and helpful notifications.

✨ Features

Classic Pomodoro Timer: Traditional 25-minute focus sessions with 5-minute breaks

Sound Alerts: Audio notifications when sessions end (plays even if the popup is closed)

Customizable Intervals: Adjust focus time, short breaks, and long breaks to your preference

Long Break System: Automatically triggers longer breaks after completing a set number of focus cycles

Visual Badge Counter: See remaining time at a glance on your extension icon

Desktop Notifications: Get notified when it's time to take a break or start focusing

Persistent State: Your timer continues running even if you close the popup

Dark Theme UI: Easy on the eyes with a modern dark interface

Cycle Tracking: Visual indicator showing your progress through focus cycles

🚀 Installation

Install from Source

Clone this repository:

git clone [https://github.com/EternalKnight002/pomodoro-timer.git](https://github.com/EternalKnight002/pomodoro-timer.git)


Open Chrome and navigate to chrome://extensions/

Enable Developer mode (toggle in the top-right corner)

Click Load unpacked and select the cloned repository folder

The Pomodoro Focus Timer icon should now appear in your extensions toolbar!

🎯 How to Use

Basic Usage

Click the extension icon to open the timer popup

Press Start to begin your focus session

Work until the timer completes and the alarm plays

Take a break when notified

Repeat!

Customizing Settings

Click Settings in the popup

Adjust the following parameters:

Focus Time: Duration of work sessions (default: 25 minutes)

Break Time: Duration of short breaks (default: 5 minutes)

Long Break Time: Duration of long breaks (default: 15 minutes)

Cycles for Long Break: Number of focus sessions before a long break (default: 4)

Click Save to apply your changes (timer will reset to apply new settings)

Controls

Start: Begin or resume the timer (stops alarm if ringing)

Pause: Pause the current session

Reset: Reset the timer to the beginning of the current mode (stops alarm if ringing)

🏗️ Project Structure

pomodoro-timer/
├── manifest.json        # Extension configuration
├── background.js        # Service worker handling timer logic
├── popup.html           # Extension popup interface
├── popup.js             # Popup UI logic and event handlers
├── offscreen.html       # Hidden document for audio playback
├── offscreen.js         # Audio playback logic
└── icons/
    ├── icon16.png       # 16x16 icon
    ├── icon48.png       # 48x48 icon
    └── icon128.png      # 128x128 icon


🛠️ Technical Details

Built With

Manifest V3: Latest Chrome extension standard

Vanilla JavaScript: No frameworks needed, lightweight and fast

Tailwind CSS: Modern utility-first styling via CDN

Chrome Storage API: Persistent data storage

Chrome Notifications API: Desktop notifications

Chrome Alarms API: Background timer management

Chrome Offscreen API: DOM access for audio playback

Key Components

background.js

Service worker that runs in the background

Manages timer state and countdown logic

Handles mode switching (focus → break → long break)

orchestrates audio playback via the Offscreen API

offscreen.js

Runs in a hidden HTML document

Handles the Audio object to play MP3 files

Listens for play/stop commands from the background script

popup.js

Manages the user interface

Handles user interactions (start, pause, reset)

Updates display in real-time

Manages settings configuration

📋 Default Pomodoro Settings

Setting

Duration

Focus Session

25 minutes

Short Break

5 minutes

Long Break

15 minutes

Cycles to Long Break

4

🎨 Features in Detail

Automatic Mode Switching

The timer automatically cycles through:

Focus → Short Break (after each focus session)

Short Break → Focus (cycles 1-3)

Focus → Long Break (after 4th focus session)

Long Break → Focus (resets cycle count)

Persistent Timer

Your timer continues running in the background even when:

The popup is closed

You're browsing other tabs

Chrome is minimized

Visual Feedback

Badge counter shows minutes remaining

Mode title changes based on current session type

Cycle counter displays progress (e.g., "Cycle: 2/4")

🔒 Permissions

This extension requires the following permissions:

storage: Save your timer settings and state

notifications: Alert you when sessions complete

alarms: Manage background timer events

offscreen: Create hidden documents to play notification sounds

🤝 Contributing

Contributions are welcome! Here's how you can help:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

💡 Future Enhancements

[ ] Task list integration

[ ] Statistics and productivity tracking

[ ] Sound alerts (customizable)

[ ] Multiple timer presets

[ ] Dark/Light theme toggle

[ ] Sync settings across devices

[ ] Daily/weekly productivity reports

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author

EternalKnight002

GitHub: @EternalKnight002

🙏 Acknowledgments

Notification sound by Universfield from Pixabay

Inspired by the Pomodoro Technique by Francesco Cirillo

UI styled with Tailwind CSS

⭐ If you find this extension helpful, please consider giving it a star!

📞 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.