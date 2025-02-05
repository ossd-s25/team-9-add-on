let timerDuration = 25 * 60; 
let breakDuration = 5 * 60; 
let remainingTime = timerDuration;
let isRunning = false;
let interval = null;
let isWorkSession = true; 

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        switchSession(); 
      }
      updatePopup();
    }, 1000);
  }
}

function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}

function resetTimer() {
  stopTimer();
  isWorkSession = true;
  remainingTime = timerDuration;
  updatePopup();
}

function switchSession() {
  isWorkSession = !isWorkSession;
  remainingTime = isWorkSession ? timerDuration : breakDuration;
  updatePopup();
}

function updatePopup() {
  chrome.runtime.sendMessage({
    action: "update_timer",
    time: remainingTime,
    session: isWorkSession ? "Work" : "Break",
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "start") {
    startTimer();
  } else if (message.action === "stop") {
    stopTimer();
  } else if (message.action === "reset") {
    resetTimer();
  } else if (message.action === "skip") {
    switchSession();
  }
});