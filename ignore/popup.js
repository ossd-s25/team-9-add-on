document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timer");
    const sessionInfoDisplay = document.getElementById("session-info");
    const startStopBtn = document.getElementById("startStopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const skipBtn = document.getElementById("skipBtn");
  
    // Update the display based on the state object.
    function updateDisplay(state) {
      const minutes = Math.floor(state.remainingTime / 60);
      const seconds = state.remainingTime % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
      // Also display the current session duration.
      const sessionMinutes = Math.floor(state.currentSessionTime / 60);
      const sessionSeconds = state.currentSessionTime % 60;
      sessionInfoDisplay.textContent = `Session Duration: ${sessionMinutes.toString().padStart(2, "0")}:${sessionSeconds.toString().padStart(2, "0")}`;
  
      startStopBtn.textContent = state.running ? "Pause" : "Start";
    }
  
    // Request the current state from the background script on popup load.
    browser.runtime.sendMessage({ command: "getState" }).then((state) => {
      updateDisplay(state);
    });
  
    // Listen for update messages from the background.
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "update") {
        updateDisplay(message.state);
      }
    });
  
    // Button event listeners:
    startStopBtn.addEventListener("click", () => {
      const cmd = startStopBtn.textContent === "Start" ? "startTimer" : "pauseTimer";
      browser.runtime.sendMessage({ command: cmd }).then((state) => {
        updateDisplay(state);
      });
    });
  
    resetBtn.addEventListener("click", () => {
      browser.runtime.sendMessage({ command: "resetTimer" }).then((state) => {
        updateDisplay(state);
      });
    });
  
    skipBtn.addEventListener("click", () => {
      browser.runtime.sendMessage({ command: "toggleSession" }).then((state) => {
        updateDisplay(state);
      });
    });
  });