# Pomodoro Focus Timer 🍅

A sleek Chrome extension that helps you master the Pomodoro Technique and supercharge your productivity. Work smarter with customizable focus sessions, intelligent break scheduling, and persistent timer tracking.

## Why Use This Timer?

- *Never Lose Your Flow*: Timer runs persistently in the background - close the popup, switch tabs, minimize Chrome, your session continues
- *Smart Break Management*: Automatically cycles through short and long breaks based on your work patterns
- *Audible Alerts*: Notification sounds ensure you never miss the end of a session
- *Visual Progress Tracking*: Badge counter and cycle indicators keep you informed at a glance
- *Fully Customizable*: Adjust every aspect of your workflow to match your personal productivity style

## Features

### Core Functionality
- ⏱ *Classic Pomodoro Timer* - Default 25-minute focus sessions with smart break intervals
- 🔔 *Audio Notifications* - Alarm plays when sessions complete, even with popup closed
- 🎯 *Intelligent Mode Switching* - Seamless transitions between focus, short breaks, and long breaks
- 🔄 *Persistent State* - Your timer keeps running in the background
- 📊 *Cycle Tracking* - Visual progress through your focus cycles (e.g., "Cycle: 2/4")
- 🎨 *Modern Dark UI* - Clean, distraction-free interface designed for focus

### Customization
- ⚙ *Flexible Settings* - Customize all timer durations to fit your workflow
- 🎚 *Adjustable Cycles* - Set how many focus sessions before a long break
- 💾 *Saved Preferences* - Your settings persist across browser sessions

### Technical Highlights
- 🔧 Built with *Manifest V3* - Latest Chrome extension standard
- 🚀 *Lightweight & Fast* - Pure vanilla JavaScript, no heavy frameworks
- 🎵 *Reliable Audio Playback* - Uses Chrome's Offscreen API for consistent sound delivery
- 📱 *Desktop Notifications* - System-level alerts when sessions complete

## Installation

### From Chrome Web Store
Coming soon!

### Manual Installation (Developer Mode)

1. *Clone the repository*
   bash
   git clone https://github.com/EternalKnight002/pomodoro-timer.git
   cd pomodoro-timer
   

2. *Load into Chrome*
   - Open Chrome and navigate to chrome://extensions/
   - Enable *Developer mode* (toggle in top-right corner)
   - Click *Load unpacked*
   - Select the pomodoro-timer folder
   - The extension icon will appear in your toolbar

## Getting Started

### Basic Workflow

1. *Start Your Session*
   - Click the Pomodoro extension icon
   - Press the *Start* button to begin a 25-minute focus session
   - Close the popup and get to work - the timer continues running

2. *Take Your Break*
   - When the alarm sounds, you've completed a focus session
   - A 5-minute short break automatically begins
   - Repeat this process

3. *Long Break*
   - After 4 focus sessions, enjoy a 15-minute long break
   - Cycle counter resets and you start fresh

### Timer Controls

| Button | Function |
|--------|----------|
| *Start* | Begin or resume the timer (also stops any playing alarm) |
| *Pause* | Temporarily pause the current session |
| *Reset* | Reset timer to the beginning of current mode (also stops alarm) |

### Customizing Your Timer

1. Click *Settings* in the popup
2. Adjust your preferred durations:
   - *Focus Time* - Duration of work sessions (default: 25 minutes)
   - *Break Time* - Duration of short breaks (default: 5 minutes)
   - *Long Break Time* - Duration of long breaks (default: 15 minutes)
   - *Cycles for Long Break* - Focus sessions before long break (default: 4)
3. Click *Save* to apply changes (timer will reset with new settings)

## How It Works

### Automatic Cycling

The timer intelligently switches between modes:


Focus (25min) → Short Break (5min) → Focus → Short Break → Focus → Short Break → Focus → Long Break (15min) → Repeat
  Cycle 1          ↓                Cycle 2      ↓          Cycle 3      ↓          Cycle 4        ↓


