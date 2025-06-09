let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

async function fetchQuestions() {
    try {
        const response = await fetch('questions.json'); // Load questions
        questions = await response.json();
        showQuestion();
    } catch (error) {
        questionElement.textContent = 'Failed to load questions.';
        console.error(error);
    }
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        const li = document.createElement('li');
        li.appendChild(button);
        answersElement.appendChild(li);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    answersElement.innerHTML = '';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++; 
    }

    // Show all correct/incorrect answers
    Array.from(answersElement.children).forEach(li => {
        const btn = li.firstChild;
        if (btn.dataset.correct === 'true') {
            btn.style.backgroundColor = '#28a745'; // Green
        } else {
            btn.style.backgroundColor = '#dc3545'; // Red
        }
        btn.disabled = true;
    });

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore(); 
    }
});

function showScore() {
    questionElement.textContent = `Quiz Finished! You scored ${score} out of ${questions.length}.`;
    answersElement.innerHTML = '';
    nextButton.style.display = 'none';
}

fetchQuestions();
