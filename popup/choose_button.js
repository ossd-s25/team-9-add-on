let totalSeconds = 120; // 2 minutes
        let countdownId = null;

        function updateDisplay() {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
            let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
            document.getElementById("timer").textContent = `${displayMinutes}:${displaySeconds}`;
        }

        function startCountdown() {
            if (countdownId !== null) return; // Prevent multiple intervals

            countdownId = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateDisplay();
                } else {
                    clearInterval(countdownId);
                    countdownId = null;
                    alert("Time's up!");
                }
            }, 1000);
        }

        function pauseCountdown() {
            clearInterval(countdownId);
            countdownId = null;
        }

        function restartCountdown() {
            clearInterval(countdownId);
            countdownId = null;
            totalSeconds = 120; // Reset to 2 minutes
            updateDisplay();
        }

        updateDisplay(); // Ensure correct display on load