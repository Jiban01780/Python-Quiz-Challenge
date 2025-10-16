// Login Page JavaScript
class LoginManager {
    constructor() {
        this.currentUser = null;
        this.initializeElements();
        this.bindEvents();
        this.checkExistingSession();
    }

    initializeElements() {
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.registerFormElement = document.getElementById('register-form-element');
        this.showRegisterLink = document.getElementById('show-register');
        this.showLoginLink = document.getElementById('show-login');
        
        // Form inputs
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.regUsernameInput = document.getElementById('reg-username');
        this.regEmailInput = document.getElementById('reg-email');
        this.regPasswordInput = document.getElementById('reg-password');
        this.regConfirmPasswordInput = document.getElementById('reg-confirm-password');
    }

    bindEvents() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerFormElement.addEventListener('submit', (e) => this.handleRegister(e));
        this.showRegisterLink.addEventListener('click', (e) => this.showRegisterForm(e));
        this.showLoginLink.addEventListener('click', (e) => this.showLoginForm(e));
    }

    checkExistingSession() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                this.currentUser = JSON.parse(currentUser);
                // Redirect to quiz if already logged in
                window.location.href = 'quiz.html';
            } catch (error) {
                console.error('Error parsing current user:', error);
                localStorage.removeItem('currentUser');
            }
        }
    }

    showRegisterForm(e) {
        e.preventDefault();
        this.loginForm.parentElement.style.display = 'none';
        this.registerForm.style.display = 'block';
    }

    showLoginForm(e) {
        e.preventDefault();
        this.registerForm.style.display = 'none';
        this.loginForm.parentElement.style.display = 'block';
    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value;

        if (!username || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const user = window.quizDatabase.authenticateUser(username, password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showMessage('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 1000);
        } else {
            this.showMessage('Invalid username or password', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        
        const username = this.regUsernameInput.value.trim();
        const email = this.regEmailInput.value.trim();
        const password = this.regPasswordInput.value;
        const confirmPassword = this.regConfirmPasswordInput.value;

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters long', 'error');
            return;
        }

        if (username.length < 3) {
            this.showMessage('Username must be at least 3 characters long', 'error');
            return;
        }

        // Check if username already exists
        if (window.quizDatabase.getUserByUsername(username)) {
            this.showMessage('Username already exists', 'error');
            return;
        }

        // Create new user
        const newUser = window.quizDatabase.addUser({
            username: username,
            email: email,
            password: password
        });

        this.showMessage('Account created successfully! Please sign in.', 'success');
        
        // Clear form and switch to login
        this.registerFormElement.reset();
        setTimeout(() => {
            this.showLoginForm({ preventDefault: () => {} });
            this.usernameInput.value = username;
        }, 1500);
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.login-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `login-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert message
        const activeForm = document.querySelector('.login-card:not([style*="display: none"])');
        activeForm.insertBefore(messageDiv, activeForm.querySelector('.login-form'));

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize login manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});
