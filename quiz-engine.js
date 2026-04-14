// Quiz Engine - Main Quiz Logic

let quizState = {
    currentQuestionIndex: 0,
    totalScore: 0,
    answers: [],
    startTime: Date.now(),
    timeRemaining: 0,
    timerInterval: null,
    currentQuiz: null,
    questions: []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    const quizId = sessionStorage.getItem('selectedQuizId');
    const quizzes = window.quizzesData || JSON.parse(localStorage.getItem('quizMasterQuizzes') || '[]');
    
    quizState.currentQuiz = quizzes.find(q => q.id === parseInt(quizId));

    // If not found in memory, try fallback with default quiz list from this file
    if (!quizState.currentQuiz && quizzes.length === 0) {
        window.quizzesData = getDefaultQuizList();
        quizState.currentQuiz = window.quizzesData.find(q => q.id === parseInt(quizId));
    }
    
    if (!quizState.currentQuiz) {
        window.location.href = 'quiz-selection.html';
        return;
    }

    loadQuizData();
    displayQuestion();
    startTimer();
}

function loadQuizData() {
    const quiz = quizState.currentQuiz;
    
    /* const sampleQuestions = getQuestionsForQuiz(quiz.id);
        {
            id: 1,
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
            explanation: 'Paris is the capital and largest city of France.',
            points: 10
        },
        {
            id: 2,
            question: 'Which planet is closest to the Sun?',
            options: ['Venus', 'Mercury', 'Earth', 'Mars'],
            correctAnswer: 1,
            explanation: 'Mercury is the planet closest to the Sun.',
            points: 10
        },
        {
            id: 3,
            question: 'What is 15 + 27?',
            options: ['32', '42', '52', '62'],
            correctAnswer: 1,
            explanation: 'The sum of 15 and 27 is 42.',
            points: 5
        },
        {
            id: 4,
            question: 'Who wrote \"Romeo and Juliet\"?',
            options: ['Mark Twain', 'William Shakespeare', 'Jane Austen', 'Oscar Wilde'],
            correctAnswer: 1,
            explanation: 'William Shakespeare wrote \"Romeo and Juliet\" in the early 1600s.',
            points: 10
        },
        {
            id: 5,
            question: 'Which is the largest ocean?',
            options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
            correctAnswer: 1,
            explanation: 'The Pacific Ocean is the largest ocean on Earth.',
            points: 10
        },
        {
            id: 6,
            question: 'What is the chemical symbol for Gold?',
            options: ['Go', 'Gd', 'Au', 'Ag'],
            correctAnswer: 2,
            explanation: 'The chemical symbol for Gold is Au, from the Latin word \"Aurum\".',
            points: 10
        },
        {
            id: 7,
            question: 'In which year did World War II end?',
            options: ['1943', '1944', '1945', '1946'],
            correctAnswer: 2,
            explanation: 'World War II ended in 1945.',
            points: 10
        },
        {
            id: 8,
            question: 'What is the smallest prime number?',
            options: ['0', '1', '2', '3'],
            correctAnswer: 2,
            explanation: 'The smallest prime number is 2. Prime numbers are only divisible by 1 and themselves.',
            points: 10
        },
        {
            id: 9,
            question: 'Which country is home to the Great Wall?',
            options: ['Japan', 'China', 'Korea', 'India'],
            correctAnswer: 1,
            explanation: 'The Great Wall of China is located in China and is one of the most impressive structures in the world.',
            points: 10
        },
        {
            id: 10,
            question: 'What does HTTP stand for?',
            options: ['High Transfer Text Protocol', 'HyperText Transfer Protocol', 'Home Tool Transfer Protocol', 'High Technology Text Protocol'],
            correctAnswer: 1,
            explanation: 'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.',
            points: 10
        }
    ]; */

    // Old loadQuizData implementation commented out
}

function loadQuizData() {
    const quiz = quizState.currentQuiz;
    const sampleQuestions = getQuestionsForQuiz(quiz.id);

    quizState.questions = sampleQuestions;
    quizState.answers = new Array(sampleQuestions.length).fill(null);
    quizState.timeRemaining = quiz.timeLimit * 60;

    document.getElementById('quizTitle').textContent = quiz.title;
    const quizNameElement = document.getElementById('quizName');
    if (quizNameElement) {
        quizNameElement.textContent = quiz.title;
    }
    document.getElementById('totalQuestions').textContent = sampleQuestions.length;
}

