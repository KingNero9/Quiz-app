const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      "question": "Where was Hawaiian style pizza was invented?",
      "choice1": "Brazil",
      "choice2": "Hawaii",
      "choice3": "Canada",
      "choice4": "England",
      "answer": 3
    },
    {
      "question": "Which country is the longest in the world? (From south to north)",
      "choice1": "Brazil",
      "choice2": "Chile",
      "choice3": "Russia",
      "choice4": "Canada",
      "answer": 2
    },
    {
      "question": "Who said the following sentence:'Democracy is the worse system, except everything else' ? ",
      "choice1": "Winston Churchill",
      "choice2": "Yitzhak Rabin",
      "choice3": "Benjamin Franklin",
      "choice4": "Martin Luther King",
      "answer": 1
    },
    {
        "question": "Which youtuber said the following sentence: 'Good luck trying to cancel me!'",
        "choice1": "Jake Paul",
        "choice2": "Logan Paul",
        "choice3": "Codi Co",
        "choice4": "David Dobrik",
        "answer": 2
    },
    {
        "question": "While William the conqueror tried to conquer England, which other country tried to conquer England too?",
        "choice1": "Norway",
        "choice2": "Denmark",
        "choice3": "Spain",
        "choice4": "Portugal",
        "answer": 1
    },
    {
        "question": "Which border between two countries is with the most soliders in it?",
        "choice1": "Bolivia - Chile",
        "choice2": "Sumalia - Sudan",
        "choice3": "Sudan - South Sudan",
        "choice4": "North Korea - South Korea",
        "answer": 4
    },
    {
        "question": "When was the first 3D printer created? ",
        "choice1": "1983", 
        "choice2": "2003", 
        "choice3": "1998", 
        "choice4": "2006",
        "answer":1
    },
    {
        "question": "Which country is the biggest producer of dates in the middle east?",
        "choice1": "Iran", 
        "choice2": "Egypt", 
        "choice3": "Saudi Arabia", 
        "choice4": "Yeman", 
        "answer": 2
    } ,
    {
        "question": "Which animal has the biggest amount of teeth?",
        "choice1": "Shark", 
        "choice2": "Aligator", 
        "choice3": "Fly", 
        "choice4": "Snail", 
        "answer": 4
    }, 
    {
        "question": "Which country has an airport outside it's country? ",
        "choice1": "Switzerland",
        "choice2": "France", 
        "choice3": "Bangladesh", 
        "choice4": "Peru", 
        "answer": 1
    }
  ];

    
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore' , score);
    //go to the end page
    return window.location.assign("end.html")
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();