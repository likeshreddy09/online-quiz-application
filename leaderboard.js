// Leaderboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard('allTime');
});

function loadLeaderboard(filter) {
    const leaderboardBody = document.getElementById('leaderboardBody');
    
    // Sample leaderboard data
    const leaderboardData = [
        { rank: 1, username: 'Alex Johnson', score: 9850, quizzes: 45, average: 219 },
        { rank: 2, username: 'Sarah Smith', score: 9320, quizzes: 42, average: 222 },
        { rank: 3, username: 'Mike Davis', score: 8950, quizzes: 40, average: 224 },
        { rank: 4, username: 'Emily Wilson', score: 8620, quizzes: 38, average: 227 },
        { rank: 5, username: 'John Brown', score: 8450, quizzes: 37, average: 228 },
        { rank: 6, username: 'Jessica Lee', score: 8120, quizzes: 35, average: 232 },
        { rank: 7, username: 'David Miller', score: 7890, quizzes: 33, average: 239 },
        { rank: 8, username: 'Lisa Anderson', score: 7620, quizzes: 31, average: 246 },
        { rank: 9, username: 'Robert Taylor', score: 7450, quizzes: 30, average: 248 },
        { rank: 10, username: 'Maria Garcia', score: 7180, quizzes: 28, average: 256 }
    ];

    leaderboardBody.innerHTML = '';

    leaderboardData.forEach(entry => {
        const row = document.createElement('tr');
        
        // Create rank badge
        let rankBadgeClass = 'rank-badge';
        if (entry.rank <= 3) {
            rankBadgeClass += ` rank-${entry.rank}`;
        }

        row.innerHTML = `
            <td>
                <span class="${rankBadgeClass}">
                    ${entry.rank <= 3 ? (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') : entry.rank}
                </span>
            </td>
            <td>
                <strong>${entry.username}</strong><br>
                <small class="text-muted">Joined 3 months ago</small>
            </td>
            <td><strong>${entry.score.toLocaleString()}</strong></td>
            <td>${entry.quizzes}</td>
            <td>${entry.average} pts</td>
        `;

        leaderboardBody.appendChild(row);
    });

    // Display top 3 performers
    displayTopPerformers(leaderboardData.slice(0, 3));

    // Setup pagination
    setupPagination();
}

function displayTopPerformers(topUsers) {
    const topPerformersContainer = document.getElementById('topPerformers');
    topPerformersContainer.innerHTML = '';

    const medals = ['🥇', '🥈', '🥉'];

    topUsers.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card text-center h-100" style="border-top: 4px solid ${['#FFD700', '#C0C0C0', '#CD7F32'][index]}">
                <div class="card-body">
                    <div style="font-size: 3rem; margin-bottom: 15px">${medals[index]}</div>
                    <h5 class="card-title">${user.username}</h5>
                    <p class="card-text text-muted">${user.rank}${getOrdinalSuffix(user.rank)} Place</p>
                    <h4 class="text-primary">${user.score.toLocaleString()} pts</h4>
                    <p class="text-muted small">
                        <strong>${user.quizzes}</strong> Quizzes Completed<br>
                        Average: <strong>${user.average}</strong> pts
                    </p>
                </div>
            </div>
        `;
        topPerformersContainer.appendChild(card);
    });
}

function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = 5;

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === 1 ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', function(e) {
            e.preventDefault();
            updatePaginationActive(pagination, this);
        });
        pagination.appendChild(pageItem);
    }
}

function updatePaginationActive(pagination, activeItem) {
    pagination.querySelectorAll('.page-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// Event listener for filter changes
document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', function() {
        loadLeaderboard(this.value);
    });
});
