// Session durations in seconds.
const longSession = 25 * 60; // 25 minutes
const shortSession = 5 * 60; // 5 minutes

// Current session duration and timer variables.
let currentSessionTime = longSession; // start with 25 minutes
let remainingTime = currentSessionTime;
let running = false;
let timerInterval = null;

// Helper: Return the current state as an object.
function getState() {
  return {
    currentSessionTime,
    remainingTime,
    running
  };
}

// Broadcast an update to any listeners (like the popup).
function sendUpdate() {
  browser.runtime.sendMessage({ command: "update", state: getState() });
}

// Start the timer if not already running.
function startTimer() {
  if (!running) {
    running = true;
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        sendUpdate();
      } else {
        // When time is up, automatically restart the session with the current duration.
        remainingTime = currentSessionTime;
        sendUpdate();
      }
    }, 1000);
  }
}

// Pause the timer.
function pauseTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    sendUpdate();
  }
}

// Reset the timer to the current session duration.
function resetTimer() {
  pauseTimer();
  remainingTime = currentSessionTime;
  sendUpdate();
}

// Toggle the session duration between long (25 min) and short (5 min).
// If the timer was running, it will be restarted with the new duration.
function toggleSessionDuration() {
  const wasRunning = running;
  pauseTimer();
  // Toggle the duration.
  if (currentSessionTime === longSession) {
    currentSessionTime = shortSession;
  } else {
    currentSessionTime = longSession;
  }
  // Reset the timer to the new session duration.
  remainingTime = currentSessionTime;
  sendUpdate();
  // If the timer was running before, restart it.
  if (wasRunning) {
    startTimer();
  }
}

// Listen for messages from the popup.
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.command) {
    case "startTimer":
      startTimer();
      sendResponse(getState());
      break;
    case "pauseTimer":
      pauseTimer();
      sendResponse(getState());
      break;
    case "resetTimer":
      resetTimer();
      sendResponse(getState());
      break;
    case "toggleSession":
      toggleSessionDuration();
      sendResponse(getState());
      break;
    case "getState":
      sendResponse(getState());
      break;
    default:
      break;
  }
});