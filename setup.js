#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 SPYDER Website Setup');
console.log('======================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found. Please run this script from the project root directory.');
    process.exit(1);
}

// Check if .env exists, if not create from example
if (!fs.existsSync('.env')) {
    if (fs.existsSync('env.example')) {
        fs.copyFileSync('env.example', '.env');
        console.log('✅ Created .env file from template');
    } else {
        console.log('⚠️  No .env file found. Please create one manually.');
    }
} else {
    console.log('✅ .env file already exists');
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 14) {
    console.log('⚠️  Warning: Node.js version 14 or higher is recommended');
    console.log(`   Current version: ${nodeVersion}`);
} else {
    console.log(`✅ Node.js version: ${nodeVersion}`);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('\n📦 Installing dependencies...');
    console.log('   Run: npm install');
} else {
    console.log('✅ Dependencies already installed');
}

console.log('\n🎯 Next Steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Start MongoDB (local or use Atlas cloud)');
console.log('3. Update .env with your MongoDB connection string');
console.log('4. Start the server: npm start');
console.log('5. Open http://localhost:3000 in your browser');

console.log('\n🌟 SPYDER Features:');
console.log('• Animated canvas with vehicles and sparkles');
console.log('• Stress prediction and wellness tracking');
console.log('• Community chat and gratitude wall');
console.log('• Breathing exercises and daily reflections');
console.log('• Responsive design for all devices');

console.log('\n📚 Documentation:');
console.log('• README.md - Complete setup and feature guide');
console.log('• API endpoints available at /api/health');

console.log('\n✨ Enjoy your SPYDER experience!');
