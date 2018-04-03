$(function(){


  //
  const $holes = $('.hole');
  const $scoreP1 = $('#scoreP1');
  // const $scoreP2 = $('#scoreP2');
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
  // let timerValue = null;
  // let timeIsRunning = false;
  const $howModal = $('#howModal');
  const $howToPlay = $('#howToPlay');
  const $close = $('.close');


  $howToPlay.on('click', function(){
    $howModal.css('display', 'block');
  });

  $close.on('click', function(){
    $howModal.css('display', 'none');
  });


  $startButton.on('click', function(){
    startGame();
  });


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
      if(timeRemaining <= 0){
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
      $scoreP1.textContent = 0;
      timeUp = false;
      tally = 0;
      highlight();
      countdown();
      setTimeout(() => timeUp = true, 15000);
    }

    console.log(timeUp);

  }




  // EVENT DELEGATION??

  $('.game').on('click', '.highlightedHole',  function(e) {
    console.log('click on highlight');
    console.log(e);
    // if($holes.hasClass($highlightedHole)){
    tally++;
    console.log(tally);
    $scoreP1.text(tally);
    // }
  });

  $resetBtn.on('click', function(){
    $scoreP1.textContent = 0;
    timeUp = false;
    tally = 0;
    $scoreP1.text(tally);
    difficulty = '';
    timeRemaining = 15;
    $timer.text(timeRemaining);
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
