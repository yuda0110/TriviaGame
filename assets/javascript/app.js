const triviaGame = {
  gameState: null,

  qAndA: [
    {
      question: '',
      answers: {
        a1: '',
        a2: '',
        a3: '',
        a4: ''
      },
      correctAns: ''
    },
    {
      question: '',
      answers: {
        a1: '',
        a2: '',
        a3: '',
        a4: ''
      },
      correctAns: ''
    },
    {
      question: '',
      answers: {
        a1: '',
        a2: '',
        a3: '',
        a4: ''
      },
      correctAns: ''
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
}