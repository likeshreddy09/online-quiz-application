// Enhanced Login Authentication with Lamp Toggle

// Avatar options
const avatarEmojis = ['👨', '👩', '🧔', '👳', '👨‍🦰', '👩‍🦱', '🧑', '👶'];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeLampToggle();
    setupEventListeners();
    loadAvatars();
    checkRememberedCredentials();
    checkAuthStatus();
    ensureDemoUser();
});

// Initialize Lamp Toggle
function initializeLampToggle() {
    const lamp = document.getElementById('toggleLamp');
    lamp.addEventListener('click', toggleLamp);
    
    // Set initial state to show login form
    setLampState('on');
}

// Toggle Lamp ON/OFF
function toggleLamp() {
    const lamp = document.getElementById('toggleLamp');
    const isOff = lamp.classList.contains('lamp-off');
    
    if (isOff) {
        setLampState('on');
    } else {
        setLampState('off');
    }
}

// Set Lamp State
function setLampState(state) {
    const lamp = document.getElementById('toggleLamp');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const lampSmoke = document.getElementById('lampSmoke');
    const statusText = document.getElementById('lampStatusText');
    const modeInstruction = document.getElementById('modeInstruction');

    if (state === 'on') {
        // Turn ON - Show Login
        lamp.classList.remove('lamp-off');
        lamp.classList.add('lamp-on');
        statusText.textContent = 'ON';
        lampSmoke.style.display = 'block';
        modeInstruction.textContent = '🟢 ON = Login';

        // Switch forms with animation
        registerSection.classList.add('fade-out');
        registerSection.style.display = 'none';
        
        loginSection.style.display = 'block';
        loginSection.classList.remove('fade-out');
        loginSection.classList.add('fade-in');

        localStorage.setItem('lampState', 'on');
    } else {
        // Turn OFF - Show Register
        lamp.classList.add('lamp-off');
        lamp.classList.remove('lamp-on');
        statusText.textContent = 'OFF';
        lampSmoke.style.display = 'none';
        modeInstruction.textContent = '🔴 OFF = Register';

        // Switch forms with animation
        loginSection.classList.add('fade-out');
        loginSection.style.display = 'none';
        
        registerSection.style.display = 'block';
        registerSection.classList.remove('fade-out');
        registerSection.classList.add('fade-in');

        localStorage.setItem('lampState', 'off');
    }
}

// Load Avatars
function loadAvatars() {
    const avatarGrid = document.getElementById('avatarGrid');
    avatarGrid.innerHTML = '';

    avatarEmojis.forEach((emoji, index) => {
        const avatarBtn = document.createElement('button');
        avatarBtn.type = 'button';
        avatarBtn.className = 'avatar-option' + (index === 0 ? ' selected' : '');
        avatarBtn.textContent = emoji;
        avatarBtn.dataset.avatar = `avatar-${index + 1}`;

        avatarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            selectAvatar(this);
        });

        avatarGrid.appendChild(avatarBtn);
    });
}

// Select Avatar
function selectAvatar(element) {
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('selectedAvatar').value = element.dataset.avatar;
}

// Setup Event Listeners
function setupEventListeners() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotSubmit);
    }

    // Input focus effects
    document.querySelectorAll('.login-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('active');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.remove('active');
            }
        });
    });
}

// Handle Register Submit
function handleRegisterSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const avatar = document.getElementById('selectedAvatar').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Clear errors
    clearErrors('reg');

    // Validate
    if (!validateRegisterForm(name, email, username, password, confirm, agreeTerms)) {
        return;
    }

    // Show loading
    showLoading('reg');

    // Simulate server delay
    setTimeout(() => {
        // Create user
        const newUser = {
            id: Date.now(),
            name,
            email,
            username,
            password,
            avatar,
            createdAt: new Date().toISOString(),
            quizzes: [],
            score: 0,
            joinDate: new Date().toISOString()
        };

        // Save user
        let users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
        
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            hideLoading('reg');
            showError('reg', 'Username already exists');
            return;
        }

        users.push(newUser);
        localStorage.setItem('quizMasterUsers', JSON.stringify(users));

        // Show success
        hideLoading('reg');
        showSuccess('reg', 'Account created! Switching to login...');

        // Auto-switch to login
        setTimeout(() => {
            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regUsername').value = '';
            document.getElementById('regPassword').value = '';
            document.getElementById('regConfirm').value = '';
            
            // Populate login form
            document.getElementById('username').value = username;
            
            // Switch lamp to ON
            setLampState('on');
            document.getElementById('password').focus();
        }, 1500);
    }, 1000);
}

// Validate Register Form
function validateRegisterForm(name, email, username, password, confirm, agreeTerms) {
    let isValid = true;

    if (!name || name.length < 3) {
        showFieldError('regName', 'Name must be at least 3 characters');
        isValid = false;
    }

    if (!email || !isValidEmail(email)) {
        showFieldError('regEmail', 'Enter a valid email address');
        isValid = false;
    }

    if (!username || username.length < 3) {
        showFieldError('regUsername', 'Username must be at least 3 characters');
        isValid = false;
    }

    if (!password || password.length < 6) {
        showFieldError('regPassword', 'Password must be at least 6 characters');
        isValid = false;
    }

    if (password !== confirm) {
        showFieldError('regConfirm', 'Passwords do not match');
        isValid = false;
    }

    if (!agreeTerms) {
        showError('reg', 'You must agree to the Terms and Conditions');
        isValid = false;
    }

    return isValid;
}

