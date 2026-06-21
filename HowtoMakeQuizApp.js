console.log("script loaded");

const quizData = [
    {
        id: "q1",
        type: "fact",
        question: "True/False: You should wash your face twice a day.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Washing twice a day removes dirt without over-stripping your natural skin barrier."
    },
    {
        id: "q2",
        type: "scored",
        question: "How does your skin type feel 1 hour after cleansing?",
        options: ["Tight", "Shiny or Oily", "Comfortable"],
        score: { category: "dryness", trigger: "Tight" },
        explanation: ""
    },
    // ... add your other questions here
];

let currentQuestionIndex = 0;
let scores = { dryness: 0, acne: 0, sensitivity: 0 };

function loadQuestion() {
    const container = document.getElementById('quiz-container');
    if (!container) return; 

    container.innerHTML = ""; 
    const currentQuestion = quizData[currentQuestionIndex];
    
    
    const questionTitle = document.createElement("h2");
    questionTitle.innerText = currentQuestion.question;
    container.appendChild(questionTitle);
    
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "answer-buttons";
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.onclick = () => processAnswer(option);
        buttonContainer.appendChild(button);
    });
    
    container.appendChild(buttonContainer);
}

function processAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Logic: If scored, update state
    if (currentQuestion.type === "scored" && selectedOption === currentQuestion.score.trigger) {
        scores[currentQuestion.score.category]++;
    }
    
    // Logic: If fact, check answer
    if (currentQuestion.type === "fact" && selectedOption !== currentQuestion.correctAnswer) {
        alert("Correct answer: " + currentQuestion.correctAnswer + "\n" + currentQuestion.explanation);
    }

    // Logic: Advance
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const container = document.getElementById('quiz-container');
    let topCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    container.innerHTML = `
        <h2>Your Results</h2>
        <p>Top category: ${topCategory}</p>
        <button class="btn" onclick="location.reload()">Restart Quiz</button>
    `;
}

window.onload = loadQuestion;