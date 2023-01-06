const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak 
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `;
}

// Check message against the number
function checkNumber(msg){
  const num = +msg;
  // adding +before the variable converts the string to a number 

  // Ceck if it's a valid number 
  if(Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is a not a valid number</div>';
    return;
  }

  // Check if the stated number is in range 
  if(num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
  }

  // check if number

  if(num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You've guessed the number correctly!<br><br>
    It was indeed ${num}!</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if(num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

function getRandomNumber(){
  return Math.floor(Math.random() * 100) + 1;

}

// Speak result 
recognition.addEventListener('result', onSpeak);

 // End SR service
 recognition.addEventListener('end', () => recognition.start());

 // Play again function
 document.body.addEventListener('click', (e) => {
  if(e.target.id == 'play-again') {
    window.location.reload();
  }
 }); 