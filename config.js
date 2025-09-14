// SPYDER Configuration
module.exports = {
    // Server Configuration
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // MongoDB Configuration
    MONGODB_URI: process.env.MONGODB_URI || (() => {
        console.warn('⚠️  MONGODB_URI environment variable not set. Please create a .env file with your MongoDB connection string.');
        console.warn('   Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
        return 'mongodb://localhost:27017/spyder'; // Fallback to local MongoDB
    })(),
    
    // Frontend URL (for CORS)
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    
    // JWT Secret
    JWT_SECRET: process.env.JWT_SECRET || (() => {
        console.warn('⚠️  JWT_SECRET environment variable not set. Using default secret (not recommended for production).');
        return 'spyder-super-secret-jwt-key-2024';
    })(),
    
    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    
    // Security
    HELMET_ENABLED: process.env.HELMET_ENABLED !== 'false',
    CORS_ENABLED: process.env.CORS_ENABLED !== 'false'
};
