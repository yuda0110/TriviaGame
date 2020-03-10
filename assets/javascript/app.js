// https://www.classicfm.com/discover-music/latest/ultimate-classical-music-quiz/

// $(document).ready(function () {
  const htmlContent = $('#content');

  const triviaGame = {
    gameState: null,

    clockInterval: null,

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
      console.log(this.gameState);
    },

    gameStateFactory: function () {
      return {
        remainTime: 30,
        correct: 0,
        incorrect: 0,
        clockRunning: false,
        gameNum: 0
      }
    },

    clockStart: function () {
      if (!this.gameState.clockRunning) {
        this.clockInterval = setInterval(this.countTime, 1000);
        this.gameState.clockRunning = true;
      }
    },

    clockStop: function () {
      clearInterval(this.clockInterval);
      this.gameState.clockRunning = false;
    },

    countTime: function () {
      console.log('countTime gameState: ' + triviaGame.gameState);
      if (triviaGame.gameState.remainTime > 0) {
        triviaGame.gameState.remainTime = triviaGame.gameState.remainTime - 1;
        $('#current-time').text(triviaGame.gameState.remainTime);
      } else {
        triviaGame.clockStop();
      }
    },

    addGameNum: function () {
      this.gameState.gameNum++;
    }

  }; // =========== triviaGame END =============

  if (triviaGame.gameState === null){
    console.log('reset game!!!');
    triviaGame.resetGame();
  }

  const currentQA = triviaGame.qAndA[triviaGame.gameState.gameNum];

  $('#start').on('click', function () {
    triviaGame.clockStart();
    if (triviaGame.gameState.remainTime < 0) {
      triviaGame.clockStop();
    }
    const timeRemain = $('<p>');
    timeRemain.addClass('time-remain');
    timeRemain.html(`Time Remaining: <span id="current-time">${triviaGame.gameState.remainTime}</span>Seconds`);

    const question = $('<p>');
    question.addClass('question');
    question.text(`${currentQA.question}`);

    const answersContainer = $('<div>');
    answersContainer.addClass('answers');
    for (const property in currentQA.answers) {
      console.log(`${property}: ${currentQA.answers[property]}`);
      const answer = $('<button>');
      answer.attr('id', property);
      answer.addClass('answer-btn');
      answer.text(currentQA.answers[property]);
      answersContainer.append(answer);
    }

    htmlContent.empty().append(timeRemain, question, answersContainer);
  });

  $(document).on('click', '.answer-btn', function () {
    triviaGame.clockStop();
    $('.question').remove();
    $('.answers').remove();
    const messageEl = $('<p>');

    // if the player clicks the correct answer
    if (this.id === currentQA.correctAns) {
      messageEl.text('Correct!');
      htmlContent.append(messageEl);
    } else { // if the player clicks a wrong answer
      messageEl.text('Nope!');
      const correctAnsEl = $('<p>');
      correctAnsEl.text(`The Correct Answer was: ${currentQA.answers[currentQA.correctAns]}`);
      htmlContent.append(messageEl, correctAnsEl);
    }
  });

// });