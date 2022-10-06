// stores the user clicked pattern which is updated every level
var userClickedPattern = [];

// random game pattern 
var gamePattern = [];

// button's color
let buttonColors = ["red", "blue", "green", "yellow"];

// stores the current level
var level = 0;

// used this as i used "A" as the starting point
var started = 0;


function reset(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = 0;
}
// next random color added to the gamepattern 
function nextSequence() {
  userClickedPattern = [];
  // generating random number 
  let randomNumber = Math.floor(Math.random() * 10) % 4;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // this the blinking effect 
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  // for playing sound
  var audio = new Audio(`./sounds/${randomChosenColor}.mp3`);

  audio.play();

  // increase level every time this function called
  level++;

  // updating the heading to the current level
  $("h1").text(`Level ${level}`);
}
// this variable is reset every level and go upto the current level (levelRound <= level)
let levelRound = 0;
// event listener for the all button's combined using jQuery
$(".btn").click(function (event) {
  // getting id of the clicked button
  if (started == 1) {
    
    
    var userChosenColor = event.target.id;

    userClickedPattern.push(userChosenColor);
    // playing sound
    playSound(userChosenColor);
    
    // increment levelRound
    levelRound++;

    // for the user
    if (level == levelRound) {
      levelRound = 0;
      // checking answer and if it is correct then move to next level
      if (checkAnswer(level)) {
        // console.log("success");
        setTimeout(() => {
          nextSequence();
        }, 350);
      }
      // logic if the answer is wrong
      else{
          let wrong = new Audio("./sounds/wrong.mp3");
          wrong.play();
          // for the game over effect adding and removing class
          $("body").addClass("game-over");
          setTimeout(function(){
              $("body").removeClass("game-over");
          }, 200)
          $("h1").text("Game over, Press A to restart");

          // reseting game
          started = 0;
          level = 0;
          levelRound = 0;
          userClickedPattern = [];
          gamePattern = [];
      }
    }
  }
});

// for playing sound 
function playSound(color) {
  animatePress(color);

  var audio = new Audio(`./sounds/${color}.mp3`);

  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (event) {
  if (event.key == 'a' || event.key == "A") {
    startGame(); 
  }
});

// for checking answer
function checkAnswer(level) {
    for (let num = 0; num < level; num++) {
        if (gamePattern[num] === userClickedPattern[num]) {
            var a;
          } 
          else{
            return false;
          }  
    }
  return true;
}

function startGame(){
  if (started == 0) {
    reset();
    nextSequence();
    started = 1;
  }
}
$("button").click(function(){
  reset();
    nextSequence();
    started = 1;
})