function getQuestionsForQuiz(quizId) {
    const questionSets = {
        1: [
            {
                id: 1,
                question: 'What is the largest ocean on Earth?',
                options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
                correctAnswer: 1,
                explanation: 'The Pacific Ocean is the largest ocean on Earth.',
                points: 10
            },
            {
                id: 2,
                question: 'Which planet is known as the Red Planet?',
                options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                correctAnswer: 1,
                explanation: 'Mars is often called the Red Planet because of its reddish appearance.',
                points: 10
            },
            {
                id: 3,
                question: 'How many continents are there on Earth?',
                options: ['5', '6', '7', '8'],
                correctAnswer: 2,
                explanation: 'There are seven continents on Earth.',
                points: 10
            }
        ],
        2: [
            {
                id: 1,
                question: 'Which keyword declares a variable that cannot be reassigned in JavaScript?',
                options: ['var', 'let', 'const', 'static'],
                correctAnswer: 2,
                explanation: 'const declares a constant reference that cannot be reassigned.',
                points: 10
            },
            {
                id: 2,
                question: 'What is the result of 2 + "2" in JavaScript?',
                options: ['4', '22', 'NaN', 'undefined'],
                correctAnswer: 1,
                explanation: 'JavaScript coerces the number into a string and concatenates, returning "22".',
                points: 10
            },
            {
                id: 3,
                question: 'Which of these is a JavaScript array method?',
                options: ['push()', 'add()', 'append()', 'insert()'],
                correctAnswer: 0,
                explanation: 'push() is a JavaScript array method used to add elements to the end.',
                points: 10
            }
        ],
        3: [
            {
                id: 1,
                question: 'Which ancient civilization built the pyramids at Giza?',
                options: ['Romans', 'Greeks', 'Egyptians', 'Babylonians'],
                correctAnswer: 2,
                explanation: 'The ancient Egyptians built the pyramids at Giza.',
                points: 10
            },
            {
                id: 2,
                question: 'In which year did World War II end?',
                options: ['1943', '1944', '1945', '1946'],
                correctAnswer: 2,
                explanation: 'World War II ended in 1945.',
                points: 10
            },
            {
                id: 3,
                question: 'Who was the first President of the United States?',
                options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
                correctAnswer: 1,
                explanation: 'George Washington was the first President of the United States.',
                points: 10
            }
        ],
        4: [
            {
                id: 1,
                question: 'Which sentence uses the correct form of "their", "there", or "they’re"?',
                options: ['Their going to the store.', 'There going to the store.', 'They’re going to the store.', 'Theyre going to the store.'],
                correctAnswer: 2,
                explanation: 'They’re is a contraction of they are, which is correct in this sentence.',
                points: 10
            },
            {
                id: 2,
                question: 'Which word is a noun in the sentence: "The cat slept on the mat."?',
                options: ['The', 'cat', 'slept', 'on'],
                correctAnswer: 1,
                explanation: 'Cat is the noun because it names a person, place, thing, or idea.',
                points: 10
            },
            {
                id: 3,
                question: 'Choose the correct past tense form of the verb "to go".',
                options: ['goed', 'went', 'gone', 'goes'],
                correctAnswer: 1,
                explanation: 'Went is the past tense of go.',
                points: 10
            }
        ],
        5: [
            {
                id: 1,
                question: 'What is the chemical symbol for oxygen?',
                options: ['O', 'Ox', 'Og', 'Oy'],
                correctAnswer: 0,
                explanation: 'O is the chemical symbol for oxygen.',
                points: 10
            },
            {
                id: 2,
                question: 'What is the pH of pure water at 25°C?',
                options: ['5', '6', '7', '8'],
                correctAnswer: 2,
                explanation: 'Pure water at 25°C has a neutral pH of 7.',
                points: 10
            },
            {
                id: 3,
                question: 'Which element has the atomic number 1?',
                options: ['Helium', 'Hydrogen', 'Lithium', 'Oxygen'],
                correctAnswer: 1,
                explanation: 'Hydrogen has atomic number 1.',
                points: 10
            }
        ],
        6: [
            {
                id: 1,
                question: 'What process do plants use to convert sunlight into food?',
                options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'],
                correctAnswer: 2,
                explanation: 'Photosynthesis is the process plants use to make food from sunlight.',
                points: 10
            },
            {
                id: 2,
                question: 'Which part of the cell contains genetic material?',
                options: ['Cytoplasm', 'Nucleus', 'Membrane', 'Ribosome'],
                correctAnswer: 1,
                explanation: 'The nucleus contains the cell’s genetic material.',
                points: 10
            },
            {
                id: 3,
                question: 'What is the basic unit of life?',
                options: ['Atom', 'Molecule', 'Cell', 'Organ'],
                correctAnswer: 2,
                explanation: 'The cell is the basic structural and functional unit of life.',
                points: 10
            }
        ],
        7: [
            {
                id: 1,
                question: 'Which data type is used to store an ordered, changeable collection in Python?',
                options: ['tuple', 'list', 'set', 'dictionary'],
                correctAnswer: 1,
                explanation: 'A list is an ordered, mutable collection in Python.',
                points: 10
            },
            {
                id: 2,
                question: 'What symbol begins a comment in Python?',
                options: ['//', '#', '/*', '<!--'],
                correctAnswer: 1,
                explanation: 'Python uses # for single-line comments.',
                points: 10
            },
            {
                id: 3,
                question: 'What is the output of print(2 * 3)?',
                options: ['5', '6', '23', '8'],
                correctAnswer: 1,
                explanation: '2 * 3 equals 6.',
                points: 10
            }
        ],
        8: [
            {
                id: 1,
                question: 'What is the capital city of Japan?',
                options: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok'],
                correctAnswer: 1,
                explanation: 'Tokyo is the capital city of Japan.',
                points: 10
            },
            {
                id: 2,
                question: 'Which country has its capital at Ottawa?',
                options: ['Canada', 'Australia', 'Mexico', 'England'],
                correctAnswer: 0,
                explanation: 'Ottawa is the capital of Canada.',
                points: 10
            },
            {
                id: 3,
                question: 'What is the capital of Australia?',
                options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
                correctAnswer: 2,
                explanation: 'Canberra is the capital of Australia.',
                points: 10
            }
        ],
        9: [
            {
                id: 1,
                question: 'What is the derivative of x² with respect to x?',
                options: ['x', '2x', 'x²', '2'],
                correctAnswer: 1,
                explanation: 'The derivative of x² is 2x.',
                points: 10
            },
            {
                id: 2,
                question: 'What is 7 × 8?',
                options: ['48', '54', '56', '63'],
                correctAnswer: 2,
                explanation: '7 × 8 equals 56.',
                points: 10
            },
            {
                id: 3,
                question: 'What is the value of π (pi) rounded to two decimal places?',
                options: ['3.14', '2.72', '1.62', '4.13'],
                correctAnswer: 0,
                explanation: 'π is approximately 3.14.',
                points: 10
            }
        ],
        10: [
            {
                id: 1,
                question: 'Who painted the Mona Lisa?',
                options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
                correctAnswer: 1,
                explanation: 'Leonardo da Vinci painted the Mona Lisa.',
                points: 10
            },
            {
                id: 2,
                question: 'Which art movement is Pablo Picasso associated with?',
                options: ['Impressionism', 'Cubism', 'Baroque', 'Surrealism'],
                correctAnswer: 1,
                explanation: 'Picasso is best known for Cubism.',
                points: 10
            },
            {
                id: 3,
                question: 'The Statue of Liberty was a gift from which country?',
                options: ['France', 'England', 'Italy', 'Spain'],
                correctAnswer: 0,
                explanation: 'France gifted the Statue of Liberty to the United States.',
                points: 10
            }
        ]
    };

    return questionSets[quizId] || getDefaultQuestionSet();
}

