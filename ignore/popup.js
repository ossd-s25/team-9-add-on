// Get references to the buttons and result div
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorBtn = document.getElementById('scissor');
const resultDiv = document.getElementById('result');

// Add event listeners for each button
rockBtn.addEventListener('click', () => play('rock'));
paperBtn.addEventListener('click', () => play('paper'));
scissorBtn.addEventListener('click', () => play('scissor'));

function play(userChoice) {
  const choices = ['rock', 'paper', 'scissor'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = '';

  // Determine the winner
  if (userChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissor') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissor' && computerChoice === 'paper')
  ) {
    result = "You win!";
  } else {
    result = "You lose!";
  }

  // Display the result
  resultDiv.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;
}