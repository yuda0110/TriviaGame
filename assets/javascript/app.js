// https://www.classicfm.com/discover-music/latest/ultimate-classical-music-quiz/

// $(document).ready(function () {
  const htmlContent = $('#content');
  const messageEl = $('<p>');
  const correctAnsEl = $('<p>');

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
        questionNum: 0
      }
    },

    clockStart: function () {
      if (!this.gameState.clockRunning) {
        this.clockInterval = setInterval(this.countTime, 1000);
        this.gameState.clockRunning = true;
      }
    },

    clockStop: function () {
      if (triviaGame.clockInterval !== null) {
        console.log('clockStop!!!!');
        clearInterval(triviaGame.clockInterval);
        triviaGame.gameState.clockRunning = false;
      }
    },

    countTime: function () {
      if (triviaGame.gameState.remainTime > 0) {
        triviaGame.gameState.remainTime = triviaGame.gameState.remainTime - 1;
        $('#current-time').text(triviaGame.gameState.remainTime);
      } else {
        // triviaGame.showMessage('outOfTime');
        // triviaGame.showCorrectAns();
        // triviaGame.showNextQnA();
        triviaGame.clockStop();
      }
    },

    timeUp: function () {
      setTimeout(function () {
        if (triviaGame.gameState.remainTime <= 0) {
          triviaGame.removeQnA();
          triviaGame.showMessage('outOfTime');
          triviaGame.showCorrectAns();
          triviaGame.addGameNum();
          triviaGame.showNextQnA();
        }
      }, 30500);
    },

    showNextQnA: function () {
      setTimeout(triviaGame.showQnA, 4000);
    },

    showQnA: function () {
      triviaGame.timeUp();

      const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];
      triviaGame.clockStart();
      htmlContent.empty();
      triviaGame.appendTimeRemaining();
      triviaGame.appendQuestion(currentQA);
      triviaGame.appendAnswerChoices(currentQA);
    },

    appendTimeRemaining: function () {
      const timeRemain = $('<p>');
      timeRemain.addClass('time-remain');
      timeRemain.html(`Time Remaining: <span id="current-time">${this.gameState.remainTime}</span>Seconds`);
      htmlContent.append(timeRemain);
    },

    appendQuestion: function (currentQA) {
      const question = $('<p>');
      question.addClass('question');
      question.text(`${currentQA.question}`);
      htmlContent.append(question);
    },

    appendAnswerChoices: function (currentQA) {
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
      htmlContent.append(answersContainer);
    },

    addGameNum: function () {
      this.gameState.questionNum++;
    },

    removeQnA: function () {
      $('.question').remove();
      $('.answers').remove();
    },

    showMessage: function (condition) {
      if (condition === 'correct') {
        messageEl.text('Correct!');
      } else if (condition === 'incorrect') {
        messageEl.text('Nope!');
      } else if (condition === 'outOfTime') {
        messageEl.text('Out of Time!');
      }
      htmlContent.append(messageEl);
    },

    showCorrectAns: function () {
      const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];
      correctAnsEl.text(`The Correct Answer was: ${currentQA.answers[currentQA.correctAns]}`);
      htmlContent.append(correctAnsEl);
    }

  }; // =========== triviaGame END =============

  if (triviaGame.gameState === null){
    console.log('reset game!!!');
    triviaGame.resetGame();
  }

  $('#start').on('click', function () {
    triviaGame.showQnA();
  });

  $(document).on('click', '.answer-btn', function () {
    const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];

    triviaGame.clockStop();
    triviaGame.removeQnA();

    // if the player clicks the correct answer
    if (this.id === currentQA.correctAns) {
      triviaGame.showMessage('correct');
      triviaGame.addGameNum();
      triviaGame.showNextQnA();
    } else { // if the player clicks a wrong answer
      triviaGame.showMessage('incorrect');
      triviaGame.showCorrectAns();
      triviaGame.addGameNum();
      triviaGame.showNextQnA();
    }
  });

// });