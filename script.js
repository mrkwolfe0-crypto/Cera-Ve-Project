let scores = {
    dryness: 0,
    acne: 0,
    sensitivity: 0
};

function updatescore(category) {
    scores[category]++;
    console.log(`Current ${category} score: ${scores[category]}`);

    if (scores[category] >=2) {
        console.log(`Threshold reached for ${category}`);
    }
}
let currentQuestionIndex = 0;

function processAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const container = document.getElementById('quiz-container');

    if (currentQuestion.type === "scored") {
        if (selectedOption === currentQuestion.score.trigger) {
            scores[currentQuestion.score.category]++;
            console.log(`Updated ${currentQuestion.score.category} score to: ${scores[currentQuestion.score.category]}`);
        }
    } 
    else if (currentQuestion.type === "fact") {
        if (selectedOption !== currentQuestion.correctAnswer) {
            // Show explanation only if wrong
            container.innerHTML = `
                <p><strong>Actual...</strong> ${currentQuestion.explanation}</p>
                <button onclick="nextQuestion()">Got it, Next</button>
            `;
            return; // Exit function so we don't call nextQuestion() automatically
        }
    }
    nextQuestion();
}

/*
function processAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const container = document.getElementById('quiz-container');
    let showExplanation = false;
    if (currentQuestion.category === 'none') {
        if (selectedOption !== currentQuestion.answer) {
            showExplanation = true;
        }
    }
    else {
        if (selectedOption === currentQuestion.triggerAnswer) {
            scores[currentQuestion.category]++;
            console.log(`updated ${currentQuestion.category} score: ${scores[currentQuestion.category]}`);
        }
    }
    if (showExplanation) {
        container.innerHTML = `
        <p><strong>Actual...</strong> ${currentQuestion.explanation}</p>
        <button onclick="nextQuestion()">Got it, NextQuestion</button>
        `;
    } else {
        nextQuestion();
     }
*/
/*  
    if (selectedOption === currentQuestion.answer && currentQuestion.category !== 'none'){
        scores[currentQuestion.category]++;
        console.log(`updated ${currentQuestion.category} score: ${scores[currentQuestion.category]}`);
        } else {
            console.log(`Incorrect answer. Moving to explanation.`);
        }
    

        container.innerHTML = `
        <p>${currentQuestion.explanation}</p>
        <button onclick="nextQuestion()">NextQuestion</button>
        `;*/
    }


function loadQuestion() {
    const container = document.getElementById('quiz-container');
    const currentQuestion = quizData[currentQuestionIndex];
    container.innerHTML = `
        <p>${currentQuestion.question}</p>
        ${currentQuestion.options.map(option => `<button onclick="processAnswer('${option}')">${option}</button>`).join('')}
    `;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    let topCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    let productLinks = {
        dryness: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser",
        acne: "https://www.cerave.com/skincare/cleansers/acne-foaming-cream-cleanser",
        sensitivity: "https://www.cerave.com/skincare/cleansers/hydrating-micellar-water"
    };

    document.getElementById('quiz-container').innerHTML = `
        <h2>Quiz Results</h2>
        <p>Dryness: ${scores.dryness}</p>
        <p>Acne: ${scores.acne}</p>
        <p>Sensitivity: ${scores.sensitivity}</p>
        <p>Top Category: ${topCategory}</p>
        <p>Product Link: <a href="${productLinks[topCategory]}" target="_blank">View Product</a></p>
    `;
}

window.onload = loadQuestion;

/*
const quizData = [
    {
        question: "True/False: You should wash your face twice a day.",
        options: ["True", "False"],
        category: "none", 
        answer: "True",
        explanation: "Washing twice a day removes dirt without over-stripping your natural skin barrier."
    },
    {
        question:"How does your skin type feel 1 hour after cleansing?",
        options: ["Tight", "Shiny or Oily", "Comfortable"],
        category: "dryness", 
        triggerAnswer: "Tight",
        explanation: ""
    },
    {
        question: "What is the primary cause of acne breakouts?",
        options: ["Bacteria", "Dirt", "Sun"],
        category: "none", 
        answer: "Bacteria",
        explanation: "Acne is primarily caused by excess sebum trapping C. acnes bacteria in your pores."
    },
    {
        question: "Do you notice frequent bumps or redness?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        category: "acne", 
        triggerAnswer: "Often",
        explanation: ""
    },
    {
        question: "Should you wear sunscreen if it's cloudy outside?",
        options: ["Yes", "No", "Sometimes"],
        category: "none", // Changed from "sensitivity" to "none" because it acts like a fact question
        answer: "Yes",
        explanation: "Up to 80% of UV rays can penetrate clouds!"
    },
    {
        question: "Does your skin sting when applying products?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        category: "sensitivity", 
        triggerAnswer: "Often",
        explanation: ""
    }*/
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
        score: {
            category: "dryness",
            trigger: "Tight"
        },
        explanation: ""
    },

    {
        id: "q3",
        type: "fact",
        question: "What is the primary cause of acne breakouts?",
        options: ["Bacteria", "Dirt", "Sun"],
        correctAnswer: "Bacteria",
        explanation: "Acne is primarily caused by excess sebum trapping C. acnes bacteria in your pores."
    },

    {
        id: "q4",
        type: "scored",
        question: "Do you notice frequent bumps or redness?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        score: {
            category: "acne",
            trigger: "Often"
        },
        explanation: ""
    },

    {
        id: "q5",
        type: "fact",
        question: "Should you wear sunscreen if it's cloudy outside?",
        options: ["Yes", "No", "Sometimes"],
        correctAnswer: "Yes",
        explanation: "Up to 80% of UV rays can penetrate clouds!"
    },

    {
        id: "q6",
        type: "scored",
        question: "Does your skin sting when applying products?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        score: {
            category: "sensitivity",
            trigger: "Often"
        },
        explanation: ""
    }
];