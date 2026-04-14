# Quiz Master - Online Quiz Application

A comprehensive, responsive online quiz application built with HTML, CSS, JavaScript, and Bootstrap.

## 📁 Project Structure

```
quiz-app/
├── index.html                 # Landing/Home Page
├── quiz-selection.html        # Quiz Category Selection
├── quiz.html                  # Main Quiz Page
├── results.html               # Results & Score Display
├── leaderboard.html           # Global Leaderboard
├── about.html                 # About Us Page
├── contact.html               # Contact Us Page
│
├── css/
│   └── style.css              # Main Stylesheet (1000+ lines)
│
├── js/
│   ├── app.js                 # Core Application Logic
│   ├── quiz.js                # Quiz Selection Logic
│   ├── quiz-engine.js         # Quiz Engine & Timer
│   ├── results.js             # Results Processing
│   ├── leaderboard.js         # Leaderboard Management
│   └── contact.js             # Contact Form Handling
│
└── data/
    └── quizzes.json           # Quiz Data File
```

## ✨ Features

### 1. **Home Page (index.html)**
- Eye-catching hero section with call-to-action buttons
- Statistics display
- Feature highlights section
- Responsive navigation bar
- Professional footer

### 2. **Quiz Selection (quiz-selection.html)**
- Browse available quizzes
- Search functionality
- Quiz cards with details:
  - Number of questions
  - Time limit
  - Difficulty level
  - Passing score
  - User ratings
  - Number of attempts
- One-click quiz start

### 3. **Quiz Interface (quiz.html)**
- Dynamic question display
- Progress bar showing completion
- Real-time timer with color warnings
- Score tracking
- Multiple choice options with visual feedback
- Navigation buttons (Previous, Skip, Next)
- Submit quiz functionality

### 4. **Results Page (results.html)**
- Overall score display with performance level
- Statistics breakdown:
  - Correct answers count
  - Time taken
  - Accuracy percentage
- Detailed answer review:
  - Your answer vs. correct answer
  - Question explanations
  - Visual indicators (✓ correct, ✗ incorrect)
- Action buttons to continue learning

### 5. **Leaderboard (leaderboard.html)**
- Global rankings
- Filter options (All Time, This Month, This Week, Today)
- User statistics:
  - Rank with medals (🥇🥈🥉)
  - Total score
  - Quizzes taken
  - Average score
- Top 3 performers highlighted
- Pagination support

### 6. **About Page (about.html)**
- Company mission and vision
- Why choose us section
- Statistics and achievements

### 7. **Contact Page (contact.html)**
- Contact information
- Location details
- Business hours
- Contact form with validation
- Category-based submission
- Success/error messages
- Social media links

## 🎨 Design Features

### Bootstrap Integration
- Responsive grid system
- Pre-built components
- Mobile-first design
- Accessibility features

### Custom CSS (1000+ lines)
- Gradient backgrounds
- Smooth transitions
- Hover effects
- Mobile responsiveness
- Dark/light color schemes
- Custom form styling

### JavaScript Features
- Local storage for user data
- Timer functionality with countdown
- Form validation
- Dynamic content rendering
- Quiz progression tracking
- Score calculation
- Data persistence

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required (runs entirely client-side)

### Installation

1. **Download/Clone the project**
   ```
   Copy the quiz-app folder to your desired location
   ```

2. **Open the application**
   ```
   Double-click index.html or
   Right-click index.html → Open with → Your Browser
   ```

3. **Or use a local server (recommended)**
   ```
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (with http-server installed)
   http-server
   ```
   Then visit: `http://localhost:8000`

## 📖 How to Use

### Taking a Quiz
1. Click **"Start Quiz"** on the home page or navigate to **"Take Quiz"**
2. Browse available quizzes and click **"Start Quiz"** on your choice
3. Read each question carefully
4. Select your answer by clicking an option
5. Use navigation buttons to move between questions
6. Click **"Submit Quiz"** on the last question
7. Review your results immediately

### Viewing Leaderboard
1. Navigate to **"Leaderboard"** in the menu
2. Use filter buttons to view rankings:
   - All Time: Overall top performers
   - This Month: Monthly champions
   - This Week: Weekly leaders
   - Today: Daily top scorers

### Contacting Support
1. Go to **"Contact"** page
2. Fill in your information
3. Select a category (Support, Feedback, Business, Other)
4. Write your message
5. Click **"Send Message"**

## 💾 Data Storage

The application uses **localStorage** to save:
- User profile information
- Quiz history and scores
- Contact form submissions
- User preferences

This data persists even after closing the browser.

## 🔧 Customization

### Adding New Quizzes
Edit `data/quizzes.json` and the `sampleQuestions` array in `js/quiz-engine.js`:

```javascript
{
    id: 11,
    title: 'Your Quiz Title',
    description: 'Quiz description',
    category: 'Category',
    questions: 20,
    difficulty: 'Easy|Medium|Intermediate|Hard',
    passingScore: 70,
    timeLimit: 30,
    attempts: 0,
    rating: 5.0
}
```

### Modifying Styles
Edit `css/style.css` to customize:
- Color scheme (update `:root` variables)
- Font styles
- Spacing and layout
- Responsive breakpoints

### Changing Content
- Update text in HTML files
- Modify images/icons (add to `assets/` folder)
- Change navigation menu in all pages

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full experience with all features
- **Tablet**: Optimized layout for touch
- **Mobile**: Stacked layout, easy navigation

## 🎯 Key Components

### Navigation Bar
- Sticky navigation across all pages
- Active page highlighting
- Mobile hamburger menu

### Quiz Engine
- 10-second timer countdown
- Real-time progress tracking
- Automatic submission on time expiry
- Answer validation

### Results Engine
- Automatic score calculation
- Accuracy percentage
- Time tracking
- Detailed answer explanations

## 🐛 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## 📄 File Sizes

- **Total HTML**: ~25 KB
- **Total CSS**: ~40 KB
- **Total JavaScript**: ~35 KB
- **Data Files**: ~2 KB

## 🔐 Privacy

All data is stored locally in the user's browser. No data is sent to any server. Users have full control over their data.

## 🎓 Educational Features

- Multiple difficulty levels
- Time-limited assessments
- Immediate feedback
- Detailed explanations
- Progress tracking
- Leaderboard motivation
- Score benchmarking

## 📝 Sample Quiz Content

The application includes 10 sample quizzes covering:
- General Knowledge
- JavaScript Programming
- World History
- English Grammar
- Chemistry
- Biology
- Python Programming
- World Capitals
- Mathematics
- Art & Culture

Each quiz has 20-30 questions with explanations.

## 🌟 Future Enhancements

Potential features to add:
- User accounts and authentication
- Backend database
- Quiz creation tools
- User statistics dashboard
- Certificate generation
- Export results (PDF)
- Mobile app version
- Multi-language support
- Admin panel
- Question shuffling

## 📞 Support

For issues or suggestions:
1. Check the About page
2. Use the Contact form
3. Review the code comments

## 📜 License

This project is free to use and modify for educational purposes.

## ✅ Testing Checklist

- [x] All pages load correctly
- [x] Navigation works properly
- [x] Quiz timer functions
- [x] Score calculation is accurate
- [x] Leaderboard displays correctly
- [x] Contact form validates input
- [x] Responsive design on mobile
- [x] Local storage works
- [x] Answer review displays correctly
- [x] Search functionality filters quizzes

---

**Created**: 2024  
**Version**: 1.0  
**Status**: Ready for Use

Enjoy your Quiz Master experience! 🎉
