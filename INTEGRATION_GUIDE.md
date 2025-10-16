# Python Quiz Master - Integration Guide

## Overview
The application has been successfully integrated with a login system. Here's how the flow works:

## File Structure
- `index.html` - Main entry point (landing page)
- `login.html` - Login and registration page
- `quiz.html` - The actual quiz application
- `login.js` - Login functionality
- `script.js` - Quiz functionality
- `database.js` - Local storage database
- `styles.css` - Styling for all pages

## User Flow
1. **Landing Page** (`index.html`): Users first see a welcome page
2. **Login Page** (`login.html`): Users sign in or register
3. **Quiz Page** (`quiz.html`): After successful login, users access the quiz

## Login Data Storage

### Where Login Data is Stored
The login data is stored in the **browser's localStorage**. This is a client-side storage mechanism that persists data locally on the user's device.

### Storage Details:
- **Location**: Browser's localStorage
- **Keys Used**:
  - `quizUsers` - Stores all user accounts
  - `quizResults` - Stores quiz results and statistics
  - `currentUser` - Stores the currently logged-in user session

### Default Login Credentials:
1. **Admin Account**:
   - Username: `admin`
   - Password: `admin123`

2. **Demo Account**:
   - Username: `Jiban Maji`
   - Password: `Jiban@2006`

### Data Structure:
```javascript
// User data structure
{
  id: "unique_id",
  username: "username",
  email: "email@example.com",
  password: "password", // Note: In production, this should be hashed
  role: "student" | "admin",
  createdAt: "ISO_date_string",
  lastLogin: "ISO_date_string",
  totalQuizzes: number,
  bestScore: number,
  averageScore: number
}
```

## Security Notes
⚠️ **Important**: This is a demo application. In a production environment:
- Passwords should be hashed using bcrypt or similar
- Use HTTPS for all communications
- Implement proper session management
- Add server-side validation
- Use a proper database (not localStorage)

## How to Deploy to GitHub Pages
1. Upload all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch" and select "main"
4. Your application will be available at: `https://yourusername.github.io/repository-name`

## Testing the Integration
1. Open `index.html` in a web browser
2. Click "Get Started - Sign In"
3. Use the demo credentials to log in
4. You'll be redirected to the quiz application
5. Complete the quiz and see your results

## Features
- ✅ User registration and login
- ✅ Session management
- ✅ Quiz with 20 Python questions
- ✅ Real-time timer
- ✅ Progress tracking
- ✅ Detailed statistics
- ✅ Answer review
- ✅ Certificate download (for perfect scores)
- ✅ Responsive design
- ✅ Local data persistence
