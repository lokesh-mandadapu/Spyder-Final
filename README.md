# SPYDER - Pause and Rest to Feel Your Best

A modern, interactive wellness platform designed to help users manage stress, build healthy habits, and connect with a supportive community.

## 🌟 Features

### Frontend Features
- **Animated Canvas Background**: Dynamic vehicles (🚗🏍️🚚) with glowing trails and floating sparkles
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Theme with Neon Accents**: Modern, eye-friendly design
- **Interactive Components**:
  - Stress prediction calculator
  - Critical stress mode with emergency resources
  - Wellness streak tracking
  - Gratitude wall
  - Daily reflection journal
  - Community chat system
  - Breathing exercise with visual guide

### Backend Features
- **RESTful API**: Complete backend with Express.js
- **MongoDB Integration**: Persistent data storage
- **User Management**: Login and profile system
- **Data Analytics**: Track wellness progress over time
- **Security**: Rate limiting, CORS, and input validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   **Option A: Interactive Setup (Recommended)**
   ```bash
   npm run setup
   ```
   This will guide you through creating your `.env` file with all necessary configurations.
   
   **Option B: Manual Setup**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # MongoDB Configuration
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/spyder
   
   # For MongoDB Atlas (cloud):
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&appName=yourAppName
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   
   # JWT Secret (for future authentication)
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
spyder-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # Frontend JavaScript functionality
├── server.js           # Express.js backend server
├── package.json        # Node.js dependencies
├── env.example         # Environment variables template
└── README.md          # This file
```

## 🎨 Design Features

### Canvas Animation System
- **250+ Sparkles**: Pulsating particles with random movement
- **25 Vehicles**: Cars, bikes, and trucks with colorful trails
- **Motion Blur Effect**: Semi-transparent overlay for smooth trails
- **Performance Optimized**: 60fps animation with efficient rendering

### Visual Effects
- **Gradient Text**: Animated SPYDER title with color cycling
- **Hover Animations**: Cards scale and glow on interaction
- **Smooth Transitions**: Fade-in and slide-up animations
- **Neon Glow Effects**: Subtle lighting throughout the interface

## ⚙️ Environment Configuration

### Required Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | `3000` | `3000` |
| `NODE_ENV` | Environment mode | `development` | `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/spyder` | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | `https://yourdomain.com` |
| `JWT_SECRET` | JWT signing secret | `spyder-super-secret-jwt-key-2024` | `your-random-secret-key` |

### MongoDB Configuration

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/spyder
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&appName=yourAppName
```

### Security Best Practices

1. **Never commit `.env` files** - They're automatically ignored by git
2. **Use strong JWT secrets** - Generate random strings for production
3. **Restrict MongoDB access** - Use IP whitelisting in Atlas
4. **Use environment-specific configs** - Different settings for dev/staging/prod

### Environment Setup Commands

```bash
# Interactive setup (recommended)
npm run setup

# Manual setup
cp env.example .env
# Edit .env with your values

# Check if environment is loaded correctly
node -e "require('dotenv').config(); console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set')"
```

## 🔧 API Endpoints

### User Management
- `POST /api/users/login` - User login/registration
- `GET /api/health` - Server health check

### Wellness Features
- `POST /api/gratitude` - Save gratitude entry
- `GET /api/gratitude/:userId` - Get user's gratitude entries
- `GET /api/gratitude-wall` - Get public gratitude wall

- `POST /api/stress-scores` - Save stress assessment
- `GET /api/stress-scores/:userId` - Get user's stress history

- `GET /api/wellness-streaks/:userId` - Get wellness streak
- `POST /api/wellness-streaks/:userId/increment` - Increment streak

- `POST /api/reflections` - Save daily reflection
- `GET /api/reflections/:userId` - Get reflection history

### Community
- `POST /api/chat-messages` - Send chat message
- `GET /api/chat-messages` - Get community messages

## 🗄️ Database Schema

### Collections
- **users**: User profiles and login information
- **gratitudes**: Personal gratitude entries
- **stressscores**: Stress assessment results
- **chatmessages**: Community chat messages
- **wellnessstreaks**: Wellness streak tracking
- **reflections**: Daily mood and focus reflections

## 🎮 Interactive Features

### Stress Prediction
- Two-question assessment
- Real-time score calculation
- Color-coded results (low/moderate/high stress)
- Historical tracking

### Critical Stress Mode
- Emergency breathing exercise
- Crisis helpline information
- Friend notification system
- Immediate support resources

### Wellness Streaks
- Daily habit tracking
- Motivational messages
- Progress visualization
- Achievement milestones

### Gratitude Wall
- Personal gratitude journal
- Public sharing option
- Date tracking
- Community inspiration

### Community Chat
- Mood-based matching
- Interest-based communities
- Anonymous messaging
- Real-time updates

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (Full grid layout)
- **Tablet**: 768px-1199px (Adapted grid)
- **Mobile**: <768px (Single column)

### Mobile Optimizations
- Touch-friendly buttons
- Optimized animations
- Readable text sizes
- Efficient scrolling

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for production
- **Input Validation**: Server-side data validation
- **Helmet.js**: Security headers
- **MongoDB Injection Protection**: Mongoose ODM

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set `NODE_ENV=production` in `.env`
2. Configure MongoDB Atlas connection
3. Set up proper CORS origins
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

### MongoDB Atlas Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## 🎯 Future Enhancements

- [ ] User authentication with JWT
- [ ] Push notifications for wellness reminders
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered stress prediction
- [ ] Integration with wearable devices
- [ ] Group wellness challenges
- [ ] Professional therapist connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- **Poppins Font**: Google Fonts
- **Canvas API**: For smooth animations
- **Express.js**: Backend framework
- **MongoDB**: Database solution
- **Community**: For inspiration and feedback

---

**SPYDER** - *Pause and Rest to Feel Your Best* 🌟
