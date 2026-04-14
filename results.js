// Results Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    displayResults();
});

function displayResults() {
    const resultsData = JSON.parse(sessionStorage.getItem('quizResults'));

    if (!resultsData) {
        window.location.href = 'quiz-selection.html';
        return;
    }

    const { quiz, score, answers, questions, timeTaken, result } = resultsData;

    // Display header info
    document.querySelector('h2').textContent = `${result.percentage}% - ${getResultMessage(result.percentage)}`;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('resultMessage').textContent = getResultMessage(result.percentage);
    document.getElementById('resultDescription').textContent = getResultDescription(result.percentage);

    // Update score circle color based on performance
    const scoreCircle = document.getElementById('progressBar') || document.querySelector('.score-circle');
    if (scoreCircle) {
        if (result.percentage >= 80) {
            scoreCircle.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        } else if (result.percentage >= 60) {
            scoreCircle.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
        } else {
            scoreCircle.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        }
    }

    // Display statistics
    const correctAnswers = answers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    document.getElementById('correctAnswers').textContent = `${correctAnswers} / ${questions.length}`;
    document.getElementById('accuracy').textContent = Math.round((correctAnswers / questions.length) * 100) + '%';
    document.getElementById('timeTaken').textContent = result.timeTaken;

    // Display detailed review
    displayDetailedReview(questions, answers);

    // Clear sessionStorage
    sessionStorage.removeItem('quizResults');
}

function getResultMessage(percentage) {
    if (percentage >= 90) return 'Outstanding!';
    if (percentage >= 80) return 'Great Job!';
    if (percentage >= 70) return 'Good Work!';
    if (percentage >= 60) return 'Not Bad!';
    return 'Keep Trying!';
}

function getResultDescription(percentage) {
    if (percentage >= 90) return 'You have demonstrated excellent knowledge. Excellent performance!';
    if (percentage >= 80) return 'You have shown very good understanding of the material.';
    if (percentage >= 70) return 'You have a solid understanding. Keep practicing!';
    if (percentage >= 60) return 'You have basic understanding. Review the material and try again.';
    return 'Please review the material and try again. Learning takes time!';
}

function displayDetailedReview(questions, answers) {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;

        const statusIcon = isCorrect ? '✓' : '✗';
        const statusText = isCorrect ? 'Correct' : 'Incorrect';

        let html = `
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="review-question">
                    ${statusIcon} Question ${index + 1}: ${question.question}
                </div>
                <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'}">${statusText}</span>
            </div>
        `;

        if (userAnswer !== null) {
            html += `
                <div class="review-answer">
                    <strong>Your answer:</strong> 
                    <span class="${isCorrect ? 'correct-answer' : 'user-answer'}">
                        ${question.options[userAnswer]}
                    </span>
                </div>
            `;
        } else {
            html += `
                <div class="review-answer">
                    <strong>Your answer:</strong> 
                    <span class="user-answer">Not answered</span>
                </div>
            `;
        }

        if (!isCorrect) {
            html += `
                <div class="review-answer">
                    <strong>Correct answer:</strong> 
                    <span class="correct-answer">${question.options[question.correctAnswer]}</span>
                </div>
            `;
        }

        html += `
            <div class="review-answer mt-2">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        `;

        reviewItem.innerHTML = html;
        reviewContainer.appendChild(reviewItem);
    });
}
