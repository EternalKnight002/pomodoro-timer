chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'play-sound') {
        const audio = new Audio(msg.source);
        audio.play();
    }
});