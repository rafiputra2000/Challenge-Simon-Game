let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern =[];
let level = 0;
let started = false;

//Condingan melanjutkan ke level selanjutnya
function nextSequence(){
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    // $("#randomChosenColour").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    userClickedPattern = [];
    console.log(userClickedPattern);
    $("#level-title").html("level " + level);
 
}

//Codingan untuk start the game
$(document).keydown(function(){
    if(!started){
    $("#level-title").html("level " + level);
    nextSequence();
    started = true;
        
    }
});

//Saat di click maka trigger tombol akan menyala 
$(".btn").click(function(){
    // let userChosenColour = $(this).attr("id");
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    // console.log("user chosen colour = " + userChosenColour);
    // console.log(userClickedPattern.length - 1);
    checkAnswer(userClickedPattern.length-1);
    // console.log(gamePattern);
    // console.log("user clicked pattern = " + userClickedPattern);
    // console.log();
    console.log(userClickedPattern[userClickedPattern.length-1]);
    console.log(gamePattern[userClickedPattern.length-1]);
    // console.log(userClickedPattern.length);
    // console.log(gamePattern.length);
    
    
});

//Menjalankan codingan suara
function playSound(name){
    var soundPattern = new Audio("sounds/" + name + ".mp3");
    soundPattern.play();
}

//Animasi pada tombol
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    });
}

//Mengecek jawaban user apakah benar atau salah
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//Restart The game
function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
    
}

