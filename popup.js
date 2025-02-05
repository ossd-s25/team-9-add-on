document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer");
  const sessionInfo = document.getElementById("session-info");
  const startStopBtn = document.getElementById("startStopBtn");
  const resetBtn = document.getElementById("resetBtn");
  const skipBtn = document.getElementById("skipBtn");

  let isRunning = false;

  function updateDisplay(time, session) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    sessionInfo.textContent = `Session: ${session}`;
    startStopBtn.textContent = isRunning ? "Pause" : "Start";
  }

  startStopBtn.addEventListener("click", () => {
    isRunning = !isRunning;
    chrome.runtime.sendMessage({ action: isRunning ? "start" : "stop" });
    startStopBtn.textContent = isRunning ? "Pause" : "Start";
  });

  resetBtn.addEventListener("click", () => {
    isRunning = false;
    chrome.runtime.sendMessage({ action: "reset" });
    startStopBtn.textContent = "Start";
  });

  skipBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "skip" });
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "update_timer") {
      updateDisplay(message.time, message.session);
    }
  });

  chrome.runtime.sendMessage({ action: "update_popup" });
});