function getDefaultQuestionSet() {
    return [
        {
            id: 1,
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
            explanation: 'Paris is the capital and largest city of France.',
            points: 10
        },
        {
            id: 2,
            question: 'Which planet is closest to the Sun?',
            options: ['Venus', 'Mercury', 'Earth', 'Mars'],
            correctAnswer: 1,
            explanation: 'Mercury is the planet closest to the Sun.',
            points: 10
        }
    ];
}

function displayQuestion() {
    const index = quizState.currentQuestionIndex;
    const question = quizState.questions[index];

    if (!question) return;

    // Update header
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progress = Math.round(((index + 1) / quizState.questions.length) * 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = progress + '%';

    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(optionIndex);

        if (quizState.answers[index] === optionIndex) {
            button.classList.add('selected');
        }

        optionsContainer.appendChild(button);
    });

    // Update button visibility
    updateNavigationButtons();
}

function selectAnswer(optionIndex) {
    quizState.answers[quizState.currentQuestionIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.remove('selected');
        if (idx === optionIndex) {
            btn.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayQuestion();
    }
}

function skipQuestion() {
    quizState.answers[quizState.currentQuestionIndex] = null;
    nextQuestion();
}

function updateNavigationButtons() {
    const index = quizState.currentQuestionIndex;
    const total = quizState.questions.length;

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('submitBtn').style.display = index === total - 1 ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = index === total - 1 ? 'none' : 'block';
}

function startTimer() {
    quizState.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    quizState.timeRemaining--;

    const minutes = Math.floor(quizState.timeRemaining / 60);
    const seconds = quizState.timeRemaining % 60;
    document.getElementById('timer').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (quizState.timeRemaining <= 0) {
        clearInterval(quizState.timerInterval);
        submitQuiz();
    }

    // Change color if time running out
    if (quizState.timeRemaining < 60) {
        document.getElementById('timer').style.color = '#dc3545';
    }
}

function submitQuiz() {
    clearInterval(quizState.timerInterval);

    // Calculate score
    let score = 0;
    quizState.questions.forEach((question, index) => {
        if (quizState.answers[index] === question.correctAnswer) {
            score += question.points;
        }
    });

    quizState.totalScore = score;

    // Calculate time taken
    const timeTaken = Math.floor((Date.now() - quizState.startTime) / 1000);

    // Save to user profile
    if (typeof saveQuizResultToProfile === 'function') {
        saveQuizResultToProfile({
            title: quizState.currentQuiz.title,
            score: score,
            totalQuestions: quizState.questions.length,
            timeTaken: timeTaken
        });
    }

    // Store detailed results for results page
    sessionStorage.setItem('quizResults', JSON.stringify({
        quiz: quizState.currentQuiz,
        score: score,
        answers: quizState.answers,
        questions: quizState.questions,
        timeTaken: timeTaken,
        result: {
            quizId: quizState.currentQuiz.id,
            quizTitle: quizState.currentQuiz.title,
            score: score,
            totalQuestions: quizState.questions.length,
            percentage: Math.round((score / (quizState.questions.length * 10)) * 100),
            timeTaken: formatTime(timeTaken),
            timestamp: new Date().toISOString()
        }
    }));

    // Navigate to results page
    window.location.href = 'results.html';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function saveQuizResult(quizId, quizTitle, score, totalQuestions, timeTaken) {
    let userData = JSON.parse(localStorage.getItem('quizMasterUser'));
    
    const result = {
        quizId,
        quizTitle,
        score,
        totalQuestions,
        percentage: Math.round((score / (totalQuestions * 10)) * 100),
        timeTaken,
        timestamp: new Date().toISOString()
    };

    userData.quizHistory = userData.quizHistory || [];
    userData.quizHistory.push(result);
    userData.totalQuizzes = (userData.totalQuizzes || 0) + 1;
    userData.totalScore = (userData.totalScore || 0) + score;

    localStorage.setItem('quizMasterUser', JSON.stringify(userData));
    return result;
}

// Exit quiz early (called by exit button)
function exitQuiz() {
    const confirmed = confirm('Leave quiz now? Progress will not be saved.');
    if (confirmed) {
        clearInterval(quizState.timerInterval);
        window.location.href = 'quiz-selection.html';
    }
}
