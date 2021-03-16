var timerDiv = document.getElementById("timer");
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var presentQuestion = {};
var acceptAnswers = false;
var score = 0;
var questionCount = 0;
var availableQuestions = [];

var questions = [
  {
    question: "Which of the following is not JavaScript Data Types?",
    choice1: "Undefined",
    choice2: "Number",
    choice3: "Boolean",
    choice4: "Float",
    answer: 4,
  },
  {
    question: "Which company developed JavaScript?",
    choice1: "Netscape",
    choice2: "Bell Labs",
    choice3: "Sun Microsystems",
    choice4: "IBM",
    answer: 1,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<head>",
    choice3: "<meta>",
    choice4: "<style>",
    answer:  1,
  },
  {
    question: "Which of the following is correct about features of JavaScript?",
    choice1: "It can not Handling dates and time.",
    choice2: "JavaScript is a object-based scripting language.",
    choice3: "JavaScript is not interpreter based scripting language.",
    choice4: "All of the above",
    answer: 2,
  },
];


var CORRECT_BONUS = 10;
var MAX_QUESTIONS = 4;
var MAX_TIME = 60;

var timeLeft = 0;
var timerHandle;

var setTime = (seconds) => {
  if (seconds < 0) {
    seconds = 0;
  }
  timeLeft = seconds;
  timerDiv.textContent = timeLeft;
};

var startTimer = () => {
  setTime(MAX_TIME);
  timerHandle = setInterval(() => {
    setTime(timeLeft - 1);
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
};

var startGame = () => {
  questionCount = 0;
  score = 0;
  availQuestions = [...questions];
  newQuestion();
  startTimer();
};

var newQuestion = () => {
  if (availQuestions.length === 0 || questionCount > MAX_QUESTIONS) {
    return endQuiz();
  }
  questionCount++;
  var questionIndex = Math.floor(Math.random() * availQuestions.length);
  presentQuestion = availQuestions[questionIndex];
  question.innerText = presentQuestion.question;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = presentQuestion["choice" + number];
  });

  availQuestions.splice(questionIndex, 1);

  acceptAnswers = true;
};

var endQuiz = () => {
  clearInterval(timerHandle);
  sessionStorage.setItem("mostRecentScore", score);
  window.location.assign("endgame.html");
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;

    acceptAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];

    var toApply = "incorrect";
    if (selectedAnswer == presentQuestion.answer) {
      toApply = "correct";
      score = score;
    } else {
      setTime(timeLeft - 5);
    }

    selectedChoice.parentElement.classList.add(toApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(toApply);
      newQuestion();
    }, 1000);
  });
});

startGame();
