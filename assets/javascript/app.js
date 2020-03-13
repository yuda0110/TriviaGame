// https://www.classicfm.com/discover-music/latest/ultimate-classical-music-quiz/

$(document).ready(function () {
  const htmlContent = $('#content');
  const messageEl = $('<p>');
  messageEl.addClass('message');
  const correctAnsEl = $('<p>');
  correctAnsEl.addClass('correct-ans');

  const triviaGame = {
    gameState: null,

    questionState: null,

    secPerQuestion: 30,

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
        remainTime: this.secPerQuestion,
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
          triviaGame.updatePageContentAfterWait();
        }
      }, this.secPerQuestion * 1000 + 500);
    },

    updatePageContentAfterWait: function () {
      setTimeout(triviaGame.updatePageContent, 4000);
    },

    updatePageContent: function () {
      if (triviaGame.gameState.questionNum >= triviaGame.qAndA.length) { // Max questionNum is triviaGame.qAndA.length - 1
        triviaGame.showFinalContent();
      } else {
        triviaGame.timeUp();
        triviaGame.showNextQnA();
      }
    },

    showNextQnA: function () {
      triviaGame.resetQuetionState();
      const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];
      triviaGame.clockStart();
      htmlContent.empty();
      triviaGame.appendTimeRemaining();
      triviaGame.appendQuestion(currentQA);
      triviaGame.appendAnswerChoices(currentQA);
    },

    showFinalContent: function () {
      triviaGame.removeQnA();
      correctAnsEl.remove();
      triviaGame.showMessage('allDone');
      const result = $('<table class="result">');
      const correctAnsRow = $('<tr>');
      const correctAnsTh = $('<th>').text('Correct Answers');
      const correctAnsTd = $('<td>').text(triviaGame.gameState.correct);
      correctAnsRow.append(correctAnsTh, correctAnsTd)
      const incorrectAnsRow = $('<tr>');
      const incorrectAnsTh = $('<th>').text('Incorrect Answers');
      const incorrectAnsTd = $('<td>').text(triviaGame.gameState.incorrect);
      incorrectAnsRow.append(incorrectAnsTh, incorrectAnsTd)
      const unansweredRow = $('<tr>');
      const unansweredTh = $('<th>').text('Unanswered');
      const unansweredTd = $('<td>').text(triviaGame.getUnansweredNum());
      unansweredRow.append(unansweredTh, unansweredTd);
      const startOver = $('<button>');
      result.append(correctAnsRow, incorrectAnsRow, unansweredRow);

      startOver.attr('id', 'startover-btn');
      startOver.addClass('btn btn-restart');
      startOver.text('Start Over ?');
      htmlContent.append(result, startOver);
    },

    appendTimeRemaining: function () {
      const timeRemain = $('<p>');
      timeRemain.addClass('time-remain');
      timeRemain.text('Time Remaining');
      const time = $('<span>').attr('id', 'current-time').addClass('time');
      time.text(this.questionState.remainTime);
      const sec = $('<span>').addClass('sec').text('sec');
      timeRemain.append(time, sec);
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
        answer.addClass('btn-answer');
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
      if ($('.question')) {
        $('.question').remove();
      }
      if ($('.answers')) {
        $('.answers').remove();
      }
    },

    showMessage: function (condition) {
      if ($('.message')) {
        $('.message').remove();
      }

      if (condition === 'correct') {
        messageEl.text('Correct!');
      } else if (condition === 'incorrect') {
        messageEl.text('Nope!');
      } else if (condition === 'outOfTime') {
        messageEl.text('Out of Time!');
      } else if (condition === 'allDone') {
        messageEl.text('All done, here is how you did!');
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
    triviaGame.updatePageContent();
  });

  $(document).on('click', '.btn-answer', function () {
    const currentQA = triviaGame.qAndA[triviaGame.gameState.questionNum];

    triviaGame.clockStop();
    triviaGame.removeQnA();

    // if the player clicks the correct answer
    if (this.id === currentQA.correctAns) {
      triviaGame.showMessage('correct');
      triviaGame.addCorrectAnsNum();
      triviaGame.addQuestionNum();
      triviaGame.updatePageContentAfterWait();
    } else { // if the player clicks a wrong answer
      triviaGame.showMessage('incorrect');
      triviaGame.showCorrectAns();
      triviaGame.addIncorrectAnsNum();
      triviaGame.addQuestionNum();
      triviaGame.updatePageContentAfterWait();
    }
  });

  $(document).on('click', '#startover-btn', function () {
    triviaGame.resetGameState();
    triviaGame.resetQuetionState();
    triviaGame.updatePageContent();
  });

});