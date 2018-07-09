$(function(){

  // A massive list of variables
  const $holes = $('.hole');
  const $scoreP1 = $('#scoreP1');
  const $scoreP2 = $('#scoreP2');
  const $easy = $('#easy');
  const $medium = $('#medium');
  const $insane = $('#insane');
  const $startButton = $('.startButton');
  const $resetBtn = $('.resetBtn');
  const $timer = $('.countdown');
  const $howModal = $('#howModal');
  const $howToPlay = $('#howToPlay');
  const $close = $('.close');
  const $player1PopUp = $('#player1PopUp');
  const $p1ScoreDisplay = $('.p1ScoreDisplay');
  const $player2Start = $('#player2Start');
  const $player2PopUp = $('#player2PopUp');
  const $p2ScoreDisplay = $('.p2ScoreDisplay');
  const $playAgain = $('.playAgain');
  const $winner = $('.winner');
  const $bomb = new Audio('./sfx/explosion.mp3');
  const $laser = new Audio('./sfx/Laser.mp3');
  let timeUp = false;
  let lastHole;
  let p1Score = 0;
  let p2Score = 0;
  let difficulty = '';
  let timeRemaining = 15;
  let time;
  let gameStarted = false;
  let startGame1 = false;


  // autoplays background music.
  $('#backgroundMusic').get(0).play();

  //mutes all music but not sound effects
  $('.mute').on('click', function(){
    $('#backgroundMusic').get(0).pause();
  });

  //pop up instruction screen
  $howToPlay.on('click', function(){
    $howModal.css('display', 'block');
    $laser.play();
  });

  //close the pop instruction display
  $close.on('click', function(){
    $howModal.css('display', 'none');

  });
  //Start button to kick off the main game
  $startButton.on('click', function(){
    startGame();
    $('.game').on('click', function(){
      $laser.play();
    });
    $('.game').css('cursor', 'crosshair');
  });

  //Starts player 2 games and closes the pop up modal with P1 score
  $player2Start.on('click', function(){
    $player1PopUp.css('display', 'none');
    startGame2();
  });

  $playAgain.on('click', function(){
    $player2PopUp.css('display', 'none');
  });

  //difficulty level - pretty straightforward
  $easy.on('click', function(){
    difficulty = 'easy';
  });
  $medium.on('click', function(){
    difficulty = 'medium';
  });
  $insane.on('click', function(){
    difficulty = 'insane';
  });

  // starts and then stops the countdown display when the game begins
  function countdown(){
    const countdown = setInterval(function() {
      timeRemaining--;
      $timer.text(timeRemaining);
      if(timeRemaining === 0){
        clearInterval(countdown);
        gameStarted = false;
      }
    }, 1000);
  }

  // random time generator - finds a random number of milliseconds based on the level chosen
  function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // selects a random and then should make sure the same hole isn't selected twice in a row
  function randomHole($holes) {
    const index = Math.floor(Math.random() * $holes.length);
    const selectedHole = $holes[index];
    if(selectedHole === lastHole){
      return randomHole($holes);
    }
    lastHole = selectedHole;
    return selectedHole;
  }

  // 'Highlights' different balls (makes them coloured and vibrate) by changing
  // the class . Speed based on the difficulty level selected.
  function highlight(){
    if(difficulty === 'easy'){
      time = randomTime(800, 1000);
    } else if(difficulty === 'medium'){
      time = randomTime(500, 900);
    } else if(difficulty === 'insane'){
      time = randomTime(300, 500);
    } else {
      time = randomTime(700, 1000);
    }
    const hole = randomHole($holes);
    hole.classList.add('highlightedHole');
    setTimeout(() => {
      hole.classList.remove('highlightedHole');
      if(!timeUp)highlight();
    }, time);
  }

  // starts the first player's game and brings up the score on time up
  function startGame(){
    if(!gameStarted){
      gameStarted = true;
      startGame1 = true;
      $scoreP1.text(0);
      timeUp = false;
      p1Score = 0;
      highlight();
      countdown();
      setTimeout(() => {
        timeUp = true;
        $player1PopUp.css('display', 'block');
        $p1ScoreDisplay.text(p1Score);
      },15000);
    }
  }

  // starts the second player's game if the first player has finished
  function startGame2(){
    if(!gameStarted){
      timeRemaining = 15;
      startGame1 = false;
      gameStarted = true;
      $scoreP2.text(0);
      timeUp = false;
      p2Score = 0;
      highlight();
      countdown();
      findWinner();
    }
  }

  // finds the winner once the set time out is complete
  function findWinner(){
    setTimeout(() => {
      timeUp = true;
      $player2PopUp.css('display', 'block');
      $p2ScoreDisplay.text(p2Score);
      if (p1Score === p2Score){
        $winner.text('It\'s a draw!');
      } else if (p1Score > p2Score){
        $winner.text('Player 1 wins! You need more practice Player 2');
      } else {
        $winner.text('Player 2 wins! You need more practice Player 1');
      }
    },15000);
  }

  // When the game is in play and the highlighted hole class is called you can
  // click on it and it adds to score (also includes sfx)
  $('.game').on('click', '.highlightedHole',  function() {
    if(startGame1){
      p1Score++;
      $scoreP1.text(p1Score);
      $bomb.play();
    } else {
      p2Score++;
      $scoreP2.text(p2Score);
      $bomb.play();
    }
  });

  //Reset button. Just reloads the page. I broke it repeatedly trying to reset properly!
  $resetBtn.on('click', function(){
    location.reload();
  });

});



//Reset Button work in progress below:

// let gameTimeout;
// let gameTimeout2;
// let stopHighlighting;
// gameTimeout2 =
// gameTimeout =
// let stopHighlighting =
//
// clearInterval(countdown);
// clearTimeout(gameTimeout);
// clearTimeout(gameTimeout2);
// clearTimeout(stopHighlighting);
// startGame1 = false;
// gameStarted = false;
// $scoreP2.text(0);
// $scoreP1.text(0);
// p1Score = 0;
// p2Score = 0;
// difficulty = '';
// timeRemaining = 15;
// reset = true;





// // reset = true;
// timeUp = false;
// tally = 0;
// $scoreP1.text(tally);
// $scoreP2.text(tally);
// difficulty = '';
// timeRemaining = 15;
// startGame1 = false;
// gameStarted = false;
// $timer.text(timeRemaining);



// if(!timeUp){
// $startButton.prop('disabled', true);
// $startButton.prop('disabled', true);
// } else if (timeUp){
//   $startButton.prop('disabled', true);
//can't get it to turn back on again
// else {
//   $startButton.prop('disabled', false);
// }