### Persistent Background Operation

- Timer runs in a *Chrome service worker* (background script)
- Countdown continues even when popup is closed
- Badge counter on extension icon shows minutes remaining
- Desktop notifications alert you when sessions complete
- Audio plays through Chrome's Offscreen API for reliability

## Project Structure


pomodoro-timer/
├── manifest.json        
├── background.js        
├── popup.html           
├── popup.js             
├── offscreen.html       
├── offscreen.js         
├── alarm.mp3            
├── icons/               
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
└── LICENSE


## Technical Details

### Built With

- *Chrome Extension Manifest V3* - Modern extension architecture
- *Vanilla JavaScript* - No dependencies, fast and efficient
- *Tailwind CSS* - Utility-first styling via CDN
- *Chrome Storage API* - Persistent settings and state
- *Chrome Notifications API* - System notifications
- *Chrome Offscreen API* - Reliable audio playback
- *Chrome Action API* - Badge counter display

### Key Components

*background.js* - Core timer engine
- Manages countdown logic with 1-second intervals
- Handles mode switching between focus/break sessions
- Orchestrates audio playback via offscreen document
- Updates badge counter on extension icon
- Listens for commands from popup (start/pause/reset)

*popup.js* - User interface controller
- Real-time display updates (100ms refresh rate)
- Settings management and persistence
- Button state management
- Event handling for user interactions

*offscreen.js* - Audio playback handler
- Creates and controls Audio objects
- Plays notification sounds on command
- Runs in hidden HTML document for DOM access

### Chrome Permissions

| Permission | Purpose |
|------------|---------|
| storage | Save timer settings and state |
| notifications | Desktop alerts when sessions complete |
| alarms | Background timer event management |
| offscreen | Hidden document for audio playback |

## Default Settings

| Setting | Duration |
|---------|----------|
| Focus Session | 25 minutes |
| Short Break | 5 minutes |
| Long Break | 15 minutes |
| Cycles to Long Break | 4 |

These align with the traditional Pomodoro Technique but can be customized to your preferences.

## Contributing

Contributions are welcome! Here's how to get involved:

1. *Fork* the repository
2. *Create* a feature branch (git checkout -b feature/AmazingFeature)
3. *Commit* your changes (git commit -m 'Add some AmazingFeature')
4. *Push* to the branch (git push origin feature/AmazingFeature)
5. *Open* a Pull Request

### Ideas for Contributions
- Task list integration
- Productivity statistics and analytics
- Customizable notification sounds
- Multiple timer presets
- Light/dark theme options
- Settings sync across devices
- Daily/weekly reports
- Keyboard shortcuts
- Gamification features

## Roadmap

- [ ] Task management integration
- [ ] Statistics dashboard with charts
- [ ] Custom notification sounds
- [ ] Preset timer configurations
- [ ] Theme customization options
- [ ] Cloud sync for settings
- [ ] Productivity insights and trends
- [ ] Browser action keyboard shortcuts
- [ ] Sound volume control

## Troubleshooting

*Timer stops when I close the popup*
- This shouldn't happen - the timer runs in the background. Try disabling and re-enabling the extension.

*No sound playing*
- Check Chrome notification settings for the extension
- Ensure system volume is not muted
- Verify browser has permission to play audio

*Badge counter not updating*
- Refresh the extensions page: chrome://extensions/
- Try clicking the extension icon to trigger an update

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

*EternalKnight002*
- GitHub: [@EternalKnight002](https://github.com/EternalKnight002)

## Acknowledgments

- 🎵 Notification sound by [Universfield](https://pixabay.com/users/universfield-28281460/) from Pixabay
- 🍅 Inspired by the [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) by Francesco Cirillo
- 🎨 UI styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

Found a bug or have a feature request? Please [open an issue](https://github.com/EternalKnight002/pomodoro-timer/issues) on GitHub.

---

⭐ *If this extension helps you stay focused, please star the repository!*

💬 Questions? Feedback? Open a discussion or issue on GitHub.
