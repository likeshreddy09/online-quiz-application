// Profile Page JavaScript

const avatarEmojis = ['👨', '👩', '🧔', '👳', '👨‍🦰', '👩‍🦱', '🧑', '👶'];

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadProfileData();
    setupEventListeners();
    loadAchievements();
    loadQuizHistory();
});

// Check if user is logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
}

// Load Profile Data
function loadProfileData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Update profile display
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileAvatarLarge').textContent = getAvatarEmoji(currentUser.avatar);
    
    // Overview data
    document.getElementById('overviewEmail').textContent = currentUser.email;
    document.getElementById('overviewUsername').textContent = currentUser.username;

    // Format join date
    const joinDate = new Date(currentUser.loginTime);
    const monthYear = joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    document.getElementById('joinDate').textContent = monthYear;

    // Load quiz statistics
    loadQuizStatistics();

    // Pre-fill edit form
    document.getElementById('editName').value = currentUser.name;
}

// Get Avatar Emoji
function getAvatarEmoji(avatarId) {
    const index = parseInt(avatarId.split('-')[1]) - 1;
    return avatarEmojis[index] || '👤';
}

// Load Quiz Statistics
function loadQuizStatistics() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    const user = users.find(u => u.id === currentUser.id);

    if (!user || !user.quizzes || user.quizzes.length === 0) {
        document.getElementById('quizzesTaken').textContent = '0';
        document.getElementById('totalScore').textContent = '0';
        document.getElementById('avgScore').textContent = '0%';
        document.getElementById('bestScore').textContent = '0%';
        return;
    }

    const quizzes = user.quizzes;
    const totalScore = quizzes.reduce((sum, q) => sum + q.score, 0);
    const avgScore = Math.round(totalScore / quizzes.length);
    const bestScore = Math.max(...quizzes.map(q => q.score));

    document.getElementById('quizzesTaken').textContent = quizzes.length;
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('avgScore').textContent = avgScore + '%';
    document.getElementById('bestScore').textContent = bestScore + '%';
}

// Load Quiz History
function loadQuizHistory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    const user = users.find(u => u.id === currentUser.id);

    const container = document.getElementById('quizHistoryContainer');

    if (!user || !user.quizzes || user.quizzes.length === 0) {
        container.innerHTML = '<p class="text-muted">No quiz history yet.</p>';
        return;
    }

    container.innerHTML = '';
    user.quizzes.forEach(quiz => {
        const date = new Date(quiz.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const historyItem = document.createElement('div');
        historyItem.className = 'quiz-history-item';
        historyItem.innerHTML = `
            <div class="quiz-history-info">
                <h6>${quiz.title}</h6>
                <small>${dateStr} at ${timeStr}</small><br>
                <small class="quiz-history-date">Time: ${quiz.timeTaken}</small>
            </div>
            <div class="quiz-history-score">${quiz.score}%</div>
        `;
        container.appendChild(historyItem);
    });
}

// Load Achievements
function loadAchievements() {
    const achievements = [
        { icon: '🌟', name: 'First Quiz', date: 'Earned' },
        { icon: '🔥', name: '7-Day Streak', date: 'Locked' },
        { icon: '🏆', name: 'Quiz Master', date: 'Locked' },
        { icon: '💯', name: 'Perfect Score', date: 'Locked' },
        { icon: '⚡', name: 'Speed Demon', date: 'Locked' },
        { icon: '🎯', name: '50 Questions', date: 'Locked' }
    ];

    const grid = document.getElementById('achievementGrid');
    grid.innerHTML = '';

    achievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = 'achievement-item';
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-date">${achievement.date}</div>
        `;
        grid.appendChild(card);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditProfile);
    }

    // Load avatars in modal
    loadEditAvatars();
}

// Load Edit Avatars
function loadEditAvatars() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const grid = document.getElementById('editAvatarGrid');
    grid.innerHTML = '';

    avatarEmojis.forEach((emoji, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'avatar-select-btn' + (currentUser.avatar === `avatar-${index + 1}` ? ' selected' : '');
        btn.textContent = emoji;
        btn.dataset.avatar = `avatar-${index + 1}`;
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.avatar-select-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('selectedEditAvatar').value = this.dataset.avatar;
        });

        grid.appendChild(btn);
    });

    // Create hidden input for selected avatar
    if (!document.getElementById('selectedEditAvatar')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'selectedEditAvatar';
        hiddenInput.value = currentUser.avatar;
        grid.parentElement.appendChild(hiddenInput);
    }
}

// Edit Profile
function editProfile() {
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

// Handle Edit Profile Submit
function handleEditProfile(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newName = document.getElementById('editName').value.trim();
    const newAvatar = document.getElementById('selectedEditAvatar').value;

    if (!newName || newName.length < 3) {
        alert('Name must be at least 3 characters');
        return;
    }

    // Update in users array
    let users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].name = newName;
        users[userIndex].avatar = newAvatar;
        localStorage.setItem('quizMasterUsers', JSON.stringify(users));
    }

    // Update current session
    currentUser.name = newName;
    currentUser.avatar = newAvatar;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update display
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileAvatarLarge').textContent = getAvatarEmoji(newAvatar);

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();

    // Show success
    showSuccessAlert('Profile updated successfully!');
}

// Logout
function logout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Delete Account
function deleteAccount() {
    if (confirm('Are you sure? This cannot be undone.')) {
        if (confirm('Type "DELETE" to confirm account deletion...')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Remove from users
            let users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
            users = users.filter(u => u.id !== currentUser.id);
            localStorage.setItem('quizMasterUsers', JSON.stringify(users));

            // Logout
            localStorage.removeItem('currentUser');
            alert('Account deleted successfully.');
            window.location.href = 'login.html';
        }
    }
}

// Show Success Alert
function showSuccessAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
