// https://www.classicfm.com/discover-music/latest/ultimate-classical-music-quiz/

// $(document).ready(function () {
  const htmlContent = $('#content');
  const messageEl = $('<p>');
  const correctAnsEl = $('<p>');

  const triviaGame = {
    gameState: null,

    questionState: null,

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

    resetGameState: function () {
      this.gameState = this.gameStateFactory();
      console.log(this.gameState);
    },

    gameStateFactory: function () {
      return {
        correct: 0,
        incorrect: 0,
        questionNum: 0
      }
    },

    resetQuetionState: function () {
      this.questionState = this.questionStateFactory();
      console.log(this.questionState);
    },

    questionStateFactory: function () {
      return {
        remainTime: 30,
        clockRunning: false
      }
    },

    clockStart: function () {
      if (!this.questionState.clockRunning) {
        this.clockInterval = setInterval(this.countTime, 1000);
        this.questionState.clockRunning = true;
      }
    },

    clockStop: function () {
      if (triviaGame.clockInterval !== null) {
        console.log('clockStop!!!!');
        clearInterval(triviaGame.clockInterval);
        triviaGame.questionState.clockRunning = false;
      }
    },

    countTime: function () {
      if (triviaGame.questionState.remainTime > 0) {
        triviaGame.questionState.remainTime = triviaGame.questionState.remainTime - 1;
        $('#current-time').text(triviaGame.questionState.remainTime);
      } else {
        triviaGame.clockStop();
      }
    },

    timeUp: function () {
      setTimeout(function () {
        if (triviaGame.questionState.remainTime <= 0) {
          triviaGame.removeQnA();
          triviaGame.showMessage('outOfTime');
          triviaGame.showCorrectAns();
          triviaGame.addQuestionNum();
          triviaGame.showNextQnA();
        }
      }, 30500);
    },

    showNextQnA: function () {
      setTimeout(triviaGame.showQnA, 4000);
    },

    showQnA: function () {
      console.log('triviaGame.gameState.questionNum: ' + triviaGame.gameState.questionNum);
      console.log('triviaGame.qAndA.length: ' + triviaGame.qAndA.length);
      if (triviaGame.gameState.questionNum >= triviaGame.qAndA.length) { // Max questionNum is triviaGame.qAndA.length - 1
        triviaGame.showFinalContent();
      } else {
        triviaGame.timeUp();

        triviaGame.resetQuetionState();
        const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];
        triviaGame.clockStart();
        htmlContent.empty();
        triviaGame.appendTimeRemaining();
        triviaGame.appendQuestion(currentQA);
        triviaGame.appendAnswerChoices(currentQA);
      }
    },

    showFinalContent: function () {
      triviaGame.removeQnA();
      triviaGame.showMessage('allDone');
      const result = $('<div>');
      const correctAns = $('<p>');
      const incorrectAns = $('<p>');
      const unanswered = $('<p>');
      correctAns.text(`Correct Answeres: ${triviaGame.gameState.correct}`);
      incorrectAns.text(`Incorrect Answeres: ${triviaGame.gameState.incorrect}`);
      unanswered.text(`Unanswered: ${triviaGame.getUnansweredNum()}`);
      result.append(correctAns, incorrectAns, unanswered);
      htmlContent.append(result);
    },

    appendTimeRemaining: function () {
      const timeRemain = $('<p>');
      timeRemain.addClass('time-remain');
      timeRemain.html(`Time Remaining: <span id="current-time">${this.questionState.remainTime}</span>Seconds`);
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

    addQuestionNum: function () {
      this.gameState.questionNum++;
    },

    addCorrectAnsNum: function () {
      this.gameState.correct++;
    },

    addIncorrectAnsNum: function () {
      this.gameState.incorrect++;
    },

    getUnansweredNum: function () {
      return this.qAndA.length - this.gameState.correct - this.gameState.incorrect;
    },

    removeQnA: function () {
      $('.question').remove();
      $('.answers').remove();
    },

    showMessage: function (condition) {
      if (messageEl) {
        messageEl.empty();

        if (condition === 'correct') {
          messageEl.text('Correct!');
        } else if (condition === 'incorrect') {
          messageEl.text('Nope!');
        } else if (condition === 'outOfTime') {
          messageEl.text('Out of Time!');
        } else if (condition === 'allDone') {
          messageEl.text('All done, here is how you did!');
        }
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
    triviaGame.resetGameState();
    triviaGame.resetQuetionState();
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
      triviaGame.addCorrectAnsNum();
      triviaGame.addQuestionNum();
      triviaGame.showNextQnA();
    } else { // if the player clicks a wrong answer
      triviaGame.showMessage('incorrect');
      triviaGame.showCorrectAns();
      triviaGame.addIncorrectAnsNum();
      triviaGame.addQuestionNum();
      triviaGame.showNextQnA();
    }
  });

// });