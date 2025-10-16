// Database for Quiz Application
class QuizDatabase {
    constructor() {
        this.users = this.loadUsers();
        this.quizResults = this.loadQuizResults();
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Create default users if no users exist
        if (this.users.length === 0) {
            this.addUser({
                id: 'admin',
                username: 'admin',
                email: 'admin@quiz.com',
                password: 'admin123',
                role: 'admin',
                createdAt: new Date().toISOString()
            });
            
            this.addUser({
                id: 'jiban',
                username: 'Jiban Maji',
                email: 'jiban@quiz.com',
                password: 'Jiban@2006',
                role: 'student',
                createdAt: new Date().toISOString()
            });
        }
    }

    // User Management
    addUser(userData) {
        const user = {
            id: userData.id || this.generateId(),
            username: userData.username,
            email: userData.email,
            password: userData.password, // In real app, this should be hashed
            role: userData.role || 'student',
            createdAt: userData.createdAt || new Date().toISOString(),
            lastLogin: null,
            totalQuizzes: 0,
            bestScore: 0,
            averageScore: 0
        };
        
        this.users.push(user);
        this.saveUsers();
        return user;
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    authenticateUser(username, password) {
        const user = this.getUserByUsername(username);
        if (user && user.password === password) {
            user.lastLogin = new Date().toISOString();
            this.saveUsers();
            return user;
        }
        return null;
    }

    updateUserStats(userId, quizResult) {
        const user = this.getUserById(userId);
        if (user) {
            user.totalQuizzes++;
            if (quizResult.score > user.bestScore) {
                user.bestScore = quizResult.score;
            }
            
            // Calculate average score
            const userResults = this.quizResults.filter(result => result.userId === userId);
            const totalScore = userResults.reduce((sum, result) => sum + result.score, 0);
            user.averageScore = Math.round(totalScore / userResults.length);
            
            this.saveUsers();
        }
    }

    // Quiz Results Management
    saveQuizResult(resultData) {
        const result = {
            id: this.generateId(),
            userId: resultData.userId,
            username: resultData.username,
            score: resultData.score,
            totalQuestions: resultData.totalQuestions,
            attendedQuestions: resultData.attendedQuestions,
            correctAnswers: resultData.correctAnswers,
            incorrectAnswers: resultData.incorrectAnswers,
            accuracyRate: resultData.accuracyRate,
            timeSpent: resultData.timeSpent,
            completedAt: new Date().toISOString(),
            answers: resultData.answers,
            isPerfectScore: resultData.score === resultData.totalQuestions
        };
        
        this.quizResults.push(result);
        this.saveQuizResults();
        
        // Update user statistics
        this.updateUserStats(resultData.userId, result);
        
        return result;
    }

    getUserResults(userId) {
        return this.quizResults.filter(result => result.userId === userId)
                              .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    }

    getAllResults() {
        return this.quizResults.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    }

    getPerfectScores() {
        return this.quizResults.filter(result => result.isPerfectScore);
    }

    getLeaderboard(limit = 10) {
        return this.quizResults
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // Local Storage Management
    loadUsers() {
        try {
            const users = localStorage.getItem('quizUsers');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('quizUsers', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }

    loadQuizResults() {
        try {
            const results = localStorage.getItem('quizResults');
            return results ? JSON.parse(results) : [];
        } catch (error) {
            console.error('Error loading quiz results:', error);
            return [];
        }
    }

    saveQuizResults() {
        try {
            localStorage.setItem('quizResults', JSON.stringify(this.quizResults));
        } catch (error) {
            console.error('Error saving quiz results:', error);
        }
    }

    // Utility Functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Data Export/Import
    exportData() {
        return {
            users: this.users,
            quizResults: this.quizResults,
            exportedAt: new Date().toISOString()
        };
    }

    importData(data) {
        if (data.users) {
            this.users = data.users;
            this.saveUsers();
        }
        if (data.quizResults) {
            this.quizResults = data.quizResults;
            this.saveQuizResults();
        }
    }

    // Clear all data (for testing)
    clearAllData() {
        localStorage.removeItem('quizUsers');
        localStorage.removeItem('quizResults');
        this.users = [];
        this.quizResults = [];
    }
}

// Initialize global database instance
window.quizDatabase = new QuizDatabase();
