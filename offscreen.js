let audio = null;

chrome.runtime.onMessage.addListener((msg) => {
    // Play command
    if (msg.type === 'play-sound') {
        // If audio is already playing, stop it first
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio = new Audio(msg.source);
        audio.play();
    } 
    // Stop command
    else if (msg.type === 'stop-sound') {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
});