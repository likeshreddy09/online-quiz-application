// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
});

function initializeLogin() {
    setupEventListeners();
    checkRememberedCredentials();
    setupLampInteraction();
}

// Setup Event Listeners
function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotForm = document.getElementById('forgotForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
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

// Handle Login Submit
function handleLoginSubmit(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear previous errors
    clearErrors();

    // Validate inputs
    if (!validateLoginForm(username, password)) {
        return;
    }

    // Show loading state
    showLoginLoading();

    // Simulate server request
    setTimeout(() => {
        if (authenticateUser(username, password)) {
            // Success
            showSuccessMessage('Login successful! Redirecting...');

            // Save user data
            const userData = {
                username: username,
                email: username,
                loginTime: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            localStorage.setItem('quizMasterUser', JSON.stringify(userData));

            // Save credentials if remember me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // Trigger lamp magic effect
            triggerLampMagic();

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Failed
            hideLoginLoading();
            showErrorMessage('Invalid username or password. Please try again.');
        }
    }, 1500);
}

// Validate Login Form
function validateLoginForm(username, password) {
    let isValid = true;

    if (!username) {
        showFieldError('username', 'Username or email is required');
        isValid = false;
    }

    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    }

    if (password && password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

// Authenticate User
function authenticateUser(username, password) {
    // Demo credentials
    const demoUsers = [
        { username: 'testuser', password: 'password123' },
        { username: 'demo@example.com', password: 'password123' },
        { username: 'admin', password: 'admin123' }
    ];

    return demoUsers.some(user => 
        user.username.toLowerCase() === username.toLowerCase() && 
        user.password === password
    );
}

// Show Field Error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const helpText = document.getElementById(fieldId + 'Help');

    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 8px rgba(220, 53, 69, 0.1)';

    if (helpText) {
        helpText.textContent = message;
        helpText.classList.remove('d-none');
    }
}

// Clear Errors
function clearErrors() {
    document.querySelectorAll('.login-input').forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });

    document.querySelectorAll('.form-text').forEach(text => {
        text.classList.add('d-none');
    });
}

// Show Error Message
function showErrorMessage(message) {
    const alert = document.getElementById('errorAlert');
    alert.textContent = message;
    alert.classList.remove('d-none');

    setTimeout(() => {
        alert.classList.add('d-none');
    }, 5000);
}

// Show Success Message
function showSuccessMessage(message) {
    const alert = document.getElementById('successAlert');
    alert.textContent = message;
    alert.classList.remove('d-none');
}

// Show/Hide Loading State
function showLoginLoading() {
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const btn = document.querySelector('.login-btn');

    btnText.classList.add('d-none');
    btnLoader.classList.remove('d-none');
    btn.disabled = true;
}

function hideLoginLoading() {
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const btn = document.querySelector('.login-btn');

    btnText.classList.remove('d-none');
    btnLoader.classList.add('d-none');
    btn.disabled = false;
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Use Demo Credentials
function useDemoCredentials() {
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'password123';
    document.getElementById('username').focus();

    // Add highlight effect
    document.getElementById('username').style.borderColor = 'var(--magic-gold)';
    document.getElementById('password').style.borderColor = 'var(--magic-gold)';
}

// Show Sign Up Modal
function showSignUp(e) {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('signupModal'));
    modal.show();
}

// Show Forgot Password Modal
function showForgotPassword(e) {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('forgotModal'));
    modal.show();
}

// Handle Sign Up Submit
function handleSignupSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (!name || name.length < 3) {
        alert('Please enter a valid name');
        return;
    }

    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!username || username.length < 3) {
        alert('Username must be at least 3 characters');
        return;
    }

    if (!password || password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    if (!agreeTerms) {
        alert('You must agree to the terms and conditions');
        return;
    }

    // Create account
    const newUser = {
        name,
        email,
        username,
        password,
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem('quizMasterUsers') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert('Username already exists');
        return;
    }

    users.push(newUser);
    localStorage.setItem('quizMasterUsers', JSON.stringify(users));

    // Show success and close modal
    alert('Account created successfully! You can now login.');
    bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    document.getElementById('signupForm').reset();

    // Pre-fill username in login form
    document.getElementById('username').value = username;
    document.getElementById('password').focus();
}

// Handle Forgot Password Submit
function handleForgotSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('resetEmail').value.trim();

    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate sending reset email
    alert('If this email exists in our system, you will receive a password reset link shortly.');
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
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('rememberMe').checked = true;
    }
}

// Setup Lamp Interaction
function setupLampInteraction() {
    const lamp = document.querySelector('.magic-lamp');
    if (lamp) {
        lamp.addEventListener('click', function() {
            this.classList.add('rub');
            setTimeout(() => {
                this.classList.remove('rub');
            }, 600);

            // Show a sparkle effect
            showLampSparkle();
        });

        // Double click to focus password
        lamp.addEventListener('dblclick', function(e) {
            e.preventDefault();
            document.getElementById('password').focus();
        });
    }
}

// Trigger Lamp Magic Effect on Successful Login
function triggerLampMagic() {
    const lamp = document.querySelector('.magic-lamp');
    const smoke = document.querySelector('.magic-smoke');

    if (lamp) {
        lamp.style.animation = 'lampRubActive 0.6s ease-in-out 3';
        
        // Enhance smoke effect
        if (smoke) {
            const particles = smoke.querySelectorAll('.smoke-particle');
            particles.forEach(particle => {
                particle.style.opacity = '1';
            });
        }
    }
}

// Show Lamp Sparkle Effect
function showLampSparkle() {
    const lamp = document.querySelector('.magic-lamp');
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = 'var(--magic-gold)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 10px var(--magic-gold)';
        sparkle.style.pointerEvents = 'none';
        
        const angle = (i / 5) * Math.PI * 2;
        const distance = 80;
        sparkle.style.left = Math.cos(angle) * distance + 60 + 'px';
        sparkle.style.top = Math.sin(angle) * distance + 75 + 'px';
        
        lamp.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            {
                opacity: 1,
                transform: 'scale(1, 1) translate(0, 0)'
            },
            {
                opacity: 0,
                transform: `scale(0.5, 0.5) translate(${Math.cos(angle) * 30}px, ${Math.sin(angle) * 30}px)`
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn && !loginBtn.disabled) {
            loginBtn.click();
        }
    }
});
