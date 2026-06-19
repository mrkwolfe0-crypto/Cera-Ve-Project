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

function processAnswer(category){
    if (category !== 'none') {
        scores[category]++;
        console.log(`updated ${category} score: ${scores[category]}`);
    }
    currentQuestionIndex++;
    if(currentQuestionIndex <quizData.length) {
        loadedQuestion();
    } else {
        showResults(); 
    }
}

function loadQuestion() {
    const container = document.getElementById('quiz-container');
    const currentQuestion = quizData[currentQuestionIndex];
    container.innerHTML = `
        <p>${currentQuestion.question}</p>
        ${currentQuestion.options.map(option => `<button onclick="processAnswer('${currentQuestion.category}')">${option}</button>`).join('')}
    `;
}

function showResults() {
    let topCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    let productLinks = {
        dryness: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser",
        acne: "https://www.cerave.com/skincare/cleansers/acne-foaming-cream-cleanser",
        sensitivity: "https://www.cerave.com/skincare/cleansers/soothing-micellar-water"
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

const quizData = [
    {
        question: "True/False: You should wash your face twice a day.",
        options: ["True", "False"],
        category: "none" // Fact-based, no score
    },
    {
        question:"How does your skin type feel 1 hour after cleansing?",
        options: ["Tight", "Shiny or Oily", "Comfortable"],
        category: "dryness" // Flag: dryness
    },
    {
        question: "What is the primary cause of acne breakouts?",
        options: ["Bacteria", "Dirt", "Sun"],
        category: "none" // Fact-based, no score
    },
    {
        question: "Do you notice frequent bumps or redness?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        category: "acne" // Flag: acne
    },
    {
        question: "Should you wear sunscreen if it's cloudy outside?",
        options: ["Yes", "No", "Sometimes"],
        category: "sensitivity" // Fact-based, no score
    },
    {
        question: "Does your skin sting when applying products?",
        options: ["Often", "Sometimes", "Never or Rarely"],
        category: "sensitivity" // Flag: sensitivity
    }
];
