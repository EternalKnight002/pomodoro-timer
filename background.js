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
    clearInterval(timerInterval);
    chrome.storage.local.set({ isRunning: false });
}

// --- THE FIXED RESET FUNCTION ---
// This is better than the snippet you found because 
// it forces you back to "Focus" mode for a true fresh start.
function resetTimer() {
    pauseTimer();
    chrome.storage.local.get(["focusTime"], (res) => {
        const initialTime = (res.focusTime || 25) * 60;
        
        chrome.storage.local.set({
            timeLeft: initialTime,
            currentMode: "focus",  // FORCE Focus Mode (The fix)
            currentCycle: 1,       // FORCE Cycle 1 (The fix)
            isRunning: false
        });
        
        updateIcon(initialTime);
    });
}
// ---------------------------------

function switchMode() {
    pauseTimer();
    chrome.storage.local.get([
        "currentMode", "currentCycle", "cyclesToLongBreak",
        "focusTime", "breakTime", "longBreakTime"
    ], (res) => {
        let newMode, newTimeLeft, newCycle = res.currentCycle;
        let notificationTitle, notificationMessage;

        if (res.currentMode === "focus") {
            // Finished a focus session
            if (res.currentCycle >= res.cyclesToLongBreak) {
                // Time for a long break
                newMode = "longBreak";
                newTimeLeft = res.longBreakTime * 60;
                newCycle = 1; // Reset cycle count after a long break
                notificationTitle = "Time for a long break!";
                notificationMessage = `Great work! Take a ${res.longBreakTime}-minute rest.`;
            } else {
                // Time for a short break
                newMode = "break";
                newTimeLeft = res.breakTime * 60;
                notificationTitle = "Focus session over!";
                notificationMessage = `Time for a ${res.breakTime}-minute break.`;
            }
        } else {
            // Finished a break (short or long), start next focus session
            newMode = "focus";
            newTimeLeft = res.focusTime * 60;
            // Increment cycle only if coming from a short break
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