// Quiz Application JavaScript
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        this.timeLeft = 20 * 60; // 20 minutes in seconds
        this.timerInterval = null;
        this.currentUser = null;
        this.quizStartTime = null;
        
        this.initializeElements();
        this.loadQuestions();
        this.bindEvents();
        this.checkAuthentication();
        this.initializeAudio();
    }

    initializeElements() {
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.reviewScreen = document.getElementById('review-screen');

        // Welcome screen elements
        this.startQuizBtn = document.getElementById('start-quiz');

        // Quiz screen elements
        this.progressBar = document.getElementById('progress');
        this.questionCounter = document.getElementById('question-counter');
        this.currentScore = document.getElementById('current-score');
        this.timerDisplay = document.getElementById('timer');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.previousQuestionBtn = document.getElementById('previous-question');
        this.nextQuestionBtn = document.getElementById('next-question');
        this.submitQuizBtn = document.getElementById('submit-quiz');
        this.questionProgress = document.getElementById('question-progress');

        // Results screen elements
        this.finalScore = document.getElementById('final-score');
        this.scorePercentage = document.getElementById('score-percentage');
        this.performanceText = document.getElementById('performance-text');
        this.correctAnswers = document.getElementById('correct-answers');
        this.incorrectAnswers = document.getElementById('incorrect-answers');
        this.restartQuizBtn = document.getElementById('restart-quiz');
        this.viewAnswersBtn = document.getElementById('view-answers');
        this.downloadCertificateBtn = document.getElementById('download-certificate');
        this.welcomeUser = document.getElementById('welcome-user');
        this.logoutBtn = document.getElementById('logout-btn');

        // Detailed statistics elements
        this.totalQuestions = document.getElementById('total-questions');
        this.attendedQuestions = document.getElementById('attended-questions');
        this.unattendedQuestions = document.getElementById('unattended-questions');
        this.correctAttended = document.getElementById('correct-attended');
        this.incorrectAttended = document.getElementById('incorrect-attended');
        this.accuracyPercentage = document.getElementById('accuracy-percentage');

        // Review screen elements
        this.backToResultsBtn = document.getElementById('back-to-results');
        this.reviewContainer = document.getElementById('review-container');
    }

    loadQuestions() {
        this.questions = [
            // Basic Python Questions
            {
                question: "What is the correct way to create a variable in Python?",
                options: [
                    "var name = 'John'",
                    "name = 'John'",
                    "string name = 'John'",
                    "name := 'John'"
                ],
                correct: 1,
                explanation: "In Python, variables are created by simply assigning a value using the = operator. No declaration keyword is needed."
            },
            {
                question: "Which of the following is NOT a Python data type?",
                options: [
                    "int",
                    "float",
                    "char",
                    "string"
                ],
                correct: 2,
                explanation: "Python doesn't have a 'char' data type. Single characters are just strings of length 1."
            },
            {
                question: "What will be the output of: print(3 + 2 * 4)?",
                options: [
                    "20",
                    "11",
                    "14",
                    "Error"
                ],
                correct: 1,
                explanation: "Due to operator precedence, multiplication (2 * 4 = 8) is performed before addition (3 + 8 = 11)."
            },
            {
                question: "How do you create a list in Python?",
                options: [
                    "list = []",
                    "list = {}",
                    "list = ()",
                    "list = <>"
                ],
                correct: 0,
                explanation: "Lists in Python are created using square brackets []. Curly braces {} create dictionaries, parentheses () create tuples."
            },
            {
                question: "What is the correct syntax for a Python function?",
                options: [
                    "function myFunction():",
                    "def myFunction():",
                    "func myFunction():",
                    "create myFunction():"
                ],
                correct: 1,
                explanation: "Python functions are defined using the 'def' keyword followed by the function name and parentheses."
            },
            {
                question: "Which operator is used for exponentiation in Python?",
                options: [
                    "^",
                    "**",
                    "pow()",
                    "exp()"
                ],
                correct: 1,
                explanation: "The ** operator is used for exponentiation in Python. For example, 2**3 equals 8."
            },
            {
                question: "What does the len() function do?",
                options: [
                    "Returns the length of a string or list",
                    "Returns the largest number",
                    "Returns the smallest number",
                    "Returns the absolute value"
                ],
                correct: 0,
                explanation: "The len() function returns the number of items in an object, such as the length of a string or the number of elements in a list."
            },
            {
                question: "How do you add an element to the end of a list?",
                options: [
                    "list.add(item)",
                    "list.append(item)",
                    "list.insert(item)",
                    "list.push(item)"
                ],
                correct: 1,
                explanation: "The append() method adds an element to the end of a list."
            },
            {
                question: "What is the output of: print('Hello' + 'World')?",
                options: [
                    "Hello World",
                    "HelloWorld",
                    "Hello + World",
                    "Error"
                ],
                correct: 1,
                explanation: "The + operator concatenates strings without adding spaces, so 'Hello' + 'World' results in 'HelloWorld'."
            },
            {
                question: "Which keyword is used to create a loop in Python?",
                options: [
                    "loop",
                    "for",
                    "while",
                    "Both 'for' and 'while'"
                ],
                correct: 3,
                explanation: "Python has two main loop keywords: 'for' for iterating over sequences and 'while' for conditional loops."
            },
            // Moderate Python Questions
            {
                question: "What will be the output of: x = [1, 2, 3]; print(x[1:3])?",
                options: [
                    "[1, 2]",
                    "[2, 3]",
                    "[1, 2, 3]",
                    "Error"
                ],
                correct: 1,
                explanation: "Slicing [1:3] returns elements from index 1 to 2 (3 is exclusive), so [2, 3]."
            },
            {
                question: "What is a list comprehension in Python?",
                options: [
                    "A way to create lists using a compact syntax",
                    "A method to sort lists",
                    "A way to delete list elements",
                    "A function to find list length"
                ],
                correct: 0,
                explanation: "List comprehensions provide a concise way to create lists using a single line of code with a for loop and optional condition."
            },
            {
                question: "What does the 'in' operator do when used with lists?",
                options: [
                    "Adds an element to the list",
                    "Checks if an element exists in the list",
                    "Removes an element from the list",
                    "Sorts the list"
                ],
                correct: 1,
                explanation: "The 'in' operator checks membership, returning True if the element exists in the list, False otherwise."
            },
            {
                question: "What is the difference between '==' and 'is' in Python?",
                options: [
                    "No difference, they are the same",
                    "'==' compares values, 'is' compares object identity",
                    "'is' compares values, '==' compares object identity",
                    "Both compare object identity"
                ],
                correct: 1,
                explanation: "'==' compares the values of objects, while 'is' compares whether two variables refer to the same object in memory."
            },
            {
                question: "What is the correct way to check if a key exists in a dictionary?",
                options: [
                    "if key in dict:",
                    "if dict.has_key(key):",
                    "if dict.contains(key):",
                    "if dict.exists(key):"
                ],
                correct: 0,
                explanation: "In Python, you use the 'in' operator to check if a key exists in a dictionary. The syntax is 'if key in dict:'"
            },
            {
                question: "How do you create a dictionary in Python?",
                options: [
                    "dict = []",
                    "dict = {}",
                    "dict = ()",
                    "dict = <>"
                ],
                correct: 1,
                explanation: "Dictionaries in Python are created using curly braces {} with key-value pairs."
            },
            {
                question: "What is the purpose of the 'pass' statement in Python?",
                options: [
                    "To stop program execution",
                    "To create a placeholder that does nothing",
                    "To print a message",
                    "To delete variables"
                ],
                correct: 1,
                explanation: "The 'pass' statement is a null operation - it does nothing when executed. It's used as a placeholder."
            },
            {
                question: "What will be the output of: print(range(3))?",
                options: [
                    "[0, 1, 2]",
                    "range(0, 3)",
                    "0 1 2",
                    "Error"
                ],
                correct: 1,
                explanation: "In Python 3, print(range(3)) outputs 'range(0, 3)' because range() returns a range object, not a list. To see the actual numbers, you would need to convert it to a list first."
            },
            {
                question: "What is the correct way to handle exceptions in Python?",
                options: [
                    "try-except",
                    "try-catch",
                    "if-error",
                    "handle-exception"
                ],
                correct: 0,
                explanation: "Python uses try-except blocks to handle exceptions, not try-catch like some other languages."
            },
            {
                question: "What does the 'enumerate()' function do?",
                options: [
                    "Counts the number of elements",
                    "Returns both index and value of items",
                    "Sorts a list",
                    "Removes duplicates"
                ],
                correct: 1,
                explanation: "enumerate() returns pairs of (index, value) for each item in an iterable, making it easy to get both position and value."
            }
        ];
    }

    bindEvents() {
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        this.previousQuestionBtn.addEventListener('click', () => this.previousQuestion());
        this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        this.restartQuizBtn.addEventListener('click', () => this.restartQuiz());
        this.viewAnswersBtn.addEventListener('click', () => this.showReview());
        this.backToResultsBtn.addEventListener('click', () => this.showResults());
        this.submitQuizBtn.addEventListener('click', () => this.finishQuiz());
        this.downloadCertificateBtn.addEventListener('click', () => this.downloadCertificate());
        this.logoutBtn.addEventListener('click', () => this.logout());
    }

    startQuiz() {
        this.quizStarted = true;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeLeft = 20 * 60; // Reset timer to 20 minutes
        this.quizStartTime = new Date();
        
        this.showScreen('quiz-screen');
        this.displayQuestion();
        this.updateProgress();
        this.createQuestionProgress();
        this.startTimer();
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <span>${option}</span>
            `;
            
            optionElement.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(optionElement);
        });
        
        // Show previously selected answer if user has already answered this question
        const previousAnswer = this.userAnswers[this.currentQuestionIndex];
        if (previousAnswer !== undefined) {
            const options = this.optionsContainer.querySelectorAll('.option');
            options[previousAnswer].classList.add('selected');
            this.nextQuestionBtn.disabled = false;
        } else {
            this.nextQuestionBtn.disabled = true;
        }
        
        // Update button states
        this.updateButtonStates();
        this.updateProgress();
    }

    selectOption(selectedIndex) {
        const options = document.querySelectorAll('.option');
        
        // Remove previous selection
        options.forEach(option => option.classList.remove('selected'));
        
        // Add selection to clicked option
        options[selectedIndex].classList.add('selected');
        
        // Store user answer
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;
        
        // Update question progress
        this.updateQuestionProgress();
        
        // Update button states
        this.updateButtonStates();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateQuestionProgress();
            this.updateButtonStates();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateQuestionProgress();
            this.updateButtonStates();
        } else {
            // Show submit button on last question
            this.nextQuestionBtn.style.display = 'none';
            this.submitQuizBtn.style.display = 'inline-flex';
        }
    }

    finishQuiz() {
        this.stopTimer();
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        this.score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                this.score++;
            }
        });
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Calculate detailed statistics
        const attendedCount = this.userAnswers.filter(answer => answer !== undefined).length;
        const unattendedCount = this.questions.length - attendedCount;
        const correctAttendedCount = this.score;
        const incorrectAttendedCount = attendedCount - this.score;
        const accuracyRate = attendedCount > 0 ? Math.round((correctAttendedCount / attendedCount) * 100) : 0;
        
        // Calculate time spent
        const timeSpent = this.quizStartTime ? Math.round((new Date() - this.quizStartTime) / 1000) : 0;
        
        // Save quiz result to database
        if (this.currentUser) {
            const quizResult = window.quizDatabase.saveQuizResult({
                userId: this.currentUser.id,
                username: this.currentUser.username,
                score: this.score,
                totalQuestions: this.questions.length,
                attendedQuestions: attendedCount,
                correctAnswers: correctAttendedCount,
                incorrectAnswers: incorrectAttendedCount,
                accuracyRate: accuracyRate,
                timeSpent: timeSpent,
                answers: this.userAnswers
            });
        }
        
        // Play completion sound
        if (this.score === this.questions.length) {
            this.playPerfectScoreSound();
        } else {
            this.playCompletionSound();
        }
        
        // Display basic results
        this.finalScore.textContent = this.score;
        this.scorePercentage.textContent = `${percentage}%`;
        this.correctAnswers.textContent = this.score;
        this.incorrectAnswers.textContent = this.questions.length - this.score;
        
        // Display detailed statistics
        this.totalQuestions.textContent = this.questions.length;
        this.attendedQuestions.textContent = attendedCount;
        this.unattendedQuestions.textContent = unattendedCount;
        this.correctAttended.textContent = correctAttendedCount;
        this.incorrectAttended.textContent = incorrectAttendedCount;
        this.accuracyPercentage.textContent = `${accuracyRate}%`;
        
        // Show certificate button for perfect score
        if (this.score === this.questions.length) {
            this.downloadCertificateBtn.style.display = 'inline-flex';
        } else {
            this.downloadCertificateBtn.style.display = 'none';
        }
        
        // Set performance message based on attended questions
        if (attendedCount === 0) {
            this.performanceText.textContent = "You didn't answer any questions. Try again! 📚";
        } else if (percentage >= 90) {
            this.performanceText.textContent = "Excellent! You're a Python expert! 🎉";
        } else if (percentage >= 80) {
            this.performanceText.textContent = "Great job! You have strong Python knowledge! 👏";
        } else if (percentage >= 70) {
            this.performanceText.textContent = "Good work! Keep practicing to improve! 👍";
        } else if (percentage >= 60) {
            this.performanceText.textContent = "Not bad! Review the basics and try again! 📚";
        } else {
            this.performanceText.textContent = "Keep learning! Python is a journey! 💪";
        }
        
        this.showScreen('results-screen');
    }

    showReview() {
        this.reviewContainer.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            reviewItem.innerHTML = `
                <div class="review-question">
                    <strong>Question ${index + 1}:</strong> ${question.question}
                </div>
                <div class="review-options">
                    ${question.options.map((option, optionIndex) => {
                        let className = 'review-option';
                        let icon = '';
                        
                        if (optionIndex === question.correct) {
                            className += ' correct-answer';
                            icon = '<i class="fas fa-check-circle"></i>';
                        } else if (optionIndex === userAnswer) {
                            className += ' user-answer';
                            icon = '<i class="fas fa-times-circle"></i>';
                        }
                        
                        return `
                            <div class="${className}">
                                ${icon}
                                <span>${String.fromCharCode(65 + optionIndex)}. ${option}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="explanation" style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 8px; font-size: 0.9rem; color: #666;">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            this.reviewContainer.appendChild(reviewItem);
        });
        
        this.showScreen('review-screen');
    }

    restartQuiz() {
        this.quizStarted = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.stopTimer();
        
        // Reset button states
        this.nextQuestionBtn.style.display = 'inline-flex';
        this.submitQuizBtn.style.display = 'none';
        this.previousQuestionBtn.disabled = true;
        this.nextQuestionBtn.disabled = true;
        
        this.showScreen('welcome-screen');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.finishQuiz();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        this.timerDisplay.textContent = timeString;
        
        // Add warning class when time is running low
        if (this.timeLeft <= 300) { // 5 minutes
            this.timerDisplay.parentElement.classList.add('warning');
        }
    }

    createQuestionProgress() {
        this.questionProgress.innerHTML = '';
        
        for (let i = 0; i < this.questions.length; i++) {
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item not-answered';
            progressItem.textContent = i + 1;
            progressItem.title = `Question ${i + 1} - Click to go to this question`;
            progressItem.addEventListener('click', () => this.goToQuestion(i));
            this.questionProgress.appendChild(progressItem);
        }
        
        this.updateQuestionProgress();
    }

    updateQuestionProgress() {
        const progressItems = this.questionProgress.querySelectorAll('.progress-item');
        
        progressItems.forEach((item, index) => {
            item.classList.remove('current', 'answered', 'not-answered');
            
            if (index === this.currentQuestionIndex) {
                item.classList.add('current');
                item.title = `Question ${index + 1} - Current Question`;
            } else if (this.userAnswers[index] !== undefined) {
                item.classList.add('answered');
                const selectedOption = String.fromCharCode(65 + this.userAnswers[index]);
                item.title = `Question ${index + 1} - Answered (Option ${selectedOption})`;
            } else {
                item.classList.add('not-answered');
                item.title = `Question ${index + 1} - Not Answered`;
            }
        });
    }

    goToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.currentQuestionIndex = questionIndex;
            this.displayQuestion();
            this.updateQuestionProgress();
            this.updateButtonStates();
        }
    }

    updateButtonStates() {
        // Previous button state
        this.previousQuestionBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next button state and visibility
        if (this.currentQuestionIndex === this.questions.length - 1) {
            // Last question - show submit button
            this.nextQuestionBtn.style.display = 'none';
            this.submitQuizBtn.style.display = 'inline-flex';
        } else {
            // Not last question - show next button
            this.nextQuestionBtn.style.display = 'inline-flex';
            this.submitQuizBtn.style.display = 'none';
            
            // Enable next button if current question is answered
            const isAnswered = this.userAnswers[this.currentQuestionIndex] !== undefined;
            this.nextQuestionBtn.disabled = !isAnswered;
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        this.currentScore.textContent = this.score;
    }

    checkAuthentication() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
            return;
        }
        
        try {
            this.currentUser = JSON.parse(currentUser);
            this.welcomeUser.textContent = `Welcome, ${this.currentUser.username}!`;
        } catch (error) {
            console.error('Error parsing current user:', error);
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    }

    initializeAudio() {
        // Create audio context for sound effects
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playCompletionSound() {
        // Play a celebratory sound sequence
        this.playSound(523, 0.2); // C5
        setTimeout(() => this.playSound(659, 0.2), 200); // E5
        setTimeout(() => this.playSound(784, 0.2), 400); // G5
        setTimeout(() => this.playSound(1047, 0.5), 600); // C6
    }

    playPerfectScoreSound() {
        // Play an even more celebratory sound for perfect score
        this.playSound(523, 0.15); // C5
        setTimeout(() => this.playSound(659, 0.15), 150); // E5
        setTimeout(() => this.playSound(784, 0.15), 300); // G5
        setTimeout(() => this.playSound(1047, 0.15), 450); // C6
        setTimeout(() => this.playSound(1319, 0.15), 600); // E6
        setTimeout(() => this.playSound(1568, 0.8), 750); // G6
    }

    downloadCertificate() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);
        
        // Border
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 760, 560);
        
        // Inner border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, 720, 520);
        
        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 400, 120);
        
        // Subtitle
        ctx.font = '24px Arial';
        ctx.fillText('Python Programming Quiz', 400, 160);
        
        // Achievement text
        ctx.font = 'bold 36px Arial';
        ctx.fillText('PERFECT SCORE', 400, 220);
        
        // Student name
        ctx.font = '28px Arial';
        ctx.fillText(`This certifies that`, 400, 280);
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(this.currentUser.username.toUpperCase(), 400, 320);
        
        // Achievement details
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('has successfully completed the Python Programming Quiz', 400, 360);
        ctx.fillText('with a perfect score of 20/20', 400, 390);
        
        // Date
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        ctx.fillText(`Completed on ${dateString}`, 400, 450);
        
        // Signature line
        ctx.font = '20px Arial';
        ctx.fillText('Python Quiz Master', 400, 520);
        
        // Convert to image and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Python_Quiz_Certificate_${this.currentUser.username}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
