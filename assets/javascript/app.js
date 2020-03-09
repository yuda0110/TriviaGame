// https://www.classicfm.com/discover-music/latest/ultimate-classical-music-quiz/

$(document).ready(function () {
  const htmlContent = $('#content');

  const triviaGame = {
    gameState: null,

    qAndA: [
      {
        question: 'Which of these is NOT the subtitle of a Haydn symphony?',
        answers: {
          a1: 'Hornsignal',
          a2: 'Lamentatione',
          a3: 'Tragic',
          a4: 'Mercury'
        },
        correctAns: 'a3'
      },
      {
        question: 'Which of Elgar\'s Enigma Variations was partially inspired by a bulldog?',
        answers: {
          a1: 'Variation XI (G.R.S.)',
          a2: 'Variation I (C.A.E.)',
          a3: 'Variation XII (B.G.N.)',
          a4: 'Variation IX (Nimrod)'
        },
        correctAns: 'a1'
      },
      {
        question: 'Where was cellist Jaqueline du Pré born?',
        answers: {
          a1: 'Cheltenham',
          a2: 'Oxford',
          a3: 'Cambridge',
          a4: 'Cirencester'
        },
        correctAns: 'a2'
      }
    ],

    resetGame: function () {
      this.gameState = this.gameStateFactory();
    },

    gameStateFactory: function () {
      return {
        remainTime: 30000,
        correct: 0,
        incorrect: 0
      }
    }
  }; // =========== triviaGame END =============

  if (!triviaGame.gameState){
    triviaGame.resetGame();
  }

  $('#start').on('click', function () {
    const timeRemain = $('<p>');
    timeRemain.addClass('time-remain');
    timeRemain.text(`Time Remaining: Seconds`);

    htmlContent.empty().append(timeRemain);
  });

});