# QuarkNet - Clean Social Media Prototype

![QuarkNet Logo](https://img.shields.io/badge/QuarkNet-Clean%20Social%20Media-blue?style=for-the-badge&logo=atom)

A frontend-only social media prototype built for QuarkNet, a bold startup determined to clean up the internet by promoting quality content and eliminating "brainrot" posts.

##  Project Overview

QuarkNet is a lightweight social media platform where users can share thoughts freely — unless they post brainrot content. In that case, the system "reduces them to atoms" (metaphorically, of course). This prototype demonstrates how the platform could function visually and interactively through frontend simulation.

###  Mission Statement
> "Where thoughts matter, brainrot doesn't"

## Features

###  Authentication System
- **Login Page**: Simulated user authentication using localStorage
- **Signup Page**: Account creation with form validation
- **Session Management**: Persistent login state across pages
- **Demo Credentials**: Pre-populated for easy testing

### Core Social Media Features
- **Main Feed**: Display user posts with likes and comments
- **Post Creation**: Create new posts with brainrot detection
- **User Profiles**: Editable profile information and stats
- **Notifications**: Real-time notification system
- **Like System**: Interactive like/unlike functionality

### Brainrot Detection (Easter Egg)
- **AI-Powered Detection**: Identifies low-quality content using keyword analysis
- **Dramatic Animation**: Posts get "atomized" when brainrot is detected
- **Educational Warning**: Teaches users about quality content standards

### User Experience
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and hover effects
- **Modern UI**: Clean, professional interface design

### Data Management
- **localStorage Persistence**: All data stored locally
- **Mock Data**: Pre-populated with sample users and posts
- **Real-time Updates**: UI updates immediately when data changes

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or database required!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring QuarkNet!

### Quick Start
1. **Visit the Homepage**: Open `index.html`
2. **Login**: Use demo credentials (alex@quarknet.com / password123)
3. **Explore**: Navigate through the feed, profile, and notifications
4. **Create Posts**: Try posting content and see the brainrot detection in action!

## Project Structure

```
quarknet/
├── index.html              # Homepage
├── pages/                  # Application pages
│   ├── login.html         # Login page
│   ├── signup.html        # Registration page
│   ├── feed.html          # Main social feed
│   ├── profile.html       # User profile page
│   └── notifications.html # Notifications page
├── src/                   # Source code
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── main.js        # Core JavaScript functionality
├── assets/                # Static assets
│   └── img/              # Images (placeholder)
└── README.md             # This file
```

## Technical Implementation

### Frontend-Only Architecture
- **No Backend**: Pure HTML, CSS, and JavaScript
- **localStorage**: Client-side data persistence
- **Modular Design**: Organized, maintainable code structure
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

### Key Technologies
- **HTML5**: Semantic markup and modern features
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **Vanilla JavaScript**: ES6+ features, Classes, Modules
- **Font Awesome**: Icon library for UI elements

### Data Flow
1. **User Actions** → JavaScript Event Handlers
2. **Data Processing** → QuarkNet Class Methods
3. **Storage** → localStorage API
4. **UI Updates** → DOM Manipulation

## How to Use

### Navigation
- **Home**: Landing page with feature overview
- **Login/Signup**: Authentication pages
- **Feed**: Main social media feed
- **Profile**: User profile and settings
- **Notifications**: Activity and updates

### Creating Posts
1. Navigate to the Feed page
2. Type your content in the post creation area
3. Click "Post" to publish
4. Watch for brainrot detection warnings!

### Brainrot Detection
Try posting content with these keywords to see the detection in action:
- "no cap", "fr fr", "bussin", "slay", "periodt"
- "stan", "simp", "yeet", "flex", "clout"
- "main character", "pick me", "sigma", "alpha"
- "based", "cringe", "sus", "mid", "fire"

## Design Philosophy

### Visual Design
- **Clean Aesthetics**: Minimalist, professional appearance
- **Consistent Branding**: Atomic theme with blue color scheme
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Responsive**: Mobile-first design approach

### User Experience
- **Intuitive Navigation**: Clear, logical page structure
- **Immediate Feedback**: Visual responses to user actions
- **Error Handling**: Helpful error messages and validation
- **Performance**: Fast loading, smooth animations

## Customization

### Adding New Features
1. **New Pages**: Create HTML files in `pages/` directory
2. **Styling**: Add CSS rules to `src/css/style.css`
3. **Functionality**: Extend the QuarkNet class in `src/js/main.js`

### Theming
- **CSS Variables**: Modify `:root` selectors for color schemes
- **Dark Mode**: Toggle implemented with data attributes
- **Custom Themes**: Add new theme options easily

##  Challenges & Solutions

### Frontend-Only Constraints
**Challenge**: No backend means no real data persistence
**Solution**: localStorage provides adequate simulation for prototype purposes

**Challenge**: No real-time updates across sessions
**Solution**: Data refreshes on page load, simulating real-time behavior

**Challenge**: Limited user management capabilities
**Solution**: Simple user array with basic CRUD operations

### Future Improvements (With Backend)
- **Real Database**: PostgreSQL or MongoDB for data storage
- **User Authentication**: JWT tokens and secure login
- **Real-time Updates**: WebSocket connections
- **File Uploads**: Image and media sharing
- **Advanced Features**: Search, recommendations, messaging

## Demo Scenarios

### Scenario 1: New User Onboarding
1. Visit homepage → Sign up → Create profile → First post
2. Experience the clean, welcoming interface
3. Learn about QuarkNet's mission

### Scenario 2: Content Creation
1. Login → Create thoughtful post → See it appear in feed
2. Try posting brainrot content → Watch it get "atomized"
3. Edit profile → Update information

### Scenario 3: Social Interaction
1. Browse feed → Like posts → View notifications
2. Explore different user profiles
3. Experience the notification system

## Key Achievements

- ✅ **Complete Frontend-Only Solution**: No backend required
- ✅ **Realistic Social Media Experience**: Feels like a real app
- ✅ **Brainrot Detection**: Unique, educational feature
- ✅ **Responsive Design**: Works on all devices
- ✅ **Dark Mode**: Modern UX feature
- ✅ **Data Persistence**: localStorage implementation
- ✅ **Clean Code**: Well-organized, maintainable structure


##  Contributing

This is a prototype project, but suggestions and improvements are welcome!

### Development Setup
1. Fork the repository
2. Make your changes
3. Test across different browsers
4. Submit a pull request

##  License

This project is created for educational purposes as part of a web development course.

##  Acknowledgments

- **QuarkNet Team**: For the innovative concept and requirements
- **Font Awesome**: For the comprehensive icon library
- **Modern CSS**: For advanced layout and animation capabilities
- **Web Standards**: For making frontend-only solutions possible

---

**Built with ❤️ for a cleaner internet**

*QuarkNet - Where thoughts matter, brainrot doesn't*
