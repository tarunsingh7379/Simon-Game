var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  buttonAnimate(userChosenColor);
  buttonSound(userChosenColor);
  $("#" + userChosenColor).fadeOut(100).fadeIn(100);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimate(randomChosenColor);
  buttonSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  level++;
  $("h1").text("Level " + level);
}

function buttonAnimate(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function buttonSound(currentColor) {
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}

function checkAnswer(currentChoice) {
  if(gamePattern[currentChoice] === userClickedPattern[currentChoice]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }else {
    gameOver();
    restart();
  }
}

function gameOver(){
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200)

  buttonSound("wrong");
  $("h1").text("Game Over, Press Any Key To Start Again!");
}

function restart() {
  level = 0;
  gamePattern = [];
  started = false;
}
