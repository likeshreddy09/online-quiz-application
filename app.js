// Main Application JavaScript

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Quiz Master App Initialized');
    loadUserData();
    setupEventListeners();
}

// Load user data from localStorage
function loadUserData() {
    let userData = localStorage.getItem('quizMasterUser');
    if (!userData) {
        userData = {
            username: 'User_' + Math.floor(Math.random() * 10000),
            email: null,
            totalQuizzes: 0,
            totalScore: 0,
            quizHistory: [],
            joinDate: new Date().toISOString()
        };
        localStorage.setItem('quizMasterUser', JSON.stringify(userData));
    }
    window.currentUser = JSON.parse(localStorage.getItem('quizMasterUser'));
}

// Setup general event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterQuizzes(this.value);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Leaderboard filter
    const filterRadios = document.querySelectorAll('input[name="filter"]');
    filterRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            loadLeaderboard(this.value);
        });
    });
}

// Filter quizzes based on search input
function filterQuizzes(searchTerm) {
    const quizContainer = document.getElementById('quizContainer');
    const noResults = document.getElementById('noResults');
    
    if (!quizContainer) return;

    const quizItems = quizContainer.querySelectorAll('.col-md-6');
    let visibleCount = 0;

    quizItems.forEach(item => {
        const title = item.textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !subject || !category || !message) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }

    // Simulate sending email
    const contactData = {
        name,
        email,
        subject,
        category,
        message,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    let contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contactMessages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

    // Show success message
    document.getElementById('contactForm').reset();
    document.getElementById('successMessage').classList.remove('d-none');
    
    setTimeout(() => {
        document.getElementById('successMessage').classList.add('d-none');
    }, 5000);

    console.log('Contact message saved:', contactData);
}

// Display alerts
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format time display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Save quiz result
function saveQuizResult(quizId, quizTitle, score, totalQuestions, timeTaken) {
    let userData = JSON.parse(localStorage.getItem('quizMasterUser'));
    
    const result = {
        quizId,
        quizTitle,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
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

// Get user statistics
function getUserStats() {
    const userData = JSON.parse(localStorage.getItem('quizMasterUser'));
    
    return {
        username: userData.username,
        totalQuizzes: userData.totalQuizzes || 0,
        totalScore: userData.totalScore || 0,
        averageScore: userData.totalQuizzes > 0 ? 
            Math.round(userData.totalScore / userData.totalQuizzes) : 0,
        quizHistory: userData.quizHistory || []
    };
}

// Navigate to quiz page
function startQuiz(quizId) {
    sessionStorage.setItem('selectedQuizId', quizId);
    window.location.href = 'quiz.html';
}

// Utility function to get quiz by ID
function getQuizById(quizId) {
    const quizzes = window.quizzesData || [];
    return quizzes.find(q => q.id === parseInt(quizId));
}

// Export functions for use in other scripts
window.appFunctions = {
    filterQuizzes,
    handleContactSubmit,
    showAlert,
    formatTime,
    saveQuizResult,
    getUserStats,
    startQuiz,
    getQuizById
};
