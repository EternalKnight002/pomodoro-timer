// Initialize state from storage
chrome.storage.local.get([
    "focusTime", "breakTime", "longBreakTime", "cyclesToLongBreak",
    "currentMode", "isRunning", "timeLeft", "currentCycle"
], (res) => {
    chrome.storage.local.set({
        focusTime: "focusTime" in res ? res.focusTime : 25,
        breakTime: "breakTime" in res ? res.breakTime : 5,
        longBreakTime: "longBreakTime" in res ? res.longBreakTime : 15,
        cyclesToLongBreak: "cyclesToLongBreak" in res ? res.cyclesToLongBreak : 4,
        currentMode: "currentMode" in res ? res.currentMode : "focus",
        isRunning: "isRunning" in res ? res.isRunning : false,
        currentCycle: "currentCycle" in res ? res.currentCycle : 1,
        timeLeft: "timeLeft" in res ? res.timeLeft : (res.focusTime || 25) * 60,
    });
});

let timerInterval;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") startTimer();
    else if (request.command === "pause") pauseTimer();
    else if (request.command === "reset") resetTimer();
});

function startTimer() {
    stopNotificationSound();
    
    // Safety: Clear any existing timer to prevent "double speed" bug
    if (timerInterval) clearInterval(timerInterval);

    chrome.storage.local.set({ isRunning: true });
    
    timerInterval = setInterval(() => {
        chrome.storage.local.get("timeLeft", (res) => {
            if (res.timeLeft <= 0) {
                switchMode();
                return;
            }
            const newTimeLeft = res.timeLeft - 1;
            chrome.storage.local.set({ timeLeft: newTimeLeft });
            updateIcon(newTimeLeft);
        });
    }, 1000);
}

function pauseTimer() {
    if (timerInterval) clearInterval(timerInterval);
    chrome.storage.local.set({ isRunning: false });
}

function resetTimer() {
    stopNotificationSound();
    pauseTimer();
    
    // Fetch the latest 'focusTime' (supports the Save Settings feature)
    chrome.storage.local.get(["focusTime"], (res) => {
        const initialTime = (res.focusTime || 25) * 60;
        
        chrome.storage.local.set({
            timeLeft: initialTime,
            currentMode: "focus",
            currentCycle: 1,
            isRunning: false
        });
        
        updateIcon(initialTime);
    });
}

// --- AUDIO HANDLING ---
async function playNotificationSound() {
    const offscreenUrl = chrome.runtime.getURL('offscreen.html');
    
    // Check if offscreen document exists
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
    });

    if (existingContexts.length === 0) {
        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['AUDIO_PLAYBACK'],
            justification: 'Notification sound',
        });
    }

    // Send message to offscreen document to play audio
    chrome.runtime.sendMessage({ 
        type: 'play-sound', 
        source: 'alarm.mp3' 
    });
}
// ----------------------

function switchMode() {
    pauseTimer();
    
    // Play sound immediately when time is up
    playNotificationSound();

    chrome.storage.local.get([
        "currentMode", "currentCycle", "cyclesToLongBreak",
        "focusTime", "breakTime", "longBreakTime"
    ], (res) => {
        let newMode, newTimeLeft, newCycle = res.currentCycle;
        let notificationTitle, notificationMessage;

        if (res.currentMode === "focus") {
            if (res.currentCycle >= res.cyclesToLongBreak) {
                newMode = "longBreak";
                newTimeLeft = res.longBreakTime * 60;
                newCycle = 1;
                notificationTitle = "Time for a long break!";
                notificationMessage = `Great work! Take a ${res.longBreakTime}-minute rest.`;
            } else {
                newMode = "break";
                newTimeLeft = res.breakTime * 60;
                notificationTitle = "Focus session over!";
                notificationMessage = `Time for a ${res.breakTime}-minute break.`;
            }
        } else {
            newMode = "focus";
            newTimeLeft = res.focusTime * 60;
            if (res.currentMode === "break") newCycle = res.currentCycle + 1;
            notificationTitle = "Break is over!";
            notificationMessage = `Time to start your next ${res.focusTime}-minute focus session!`;
        }

        chrome.storage.local.set({
            currentMode: newMode,
            timeLeft: newTimeLeft,
            isRunning: false,
            currentCycle: newCycle,
        });

        chrome.notifications.create({
            type: "basic", iconUrl: "icons/icon128.png",
            title: notificationTitle, message: notificationMessage,
            priority: 2
        });
        updateIcon(newTimeLeft);
    });
}

function updateIcon(timeLeft) {
    const minutes = Math.ceil(timeLeft / 60);
    chrome.action.setBadgeText({ text: `${minutes}` });
    chrome.action.setBadgeBackgroundColor({ color: '#4A90E2' });
}

// --- HELPERS ---

function stopNotificationSound() {
    
    chrome.runtime.sendMessage({ type: 'stop-sound' }, () => {
        const error = chrome.runtime.lastError;
    });
}

// Listen for notification clicks to stop sound
chrome.notifications.onClicked.addListener(() => {
    stopNotificationSound();
});