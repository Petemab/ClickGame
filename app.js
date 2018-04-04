$(function(){

  //
  const $holes = $('.hole');
  const $scoreP1 = $('#scoreP1');
  const $scoreP2 = $('#scoreP2');
  const $easy = $('#easy');
  const $medium = $('#medium');
  const $insane = $('#insane');
  const $startButton = $('.startButton');
  // const $highlightedHole = $('.highlightedHole');
  const $resetBtn = $('.resetBtn');
  const $timer = $('.countdown');
  let timeUp = false;
  let lastHole;
  let tally = 0;
  let difficulty = '';
  let timeRemaining = 15;
  let time;
  let gameStarted = false;
  let startGame1 = false;
  // let reset = false;
  // const startGame2 = false;
  // let timerValue = null;
  // let timeIsRunning = false;
  const $howModal = $('#howModal');
  const $howToPlay = $('#howToPlay');
  const $close = $('.close');
  const $player1Score = $('#player1Score');
  const $p1ScoreDisplay = $('.p1ScoreDisplay');
  const $player2Start = $('#player2Start');
  const $player2Score = $('#player2Score');
  const $p2ScoreDisplay = $('.p2ScoreDisplay');
  const $playAgain = $('.playAgain');
  const $winner = $('.winner');

  //pop up insruction screen
  $howToPlay.on('click', function(){
    $howModal.css('display', 'block');
  });

  $close.on('click', function(){
    $howModal.css('display', 'none');

  });
  //Start button
  $startButton.on('click', function(){
    startGame();
  });

  $player2Start.on('click', function(){
    $player1Score.css('display', 'none');
    startGame2();
  });

  $playAgain.on('click', function(){
    $player2Score.css('display', 'none');
  });

  //levels
  $easy.on('click', function(){
    difficulty = 'easy';
    console.log(difficulty);
  });
  $medium.on('click', function(){
    difficulty = 'medium';
    console.log(difficulty);
  });
  $insane.on('click', function(){
    difficulty = 'insane';
    console.log(difficulty);

  });

  function countdown(){
    const countdown = setInterval(function() {
      timeRemaining--;
      console.log(timeRemaining);
      $timer.text(timeRemaining);
      if(timeRemaining === 0){
        console.log('Stop counting down now please');
        clearInterval(countdown);
        gameStarted = false;
      }
    }, 1000);

  }

  // random time generator
  function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // console.log(randomTime(200, 800));

  function randomHole($holes) {
    const index = Math.floor(Math.random() * $holes.length);
    const selectedHole = $holes[index];
    if(selectedHole === lastHole){
      return randomHole($holes);
    }
    lastHole = selectedHole;
    return selectedHole;
  }


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
    console.log(time);
    // const time = randomTime(600, 1000);
    const hole = randomHole($holes);
    // console.log(time, hole);
    hole.classList.add('highlightedHole');
    setTimeout(() => {
      hole.classList.remove('highlightedHole');
      if(!timeUp)highlight();
    }, time);
  }
  // highlight();

  function startGame(){
    if(!gameStarted){
      gameStarted = true;
      startGame1 = true;
      $scoreP1.text(0);
      timeUp = false;
      tally = 0;
      highlight();
      countdown();
      setTimeout(() => {
        timeUp = true;
        $player1Score.css('display', 'block');
        $p1ScoreDisplay.text(tally);
      },15000);
    }

    console.log(timeUp);

  }

  function startGame2(){
    if(!gameStarted){
      timeRemaining = 15;
      startGame1 = false;
      gameStarted = true;
      $scoreP2.text(0);
      timeUp = false;
      tally = 0;
      highlight();
      countdown();
      setTimeout(() => {
        timeUp = true;
        $player2Score.css('display', 'block');
        $p2ScoreDisplay.text(tally);
        if ($scoreP1 === $scoreP2){
          $winner.text('It\'s a draw!');
        } else if ($scoreP1 > $scoreP2){
          $winner.text('Player 1 wins! You need more practice Player 2');
        } else {
          $winner.text('Player 2 wins! You need more practice Player 1');
        }
      },15000);
    }

    console.log(timeUp);

  }


  // EVENT DELEGATION??

  $('.game').on('click', '.highlightedHole',  function() {
    if(startGame1){
      tally++;
      console.log(tally);
      $scoreP1.text(tally);
    } else {
      tally++;
      $scoreP2.text(tally);
    }
  });

  $resetBtn.on('click', function(){
    location.reload();
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
  });



});


// if(!timeUp){
// $startButton.prop('disabled', true);
// $startButton.prop('disabled', true);
// } else if (timeUp){
//   $startButton.prop('disabled', true);
//can't get it to turn back on again
// else {
//   $startButton.prop('disabled', false);
// }



// changes colour of the circles when clicked
// $holes.on('click', function() {
//   $(this).css('background', 'grey');
// });
//
// // randomly selects a circle
// $startButton.on('click', function() {
//   setTimeout(function(){
//     console.log('Time\'s Up!');
//   }, 5000);
// });
//
// $startButton.on('click', function() {
//   setInterval(function() {
//     const index = Math.floor(Math.random() * $holes.length);
//     const selectedHole = $holes[index];
//     console.log(selectedHole);
//     //below control the length of time
//   }, randomTime(300, 900));
// });
// $(selectedHole).css('background', 'orange');
//
// const $holes = ('hole')
//
// //random time function
// function randonTime(min, max){
//  return Math.round(Math.random() * (max - min) + min)

//
//

// }


// function hit(e){
//   console.log(e, 'hit!');
//   tally++;
//   // insert the text here
// }

// countdown function

// $startButton.on('click', setInterval(function(){
//
//   const index = Math.floor(Math.random() * $holes.length);
//
//   const selectedHole = $holes[index];
//
//   $(selectedHole).css('background', 'orange');
//
// }, 500));
