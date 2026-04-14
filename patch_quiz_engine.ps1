$path = 'js/quiz-engine.js'
$text = Get-Content $path -Raw
$pattern = '(?ms)    // Sample questions \(in real app, fetch from server\)\r?\n.*?\r?\n    quizState\.questions = sampleQuestions;'
$replacement = '    const sampleQuestions = getQuestionsForQuiz(quiz.id);`r`n`r`n    quizState.questions = sampleQuestions;'
$text = [regex]::Replace($text, $pattern, $replacement)

$insert = @'

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
'@
$text = $text -replace 'function displayQuestion\(\)', $insert
Set-Content $path -Value $text
Write-Output 'Patch complete'
