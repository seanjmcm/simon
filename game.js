var  gamePattern = [];
var userClickedPattern =[];

var buttonColours  = ["red", "blue", "green", "yellow"];
var level=0;

$(document).keypress(function(){

    
    if (level ===0){
        $("h1").text("Level " + level.toString() );
        nextSequence();}

    
})


function nextSequence(){
    $("h1").text("Level " + level.toString() );
    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("sounds/"+randomChosenColour+".mp3")
    console.log("sounds/"+randomChosenColour+".mp3");
    level++;
    return randomNumber;
}



var userChosenColour ;

$(".btn").click( function(e){
    userChosenColour= e.target.id;
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound("sounds/"+userChosenColour+".mp3")
    ainmatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function playSound(name){
    var sound = new Audio(name);
    sound.play();
}

function ainmatePress(currentColour){
    console.log("div#" +currentColour);
    $("div#" +currentColour ).addClass("pressed");
    setTimeout( function () {
        $("#" +currentColour ).removeClass("pressed");
      }, 400);
}

function checkAnswer(currentLevel){

var kilo = true  ;  
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel == 10){
        playSound("sounds/winner.wav")
        $("body" ).addClass("winner");
        setTimeout( function () {
            $("body" ).removeClass("winner");
        }, 6000);
      $("h1").text("You are the Winner, Press Any Key to Restart "  );  
      startOver();
      kilo =false;
    }

}   else{
    console.log("wrong");
    playSound("sounds/wrong.mp3")
    $("body" ).addClass("game-over");
    setTimeout( function () {
        $("body" ).removeClass("game-over");
      }, 400);
      $("h1").text("Game Over, Press Any Key to Restart "  );  
      startOver();
      kilo =false;

}

if (userClickedPattern.length=== gamePattern.length && kilo === true){
    setTimeout( function () {
        nextSequence();
      }, 500); 
}

}

function startOver(){
    level =0;
    gamePattern = [];
    userClickedPattern =[];
}
