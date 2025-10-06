# Pomodoro Focus Timer 🍅⏱️

A lightweight and elegant Chrome extension that implements the Pomodoro Technique to boost your productivity. Stay focused with customizable work sessions, breaks, and helpful notifications.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Classic Pomodoro Timer**: Traditional 25-minute focus sessions with 5-minute breaks
- **Customizable Intervals**: Adjust focus time, short breaks, and long breaks to your preference
- **Long Break System**: Automatically triggers longer breaks after completing a set number of focus cycles
- **Visual Badge Counter**: See remaining time at a glance on your extension icon
- **Desktop Notifications**: Get notified when it's time to take a break or start focusing
- **Persistent State**: Your timer continues running even if you close the popup
- **Dark Theme UI**: Easy on the eyes with a modern dark interface
- **Cycle Tracking**: Visual indicator showing your progress through focus cycles

## 🚀 Installation

### Install from Source

1. Clone this repository:
   ```bash
   git clone https://github.com/EternalKnight002/pomodoro-timer.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in the top-right corner)

4. Click **Load unpacked** and select the cloned repository folder

5. The Pomodoro Focus Timer icon should now appear in your extensions toolbar!

## 🎯 How to Use

### Basic Usage

1. Click the extension icon to open the timer popup
2. Press **Start** to begin your focus session
3. Work until the timer completes
4. Take a break when notified
5. Repeat!

### Customizing Settings

1. Click **Settings** in the popup
2. Adjust the following parameters:
   - **Focus Time**: Duration of work sessions (default: 25 minutes)
   - **Break Time**: Duration of short breaks (default: 5 minutes)
   - **Long Break Time**: Duration of long breaks (default: 15 minutes)
   - **Cycles for Long Break**: Number of focus sessions before a long break (default: 4)
3. Click **Save** to apply your changes

### Controls

- **Start**: Begin or resume the timer
- **Pause**: Pause the current session
- **Reset**: Reset the timer to the beginning of the current mode

## 🏗️ Project Structure

```
pomodoro-timer/
├── manifest.json        # Extension configuration
├── background.js        # Service worker handling timer logic
├── popup.html          # Extension popup interface
├── popup.js            # Popup UI logic and event handlers
└── icons/
    ├── icon16.png      # 16x16 icon
    ├── icon48.png      # 48x48 icon
    └── icon128.png     # 128x128 icon
```

## 🛠️ Technical Details

### Built With

- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: No frameworks needed, lightweight and fast
- **Tailwind CSS**: Modern utility-first styling via CDN
- **Chrome Storage API**: Persistent data storage
- **Chrome Notifications API**: Desktop notifications
- **Chrome Alarms API**: Background timer management

### Key Components

**background.js**
- Service worker that runs in the background
- Manages timer state and countdown logic
- Handles mode switching (focus → break → long break)
- Sends notifications when sessions complete
- Updates extension badge with remaining time

**popup.js**
- Manages the user interface
- Handles user interactions (start, pause, reset)
- Updates display in real-time
- Manages settings configuration

## 📋 Default Pomodoro Settings

| Setting | Duration |
|---------|----------|
| Focus Session | 25 minutes |
| Short Break | 5 minutes |
| Long Break | 15 minutes |
| Cycles to Long Break | 4 |

## 🎨 Features in Detail

### Automatic Mode Switching
The timer automatically cycles through:
1. **Focus** → Short Break (after each focus session)
2. **Short Break** → Focus (cycles 1-3)
3. **Focus** → Long Break (after 4th focus session)
4. **Long Break** → Focus (resets cycle count)

### Persistent Timer
Your timer continues running in the background even when:
- The popup is closed
- You're browsing other tabs
- Chrome is minimized

### Visual Feedback
- Badge counter shows minutes remaining
- Mode title changes based on current session type
- Cycle counter displays progress (e.g., "Cycle: 2/4")

## 🔒 Permissions

This extension requires the following permissions:

- **storage**: Save your timer settings and state
- **notifications**: Alert you when sessions complete
- **alarms**: Manage background timer events

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Future Enhancements

- [ ] Task list integration
- [ ] Statistics and productivity tracking
- [ ] Sound alerts (customizable)
- [ ] Multiple timer presets
- [ ] Dark/Light theme toggle
- [ ] Sync settings across devices
- [ ] Daily/weekly productivity reports

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**EternalKnight002**
- GitHub: [@EternalKnight002](https://github.com/EternalKnight002)

## 🙏 Acknowledgments

- Inspired by the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) by Francesco Cirillo
- UI styled with [Tailwind CSS](https://tailwindcss.com/)

---

⭐ If you find this extension helpful, please consider giving it a star!

## 📞 Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/EternalKnight002/pomodoro-timer/issues) on GitHub.
