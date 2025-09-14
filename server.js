const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const config = require('./config');
require('dotenv').config();

const app = express();
const PORT = config.PORT;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
    origin: config.NODE_ENV === 'production' ? config.FRONTEND_URL : 'http://localhost:3000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// MongoDB Models
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

const gratitudeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: false }
});

const stressScoreSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true, min: 1, max: 8 },
    stressLevel: { type: String, required: true },
    sleepHours: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const chatMessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    mood: { type: String, required: true },
    interest: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isAnonymous: { type: Boolean, default: true }
});

const wellnessStreakSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastUpdate: { type: Date, default: Date.now },
    streakHistory: [{
        date: { type: Date, default: Date.now },
        action: { type: String, enum: ['increment', 'reset'] }
    }]
});

const reflectionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    mood: { type: String, required: true },
    focus: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Gratitude = mongoose.model('Gratitude', gratitudeSchema);
const StressScore = mongoose.model('StressScore', stressScoreSchema);
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
const WellnessStreak = mongoose.model('WellnessStreak', wellnessStreakSchema);
const Reflection = mongoose.model('Reflection', reflectionSchema);

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// User routes
app.post('/api/users/login', async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        
        if (!name || !phone) {
            return res.status(400).json({ 
                error: 'Name and phone number are required' 
            });
        }

        // Find or create user
        let user = await User.findOne({ phone });
        
        if (!user) {
            user = new User({ name, phone, email });
            await user.save();
        } else {
            user.lastLogin = new Date();
            await user.save();
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Gratitude routes
app.post('/api/gratitude', async (req, res) => {
    try {
        const { userId, text, isPublic } = req.body;
        
        if (!userId || !text) {
            return res.status(400).json({ 
                error: 'User ID and gratitude text are required' 
            });
        }

        const gratitude = new Gratitude({ userId, text, isPublic });
        await gratitude.save();

        res.json({
            success: true,
            gratitude: {
                id: gratitude._id,
                text: gratitude.text,
                date: gratitude.date,
                isPublic: gratitude.isPublic
            }
        });
    } catch (error) {
        console.error('Gratitude save error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/gratitude/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 10, page = 1 } = req.query;
        
        const gratitudes = await Gratitude.find({ userId })
            .sort({ date: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Gratitude.countDocuments({ userId });

        res.json({
            success: true,
            gratitudes,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Gratitude fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Stress score routes
app.post('/api/stress-scores', async (req, res) => {
    try {
        const { userId, score, stressLevel, sleepHours } = req.body;
        
        if (!userId || !score || !stressLevel || !sleepHours) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        const stressScore = new StressScore({ userId, score, stressLevel, sleepHours });
        await stressScore.save();

        res.json({
            success: true,
            stressScore: {
                id: stressScore._id,
                score: stressScore.score,
                stressLevel: stressScore.stressLevel,
                sleepHours: stressScore.sleepHours,
                date: stressScore.date
            }
        });
    } catch (error) {
        console.error('Stress score save error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/stress-scores/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 10 } = req.query;
        
        const stressScores = await StressScore.find({ userId })
            .sort({ date: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            stressScores
        });
    } catch (error) {
        console.error('Stress scores fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Chat message routes
app.post('/api/chat-messages', async (req, res) => {
    try {
        const { userId, message, mood, interest, isAnonymous } = req.body;
        
        if (!userId || !message || !mood || !interest) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        const chatMessage = new ChatMessage({ 
            userId, 
            message, 
            mood, 
            interest, 
            isAnonymous 
        });
        await chatMessage.save();

        res.json({
            success: true,
            message: {
                id: chatMessage._id,
                message: chatMessage.message,
                mood: chatMessage.mood,
                interest: chatMessage.interest,
                timestamp: chatMessage.timestamp,
                isAnonymous: chatMessage.isAnonymous
            }
        });
    } catch (error) {
        console.error('Chat message save error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/chat-messages', async (req, res) => {
    try {
        const { interest, limit = 50 } = req.query;
        
        const query = interest ? { interest } : {};
        const chatMessages = await ChatMessage.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            messages: chatMessages
        });
    } catch (error) {
        console.error('Chat messages fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Wellness streak routes
app.get('/api/wellness-streaks/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        let streak = await WellnessStreak.findOne({ userId });
        
        if (!streak) {
            streak = new WellnessStreak({ userId });
            await streak.save();
        }

        res.json({
            success: true,
            streak: {
                currentStreak: streak.currentStreak,
                longestStreak: streak.longestStreak,
                lastUpdate: streak.lastUpdate
            }
        });
    } catch (error) {
        console.error('Wellness streak fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/wellness-streaks/:userId/increment', async (req, res) => {
    try {
        const { userId } = req.params;
        
        let streak = await WellnessStreak.findOne({ userId });
        
        if (!streak) {
            streak = new WellnessStreak({ userId });
        }

        // Check if already updated today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastUpdate = new Date(streak.lastUpdate);
        lastUpdate.setHours(0, 0, 0, 0);
        
        if (lastUpdate.getTime() === today.getTime()) {
            return res.json({
                success: true,
                message: 'Already updated today',
                streak: {
                    currentStreak: streak.currentStreak,
                    longestStreak: streak.longestStreak
                }
            });
        }

        streak.currentStreak += 1;
        streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
        streak.lastUpdate = new Date();
        streak.streakHistory.push({
            date: new Date(),
            action: 'increment'
        });

        await streak.save();

        res.json({
            success: true,
            streak: {
                currentStreak: streak.currentStreak,
                longestStreak: streak.longestStreak,
                lastUpdate: streak.lastUpdate
            }
        });
    } catch (error) {
        console.error('Wellness streak increment error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reflection routes
app.post('/api/reflections', async (req, res) => {
    try {
        const { userId, mood, focus } = req.body;
        
        if (!userId || !mood || !focus) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        const reflection = new Reflection({ userId, mood, focus });
        await reflection.save();

        res.json({
            success: true,
            reflection: {
                id: reflection._id,
                mood: reflection.mood,
                focus: reflection.focus,
                date: reflection.date
            }
        });
    } catch (error) {
        console.error('Reflection save error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/reflections/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 10 } = req.query;
        
        const reflections = await Reflection.find({ userId })
            .sort({ date: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            reflections
        });
    } catch (error) {
        console.error('Reflections fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Public gratitude wall
app.get('/api/gratitude-wall', async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        
        const publicGratitudes = await Gratitude.find({ isPublic: true })
            .sort({ date: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            gratitudes: publicGratitudes
        });
    } catch (error) {
        console.error('Public gratitude wall error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SPYDER server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${config.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});
