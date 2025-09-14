#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 SPYDER Environment Setup');
console.log('============================\n');

// Check if .env already exists
if (fs.existsSync('.env')) {
    console.log('⚠️  .env file already exists!');
    rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            createEnvFile();
        } else {
            console.log('Setup cancelled.');
            rl.close();
        }
    });
} else {
    createEnvFile();
}

function createEnvFile() {
    console.log('\n📝 Creating .env file...\n');
    
    rl.question('Enter MongoDB URI (or press Enter for default local MongoDB): ', (mongodbUri) => {
        rl.question('Enter JWT Secret (or press Enter for default): ', (jwtSecret) => {
            rl.question('Enter Port (or press Enter for 3000): ', (port) => {
                rl.question('Enter Frontend URL (or press Enter for http://localhost:3000): ', (frontendUrl) => {
                    
                    const envContent = `# SPYDER Environment Configuration

# Server Configuration
PORT=${port || '3000'}
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=${mongodbUri || 'mongodb://localhost:27017/spyder'}

# Frontend URL (for CORS)
FRONTEND_URL=${frontendUrl || 'http://localhost:3000'}

# JWT Secret (for future authentication)
JWT_SECRET=${jwtSecret || 'spyder-super-secret-jwt-key-2024'}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
HELMET_ENABLED=true
CORS_ENABLED=true
`;

                    try {
                        fs.writeFileSync('.env', envContent);
                        console.log('\n✅ .env file created successfully!');
                        console.log('\n📋 Your configuration:');
                        console.log(`   MongoDB URI: ${mongodbUri || 'mongodb://localhost:27017/spyder'}`);
                        console.log(`   Port: ${port || '3000'}`);
                        console.log(`   Frontend URL: ${frontendUrl || 'http://localhost:3000'}`);
                        console.log(`   JWT Secret: ${jwtSecret ? '[CUSTOM]' : '[DEFAULT]'}`);
                        console.log('\n🚀 You can now run: npm start');
                    } catch (error) {
                        console.error('❌ Error creating .env file:', error.message);
                    }
                    
                    rl.close();
                });
            });
        });
    });
}

// Handle Ctrl+C
rl.on('SIGINT', () => {
    console.log('\n\nSetup cancelled.');
    rl.close();
});
