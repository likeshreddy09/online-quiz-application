// Authentication Helper Functions

// Check if user is logged in
function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Not logged in - redirect to login
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get current logged-in user
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Update navbar with user info
function updateNavbarWithUserInfo() {
    const user = getCurrentUser();
    if (!user) return;

    const navbarNav = document.querySelector('.navbar-nav');
    if (!navbarNav) return;

    // Remove login button if exists
    const loginLink = document.querySelector('.btn-login-nav');
    if (loginLink) {
        loginLink.parentElement.remove();
    }

    // Add profile and logout links
    const profileLi = document.createElement('li');
    profileLi.className = 'nav-item';
    profileLi.innerHTML = `
        <a class="nav-link d-flex align-items-center" href="profile.html">
            <span class="nav-avatar">${getAvatarEmoji(user.avatar)}</span>
            <span class="ms-2">${user.name}</span>
        </a>
    `;

    const logoutLi = document.createElement('li');
    logoutLi.className = 'nav-item';
    logoutLi.innerHTML = `
        <a class="nav-link btn-logout-nav" href="#" onclick="handleLogout(event)">
            🚪 Logout
        </a>
    `;

    // Hide login action links if user is logged in
    document.querySelectorAll('.btn-login-nav, .btn-login-hero').forEach(el => {
        el.classList.add('hidden');
    });

    navbarNav.appendChild(profileLi);
    navbarNav.appendChild(logoutLi);
}

// Get avatar emoji
function getAvatarEmoji(avatarId) {
    const avatarEmojis = ['👨', '👩', '🧔', '👳', '👨‍🦰', '👩‍🦱', '🧑', '👶'];
    const index = parseInt(avatarId?.split('-')[1] || 1) - 1;
    return avatarEmojis[index] || '👤';
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Save quiz result to user profile
function saveQuizResultToProfile(quizData) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) return;

    if (!users[userIndex].quizzes) {
        users[userIndex].quizzes = [];
    }

    users[userIndex].quizzes.push({
        title: quizData.title,
        score: quizData.score,
        date: new Date().toISOString(),
        timeTaken: quizData.timeTaken
    });

    localStorage.setItem('quizMasterUsers', JSON.stringify(users));
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if this page requires auth
    const requiresAuth = document.body.getAttribute('data-require-auth');
    
    if (requiresAuth === 'true') {
        checkAuthStatus();
    }

    // Update navbar with user info if logged in
    const user = getCurrentUser();
    if (user) {
        updateNavbarWithUserInfo();
    }
});
