// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
});

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Load previously entered data if available
    loadSavedFormData();
}

function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!validateForm(name, email, subject, category, message)) {
        return;
    }

    // Create contact object
    const contactData = {
        id: Date.now(),
        name,
        email,
        subject,
        category,
        message,
        timestamp: new Date().toISOString(),
        status: 'new'
    };

    // Save to localStorage
    saveContactMessage(contactData);

    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById('contactForm').reset();

    // Log for verification
    console.log('Contact message saved:', contactData);
}

function validateForm(name, email, subject, category, message) {
    let isValid = true;
    const errors = [];

    // Name validation
    if (!name || name.length < 3) {
        errors.push('Please enter a valid name (at least 3 characters)');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!subject || subject.length < 5) {
        errors.push('Please enter a valid subject (at least 5 characters)');
        isValid = false;
    }

    // Category validation
    if (!category) {
        errors.push('Please select a category');
        isValid = false;
    }

    // Message validation
    if (!message || message.length < 10) {
        errors.push('Please enter a valid message (at least 10 characters)');
        isValid = false;
    }

    if (!isValid) {
        showErrorMessage(errors.join('<br>'));
    }

    return isValid;
}

function saveContactMessage(contactData) {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function showSuccessMessage() {
    const successDiv = document.getElementById('successMessage');
    successDiv.classList.remove('d-none');
    successDiv.classList.add('fade', 'show');

    setTimeout(() => {
        successDiv.classList.add('d-none');
        successDiv.classList.remove('fade', 'show');
    }, 5000);
}

function showErrorMessage(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.alert-danger');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(errorDiv, form);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function loadSavedFormData() {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (document.getElementById('name')) {
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
        }
    }
}

function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

// Auto-save form data as user types
document.addEventListener('input', function(e) {
    if (e.target.id === 'name' || e.target.id === 'email') {
        saveFormData();
    }
});

// Category info helper
const categoryInfo = {
    'support': 'We typically respond to support requests within 24 hours.',
    'feedback': 'Your feedback helps us improve. Thank you for your input!',
    'business': 'Our business team will contact you to discuss collaboration opportunities.',
    'other': 'We\'ll get back to you as soon as possible.'
};

// Update info when category changes
document.addEventListener('change', function(e) {
    if (e.target.id === 'category') {
        const info = categoryInfo[e.target.value];
        let infoDiv = document.querySelector('.category-info');
        
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'alert alert-info mt-2 category-info';
            e.target.parentElement.appendChild(infoDiv);
        }
        
        infoDiv.textContent = info;
    }
});
