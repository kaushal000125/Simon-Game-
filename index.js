alert("Welcome!");
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var s = false;

$(document).keypress(function() {
  if (!s) {
    $("#level-title").text("Level " + level);
    nextSequence();
    s = true;
  }
});


//step-4
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//step-7
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



function nextSequence() {
  userClickedPattern = [];
  //step-2
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //step-3
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //var audio=new Audio("sounds/"+ randomChosenColour +".mp3" );
  //audio.play();
  playSound(randomChosenColour);
}


//step-5
function playSound(name) {
  //  $("#name").fadeOut(100).fadeIn(100).fadeOut(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// step-6
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//step-10
function startOver() {
  level = 0;
  gamePattern = [];
  s = false;
}
