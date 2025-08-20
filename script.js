// Dom element

const startScreen = document.getElementById("screen-start")
const quizScreen = document.getElementById("screen-quiz")
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answerContainer = document.getElementById("answer")
const currentQuestionSpan = document.getElementById("current-no")
const totalQuestionSpan = document.getElementById("total-no")
const scoreSpan = document.getElementById("Score")
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

let quizQuestions = [];

fetch("question.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load questions");
    }
    return response.json();
  })
  .then(data => {
    quizQuestions = data;
    // now you can start the quiz
    showQuestion();
  })
  .catch(error => {
    console.error("Error loading quiz questions:", error);
  });

let currentQuestionIndex =0;
let score = 0;
let answerDisabled = false

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz() {
    console.log("quize started");
    // reset var
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answerDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        button.classList.add("btn-style2")

        button.dataset.correct = answer.correct

        button.addEventListener("click",SelectAnswer);

        answerContainer.appendChild(button);
    })
}

function SelectAnswer(event) {
    if (answerDisabled) return

    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answerContainer.children).forEach((button) =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            button.style.setProperty("--before-bg", "#28a745");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
            button.style.setProperty("--before-bg", "#dc3545");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResult()
        }
    },1000)
}

function showResult() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Perfect!"
    } else if (percentage >= 80) {
        resultMessage.textContent = "Good Job!"
    }else if (percentage >= 60) {
        resultMessage.textContent = "Good effort!"
    } else {
        resultMessage.textContent = "Keep studying!"
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}