// Handle Login Submit
function handleLoginSubmit(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear errors
    clearErrors('log');

    // Validate
    if (!username || !password) {
        showError('log', 'Please enter username and password');
        return;
    }

    // Show loading
    showLoading('log');

    // Ensure demo user exists
    ensureDemoUser();
    
    const users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    const user = users.find(u => 
        (u.username.toLowerCase() === username.toLowerCase() || 
         u.email.toLowerCase() === username.toLowerCase()) && 
        u.password === password
    );

    if (user) {
        // Success
        hideLoading('log');
        showSuccess('log', 'Login successful! Redirecting...');

        // Save current user session
        const userSession = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userSession));
        
        if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }

        // Trigger lamp magic effect
        triggerLoginSuccess();

        // Redirect immediately
        window.location.href = 'index.html';
    } else {
        hideLoading('log');
        showError('log', 'Invalid username/email or password');
    }
}

// Check Auth Status - Don't redirect if already on login page
function checkAuthStatus() {
    // Allow users to stay on login page even if logged in
    // They might want to see the animation or switch accounts
    return;
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Show Field Error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const helpText = document.getElementById(fieldId + 'Help');

    field.classList.add('is-invalid');
    if (helpText) {
        helpText.textContent = message;
        helpText.classList.remove('d-none');
    }
}

// Clear Errors
function clearErrors(prefix) {
    document.querySelectorAll(`[id^="${prefix}"]`).forEach(el => {
        if (el.classList.contains('login-input')) {
            el.classList.remove('is-invalid', 'is-valid');
        }
        if (el.classList.contains('text-danger')) {
            el.classList.add('d-none');
        }
    });
}

// Show Error
function showError(prefix, message) {
    const alert = document.getElementById(prefix + 'ErrorAlert');
    if (alert) {
        alert.textContent = message;
        alert.classList.remove('d-none');
    }
}

// Show Success
function showSuccess(prefix, message) {
    const alert = document.getElementById(prefix + 'SuccessAlert');
    if (alert) {
        alert.textContent = message;
        alert.classList.remove('d-none');
    }
}

// Show/Hide Loading
function showLoading(prefix) {
    const btn = document.querySelector(`form#${prefix === 'reg' ? 'registerForm' : 'loginForm'} .login-btn`);
    if (btn) {
        btn.disabled = true;
        btn.querySelector('.btn-text').classList.add('d-none');
        btn.querySelector('.btn-loader').classList.remove('d-none');
    }
}

function hideLoading(prefix) {
    const btn = document.querySelector(`form#${prefix === 'reg' ? 'registerForm' : 'loginForm'} .login-btn`);
    if (btn) {
        btn.disabled = false;
        btn.querySelector('.btn-text').classList.remove('d-none');
        btn.querySelector('.btn-loader').classList.add('d-none');
    }
}

// Use Demo Credentials
function useDemoCredentials() {
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'password123';
    document.getElementById('username').focus();
}

// Show Forgot Password Modal
function showForgotPassword(e) {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('forgotModal'));
    modal.show();
}

// Handle Forgot Submit
function handleForgotSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();

    if (!isValidEmail(email)) {
        alert('Please enter a valid email');
        return;
    }

    alert('If this email exists, you will receive a reset link shortly.');
    bootstrap.Modal.getInstance(document.getElementById('forgotModal')).hide();
    document.getElementById('forgotForm').reset();
}

// Validate Email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Check Remembered Credentials
function checkRememberedCredentials() {
    const remembered = localStorage.getItem('rememberedUsername');
    if (remembered) {
        document.getElementById('username').value = remembered;
        document.getElementById('rememberMe').checked = true;
    }
}

// Trigger Login Success Effect
function triggerLoginSuccess() {
    const lamp = document.getElementById('toggleLamp');
    lamp.classList.add('successful-login');
    document.body.classList.add('login-success-animation');

    // Create celebration particles
    for (let i = 0; i < 15; i++) {
        createConfetti();
    }

    // Cleanup animation classes
    setTimeout(() => {
        lamp.classList.remove('successful-login');
        document.body.classList.remove('login-success-animation');
    }, 2200);
}

// Create Confetti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = ['#FFD700', '#9370DB', '#FF69B4', '#1E90FF'][Math.floor(Math.random() * 4)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';

    document.body.appendChild(confetti);

    const duration = 2000 + Math.random() * 1000;
    const xMove = (Math.random() - 0.5) * 400;

    confetti.animate([
        { transform: 'translateY(0) translateX(0)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 10}px) translateX(${xMove}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
}

// Demo user for testing - auto-create if doesn't exist
function ensureDemoUser() {
    let users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    if (!users.some(u => u.username === 'testuser')) {
        users.push({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            avatar: 'avatar-1',
            createdAt: new Date().toISOString(),
            quizzes: [],
            score: 0,
            joinDate: new Date().toISOString()
        });
        localStorage.setItem('quizMasterUsers', JSON.stringify(users));
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Show Forgot Password Modal
function showForgotModal() {
    const modal = new bootstrap.Modal(document.getElementById('forgotModal'));
    modal.show();
}

// Handle Forgot Password Submit
function handleForgotSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    // In a real app, this would send a reset email
    alert('Password reset link sent to ' + email + '. (This is a demo - check console for details)');
    console.log('Password reset requested for:', email);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('forgotModal'));
    modal.hide();
}

// Initialize demo user
ensureDemoUser();
