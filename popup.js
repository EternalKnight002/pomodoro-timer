// Timer elements
const timerDisplay = document.getElementById("timer-display");
const modeTitle = document.getElementById("mode-title");
const cycleDisplay = document.getElementById("cycle-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

// Options elements
const optionsBtn = document.getElementById("options-btn");
const optionsContainer = document.getElementById("options-container");
const focusTimeInput = document.getElementById("focus-time");
const breakTimeInput = document.getElementById("break-time");
const longBreakTimeInput = document.getElementById("long-break-time");
const cyclesToLongBreakInput = document.getElementById("cycles-to-long-break");
const saveOptionsBtn = document.getElementById("save-options-btn");

// Toggle options visibility
optionsBtn.addEventListener("click", () => {
    const isHidden = optionsContainer.style.maxHeight === "0px" || !optionsContainer.style.maxHeight;
    optionsContainer.style.maxHeight = isHidden ? "200px" : "0px";
});

// Save options to chrome.storage
saveOptionsBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        focusTime: focusTimeInput.value,
        breakTime: breakTimeInput.value,
        longBreakTime: longBreakTimeInput.value,
        cyclesToLongBreak: cyclesToLongBreakInput.value,
    });
    optionsBtn.click();
});

// Load saved options when popup opens
chrome.storage.local.get(["focusTime", "breakTime", "longBreakTime", "cyclesToLongBreak"], (res) => {
    focusTimeInput.value = res.focusTime || 25;
    breakTimeInput.value = res.breakTime || 5;
    longBreakTimeInput.value = res.longBreakTime || 15;
    cyclesToLongBreakInput.value = res.cyclesToLongBreak || 4;
});

// Send commands to background script
startBtn.addEventListener("click", () => chrome.runtime.sendMessage({ command: "start" }));
pauseBtn.addEventListener("click", () => chrome.runtime.sendMessage({ command: "pause" }));
resetBtn.addEventListener("click", () => chrome.runtime.sendMessage({ command: "reset" }));

// Update display every 100ms
setInterval(updateDisplay, 100);

function updateDisplay() {
    chrome.storage.local.get(["timeLeft", "isRunning", "currentMode", "currentCycle", "cyclesToLongBreak"], (res) => {
        const minutes = Math.floor(res.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (res.timeLeft % 60).toString().padStart(2, '0');
        
        timerDisplay.textContent = `${minutes}:${seconds}`;
        
        let title = "Focus Time";
        if (res.currentMode === "break") title = "Short Break";
        if (res.currentMode === "longBreak") title = "Long Break";
        modeTitle.textContent = title;
        
        cycleDisplay.textContent = `Cycle: ${res.currentCycle || 1}/${res.cyclesToLongBreak || 4}`;
        
        startBtn.disabled = res.isRunning;
        pauseBtn.disabled = !res.isRunning;
    });
}

updateDisplay();