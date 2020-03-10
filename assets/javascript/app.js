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
      clearInterval(this.clockInterval);
      this.gameState.clockRunning = false;
    },

    countTime: function () {
      if (triviaGame.gameState.remainTime > 0) {
        triviaGame.gameState.remainTime = triviaGame.gameState.remainTime - 1;
        $('#current-time').text(triviaGame.gameState.remainTime);
      } else {
        triviaGame.clockStop();
      }
    },

    showQnA: function () {
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
    $('.question').remove();
    $('.answers').remove();
    const messageEl = $('<p>');

    // if the player clicks the correct answer
    if (this.id === currentQA.correctAns) {
      messageEl.text('Correct!');
      htmlContent.append(messageEl);

      triviaGame.addGameNum();
      setTimeout(triviaGame.showQnA, 4000);
    } else { // if the player clicks a wrong answer
      messageEl.text('Nope!');
      const correctAnsEl = $('<p>');
      correctAnsEl.text(`The Correct Answer was: ${currentQA.answers[currentQA.correctAns]}`);
      htmlContent.append(messageEl, correctAnsEl);

      triviaGame.addGameNum();
      setTimeout(triviaGame.showQnA, 4000);
    }
  });

// });