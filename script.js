// SPYDER Website JavaScript
// Main application state and configuration
const app = {
    // Daily quotes array
    quotes: [
        "The present moment is the only time over which we have dominion.",
        "Peace comes from within. Do not seek it without.",
        "You have been assigned this mountain to show others it can be moved.",
        "The mind is everything. What you think you become.",
        "Happiness is not something ready made. It comes from your own actions.",
        "The only way to do great work is to love what you do.",
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "In the middle of difficulty lies opportunity.",
        "You are never too old to set another goal or to dream a new dream.",
        "The only impossible journey is the one you never begin.",
        "Life is 10% what happens to you and 90% how you react to it.",
        "Don't watch the clock; do what it does. Keep going.",
        "The way to get started is to quit talking and begin doing."
    ],
    
    // User data
    user: {
        name: '',
        phone: '',
        loggedIn: false
    },
    
    // App state
    state: {
        streak: 0,
        gratitudeEntries: [],
        chatMessages: [],
        currentMood: '',
        currentInterest: '',
        stressScores: []
    }
};

// Canvas Animation System
class CanvasAnimation {
    constructor() {
        this.canvas = document.getElementById('animationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.sparkles = [];
        this.vehicles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createSparkles();
        this.createVehicles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createSparkles() {
        this.sparkles = [];
        for (let i = 0; i < 250; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.8 + 0.2,
                alphaSpeed: (Math.random() - 0.5) * 0.02,
                driftX: (Math.random() - 0.5) * 0.5,
                driftY: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    createVehicles() {
        this.vehicles = [];
        const vehicleTypes = ['🚗', '🏍️', '🚚'];
        
        for (let i = 0; i < 25; i++) {
            this.vehicles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3,
                size: Math.random() * 30 + 20,
                emoji: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
                trail: [],
                trailLength: 25,
                color: {
                    r: Math.random() * 255,
                    g: Math.random() * 255,
                    b: Math.random() * 255
                }
            });
        }
    }
    
    animate() {
        // Clear canvas with semi-transparent overlay for motion blur
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw sparkles
        this.updateSparkles();
        this.drawSparkles();
        
        // Update and draw vehicles
        this.updateVehicles();
        this.drawVehicles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateSparkles() {
        this.sparkles.forEach(sparkle => {
            // Update alpha with pulsation
            sparkle.alpha += sparkle.alphaSpeed;
            if (sparkle.alpha > 1) {
                sparkle.alpha = 1;
                sparkle.alphaSpeed = -Math.abs(sparkle.alphaSpeed);
            } else if (sparkle.alpha < 0.2) {
                sparkle.alpha = 0.2;
                sparkle.alphaSpeed = Math.abs(sparkle.alphaSpeed);
            }
            
            // Gentle drift movement
            sparkle.x += sparkle.driftX;
            sparkle.y += sparkle.driftY;
            
            // Wrap around screen
            if (sparkle.x < 0) sparkle.x = this.canvas.width;
            if (sparkle.x > this.canvas.width) sparkle.x = 0;
            if (sparkle.y < 0) sparkle.y = this.canvas.height;
            if (sparkle.y > this.canvas.height) sparkle.y = 0;
        });
    }
    
    drawSparkles() {
        this.sparkles.forEach(sparkle => {
            this.ctx.save();
            this.ctx.globalAlpha = sparkle.alpha;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00ffff';
            this.ctx.beginPath();
            this.ctx.arc(sparkle.x, sparkle.y, sparkle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    updateVehicles() {
        this.vehicles.forEach(vehicle => {
            // Move vehicle
            vehicle.x += vehicle.speedX;
            vehicle.y += vehicle.speedY;
            
            // Add current position to trail
            vehicle.trail.push({ x: vehicle.x, y: vehicle.y });
            if (vehicle.trail.length > vehicle.trailLength) {
                vehicle.trail.shift();
            }
            
            // Wrap around screen
            if (vehicle.x < -50) vehicle.x = this.canvas.width + 50;
            if (vehicle.x > this.canvas.width + 50) vehicle.x = -50;
            if (vehicle.y < -50) vehicle.y = this.canvas.height + 50;
            if (vehicle.y > this.canvas.height + 50) vehicle.y = -50;
            
            // Slight speed variation for more dynamic movement
            vehicle.speedX += (Math.random() - 0.5) * 0.1;
            vehicle.speedY += (Math.random() - 0.5) * 0.1;
            
            // Limit speed
            const maxSpeed = 3;
            vehicle.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, vehicle.speedX));
            vehicle.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, vehicle.speedY));
        });
    }
    
    drawVehicles() {
        this.vehicles.forEach(vehicle => {
            // Draw trail
            vehicle.trail.forEach((point, index) => {
                const alpha = (index / vehicle.trail.length) * 0.8;
                const size = (index / vehicle.trail.length) * 8 + 2;
                
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = `rgba(${vehicle.color.r}, ${vehicle.color.g}, ${vehicle.color.b}, ${alpha})`;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = `rgb(${vehicle.color.r}, ${vehicle.color.g}, ${vehicle.color.b})`;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            });
            
            // Draw vehicle emoji
            this.ctx.save();
            this.ctx.font = `${vehicle.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = `rgb(${vehicle.color.r}, ${vehicle.color.g}, ${vehicle.color.b})`;
            this.ctx.fillText(vehicle.emoji, vehicle.x, vehicle.y);
            this.ctx.restore();
        });
    }
    
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }
}

// Initialize canvas animation
let canvasAnimation;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize canvas animation
    canvasAnimation = new CanvasAnimation();
    
    // Initialize all components
    initializeHeader();
    initializeMainFeatures();
    initializeCuratedFeatures();
    initializeChatbot();
    initializeCommunity();
    initializeModals();
    initializeBreathingExercise();
    initializePopGame();
    initializeMemoryGame();
    initializePuzzleSliderGame();
    initializeZenGardenGame();
    initializeBubbleWrapGame();
    initializeSandDrawingGame();
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            canvasAnimation.pause();
        } else {
            canvasAnimation.resume();
        }
    });
});

// Header functionality
function initializeHeader() {
    const mainTitle = document.getElementById('mainTitle');
    const subtitle = document.getElementById('subtitle');
    const dailyQuote = document.getElementById('dailyQuote');
    const quoteText = dailyQuote.querySelector('.quote-text');
    
    // Display random daily quote
    const randomQuote = app.quotes[Math.floor(Math.random() * app.quotes.length)];
    quoteText.textContent = randomQuote;
    
    // Title shrink animation after 4 seconds
    setTimeout(() => {
        mainTitle.style.animation = 'titleShrink 0.8s ease-out forwards';
    }, 4000);
}

// Main Features functionality
function initializeMainFeatures() {
    const curatedCard = document.getElementById('curatedCard');
    const chatbotCard = document.getElementById('chatbotCard');
    const communityCard = document.getElementById('communityCard');
    const curatedFeatures = document.getElementById('curatedFeatures');
    const chatbotSection = document.getElementById('chatbotSection');
    const communitySection = document.getElementById('communitySection');
    
    curatedCard.addEventListener('click', () => {
        // Hide other sections
        chatbotSection.style.display = 'none';
        communitySection.style.display = 'none';
        
        curatedFeatures.style.display = curatedFeatures.style.display === 'none' ? 'block' : 'none';
        if (curatedFeatures.style.display === 'block') {
            curatedFeatures.style.animation = 'slideInUp 0.8s ease-out forwards';
            // Smooth scroll to curated features section
            setTimeout(() => {
                curatedFeatures.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    });
    
    chatbotCard.addEventListener('click', () => {
        // Hide other sections
        curatedFeatures.style.display = 'none';
        communitySection.style.display = 'none';
        
        chatbotSection.style.display = chatbotSection.style.display === 'none' ? 'block' : 'none';
        if (chatbotSection.style.display === 'block') {
            chatbotSection.style.animation = 'slideInUp 0.8s ease-out forwards';
            // Smooth scroll to chatbot section
            setTimeout(() => {
                chatbotSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    });
    
    communityCard.addEventListener('click', () => {
        // Hide other sections
        curatedFeatures.style.display = 'none';
        chatbotSection.style.display = 'none';
        
        communitySection.style.display = communitySection.style.display === 'none' ? 'block' : 'none';
        if (communitySection.style.display === 'block') {
            communitySection.style.animation = 'slideInUp 0.8s ease-out forwards';
            // Smooth scroll to community section
            setTimeout(() => {
                communitySection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    });
}

// Curated Features functionality
function initializeCuratedFeatures() {
    // Stress Prediction
    const calculateStressBtn = document.getElementById('calculateStress');
    const stressResult = document.getElementById('stressResult');
    
    calculateStressBtn.addEventListener('click', () => {
        const stressLevel = document.getElementById('stressLevel').value;
        const sleepHours = document.getElementById('sleepHours').value;
        
        if (!stressLevel || !sleepHours) {
            alert('Please answer both questions to calculate your stress score.');
            return;
        }
        
        const stressScore = parseInt(stressLevel) + (5 - parseInt(sleepHours));
        let resultClass, resultText;
        
        if (stressScore <= 3) {
            resultClass = 'low-stress';
            resultText = `Low Stress Level (${stressScore}/8) - You're doing great! Keep up the good work.`;
        } else if (stressScore <= 5) {
            resultClass = 'moderate-stress';
            resultText = `Moderate Stress Level (${stressScore}/8) - Consider some relaxation techniques.`;
        } else {
            resultClass = 'high-stress';
            resultText = `High Stress Level (${stressScore}/8) - Please consider using our emergency resources.`;
        }
        
        stressResult.className = `result ${resultClass}`;
        stressResult.textContent = resultText;
        stressResult.style.display = 'block';
        
        // Store stress score
        app.state.stressScores.push({
            score: stressScore,
            date: new Date().toISOString()
        });
    });
    
    // Critical Stress Mode
    const breathingBtn = document.getElementById('breathingBtn');
    const helplineBtn = document.getElementById('helplineBtn');
    const notifyBtn = document.getElementById('notifyBtn');
    const emergencyContent = document.getElementById('emergencyContent');
    
    breathingBtn.addEventListener('click', () => {
        document.getElementById('breathingModal').classList.add('active');
    });
    
    helplineBtn.addEventListener('click', () => {
        emergencyContent.innerHTML = `
            <h4>Emergency Resources:</h4>
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>Emergency Services:</strong> 911</p>
            <p>You are not alone. Help is available 24/7.</p>
        `;
        emergencyContent.style.display = 'block';
    });
    
    notifyBtn.addEventListener('click', () => {
        const friendName = prompt('Enter your friend\'s name:');
        if (friendName) {
            emergencyContent.innerHTML = `
                <h4>Friend Notification Sent</h4>
                <p>We've sent a message to ${friendName} letting them know you might need support.</p>
                <p>Remember: It's okay to ask for help. Your friends care about you.</p>
            `;
            emergencyContent.style.display = 'block';
        }
    });
    
    // Mental Wellness Streaks
    const incrementStreakBtn = document.getElementById('incrementStreak');
    const streakNumber = document.getElementById('streakNumber');
    const streakMessage = document.getElementById('streakMessage');
    
    incrementStreakBtn.addEventListener('click', () => {
        app.state.streak++;
        streakNumber.textContent = app.state.streak;
        
        if (app.state.streak === 1) {
            streakMessage.textContent = 'Great start! Keep it up!';
        } else if (app.state.streak === 7) {
            streakMessage.textContent = 'One week strong! You\'re building great habits!';
        } else if (app.state.streak === 30) {
            streakMessage.textContent = '30 days! You\'re a wellness champion!';
        } else if (app.state.streak % 10 === 0) {
            streakMessage.textContent = `${app.state.streak} days! Amazing dedication!`;
        } else {
            streakMessage.textContent = 'Keep going! Every day counts!';
        }
        
        streakMessage.style.display = 'block';
    });
    
    // Fun Games
    const popGameBtn = document.getElementById('popGameBtn');
    const memoryGameBtn = document.getElementById('memoryGameBtn');
    const puzzleSliderGameBtn = document.getElementById('puzzleSliderGameBtn');
    const zenGardenGameBtn = document.getElementById('zenGardenGameBtn');
    const bubbleWrapGameBtn = document.getElementById('bubbleWrapGameBtn');
    const sandDrawingGameBtn = document.getElementById('sandDrawingGameBtn');
    
    popGameBtn.addEventListener('click', () => {
        document.getElementById('popGameModal').classList.add('active');
    });
    
    memoryGameBtn.addEventListener('click', () => {
        document.getElementById('memoryGameModal').classList.add('active');
    });
    
    puzzleSliderGameBtn.addEventListener('click', () => {
        document.getElementById('puzzleSliderGameModal').classList.add('active');
    });
    
    zenGardenGameBtn.addEventListener('click', () => {
        document.getElementById('zenGardenGameModal').classList.add('active');
    });
    
    bubbleWrapGameBtn.addEventListener('click', () => {
        document.getElementById('bubbleWrapGameModal').classList.add('active');
    });
    
    sandDrawingGameBtn.addEventListener('click', () => {
        document.getElementById('sandDrawingGameModal').classList.add('active');
    });
    
    // Gratitude Wall
    const addGratitudeBtn = document.getElementById('addGratitude');
    const gratitudeInput = document.getElementById('gratitudeInput');
    const gratitudeEntries = document.getElementById('gratitudeEntries');
    
    addGratitudeBtn.addEventListener('click', () => {
        const gratitudeText = gratitudeInput.value.trim();
        if (!gratitudeText) {
            alert('Please enter something you\'re grateful for.');
            return;
        }
        
        const gratitudeEntry = {
            text: gratitudeText,
            date: new Date().toISOString(),
            id: Date.now()
        };
        
        app.state.gratitudeEntries.unshift(gratitudeEntry);
        
        const entryElement = document.createElement('div');
        entryElement.className = 'gratitude-entry';
        entryElement.innerHTML = `
            <p>${gratitudeText}</p>
            <small>${new Date().toLocaleDateString()}</small>
        `;
        
        gratitudeEntries.insertBefore(entryElement, gratitudeEntries.firstChild);
        gratitudeInput.value = '';
        
        // Limit to 10 entries
        if (app.state.gratitudeEntries.length > 10) {
            app.state.gratitudeEntries.pop();
            if (gratitudeEntries.children.length > 10) {
                gratitudeEntries.removeChild(gratitudeEntries.lastChild);
            }
        }
    });
    
    // Daily Reflection
    const saveReflectionBtn = document.getElementById('saveReflection');
    const moodSelect = document.getElementById('moodSelect');
    const focusInput = document.getElementById('focusInput');
    const reflectionDisplay = document.getElementById('reflectionDisplay');
    
    saveReflectionBtn.addEventListener('click', () => {
        const mood = moodSelect.value;
        const focus = focusInput.value.trim();
        
        if (!mood || !focus) {
            alert('Please select your mood and enter your focus for today.');
            return;
        }
        
        const reflection = {
            mood: mood,
            focus: focus,
            date: new Date().toISOString()
        };
        
        reflectionDisplay.innerHTML = `
            <h4>Today's Reflection</h4>
            <p><strong>Mood:</strong> ${mood}</p>
            <p><strong>Focus:</strong> ${focus}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        `;
        reflectionDisplay.style.display = 'block';
        
        moodSelect.value = '';
        focusInput.value = '';
    });
}

// Community functionality
function initializeCommunity() {
    const joinChatBtn = document.getElementById('joinChatBtn');
    const leaveChatBtn = document.getElementById('leaveChatBtn');
    const communityForm = document.getElementById('communityForm');
    const chatContainer = document.getElementById('chatContainer');
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    joinChatBtn.addEventListener('click', () => {
        const selectedMood = document.querySelector('input[name="mood"]:checked');
        const selectedInterest = document.getElementById('interestSelect').value;
        
        if (!selectedMood || !selectedInterest) {
            alert('Please select your mood and interest to join the chat.');
            return;
        }
        
        app.state.currentMood = selectedMood.value;
        app.state.currentInterest = selectedInterest;
        
        communityForm.style.display = 'none';
        chatContainer.style.display = 'block';
        
        // Add welcome message and show some existing conversation
        addChatMessage('System', `Welcome to the ${selectedInterest} community! How are you feeling today?`);
        
        // Add some existing messages from anonymous users to show activity
        setTimeout(() => {
            addChatMessage('Anonymous 2', 'Hey everyone! Hope you\'re having a good day 😊');
        }, 500);
        
        setTimeout(() => {
            addChatMessage('Anonymous 1', 'Thanks for the warm welcome! This community is so supportive');
        }, 1000);
        
        setTimeout(() => {
            addChatMessage('Anonymous 3', 'I love how we can all share our experiences here');
        }, 1500);
        
        setTimeout(() => {
            addChatMessage('Anonymous 4', 'Same here! It\'s nice to know we\'re not alone in our journey');
        }, 2000);
    });
    
    leaveChatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        communityForm.style.display = 'block';
        app.state.chatMessages = [];
        chatMessages.innerHTML = '';
    });
    
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        addChatMessage('You', message);
        messageInput.value = '';
        
        // Simulate community response from one of 4 online users
        setTimeout(() => {
            const responses = [
                'That sounds great! Thanks for sharing.',
                'I can relate to that. You\'re not alone.',
                'That\'s a wonderful perspective!',
                'Thank you for being so open with us.',
                'I appreciate you sharing that with the community.',
                'That\'s really inspiring!',
                'You\'re doing great! Keep it up!',
                'I\'ve been through something similar.',
                'That\'s really helpful to hear.',
                'Thanks for sharing your experience.',
                'I needed to hear this today.',
                'You\'re not alone in this journey.'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const randomUser = Math.floor(Math.random() * 4) + 1; // Anonymous 1-4
            addChatMessage(`Anonymous ${randomUser}`, randomResponse);
        }, 1000 + Math.random() * 2000);
    }
    
    function addChatMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
            <strong>${sender}:</strong> ${message}
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        app.state.chatMessages.push({
            sender: sender,
            message: message,
            timestamp: new Date().toISOString()
        });
    }
}

// AI Chatbot functionality
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    
    console.log('Chatbot elements found:', {
        input: !!chatbotInput,
        sendBtn: !!chatbotSendBtn,
        messages: !!chatbotMessages,
        suggestionBtns: suggestionBtns.length
    }); // Debug log
    
    // Check if elements exist before adding event listeners
    if (!chatbotInput || !chatbotSendBtn || !chatbotMessages) {
        console.error('Chatbot elements not found!');
        return;
    }
    
    // Send message functionality
    chatbotSendBtn.addEventListener('click', sendChatbotMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const suggestion = btn.getAttribute('data-suggestion');
            chatbotInput.value = suggestion;
            sendChatbotMessage();
        });
    });
    
    function sendChatbotMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        console.log('Sending message:', message); // Debug log
        
        // Add user message
        addChatbotMessage('user', message);
        chatbotInput.value = '';
        
        // Generate AI response
        setTimeout(() => {
            try {
                const response = generateChatbotResponse(message);
                console.log('Generated response:', response); // Debug log
                addChatbotMessage('bot', response);
            } catch (error) {
                console.error('Error generating response:', error);
                addChatbotMessage('bot', "I'm here and ready to help! What would you like to talk about?");
            }
        }, 1000 + Math.random() * 1000);
    }
    
    function addChatbotMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message ${sender}-message`;
        
        if (sender === 'user') {
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                </div>
                <div class="message-avatar">👤</div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${message}</p>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                </div>
            `;
        }
        
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Simplified and Robust AI Chatbot
    function generateChatbotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase().trim();
        
        // Simple and reliable response generation
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello there! 😊 I'm your AI wellness companion. I'm here to help with advice, support, and friendly conversation. What's on your mind today?";
        }
        
        if (lowerMessage.includes('how are you')) {
            return "I'm doing great, thank you for asking! I'm excited to chat with you. How are you feeling today?";
        }
        
        if (lowerMessage.includes('what is') || lowerMessage.includes('tell me about')) {
            const topic = extractTopic(userMessage);
            return getTopicExplanation(topic);
        }
        
        if (lowerMessage.includes('how to') || lowerMessage.includes('how do i')) {
            const action = extractAction(userMessage);
            return getHowToGuide(action);
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('advice')) {
            return "I'd be happy to help! I can assist with:\n\n• Career and professional advice\n• Relationship guidance\n• Life skills and personal development\n• Health and wellness tips\n• Problem-solving strategies\n• Motivation and encouragement\n\nWhat specific area would you like help with?";
        }
        
        if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
            return "I understand you're feeling stressed or anxious. Here are some helpful strategies:\n\n• Take deep breaths: 4 counts in, hold 4, out 4\n• Practice mindfulness or meditation\n• Talk to someone you trust\n• Take a walk or get some fresh air\n• Write down your thoughts and feelings\n• Focus on what you can control\n\nRemember, it's okay to feel this way. You're not alone. What's causing you the most stress right now?";
        }
        
        if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
            return "I'm sorry you're feeling sad. Your feelings are valid and important. Here are some things that might help:\n\n• Reach out to friends or family\n• Engage in activities you enjoy\n• Practice self-care and be gentle with yourself\n• Consider talking to a mental health professional\n• Remember that feelings are temporary\n• Focus on small, positive moments\n\nIs there something specific that's been weighing on your mind?";
        }
        
        if (lowerMessage.includes('motivation') || lowerMessage.includes('encouragement')) {
            return "You've got this! 💪 Here's some motivation to help you move forward:\n\n• Every small step counts toward your goals\n• Challenges make you stronger\n• You've overcome difficult times before\n• Progress, not perfection, is what matters\n• Believe in your ability to grow and improve\n• Celebrate your wins, no matter how small\n\nWhat goal or challenge are you working on? I'd love to help you stay motivated!";
        }
        
        if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
            return "Career development is so important! I can help with:\n\n• Interview preparation and tips\n• Resume and cover letter advice\n• Workplace communication\n• Career planning and goal setting\n• Professional networking\n• Work-life balance\n\nWhat aspect of your career would you like to focus on?";
        }
        
        if (lowerMessage.includes('relationship') || lowerMessage.includes('dating') || lowerMessage.includes('friendship')) {
            return "Relationships are a big part of life! I can help with:\n\n• Communication skills\n• Conflict resolution\n• Building healthy relationships\n• Dating advice\n• Family dynamics\n• Friendship maintenance\n\nWhat relationship challenge are you facing?";
        }
        
        if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
            return "You're very welcome! 😊 I'm genuinely happy to help. Is there anything else you'd like to talk about or any other way I can support you?";
        }
        
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            return "Take care! It was great chatting with you. Remember, I'm always here whenever you need support or just want to talk. Have a wonderful day! 🌟";
        }
        
        // Default response for general conversation
        return "That's really interesting! I'd love to learn more about what you're thinking. Could you tell me more about that? I'm here to listen and help however I can.";
    }
    
    // Helper functions for topic extraction
    function extractTopic(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('what is ')) {
            return message.substring(message.toLowerCase().indexOf('what is ') + 8).replace('?', '').trim();
        }
        if (lowerMessage.includes('tell me about ')) {
            return message.substring(message.toLowerCase().indexOf('tell me about ') + 14).replace('?', '').trim();
        }
        return 'general topic';
    }
    
    function extractAction(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('how to ')) {
            return message.substring(message.toLowerCase().indexOf('how to ') + 7).replace('?', '').trim();
        }
        if (lowerMessage.includes('how do i ')) {
            return message.substring(message.toLowerCase().indexOf('how do i ') + 9).replace('?', '').trim();
        }
        return 'general action';
    }
    
    function getTopicExplanation(topic) {
        const explanations = {
            'mindfulness': 'Mindfulness is the practice of being fully present and aware of the current moment. It helps reduce stress, improve focus, and enhance overall well-being. You can start with just 5 minutes of daily meditation or mindful breathing.',
            'meditation': 'Meditation is a mental exercise that helps calm the mind and reduce stress. Start by finding a quiet place, focusing on your breath, and gently returning your attention when your mind wanders.',
            'stress': 'Stress is your body\'s response to challenges or demands. While some stress is normal, chronic stress can affect your health. Managing stress through relaxation techniques, exercise, and healthy coping strategies is important.',
            'anxiety': 'Anxiety is a feeling of worry or fear about future events. It\'s normal to feel anxious sometimes, but if it\'s persistent or overwhelming, it\'s important to seek support and use coping strategies.',
            'depression': 'Depression is a mood disorder that affects how you think, feel, and behave. It\'s more than just feeling sad - it can impact daily life. Professional help and support are important for managing depression.',
            'gratitude': 'Gratitude is the practice of recognizing and appreciating the good things in life. It can improve mental health, relationships, and overall happiness. Try writing down three things you\'re grateful for each day.',
            'resilience': 'Resilience is the ability to bounce back from difficult experiences. It involves adapting to challenges, learning from setbacks, and maintaining a positive outlook despite difficulties.',
            'empathy': 'Empathy is the ability to understand and share the feelings of others. It helps build stronger relationships and creates a more compassionate world.',
            'mindset': 'Mindset refers to your attitudes and beliefs about yourself and your abilities. A growth mindset believes you can develop skills through effort, while a fixed mindset believes abilities are static.'
        };
        
        return explanations[topic.toLowerCase()] || `I'd be happy to explain ${topic} in detail. Could you tell me more about what specific aspect you'd like to understand?`;
    }
    
    function getHowToGuide(action) {
        const guides = {
            'meditate': 'Here\'s how to start meditating:\n\n1. Find a quiet, comfortable spot\n2. Sit with your back straight but relaxed\n3. Close your eyes and focus on your breathing\n4. Count your breaths: 1 on inhale, 2 on exhale, up to 10, then repeat\n5. When thoughts arise, acknowledge them and return to counting\n6. Start with 5-10 minutes and gradually increase',
            'reduce stress': 'Here are effective ways to reduce stress:\n\n1. Practice deep breathing exercises\n2. Engage in regular physical activity\n3. Maintain a healthy sleep schedule\n4. Practice mindfulness and meditation\n5. Connect with friends and family\n6. Set realistic goals and priorities\n7. Take breaks and practice self-care',
            'build confidence': 'Here\'s how to build confidence:\n\n1. Focus on your strengths and achievements\n2. Set small, achievable goals\n3. Practice positive self-talk\n4. Step outside your comfort zone regularly\n5. Surround yourself with supportive people\n6. Learn new skills and take on challenges\n7. Celebrate your successes, no matter how small',
            'manage time': 'Here\'s how to manage your time effectively:\n\n1. Use the Pomodoro Technique (25 minutes focused work, 5-minute break)\n2. Prioritize tasks using the Eisenhower Matrix\n3. Create a daily schedule and stick to it\n4. Eliminate distractions and focus on one task at a time\n5. Learn to say no to non-essential commitments\n6. Review and adjust your schedule regularly',
            'improve relationships': 'Here\'s how to improve relationships:\n\n1. Practice active listening\n2. Communicate openly and honestly\n3. Show appreciation and gratitude\n4. Be empathetic and understanding\n5. Set healthy boundaries\n6. Spend quality time together\n7. Work through conflicts constructively'
        };
        
        return guides[action.toLowerCase()] || `I'd be happy to help you with ${action}. Could you provide more details about what specific aspect you'd like guidance on?`;
    }
    
    function analyzeUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Emotional Analysis
        const emotions = {
            happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'love', 'enjoy', 'pleased'],
            sad: ['sad', 'depressed', 'down', 'upset', 'crying', 'hurt', 'disappointed', 'lonely', 'empty', 'hopeless'],
            anxious: ['anxious', 'worried', 'nervous', 'stressed', 'panic', 'fear', 'scared', 'overwhelmed', 'tense', 'uneasy'],
            angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate', 'pissed', 'livid'],
            confused: ['confused', 'lost', 'unclear', 'don\'t understand', 'puzzled', 'bewildered', 'uncertain', 'mixed up'],
            grateful: ['thankful', 'grateful', 'appreciate', 'blessed', 'fortunate', 'lucky', 'thank you', 'gratitude']
        };
        
        // Enhanced Intent Analysis with more specific keywords
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings', 'sup', 'yo'],
            question: ['what', 'how', 'why', 'when', 'where', 'who', 'can you', 'could you', 'would you', 'do you know', 'explain', 'describe', 'tell me about'],
            help: ['help', 'support', 'assistance', 'guidance', 'advice', 'suggest', 'recommend', 'what should i', 'how do i'],
            sharing: ['feel', 'think', 'believe', 'experience', 'happened', 'went through', 'dealing with', 'struggling', 'going through'],
            goodbye: ['bye', 'goodbye', 'see you', 'farewell', 'take care', 'talk later', 'see you later', 'catch you later'],
            small_talk: ['how are you', 'what\'s your name', 'tell me a joke', 'who are you', 'what can you do', 'nice to meet you'],
            knowledge: ['what is', 'who is', 'capital of', 'president of', 'calculate', 'math', 'plus', 'minus', 'times', 'divided', 'define', 'meaning of'],
            task: ['book', 'order', 'set reminder', 'schedule', 'reserve', 'buy', 'purchase', 'arrange', 'plan', 'organize'],
            weather: ['weather', 'rain', 'sunny', 'cloudy', 'temperature', 'hot', 'cold', 'umbrella', 'forecast', 'storm', 'snow'],
            time_date: ['time', 'date', 'today', 'tomorrow', 'yesterday', 'what day', 'what time', 'clock', 'calendar'],
            motivation: ['motivation', 'motivate', 'encouragement', 'inspiring', 'uplifting', 'positive', 'cheer up', 'boost', 'energize'],
            shopping: ['shoes', 'clothes', 'buy', 'purchase', 'order', 'track order', 'cancel order', 'shopping', 'store', 'retail'],
            travel: ['flight', 'hotel', 'travel', 'book', 'train', 'journey', 'trip', 'vacation', 'destination', 'airline'],
            career: ['job', 'career', 'interview', 'resume', 'workplace', 'boss', 'colleague', 'promotion', 'salary', 'work life balance', 'employment', 'profession'],
            relationships: ['relationship', 'dating', 'marriage', 'friendship', 'family', 'conflict', 'communication', 'breakup', 'partner', 'love'],
            life_skills: ['cooking', 'budgeting', 'time management', 'organization', 'decision making', 'negotiation', 'public speaking', 'cleaning', 'laundry'],
            problem_solving: ['problem', 'issue', 'challenge', 'difficult', 'stuck', 'confused', 'need help', 'advice', 'trouble', 'struggle'],
            personal_growth: ['self improvement', 'habits', 'goals', 'productivity', 'mindset', 'confidence', 'skills', 'development', 'growth'],
            mindfulness: ['mindfulness', 'meditation', 'breathing', 'calm', 'relax', 'stress relief', 'anxiety', 'peace', 'zen', 'mindful'],
            health: ['health', 'fitness', 'exercise', 'diet', 'nutrition', 'wellness', 'mental health', 'physical health', 'doctor', 'medical'],
            education: ['learn', 'study', 'education', 'school', 'college', 'university', 'course', 'skill', 'knowledge', 'training'],
            technology: ['tech', 'computer', 'software', 'app', 'website', 'internet', 'digital', 'online', 'programming', 'coding'],
            error_handling: ['asdjklgh', '?!?!', 'blah blah blah', 'gibberish', 'nonsense']
        };
        
        // Topic Analysis
        const topics = {
            work: ['work', 'job', 'career', 'office', 'boss', 'colleague', 'meeting', 'deadline', 'project'],
            relationships: ['relationship', 'partner', 'friend', 'family', 'boyfriend', 'girlfriend', 'spouse', 'parent'],
            health: ['health', 'sick', 'ill', 'pain', 'doctor', 'medical', 'therapy', 'medication', 'treatment'],
            stress: ['stress', 'pressure', 'overwhelmed', 'burnout', 'exhausted', 'tired', 'drained'],
            goals: ['goal', 'dream', 'aspiration', 'future', 'plan', 'ambition', 'target', 'objective'],
            self_care: ['self-care', 'wellness', 'mindfulness', 'meditation', 'exercise', 'relaxation', 'balance']
        };
        
        // Analyze emotions
        const detectedEmotions = [];
        for (const [emotion, keywords] of Object.entries(emotions)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                detectedEmotions.push(emotion);
            }
        }
        
        // Analyze intent with improved matching
        let detectedIntent = 'general';
        let maxMatches = 0;
        
        for (const [intent, keywords] of Object.entries(intents)) {
            const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                detectedIntent = intent;
            }
        }
        
        // Special handling for common patterns
        if (lowerMessage.includes('tell me about') || lowerMessage.includes('explain')) {
            detectedIntent = 'question';
        } else if (lowerMessage.includes('how to') || lowerMessage.includes('how do i')) {
            detectedIntent = 'help';
        } else if (lowerMessage.includes('what is') || lowerMessage.includes('define')) {
            detectedIntent = 'knowledge';
        }
        
        // Debug logging
        console.log('Detected intent:', detectedIntent);
        console.log('User message:', originalMessage);
        
        // Analyze topics
        const detectedTopics = [];
        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                detectedTopics.push(topic);
            }
        }
        
        // Sentiment analysis
        const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'love', 'happy', 'joy', 'pleased'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'frustrated', 'disappointed', 'upset'];
        
        const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
        const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
        
        let sentiment = 'neutral';
        if (positiveCount > negativeCount) sentiment = 'positive';
        else if (negativeCount > positiveCount) sentiment = 'negative';
        
        return {
            emotions: detectedEmotions,
            intent: detectedIntent,
            topics: detectedTopics,
            sentiment: sentiment,
            messageLength: message.length,
            hasQuestion: message.includes('?'),
            urgency: negativeCount > 2 ? 'high' : negativeCount > 0 ? 'medium' : 'low'
        };
    }
    
    function generateIntelligentResponse(analysis, originalMessage) {
        const { emotions, intent, topics, sentiment, hasQuestion, urgency } = analysis;
        
        // Store conversation context
        if (!window.chatbotMemory) {
            window.chatbotMemory = {
                conversationHistory: [],
                userEmotions: [],
                userTopics: [],
                userSentiment: [],
                lastTopic: null,
                conversationContext: [],
                userPreferences: {
                    tone: 'professional', // professional, casual, friendly
                    detailLevel: 'moderate' // brief, moderate, detailed
                }
            };
        }
        
        // Update memory
        window.chatbotMemory.conversationHistory.push(originalMessage);
        window.chatbotMemory.userEmotions.push(...emotions);
        window.chatbotMemory.userTopics.push(...topics);
        window.chatbotMemory.userSentiment.push(sentiment);
        window.chatbotMemory.lastTopic = topics.length > 0 ? topics[0] : null;
        window.chatbotMemory.conversationContext.push({
            message: originalMessage,
            intent: intent,
            topics: topics,
            timestamp: new Date().toISOString()
        });
        
        // Keep only recent history (last 10 messages)
        if (window.chatbotMemory.conversationHistory.length > 10) {
            window.chatbotMemory.conversationHistory = window.chatbotMemory.conversationHistory.slice(-10);
            window.chatbotMemory.conversationContext = window.chatbotMemory.conversationContext.slice(-10);
        }
        
        // Check for out-of-scope requests
        if (isOutOfScope(originalMessage, topics)) {
            return generateOutOfScopeResponse(originalMessage, topics);
        }
        
        // Check for ambiguous queries
        if (isAmbiguousQuery(originalMessage, intent, topics)) {
            return generateClarifyingQuestion(originalMessage, intent, topics);
        }
        
        // Generate contextual response based on analysis
        let response;
        if (intent === 'greeting') {
            response = generateGreetingResponse(emotions, sentiment, originalMessage);
        } else if (intent === 'small_talk') {
            response = generateSmallTalkResponse(originalMessage);
        } else if (intent === 'knowledge') {
            response = generateKnowledgeResponse(originalMessage);
        } else if (intent === 'task') {
            response = generateTaskResponse(originalMessage);
        } else if (intent === 'weather') {
            response = generateWeatherResponse(originalMessage);
        } else if (intent === 'time_date') {
            response = generateTimeDateResponse(originalMessage);
        } else if (intent === 'motivation') {
            response = generateMotivationResponse(originalMessage);
        } else if (intent === 'shopping') {
            response = generateShoppingResponse(originalMessage);
        } else if (intent === 'travel') {
            response = generateTravelResponse(originalMessage);
        } else if (intent === 'career') {
            response = generateCareerResponse(originalMessage);
        } else if (intent === 'relationships') {
            response = generateRelationshipResponse(originalMessage);
        } else if (intent === 'life_skills') {
            response = generateLifeSkillsResponse(originalMessage);
        } else if (intent === 'problem_solving') {
            response = generateProblemSolvingResponse(originalMessage);
        } else if (intent === 'personal_growth') {
            response = generatePersonalGrowthResponse(originalMessage);
        } else if (intent === 'mindfulness') {
            response = generateMindfulnessResponse(originalMessage);
        } else if (intent === 'health') {
            response = generateHealthResponse(originalMessage);
        } else if (intent === 'education') {
            response = generateEducationResponse(originalMessage);
        } else if (intent === 'technology') {
            response = generateTechnologyResponse(originalMessage);
        } else if (intent === 'error_handling') {
            response = generateErrorHandlingResponse(originalMessage);
        } else if (intent === 'question') {
            response = generateQuestionResponse(topics, emotions, originalMessage);
        } else if (intent === 'help') {
            response = generateHelpResponse(topics, emotions, urgency);
        } else if (intent === 'goodbye') {
            response = generateGoodbyeResponse(sentiment);
        } else if (intent === 'general') {
            response = generateGeneralResponse(analysis);
        } else if (emotions.includes('sad') || emotions.includes('anxious') || emotions.includes('angry')) {
            response = generateEmotionalSupportResponse(emotions, topics, urgency);
        } else if (emotions.includes('happy') || emotions.includes('grateful')) {
            response = generatePositiveResponse(emotions, topics);
        } else if (hasQuestion) {
            response = generateQuestionResponse(topics, emotions, originalMessage);
        } else {
            response = generateGeneralResponse(analysis);
        }
        
        // Apply tone adjustment and return final response
        return adjustToneForContext(originalMessage, response, emotions, urgency);
    }
    
    function generateGreetingResponse(emotions, sentiment, originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        // Time-based greetings
        if (lowerMessage.includes('good morning')) {
            return "Good morning! How's your day going so far? I'm here to help you start your day on a positive note!";
        } else if (lowerMessage.includes('good afternoon')) {
            return "Good afternoon! I hope you're having a wonderful day. How can I assist you?";
        } else if (lowerMessage.includes('good evening')) {
            return "Good evening! I hope you've had a great day. What's on your mind this evening?";
        }
        
        // Simple greetings
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            const greetings = [
                "Hello! How can I help you today?",
                "Hi there! What can I do for you?",
                "Hey! Great to see you. How are you doing?",
                "Hello! I'm your AI wellness companion. How can I assist you today?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Emotional context greetings
        if (emotions.includes('sad') || emotions.includes('anxious')) {
            return "Hello. I can sense you might be going through a tough time. I'm here to listen and support you. What would you like to talk about?";
        } else if (emotions.includes('happy')) {
            return "Hello! I can feel the positive energy in your message. It's great to connect with you! What's bringing you joy today?";
        }
        
        return "Hello! It's wonderful to meet you. How are you feeling today?";
    }
    
    function generateEmotionalSupportResponse(emotions, topics, urgency) {
        if (urgency === 'high') {
            return "I can hear that you're really struggling right now. Your feelings are completely valid, and I want you to know that you're not alone. Can you tell me more about what's weighing on your heart? I'm here to listen without judgment.";
        }
        
        if (emotions.includes('sad')) {
            const responses = [
                "I can sense the sadness in your words, and I want you to know that it's okay to feel this way. Sadness is a natural human emotion. Would you like to talk about what's making you feel this way?",
                "Your sadness is valid, and I'm here to support you through it. Sometimes just sharing what we're feeling can help lighten the burden. What's on your mind?",
                "I hear you, and I want you to know that feeling sad doesn't make you weak. It makes you human. I'm here to listen and help you through this."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (emotions.includes('anxious')) {
            const responses = [
                "I can feel the anxiety in your message, and I want you to know that you're safe here. Anxiety can be overwhelming, but you're not alone in this. What's making you feel anxious?",
                "Your anxiety is real, and I understand how challenging it can be. Let's work through this together. What's on your mind right now?",
                "I can sense your worry, and I want to help you find some peace. Sometimes talking about our fears can help us feel more grounded. What's troubling you?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (emotions.includes('angry')) {
            const responses = [
                "I can feel the anger in your words, and I want you to know that your feelings are valid. Anger is often a signal that something important to us has been threatened. What's making you feel this way?",
                "Your anger is understandable, and I'm here to listen. Sometimes we need to express our frustration to process it. What's going on?",
                "I hear your anger, and I want to help you work through it. Anger can be a powerful emotion that tells us something needs attention. What's bothering you?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        return "I can sense you're going through a difficult time, and I want you to know that I'm here for you. Your feelings matter, and you don't have to face this alone. What would be most helpful for you right now?";
    }
    
    function generatePositiveResponse(emotions, topics) {
        if (emotions.includes('happy')) {
            const responses = [
                "I love hearing about your happiness! It's wonderful to feel joy, and I'm so glad you're experiencing it. What's bringing you this joy?",
                "Your happiness is contagious! I can feel the positive energy in your message. Tell me more about what's making you feel so good!",
                "It's beautiful to hear about your happiness! Joy is such a precious emotion. What's creating this wonderful feeling for you?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (emotions.includes('grateful')) {
            const responses = [
                "Gratitude is such a powerful emotion, and I'm touched that you're sharing it with me. What are you feeling grateful for today?",
                "Your gratitude shines through your words, and it's beautiful to witness. Gratitude can transform our perspective. What's filling your heart with thankfulness?",
                "I can feel the warmth of your gratitude, and it's truly heartwarming. What's bringing you this sense of appreciation?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        return "I can sense the positive energy in your message, and it's wonderful! What's making you feel so good today?";
    }
    
    function generateQuestionResponse(topics, emotions, originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        // Specific question handling
        if (lowerMessage.includes('what is') || lowerMessage.includes('define')) {
            const subject = extractSubject(originalMessage);
            if (subject) {
                return `Great question! Let me explain ${subject}:\n\n` + getDefinition(subject);
            }
        }
        
        if (lowerMessage.includes('how to') || lowerMessage.includes('how do i')) {
            const action = extractAction(originalMessage);
            if (action) {
                return `Here's how to ${action}:\n\n` + getHowToGuide(action);
            }
        }
        
        if (lowerMessage.includes('why') || lowerMessage.includes('what causes')) {
            const phenomenon = extractSubject(originalMessage);
            if (phenomenon) {
                return `That's a thoughtful question about ${phenomenon}. Here's what you should know:\n\n` + getExplanation(phenomenon);
            }
        }
        
        if (topics.includes('work')) {
            return "I can see you're asking about work-related matters. Work can be a significant source of both stress and fulfillment. What specific aspect of work would you like to discuss? Are you feeling overwhelmed, or are you looking for guidance on a particular situation?";
        }
        
        if (topics.includes('relationships')) {
            return "Relationships are such an important part of our lives, and I'm here to help you navigate them. Whether it's with family, friends, or a partner, relationships can bring both joy and challenges. What's on your mind regarding your relationships?";
        }
        
        if (topics.includes('health')) {
            return "I understand you're asking about health matters. Taking care of our physical and mental health is so important. While I can offer emotional support and general wellness guidance, I always encourage consulting with healthcare professionals for medical concerns. What aspect of health would you like to discuss?";
        }
        
        if (topics.includes('stress')) {
            return "Stress is something many of us deal with, and I want to help you manage it. Stress can affect us in many ways - physically, emotionally, and mentally. What's causing you stress right now, and how is it impacting your daily life?";
        }
        
        return "That's a great question! I'm here to help you explore whatever is on your mind. Can you tell me more about what you're looking for? I want to provide you with the most helpful response possible.";
    }
    
    // Helper functions for question analysis
    function extractSubject(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('what is ')) {
            return message.substring(message.toLowerCase().indexOf('what is ') + 8).replace('?', '').trim();
        }
        if (lowerMessage.includes('define ')) {
            return message.substring(message.toLowerCase().indexOf('define ') + 7).replace('?', '').trim();
        }
        return null;
    }
    
    function extractAction(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('how to ')) {
            return message.substring(message.toLowerCase().indexOf('how to ') + 7).replace('?', '').trim();
        }
        if (lowerMessage.includes('how do i ')) {
            return message.substring(message.toLowerCase().indexOf('how do i ') + 9).replace('?', '').trim();
        }
        return null;
    }
    
    function getDefinition(subject) {
        const definitions = {
            'mindfulness': 'Mindfulness is the practice of being fully present and aware of the current moment, without judgment. It involves paying attention to your thoughts, feelings, and surroundings with acceptance and curiosity.',
            'meditation': 'Meditation is a mental exercise that involves focusing your attention and eliminating the stream of thoughts that may be crowding your mind. It\'s used to reduce stress, improve concentration, and promote emotional well-being.',
            'stress': 'Stress is your body\'s response to any demand or challenge. It can be physical, mental, or emotional, and while some stress is normal, chronic stress can negatively impact your health and well-being.',
            'anxiety': 'Anxiety is a feeling of worry, nervousness, or unease about something with an uncertain outcome. It\'s a normal emotion, but when it becomes excessive or persistent, it can interfere with daily life.',
            'depression': 'Depression is a mood disorder that causes persistent feelings of sadness, hopelessness, and loss of interest in activities. It affects how you think, feel, and behave and can lead to various emotional and physical problems.',
            'gratitude': 'Gratitude is the quality of being thankful and appreciative. It involves recognizing and acknowledging the good things in your life, which can improve your mental health and overall well-being.',
            'resilience': 'Resilience is the ability to bounce back from difficult experiences and adapt to challenging situations. It\'s the mental strength that helps you recover from setbacks and continue moving forward.',
            'empathy': 'Empathy is the ability to understand and share the feelings of another person. It involves putting yourself in someone else\'s shoes and seeing things from their perspective.',
            'mindset': 'Mindset refers to your established set of attitudes and beliefs that shape how you interpret and respond to situations. A growth mindset believes abilities can be developed, while a fixed mindset believes abilities are static.'
        };
        
        return definitions[subject.toLowerCase()] || `I'd be happy to explain ${subject} in detail. Could you tell me more about what specific aspect you'd like to understand?`;
    }
    
    function getHowToGuide(action) {
        const guides = {
            'meditate': '1. Find a quiet, comfortable spot\n2. Sit with your back straight but relaxed\n3. Close your eyes and focus on your breathing\n4. Count your breaths: 1 on inhale, 2 on exhale, up to 10, then repeat\n5. When thoughts arise, acknowledge them and return to counting\n6. Start with 5-10 minutes and gradually increase',
            'reduce stress': '1. Practice deep breathing exercises\n2. Engage in regular physical activity\n3. Maintain a healthy sleep schedule\n4. Practice mindfulness and meditation\n5. Connect with friends and family\n6. Set realistic goals and priorities\n7. Take breaks and practice self-care',
            'build confidence': '1. Focus on your strengths and achievements\n2. Set small, achievable goals\n3. Practice positive self-talk\n4. Step outside your comfort zone regularly\n5. Surround yourself with supportive people\n6. Learn new skills and take on challenges\n7. Celebrate your successes, no matter how small',
            'manage time': '1. Use the Pomodoro Technique (25 minutes focused work, 5-minute break)\n2. Prioritize tasks using the Eisenhower Matrix\n3. Create a daily schedule and stick to it\n4. Eliminate distractions and focus on one task at a time\n5. Learn to say no to non-essential commitments\n6. Review and adjust your schedule regularly',
            'improve relationships': '1. Practice active listening\n2. Communicate openly and honestly\n3. Show appreciation and gratitude\n4. Be empathetic and understanding\n5. Set healthy boundaries\n6. Spend quality time together\n7. Work through conflicts constructively'
        };
        
        return guides[action.toLowerCase()] || `I'd be happy to help you with ${action}. Could you provide more details about what specific aspect you'd like guidance on?`;
    }
    
    function getExplanation(phenomenon) {
        const explanations = {
            'stress': 'Stress occurs when your body perceives a threat or challenge. It triggers the release of hormones like cortisol and adrenaline, preparing you for "fight or flight." While acute stress can be helpful, chronic stress can lead to health problems.',
            'anxiety': 'Anxiety is caused by a combination of factors including genetics, brain chemistry, personality, and life events. It\'s your body\'s natural response to perceived threats, but it can become problematic when it\'s excessive or persistent.',
            'depression': 'Depression is caused by a complex interaction of biological, psychological, and social factors. It involves changes in brain chemistry, genetics, life experiences, and coping skills.',
            'happiness': 'Happiness is influenced by genetics (about 50%), circumstances (about 10%), and intentional activities (about 40%). It\'s not just about positive events but also about how you interpret and respond to life experiences.'
        };
        
        return explanations[phenomenon.toLowerCase()] || `That\'s a complex question about ${phenomenon}. I\'d be happy to explore this with you in more detail. What specific aspect interests you most?`;
    }
    
    function generateHelpResponse(topics, emotions, urgency) {
        if (urgency === 'high') {
            return "I can sense you need immediate support, and I want to help you right away. You're not alone in this. Can you tell me more about what you're going through? I'm here to listen and support you through this difficult time.";
        }
        
        // Check for specific help scenarios
        if (topics.includes('work')) {
            return "I'm here to help you with work-related challenges. Whether it's stress, career guidance, or workplace issues, I can provide support and advice. What specific work situation would you like help with?";
        }
        
        if (topics.includes('relationships')) {
            return "I can help you navigate relationship challenges. Whether it's with family, friends, or a partner, I'm here to listen and provide guidance. What relationship issue would you like to discuss?";
        }
        
        if (topics.includes('health')) {
            return "I understand you need help with health-related concerns. While I can provide emotional support and general wellness guidance, I always recommend consulting with healthcare professionals for medical issues. What aspect of health would you like support with?";
        }
        
        const helpResponses = [
            "Of course! Can you tell me what you need help with?",
            "I'm here to help you in any way I can. Whether you need emotional support, guidance, or just someone to listen, I'm committed to being here for you. What would be most helpful right now?",
            "I want to provide you with the support you need. Sometimes just having someone to talk to can make a world of difference. What's on your mind, and how can I best support you?",
            "You've reached out for help, and that takes courage. I'm here to listen, understand, and support you. What's going on, and what kind of help would be most beneficial for you?"
        ];
        
        return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }
    
    function generateGoodbyeResponse(sentiment) {
        if (sentiment === 'positive') {
            return "It's been wonderful talking with you! I'm so glad we could connect today. Take care of yourself, and remember that I'm always here whenever you need someone to talk to. Have a beautiful day! 🌟";
        } else if (sentiment === 'negative') {
            return "I want you to know that it's been an honor to listen to you today. You're stronger than you know, and I believe in your ability to get through whatever you're facing. Please take care of yourself, and don't hesitate to reach out if you need support. You're not alone. 💙";
        } else {
            return "Thank you for sharing your time with me today. I hope our conversation was helpful. Remember, I'm always here whenever you need someone to talk to. Take care, and be kind to yourself! 😊";
        }
    }
    
    function generateGeneralResponse(analysis) {
        const { emotions, topics, sentiment } = analysis;
        
        if (topics.length > 0) {
            return `I can see you're talking about ${topics.join(' and ')}. These are important topics that many people deal with. I'm here to listen and help you process whatever you're going through. What would you like to explore further?`;
        }
        
        if (emotions.length > 0) {
            return `I can sense ${emotions.join(' and ')} in your message. These emotions are completely valid, and I want you to know that I'm here to support you through them. What's on your mind?`;
        }
        
        const generalResponses = [
            "That's really interesting! I'd love to dive deeper into this with you. What sparked your interest in this topic?",
            "You've got me curious! Tell me more about what's going on - I'm genuinely interested in hearing your perspective.",
            "I'm all ears! 🎧 This sounds like something worth exploring together. What's the story behind this?",
            "Fascinating! I can tell this is important to you. What would you like to explore or work through?",
            "You've caught my attention! I'm here to help you think through this. What's your main concern or question?",
            "I'm intrigued! Let's unpack this together. What's the most important part you'd like to focus on?",
            "This sounds like something we can work through! What's your biggest challenge or question right now?",
            "I'm genuinely interested in what you're sharing! What would be most helpful for you right now?"
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    // Small Talk Responses
    function generateSmallTalkResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('how are you')) {
            const responses = [
                "I'm absolutely fantastic! 😊 Every conversation with you makes my day better. How are you doing today?",
                "I'm on cloud nine! 🌟 I love connecting with people like you. What's been the highlight of your day so far?",
                "I'm feeling amazing! 💫 There's something special about our chat that just energizes me. How's your day treating you?",
                "I'm in a great mood! 🎉 I'm genuinely excited to be talking with you. What's on your mind today?",
                "I'm doing wonderfully! ✨ I feel like every conversation teaches me something new. How are you feeling?",
                "I'm absolutely thriving! 🚀 I love how every chat is unique and interesting. What's been going on with you?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('what\'s your name') || lowerMessage.includes('who are you')) {
            const responses = [
                "I'm your AI wellness companion! 🤖 You can call me whatever feels right - ChatBot, Assistant, or even just Friend! I'm here to be whatever you need me to be.",
                "I'm your personal AI buddy! 💫 I don't have a fixed name, but I love it when people give me nicknames. What would you like to call me?",
                "I'm your AI life coach and friend! 🌟 I'm here to support, guide, and chat with you. Feel free to call me whatever makes you comfortable!",
                "I'm your AI companion who's genuinely excited to meet you! 🚀 I'm here to help with life's challenges and celebrate your wins. What should I call you?",
                "I'm your AI wellness partner! ✨ I'm here to listen, advise, and be your virtual friend. You can call me anything you'd like - I'm flexible!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('tell me a joke') || lowerMessage.includes('joke')) {
            const jokes = [
                "Sure! Why don't skeletons fight each other? Because they don't have the guts! 😄",
                "Here's one: What do you call a fake noodle? An impasta! 🍝",
                "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
                "What do you call a bear with no teeth? A gummy bear! 🐻",
                "Why don't eggs tell jokes? They'd crack each other up! 🥚",
                "What do you call a fish wearing a bowtie? So-fish-ticated! 🐠"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        if (lowerMessage.includes('what can you do')) {
            const capabilityResponses = [
                "I'm your multi-talented AI companion! 🚀 I can help with career advice, relationship guidance, life skills, problem-solving, personal growth, and emotional support. I also love chatting about anything from cooking tips to travel planning. What interests you most?",
                "Think of me as your personal life coach and friend rolled into one! 💪 I can help you navigate challenges, make decisions, build habits, improve relationships, and grow personally. Plus, I'm always up for a good conversation or joke! What would you like to tackle?",
                "I'm like having a wise friend who's always available! 🌟 I specialize in real-world advice for careers, relationships, life skills, and personal development. I can also help with practical stuff like budgeting, time management, and decision-making. What's on your agenda?",
                "I'm your go-to AI for life's big and small questions! 🎯 Whether you need career guidance, relationship advice, help with daily challenges, or just want to explore ideas together, I'm here. I love helping people grow and succeed. What can we work on?"
            ];
            return capabilityResponses[Math.floor(Math.random() * capabilityResponses.length)];
        }
        
        const engagingResponses = [
            "I'm really enjoying our chat! 😊 What's something you're excited about or curious about today?",
            "This is great! I love getting to know people. What's been on your mind lately?",
            "You seem like an interesting person! What's something you'd like to explore or talk about?",
            "I'm having fun chatting with you! What's something you're passionate about or working on?",
            "This conversation is getting good! What's a challenge or goal you're tackling right now?",
            "I'm genuinely enjoying our time together! What's something that's been making you think lately?",
            "You're great to talk to! What's something you'd like to learn more about or get advice on?",
            "I love these kinds of conversations! What's something that's been on your heart or mind?"
        ];
        return engagingResponses[Math.floor(Math.random() * engagingResponses.length)];
    }
    
    // Knowledge Base Responses
    function generateKnowledgeResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        // Geography
        if (lowerMessage.includes('capital of india')) {
            return "The capital of India is New Delhi.";
        }
        if (lowerMessage.includes('capital of usa') || lowerMessage.includes('capital of america')) {
            return "The capital of the USA is Washington, D.C.";
        }
        if (lowerMessage.includes('capital of china')) {
            return "The capital of China is Beijing.";
        }
        if (lowerMessage.includes('capital of japan')) {
            return "The capital of Japan is Tokyo.";
        }
        
        // Politics
        if (lowerMessage.includes('president of usa') || lowerMessage.includes('president of america')) {
            return "The current President of the USA is Joe Biden.";
        }
        if (lowerMessage.includes('prime minister of india')) {
            return "The current Prime Minister of India is Narendra Modi.";
        }
        
        // Math calculations
        if (lowerMessage.includes('+') || lowerMessage.includes('plus')) {
            const mathMatch = originalMessage.match(/(\d+)\s*[+\+]\s*(\d+)/);
            if (mathMatch) {
                const num1 = parseInt(mathMatch[1]);
                const num2 = parseInt(mathMatch[2]);
                const result = num1 + num2;
                return `${num1} + ${num2} = ${result}.`;
            }
        }
        if (lowerMessage.includes('-') || lowerMessage.includes('minus')) {
            const mathMatch = originalMessage.match(/(\d+)\s*[-]\s*(\d+)/);
            if (mathMatch) {
                const num1 = parseInt(mathMatch[1]);
                const num2 = parseInt(mathMatch[2]);
                const result = num1 - num2;
                return `${num1} - ${num2} = ${result}.`;
            }
        }
        if (lowerMessage.includes('*') || lowerMessage.includes('times') || lowerMessage.includes('x')) {
            const mathMatch = originalMessage.match(/(\d+)\s*[*x]\s*(\d+)/);
            if (mathMatch) {
                const num1 = parseInt(mathMatch[1]);
                const num2 = parseInt(mathMatch[2]);
                const result = num1 * num2;
                return `${num1} × ${num2} = ${result}.`;
            }
        }
        
        // General knowledge
        if (lowerMessage.includes('what is')) {
            if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
                return "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans.";
            }
            if (lowerMessage.includes('python')) {
                return "Python is a high-level programming language known for its simplicity and readability. It's widely used in web development, data science, and AI.";
            }
            if (lowerMessage.includes('javascript')) {
                return "JavaScript is a programming language that makes web pages interactive. It's one of the core technologies of the web alongside HTML and CSS.";
            }
        }
        
        return "That's an interesting question! I'd be happy to help you find information about that. Could you be more specific about what you'd like to know?";
    }
    
    // Task-Oriented Responses
    function generateTaskResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('book') && lowerMessage.includes('cab')) {
            return "Sure! Where would you like to go? I can help you find the best route and estimate the fare.";
        }
        
        if (lowerMessage.includes('order') && lowerMessage.includes('pizza')) {
            return "Got it! What toppings would you like on your pizza? I can help you choose from our delicious options!";
        }
        
        if (lowerMessage.includes('set reminder') || lowerMessage.includes('remind me')) {
            const timeMatch = originalMessage.match(/(\d+)\s*(am|pm|AM|PM)/);
            if (timeMatch) {
                return `Done! I've set a reminder for ${timeMatch[1]} ${timeMatch[2].toUpperCase()}.`;
            }
            return "Done! I've set a reminder for you. What time would you like to be reminded?";
        }
        
        if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
            return "I'd be happy to help you schedule something! What would you like to schedule and when?";
        }
        
        if (lowerMessage.includes('reserve') || lowerMessage.includes('booking')) {
            return "I can help you make a reservation! What type of reservation would you like to make?";
        }
        
        if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
            return "I can help you with your purchase! What would you like to buy?";
        }
        
        return "I'd be happy to help you with that task! Could you provide more details about what you'd like me to do?";
    }
    
    // Ambiguity Detection and Clarifying Questions
    function isAmbiguousQuery(message, intent, topics) {
        const lowerMessage = message.toLowerCase();
        
        // Very short messages without clear intent
        if (message.length < 10 && intent === 'general' && topics.length === 0) {
            return true;
        }
        
        // Vague requests
        const vaguePatterns = [
            'help me', 'what should i do', 'i need something', 'can you do something',
            'tell me about', 'explain', 'how do i', 'what about'
        ];
        
        if (vaguePatterns.some(pattern => lowerMessage.includes(pattern)) && topics.length === 0) {
            return true;
        }
        
        // Multiple possible interpretations
        if (topics.length > 2) {
            return true;
        }
        
        // Questions without specific context
        if (hasQuestion && intent === 'question' && topics.length === 0) {
            return true;
        }
        
        return false;
    }
    
    function generateClarifyingQuestion(message, intent, topics) {
        const lowerMessage = message.toLowerCase();
        
        if (message.length < 10) {
            return "I'd be happy to help! Could you please provide more details about what you'd like to know or discuss?";
        }
        
        if (lowerMessage.includes('help me')) {
            const helpOptions = [
                "Work-related issues",
                "Personal challenges", 
                "Technical problems",
                "General questions"
            ];
            return "I'm here to help! Could you please specify what you need assistance with? For example:\n" + formatStructuredResponse(helpOptions, 'bullet');
        }
        
        if (lowerMessage.includes('tell me about')) {
            const topicOptions = [
                "Technology",
                "Health and wellness", 
                "General knowledge",
                "Specific concepts"
            ];
            return "I'd be glad to share information! Could you please specify what topic you'd like to learn about? For example:\n" + formatStructuredResponse(topicOptions, 'bullet');
        }
        
        if (lowerMessage.includes('what should i do')) {
            const guidancePoints = [
                "What situation you're facing",
                "What you've already tried",
                "What outcome you're hoping for"
            ];
            return "I can provide guidance! To give you the best advice, could you tell me more about:\n" + formatStructuredResponse(guidancePoints, 'bullet');
        }
        
        if (topics.length > 2) {
            return "I notice you mentioned several topics. To provide the most relevant response, could you please focus on one specific area you'd like to discuss?";
        }
        
        return "I want to make sure I understand correctly. Could you please provide more specific details about what you're looking for?";
    }
    
    // Enhanced Response Structure
    function formatStructuredResponse(content, type = 'list') {
        if (type === 'list' && Array.isArray(content)) {
            return content.map((item, index) => `${index + 1}. ${item}`).join('\n');
        }
        
        if (type === 'bullet' && Array.isArray(content)) {
            return content.map(item => `• ${item}`).join('\n');
        }
        
        if (type === 'steps' && Array.isArray(content)) {
            return content.map((step, index) => `Step ${index + 1}: ${step}`).join('\n');
        }
        
        return content;
    }
    
    // Professional Tone Management
    function adjustToneForContext(message, baseResponse, emotions, urgency) {
        // High urgency - more direct and supportive
        if (urgency === 'high') {
            return baseResponse.replace(/I'm here to help/g, "I'm here to support you immediately");
        }
        
        // Emotional context - more empathetic
        if (emotions.includes('sad') || emotions.includes('anxious')) {
            return baseResponse.replace(/I can help/g, "I understand and I can help");
        }
        
        // Professional context - more formal
        if (window.chatbotMemory.userPreferences.tone === 'professional') {
            return baseResponse.replace(/Hey!/g, "Hello!")
                              .replace(/Great!/g, "Excellent!")
                              .replace(/Sure!/g, "Certainly!");
        }
        
        return baseResponse;
    }
    
    // Scope Management
    function isOutOfScope(message, topics) {
        const lowerMessage = message.toLowerCase();
        
        // Medical diagnosis requests
        if (lowerMessage.includes('diagnose') || lowerMessage.includes('medical condition')) {
            return true;
        }
        
        // Legal advice
        if (lowerMessage.includes('legal advice') || lowerMessage.includes('lawyer')) {
            return true;
        }
        
        // Financial investment advice
        if (lowerMessage.includes('invest') && lowerMessage.includes('money')) {
            return true;
        }
        
        return false;
    }
    
    function generateOutOfScopeResponse(message, topics) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('diagnose') || lowerMessage.includes('medical condition')) {
            return "I cannot provide medical diagnoses or specific medical advice. For health concerns, I recommend consulting with a healthcare professional. However, I can offer general wellness guidance and emotional support.";
        }
        
        if (lowerMessage.includes('legal advice') || lowerMessage.includes('lawyer')) {
            return "I cannot provide legal advice. For legal matters, I recommend consulting with a qualified attorney. However, I can help you with general information and emotional support during difficult situations.";
        }
        
        if (lowerMessage.includes('invest') && lowerMessage.includes('money')) {
            return "I cannot provide specific investment advice. For financial decisions, I recommend consulting with a financial advisor. However, I can help you with general financial wellness and stress management.";
        }
        
        return "I'm not able to help with that specific topic. However, I can assist you with emotional support, general wellness guidance, and answering questions within my scope of knowledge. Is there something else I can help you with?";
    }
    
    // Weather Responses
    function generateWeatherResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('weather today') || lowerMessage.includes('weather like today')) {
            return "It looks sunny with a high of 30°C.";
        }
        
        if (lowerMessage.includes('rain tomorrow') || lowerMessage.includes('will it rain')) {
            return "Yes, tomorrow there's a chance of rain. Don't forget your umbrella!";
        }
        
        if (lowerMessage.includes('cold outside') || lowerMessage.includes('is it cold')) {
            return "Right now it's 18°C, so you might need a jacket.";
        }
        
        if (lowerMessage.includes('weather')) {
            return "I can help with weather information! Are you asking about today's weather, tomorrow's forecast, or something specific?";
        }
        
        return "I'd be happy to help with weather information! What would you like to know about the weather?";
    }
    
    // Time and Date Responses
    function generateTimeDateResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        const now = new Date();
        
        if (lowerMessage.includes('what time') || lowerMessage.includes('time is it')) {
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            return `It's currently ${time}.`;
        }
        
        if (lowerMessage.includes('date') || lowerMessage.includes('today\'s date')) {
            const date = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            return `Today is ${date}.`;
        }
        
        if (lowerMessage.includes('tomorrow') || lowerMessage.includes('what day is tomorrow')) {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
            return `Tomorrow will be ${dayName}.`;
        }
        
        return "I can help with time and date information! What would you like to know?";
    }
    
    // Motivation and Mental Health Responses
    function generateMotivationResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('feeling sad') || lowerMessage.includes('i\'m sad')) {
            return "I'm sorry to hear that. Want me to share something uplifting?";
        }
        
        if (lowerMessage.includes('motivation') || lowerMessage.includes('motivate me')) {
            const motivationalQuotes = [
                "You're stronger than you think. Every step forward counts!",
                "Believe in yourself! You've overcome challenges before, and you can do it again.",
                "Progress, not perfection. Every small step matters!",
                "You have the power to create positive change in your life.",
                "Remember: tough times don't last, but tough people do!"
            ];
            return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        }
        
        if (lowerMessage.includes('stressed') || lowerMessage.includes('stress')) {
            return "It's okay to feel that way. Try taking a short break, drink some water, or take a deep breath.";
        }
        
        if (lowerMessage.includes('encouragement') || lowerMessage.includes('cheer up')) {
            return "You're doing great! Remember that every challenge is an opportunity to grow stronger.";
        }
        
        return "I'm here to support and motivate you! What's on your mind today?";
    }
    
    // Shopping and E-commerce Responses
    function generateShoppingResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('shoes') || lowerMessage.includes('show me shoes')) {
            return "Sure! Do you want sports shoes, casual shoes, or formal ones?";
        }
        
        if (lowerMessage.includes('track order') || lowerMessage.includes('track my order')) {
            return "You can track your order by entering the order ID in the \"Track Order\" section.";
        }
        
        if (lowerMessage.includes('cancel order') || lowerMessage.includes('cancel my order')) {
            return "Got it! Please provide your order number so I can cancel it.";
        }
        
        if (lowerMessage.includes('clothes') || lowerMessage.includes('clothing')) {
            return "I can help you find clothes! What type of clothing are you looking for?";
        }
        
        if (lowerMessage.includes('shopping') || lowerMessage.includes('buy')) {
            return "I'd be happy to help with your shopping needs! What are you looking to purchase?";
        }
        
        return "I can assist with shopping and orders! What would you like help with?";
    }
    
    // Travel Responses
    function generateTravelResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('flight') && lowerMessage.includes('delhi')) {
            return "Okay! From which city are you traveling?";
        }
        
        if (lowerMessage.includes('book hotel') || lowerMessage.includes('hotel for me')) {
            return "Sure! Do you prefer a budget, standard, or luxury hotel?";
        }
        
        if (lowerMessage.includes('train') && lowerMessage.includes('hyderabad') && lowerMessage.includes('chennai')) {
            return "The train journey usually takes around 13 hours.";
        }
        
        if (lowerMessage.includes('flight')) {
            return "I can help you find flights! Where would you like to travel to?";
        }
        
        if (lowerMessage.includes('hotel')) {
            return "I can help you book a hotel! Which city are you planning to visit?";
        }
        
        if (lowerMessage.includes('travel') || lowerMessage.includes('trip')) {
            return "I'd be happy to help with your travel plans! What do you need assistance with?";
        }
        
        return "I can help with travel arrangements! What would you like to book or plan?";
    }
    
    // Error Handling Responses
    function generateErrorHandlingResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        // Check for gibberish or unclear messages
        if (lowerMessage.includes('asdjklgh') || lowerMessage.includes('blah blah blah') || 
            lowerMessage.includes('?!?!') || lowerMessage.includes('gibberish') || 
            lowerMessage.includes('nonsense') || /^[^a-zA-Z\s]*$/.test(originalMessage)) {
            
            const errorResponses = [
                "I'm not sure I understand that. Could you rephrase it?",
                "Hmm, that looks confusing. Can you type it more clearly?",
                "Sorry, I didn't get that. Do you want me to show you what I can do?",
                "I'm having trouble understanding that. Could you try again?",
                "That seems unclear to me. Can you explain what you need help with?"
            ];
            return errorResponses[Math.floor(Math.random() * errorResponses.length)];
        }
        
        // Check for very short or unclear messages
        if (originalMessage.length < 3 || /^[^a-zA-Z]*$/.test(originalMessage)) {
            return "I'm not sure what you mean. Could you please type a clear message?";
        }
        
        return "I want to make sure I understand correctly. Could you please provide more details?";
    }
    
    // Career and Professional Development Responses
    function generateCareerResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('interview') || lowerMessage.includes('job interview')) {
            return "Here's my real-world interview advice:\n\n" +
                   "• Research the company thoroughly - know their mission, values, and recent news\n" +
                   "• Prepare STAR stories (Situation, Task, Action, Result) for behavioral questions\n" +
                   "• Practice common questions like 'Tell me about yourself' and 'Why do you want this job?'\n" +
                   "• Dress one level above the company's dress code\n" +
                   "• Ask thoughtful questions about the role and company culture\n" +
                   "• Send a thank-you email within 24 hours\n\n" +
                   "Remember: confidence comes from preparation!";
        }
        
        if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return "Here's how to create a winning resume:\n\n" +
                   "• Use action verbs (achieved, developed, implemented, led)\n" +
                   "• Quantify your achievements with numbers and percentages\n" +
                   "• Keep it to 1-2 pages maximum\n" +
                   "• Use a clean, professional format with consistent formatting\n" +
                   "• Tailor it for each job application\n" +
                   "• Include relevant keywords from the job description\n" +
                   "• Proofread multiple times for typos and grammar\n\n" +
                   "Pro tip: Your resume should tell a story of growth and impact!";
        }
        
        if (lowerMessage.includes('workplace') || lowerMessage.includes('office politics')) {
            return "Navigating workplace dynamics is crucial for success:\n\n" +
                   "• Build genuine relationships with colleagues across departments\n" +
                   "• Be reliable and deliver on your commitments\n" +
                   "• Communicate clearly and professionally\n" +
                   "• Stay neutral in conflicts and focus on solutions\n" +
                   "• Seek feedback regularly and act on it\n" +
                   "• Document important conversations and decisions\n" +
                   "• Maintain a positive attitude even during challenging times\n\n" +
                   "Remember: Your reputation is your most valuable asset!";
        }
        
        if (lowerMessage.includes('promotion') || lowerMessage.includes('advancement')) {
            return "To position yourself for promotion:\n\n" +
                   "• Exceed expectations in your current role consistently\n" +
                   "• Take on additional responsibilities and projects\n" +
                   "• Develop skills that align with the next level\n" +
                   "• Build relationships with decision-makers\n" +
                   "• Document your achievements and impact\n" +
                   "• Express your career goals to your manager\n" +
                   "• Be patient but proactive in seeking opportunities\n\n" +
                   "Success tip: Make yourself indispensable, then make your value visible!";
        }
        
        return "I'd be happy to help with career advice! Are you looking for help with interviews, resumes, workplace dynamics, or career advancement?";
    }
    
    // Relationship and Social Interaction Responses
    function generateRelationshipResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('dating') || lowerMessage.includes('first date')) {
            return "Here's my advice for successful dating:\n\n" +
                   "• Be yourself - authenticity is attractive\n" +
                   "• Choose activities that allow for conversation\n" +
                   "• Listen actively and ask follow-up questions\n" +
                   "• Be respectful of boundaries and consent\n" +
                   "• Don't put too much pressure on the first date\n" +
                   "• Follow up within 24-48 hours if interested\n" +
                   "• Be honest about your intentions\n\n" +
                   "Remember: The best relationships start with genuine connection!";
        }
        
        if (lowerMessage.includes('communication') || lowerMessage.includes('conflict')) {
            return "Healthy communication is the foundation of strong relationships:\n\n" +
                   "• Use 'I' statements instead of 'you' statements\n" +
                   "• Listen to understand, not to respond\n" +
                   "• Take breaks when emotions are high\n" +
                   "• Focus on the issue, not the person\n" +
                   "• Be willing to compromise and find solutions\n" +
                   "• Apologize when you're wrong\n" +
                   "• Express appreciation regularly\n\n" +
                   "Pro tip: Most conflicts stem from misunderstandings, not malice!";
        }
        
        if (lowerMessage.includes('friendship') || lowerMessage.includes('making friends')) {
            return "Building meaningful friendships takes effort and authenticity:\n\n" +
                   "• Be genuinely interested in others' lives\n" +
                   "• Show up consistently and be reliable\n" +
                   "• Share your own experiences and vulnerabilities\n" +
                   "• Respect boundaries and different perspectives\n" +
                   "• Support friends through both good and difficult times\n" +
                   "• Be patient - deep friendships develop over time\n" +
                   "• Join groups or activities that align with your interests\n\n" +
                   "Remember: Quality over quantity when it comes to friendships!";
        }
        
        if (lowerMessage.includes('family') || lowerMessage.includes('family conflict')) {
            return "Family relationships can be complex, but here are some strategies:\n\n" +
                   "• Set healthy boundaries while maintaining respect\n" +
                   "• Focus on what you can control, not others' behavior\n" +
                   "• Practice empathy and try to understand different perspectives\n" +
                   "• Communicate your needs clearly and calmly\n" +
                   "• Choose your battles wisely\n" +
                   "• Seek professional help for serious conflicts\n" +
                   "• Remember that you can love someone without agreeing with them\n\n" +
                   "Family tip: Sometimes the best response is to lead by example!";
        }
        
        return "I'm here to help with relationship advice! Are you dealing with dating, communication issues, friendships, or family relationships?";
    }
    
    // Life Skills and Practical Advice Responses
    function generateLifeSkillsResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('cooking') || lowerMessage.includes('meal prep')) {
            return "Here's how to master basic cooking and meal prep:\n\n" +
                   "• Start with simple recipes and build your skills gradually\n" +
                   "• Invest in good quality basic tools (knife, cutting board, pan)\n" +
                   "• Learn basic techniques: chopping, sautéing, roasting, boiling\n" +
                   "• Meal prep on weekends to save time during the week\n" +
                   "• Keep a well-stocked pantry with versatile ingredients\n" +
                   "• Taste as you cook and adjust seasonings\n" +
                   "• Don't be afraid to experiment and make mistakes\n\n" +
                   "Cooking tip: Start with one-pot meals - they're forgiving and delicious!";
        }
        
        if (lowerMessage.includes('budgeting') || lowerMessage.includes('money management')) {
            return "Here's a practical approach to budgeting:\n\n" +
                   "• Track all your expenses for one month to understand spending patterns\n" +
                   "• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings\n" +
                   "• Set up automatic transfers to savings accounts\n" +
                   "• Build an emergency fund (3-6 months of expenses)\n" +
                   "• Use apps or spreadsheets to track your budget\n" +
                   "• Review and adjust your budget monthly\n" +
                   "• Start investing early, even small amounts\n\n" +
                   "Money tip: Pay yourself first - savings should be a priority, not an afterthought!";
        }
        
        if (lowerMessage.includes('time management') || lowerMessage.includes('productivity')) {
            return "Effective time management strategies that actually work:\n\n" +
                   "• Use the Pomodoro Technique: 25 minutes focused work, 5-minute break\n" +
                   "• Prioritize tasks using the Eisenhower Matrix (urgent vs important)\n" +
                   "• Batch similar tasks together to maintain focus\n" +
                   "• Set specific, achievable goals for each day\n" +
                   "• Eliminate or minimize distractions (phone, social media)\n" +
                   "• Learn to say no to non-essential commitments\n" +
                   "• Review and plan your day the night before\n\n" +
                   "Productivity tip: Focus on progress, not perfection!";
        }
        
        if (lowerMessage.includes('decision making') || lowerMessage.includes('choices')) {
            return "Here's a framework for better decision making:\n\n" +
                   "• Gather relevant information and consider all options\n" +
                   "• List the pros and cons of each choice\n" +
                   "• Consider the long-term consequences, not just immediate results\n" +
                   "• Trust your intuition but verify with logic\n" +
                   "• Set a deadline for making the decision\n" +
                   "• Seek advice from trusted people with relevant experience\n" +
                   "• Remember that most decisions can be adjusted if needed\n\n" +
                   "Decision tip: Perfect is the enemy of good - sometimes good enough is perfect!";
        }
        
        return "I can help with practical life skills! Are you interested in cooking, budgeting, time management, or decision making?";
    }
    
    // Problem-Solving and Challenge Responses
    function generateProblemSolvingResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('stuck') || lowerMessage.includes('difficult situation')) {
            return "When you're feeling stuck, try this systematic approach:\n\n" +
                   "• Step back and look at the problem from different angles\n" +
                   "• Break the problem into smaller, manageable parts\n" +
                   "• Brainstorm multiple solutions without judging them initially\n" +
                   "• Consider what resources or help you might need\n" +
                   "• Take a break and return with fresh perspective\n" +
                   "• Talk to someone who's faced similar challenges\n" +
                   "• Remember that most problems have multiple solutions\n\n" +
                   "Problem-solving tip: Sometimes the best solution is to change your approach entirely!";
        }
        
        if (lowerMessage.includes('conflict') || lowerMessage.includes('disagreement')) {
            return "Here's how to resolve conflicts constructively:\n\n" +
                   "• Address issues early before they escalate\n" +
                   "• Focus on the problem, not the person\n" +
                   "• Listen actively and try to understand the other perspective\n" +
                   "• Find common ground and shared interests\n" +
                   "• Be willing to compromise and find win-win solutions\n" +
                   "• Use neutral language and avoid blame\n" +
                   "• Follow up to ensure the resolution is working\n\n" +
                   "Conflict resolution tip: The goal is understanding, not winning!";
        }
        
        if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much')) {
            return "When feeling overwhelmed, try these strategies:\n\n" +
                   "• Make a list of everything on your mind\n" +
                   "• Prioritize tasks by urgency and importance\n" +
                   "• Break large tasks into smaller, actionable steps\n" +
                   "• Delegate what you can and say no to non-essentials\n" +
                   "• Take breaks and practice self-care\n" +
                   "• Focus on one thing at a time\n" +
                   "• Remember that it's okay to ask for help\n\n" +
                   "Overwhelm tip: You don't have to do everything perfectly - done is better than perfect!";
        }
        
        return "I'm here to help you work through challenges! What specific problem or situation are you facing?";
    }
    
    // Personal Growth and Self-Improvement Responses
    function generatePersonalGrowthResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('habits') || lowerMessage.includes('routine')) {
            return "Building lasting habits requires strategy and patience:\n\n" +
                   "• Start small - make the habit so easy you can't say no\n" +
                   "• Stack new habits onto existing ones (habit stacking)\n" +
                   "• Track your progress to stay motivated\n" +
                   "• Focus on systems, not goals\n" +
                   "• Prepare for obstacles and have backup plans\n" +
                   "• Celebrate small wins along the way\n" +
                   "• Be patient - habits take 21-66 days to form\n\n" +
                   "Habit tip: Consistency beats intensity every time!";
        }
        
        if (lowerMessage.includes('confidence') || lowerMessage.includes('self-esteem')) {
            return "Building genuine confidence is a journey:\n\n" +
                   "• Focus on your strengths and celebrate small wins\n" +
                   "• Challenge negative self-talk with evidence\n" +
                   "• Step outside your comfort zone regularly\n" +
                   "• Practice self-compassion and treat yourself kindly\n" +
                   "• Surround yourself with supportive people\n" +
                   "• Learn new skills and take on new challenges\n" +
                   "• Remember that confidence comes from competence\n\n" +
                   "Confidence tip: Fake it till you make it - but also work on actually making it!";
        }
        
        if (lowerMessage.includes('goals') || lowerMessage.includes('planning')) {
            return "Here's how to set and achieve meaningful goals:\n\n" +
                   "• Use the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound\n" +
                   "• Write down your goals and review them regularly\n" +
                   "• Break large goals into smaller milestones\n" +
                   "• Create action plans with specific steps\n" +
                   "• Track your progress and adjust as needed\n" +
                   "• Share your goals with others for accountability\n" +
                   "• Celebrate progress, not just the final achievement\n\n" +
                   "Goal-setting tip: Focus on the process, not just the outcome!";
        }
        
        if (lowerMessage.includes('mindset') || lowerMessage.includes('attitude')) {
            return "Developing a growth mindset can transform your life:\n\n" +
                   "• Embrace challenges as opportunities to learn\n" +
                   "• View failures as feedback, not final judgments\n" +
                   "• Focus on effort and process, not just results\n" +
                   "• Learn from criticism and use it to improve\n" +
                   "• Celebrate others' success and learn from them\n" +
                   "• Believe that abilities can be developed through dedication\n" +
                   "• Practice gratitude and positive self-talk\n\n" +
                   "Mindset tip: Your thoughts shape your reality - choose them wisely!";
        }
        
        return "I'm excited to help with your personal growth journey! Are you working on habits, confidence, goal-setting, or mindset?";
    }
    
    // Mindfulness and Meditation Responses
    function generateMindfulnessResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('mindfulness') || lowerMessage.includes('mindful')) {
            return "Mindfulness is the practice of being fully present and aware of the current moment. Here's how to get started:\n\n" +
                   "• Start with just 5 minutes of daily meditation\n" +
                   "• Focus on your breath - notice the inhale and exhale\n" +
                   "• When your mind wanders, gently bring it back to your breath\n" +
                   "• Practice mindful eating - savor each bite\n" +
                   "• Take mindful walks - notice your surroundings\n" +
                   "• Use mindfulness apps like Headspace or Calm\n" +
                   "• Remember: it's normal for your mind to wander - that's part of the practice!\n\n" +
                   "Mindfulness tip: Start small and be patient with yourself. It's called a practice for a reason!";
        }
        
        if (lowerMessage.includes('meditation') || lowerMessage.includes('meditate')) {
            return "Meditation is a powerful tool for mental clarity and peace. Here's a simple approach:\n\n" +
                   "• Find a quiet, comfortable spot\n" +
                   "• Sit with your back straight but relaxed\n" +
                   "• Close your eyes and focus on your breathing\n" +
                   "• Count your breaths: 1 on inhale, 2 on exhale, up to 10, then repeat\n" +
                   "• When thoughts arise, acknowledge them and return to counting\n" +
                   "• Start with 5-10 minutes and gradually increase\n" +
                   "• Be consistent - daily practice is more important than duration\n\n" +
                   "Meditation tip: There's no 'perfect' meditation. Every session is beneficial!";
        }
        
        if (lowerMessage.includes('stress relief') || lowerMessage.includes('anxiety')) {
            return "Here are effective stress relief techniques:\n\n" +
                   "• Deep breathing: 4 counts in, hold 4, out 4, hold 4\n" +
                   "• Progressive muscle relaxation: tense and release each muscle group\n" +
                   "• Grounding technique: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste\n" +
                   "• Take a walk in nature or around your neighborhood\n" +
                   "• Practice gratitude - write down 3 things you're thankful for\n" +
                   "• Listen to calming music or nature sounds\n" +
                   "• Try gentle yoga or stretching\n\n" +
                   "Stress relief tip: Find what works for you and practice it regularly!";
        }
        
        return "I'd love to help you with mindfulness and stress relief! Are you interested in meditation, breathing exercises, or general stress management techniques?";
    }
    
    // Health and Wellness Responses
    function generateHealthResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('fitness') || lowerMessage.includes('exercise')) {
            return "Here's how to start a sustainable fitness routine:\n\n" +
                   "• Start with 20-30 minutes, 3 times per week\n" +
                   "• Choose activities you enjoy - walking, dancing, swimming, cycling\n" +
                   "• Mix cardio, strength training, and flexibility exercises\n" +
                   "• Set realistic goals and track your progress\n" +
                   "• Stay hydrated and fuel your body with nutritious foods\n" +
                   "• Listen to your body and rest when needed\n" +
                   "• Find a workout buddy for motivation and accountability\n\n" +
                   "Fitness tip: Consistency beats intensity. It's better to exercise regularly at a moderate level than to go all-out occasionally!";
        }
        
        if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
            return "Here are practical nutrition tips for a healthy diet:\n\n" +
                   "• Fill half your plate with colorful vegetables and fruits\n" +
                   "• Choose whole grains over refined grains\n" +
                   "• Include lean proteins like fish, chicken, beans, and nuts\n" +
                   "• Stay hydrated with water throughout the day\n" +
                   "• Limit processed foods and added sugars\n" +
                   "• Practice portion control - use smaller plates\n" +
                   "• Plan and prep meals ahead of time\n" +
                   "• Allow yourself treats in moderation\n\n" +
                   "Nutrition tip: Focus on adding healthy foods rather than restricting - it's more sustainable!";
        }
        
        if (lowerMessage.includes('mental health')) {
            return "Taking care of your mental health is just as important as physical health:\n\n" +
                   "• Maintain regular sleep schedule (7-9 hours per night)\n" +
                   "• Stay connected with friends and family\n" +
                   "• Practice stress management techniques\n" +
                   "• Set boundaries and learn to say no\n" +
                   "• Engage in activities that bring you joy\n" +
                   "• Consider therapy or counseling if needed\n" +
                   "• Limit social media and news consumption\n" +
                   "• Practice self-compassion and positive self-talk\n\n" +
                   "Mental health tip: It's okay to ask for help. Seeking support is a sign of strength, not weakness!";
        }
        
        return "I'm here to help with health and wellness! Are you interested in fitness, nutrition, mental health, or general wellness tips?";
    }
    
    // Education and Learning Responses
    function generateEducationResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('learn') || lowerMessage.includes('study')) {
            return "Here are effective learning strategies:\n\n" +
                   "• Use active recall - test yourself instead of just re-reading\n" +
                   "• Space out your study sessions (spaced repetition)\n" +
                   "• Teach others what you've learned\n" +
                   "• Take breaks every 25-30 minutes (Pomodoro technique)\n" +
                   "• Create mind maps or visual diagrams\n" +
                   "• Find a quiet, distraction-free study space\n" +
                   "• Set specific, achievable learning goals\n" +
                   "• Join study groups or find a study partner\n\n" +
                   "Learning tip: Focus on understanding concepts rather than memorizing facts!";
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('training')) {
            return "Here's how to effectively develop new skills:\n\n" +
                   "• Choose one skill at a time to focus on\n" +
                   "• Break the skill into smaller, manageable parts\n" +
                   "• Practice regularly - consistency is key\n" +
                   "• Find a mentor or take a course\n" +
                   "• Apply the skill in real-world situations\n" +
                   "• Track your progress and celebrate milestones\n" +
                   "• Don't be afraid to make mistakes - they're part of learning\n" +
                   "• Join communities related to your skill\n\n" +
                   "Skill development tip: It takes time to master any skill. Be patient and persistent!";
        }
        
        if (lowerMessage.includes('course') || lowerMessage.includes('education')) {
            return "Here's how to choose and succeed in educational programs:\n\n" +
                   "• Research the curriculum and instructor qualifications\n" +
                   "• Check reviews and testimonials from previous students\n" +
                   "• Consider your learning style and schedule\n" +
                   "• Set aside dedicated time for coursework\n" +
                   "• Take notes and review them regularly\n" +
                   "• Participate actively in discussions and activities\n" +
                   "• Connect with other students for support\n" +
                   "• Apply what you learn in practical situations\n\n" +
                   "Education tip: The best course is one that aligns with your goals and learning style!";
        }
        
        return "I'd love to help with your learning journey! Are you looking for study tips, skill development advice, or guidance on choosing educational programs?";
    }
    
    // Technology and Digital Responses
    function generateTechnologyResponse(originalMessage) {
        const lowerMessage = originalMessage.toLowerCase();
        
        if (lowerMessage.includes('programming') || lowerMessage.includes('coding')) {
            return "Here's how to start learning programming:\n\n" +
                   "• Choose a beginner-friendly language like Python or JavaScript\n" +
                   "• Start with online tutorials and interactive coding platforms\n" +
                   "• Practice coding daily, even if just for 30 minutes\n" +
                   "• Build small projects to apply what you learn\n" +
                   "• Join coding communities and forums for support\n" +
                   "• Read other people's code to learn different approaches\n" +
                   "• Don't try to learn everything at once - focus on fundamentals\n" +
                   "• Consider taking a structured course or bootcamp\n\n" +
                   "Programming tip: The best way to learn coding is by doing. Start building projects as soon as possible!";
        }
        
        if (lowerMessage.includes('app') || lowerMessage.includes('software')) {
            return "Here are recommendations for useful apps and software:\n\n" +
                   "• Productivity: Notion, Todoist, Trello for organization\n" +
                   "• Learning: Duolingo, Khan Academy, Coursera for education\n" +
                   "• Health: MyFitnessPal, Headspace, Strava for wellness\n" +
                   "• Communication: Slack, Zoom, Discord for collaboration\n" +
                   "• Finance: Mint, YNAB, Personal Capital for budgeting\n" +
                   "• Creativity: Canva, Adobe Creative Suite, Figma for design\n" +
                   "• Security: 1Password, LastPass for password management\n\n" +
                   "App tip: Choose apps that solve specific problems in your life rather than downloading everything!";
        }
        
        if (lowerMessage.includes('digital') || lowerMessage.includes('online')) {
            return "Here are tips for navigating the digital world effectively:\n\n" +
                   "• Practice digital minimalism - use technology intentionally\n" +
                   "• Set boundaries for screen time and social media use\n" +
                   "• Keep your devices and software updated for security\n" +
                   "• Use strong, unique passwords and enable two-factor authentication\n" +
                   "• Be mindful of your digital footprint and privacy\n" +
                   "• Take regular breaks from screens to protect your eyes\n" +
                   "• Use technology to enhance, not replace, real-world connections\n" +
                   "• Learn to use productivity tools effectively\n\n" +
                   "Digital wellness tip: Technology should serve you, not control you. Be intentional about your digital habits!";
        }
        
        return "I can help with technology questions! Are you interested in programming, app recommendations, digital wellness, or general tech advice?";
    }
}

// Modal functionality
function initializeModals() {
    const loginBtn = document.getElementById('loginBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelLogin = document.getElementById('cancelLogin');
    const loginForm = document.getElementById('loginForm');
    
    loginBtn.addEventListener('click', () => {
        // If user is already logged in, show logout option
        if (app.user.loggedIn) {
            const shouldLogout = confirm(`Hello ${app.user.name}! Do you want to logout?`);
            if (shouldLogout) {
                logoutUser();
            }
        } else {
            // Show login modal
            modalOverlay.classList.add('active');
        }
    });
    
    closeModal.addEventListener('click', closeLoginModal);
    cancelLogin.addEventListener('click', closeLoginModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeLoginModal();
        }
    });
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const userPhone = document.getElementById('userPhone').value.trim();
        
        if (!userName || !userPhone) {
            alert('Please fill in all fields.');
            return;
        }
        
        app.user.name = userName;
        app.user.phone = userPhone;
        app.user.loggedIn = true;
        
        // Save login state to localStorage
        localStorage.setItem('spyder_user', JSON.stringify({
            name: userName,
            phone: userPhone,
            loggedIn: true,
            loginTime: new Date().toISOString()
        }));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = `Welcome to SPYDER, ${userName}! You're now logged in.`;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
        closeLoginModal();
        loginBtn.textContent = `Welcome, ${userName}`;
        loginBtn.classList.add('logged-in');
    });
    
    function closeLoginModal() {
        modalOverlay.classList.remove('active');
        loginForm.reset();
    }
    
    // Check for existing login state on page load
    checkExistingLogin();
}

// Function to check and restore login state from localStorage
function checkExistingLogin() {
    try {
        const savedUser = localStorage.getItem('spyder_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            
            // Check if login is still valid (optional: add expiration check)
            if (userData.loggedIn && userData.name) {
                // Restore user data
                app.user.name = userData.name;
                app.user.phone = userData.phone;
                app.user.loggedIn = true;
                
                // Update login button appearance
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) {
                    loginBtn.textContent = `Welcome, ${userData.name}`;
                    loginBtn.classList.add('logged-in');
                }
                
                console.log('User login state restored:', userData.name);
            }
        }
    } catch (error) {
        console.error('Error restoring login state:', error);
        // Clear corrupted data
        localStorage.removeItem('spyder_user');
    }
}

// Function to logout user
function logoutUser() {
    // Clear user data
    app.user.name = '';
    app.user.phone = '';
    app.user.loggedIn = false;
    
    // Clear localStorage
    localStorage.removeItem('spyder_user');
    
    // Reset login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = 'Login';
        loginBtn.classList.remove('logged-in');
    }
    
    // Show logout message
    const logoutMessage = document.createElement('div');
    logoutMessage.className = 'success-message';
    logoutMessage.textContent = 'You have been logged out successfully.';
    document.body.appendChild(logoutMessage);
    
    setTimeout(() => {
        logoutMessage.remove();
    }, 3000);
    
    console.log('User logged out successfully');
}

// Breathing Exercise functionality
function initializeBreathingExercise() {
    const breathingModal = document.getElementById('breathingModal');
    const closeBreathingModal = document.getElementById('closeBreathingModal');
    const startBreathing = document.getElementById('startBreathing');
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingInstruction = document.getElementById('breathingInstruction');
    
    let breathingInterval;
    let isBreathing = false;
    let breathingPhase = 'in'; // 'in', 'hold', 'out'
    let breathingCount = 0;
    
    closeBreathingModal.addEventListener('click', () => {
        breathingModal.classList.remove('active');
        stopBreathing();
    });
    
    breathingModal.addEventListener('click', (e) => {
        if (e.target === breathingModal) {
            breathingModal.classList.remove('active');
            stopBreathing();
        }
    });
    
    startBreathing.addEventListener('click', () => {
        if (!isBreathing) {
            startBreathingExercise();
        } else {
            stopBreathing();
        }
    });
    
    function startBreathingExercise() {
        isBreathing = true;
        startBreathing.textContent = 'Stop';
        breathingCount = 0;
        breathingPhase = 'in';
        
        breathingInterval = setInterval(() => {
            switch (breathingPhase) {
                case 'in':
                    breathingCircle.classList.add('breathing-in');
                    breathingCircle.classList.remove('breathing-out');
                    breathingInstruction.textContent = 'Breathe in slowly...';
                    setTimeout(() => {
                        breathingPhase = 'hold';
                    }, 4000);
                    break;
                    
                case 'hold':
                    breathingInstruction.textContent = 'Hold your breath...';
                    setTimeout(() => {
                        breathingPhase = 'out';
                    }, 2000);
                    break;
                    
                case 'out':
                    breathingCircle.classList.remove('breathing-in');
                    breathingCircle.classList.add('breathing-out');
                    breathingInstruction.textContent = 'Breathe out slowly...';
                    setTimeout(() => {
                        breathingPhase = 'in';
                        breathingCount++;
                        if (breathingCount >= 5) {
                            stopBreathing();
                            breathingInstruction.textContent = 'Great job! You\'ve completed 5 breathing cycles.';
                        }
                    }, 4000);
                    break;
            }
        }, 100);
    }
    
    function stopBreathing() {
        isBreathing = false;
        startBreathing.textContent = 'Start';
        breathingCircle.classList.remove('breathing-in', 'breathing-out');
        breathingInstruction.textContent = 'Click Start to begin';
        
        if (breathingInterval) {
            clearInterval(breathingInterval);
            breathingInterval = null;
        }
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff0000, #ff6666)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Pop Game Implementation
function initializePopGame() {
    const popGameModal = document.getElementById('popGameModal');
    const closePopGameModal = document.getElementById('closePopGameModal');
    const startPopGame = document.getElementById('startPopGame');
    const pausePopGame = document.getElementById('pausePopGame');
    const resetPopGame = document.getElementById('resetPopGame');
    const popGameArea = document.getElementById('popGameArea');
    const popScore = document.getElementById('popScore');
    const popTime = document.getElementById('popTime');
    
    let gameState = {
        isPlaying: false,
        isPaused: false,
        score: 0,
        timeLeft: 60,
        bubbles: [],
        gameInterval: null,
        timeInterval: null
    };
    
    // Close modal handlers
    closePopGameModal.addEventListener('click', () => {
        popGameModal.classList.remove('active');
        stopPopGame();
    });
    
    popGameModal.addEventListener('click', (e) => {
        if (e.target === popGameModal) {
            popGameModal.classList.remove('active');
            stopPopGame();
        }
    });
    
    // Game control handlers
    startPopGame.addEventListener('click', () => {
        if (!gameState.isPlaying) {
            startPopGameFunction();
        }
    });
    
    pausePopGame.addEventListener('click', () => {
        if (gameState.isPlaying) {
            if (gameState.isPaused) {
                resumePopGame();
            } else {
                pausePopGameFunction();
            }
        }
    });
    
    resetPopGame.addEventListener('click', () => {
        resetPopGameFunction();
    });
    
    function startPopGameFunction() {
        gameState.isPlaying = true;
        gameState.isPaused = false;
        gameState.score = 0;
        gameState.timeLeft = 60;
        gameState.bubbles = [];
        
        popScore.textContent = gameState.score;
        popTime.textContent = gameState.timeLeft;
        
        startPopGame.style.display = 'none';
        pausePopGame.style.display = 'inline-block';
        pausePopGame.textContent = 'Pause';
        
        // Clear game area
        popGameArea.innerHTML = '';
        
        // Start game loop
        gameState.gameInterval = setInterval(createBubble, 1000);
        gameState.timeInterval = setInterval(updateTimer, 1000);
        
        // Create initial bubbles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createBubble(), i * 500);
        }
    }
    
    function pausePopGameFunction() {
        gameState.isPaused = true;
        pausePopGame.textContent = 'Resume';
        clearInterval(gameState.gameInterval);
        clearInterval(gameState.timeInterval);
    }
    
    function resumePopGame() {
        gameState.isPaused = false;
        pausePopGame.textContent = 'Pause';
        gameState.gameInterval = setInterval(createBubble, 1000);
        gameState.timeInterval = setInterval(updateTimer, 1000);
    }
    
    function stopPopGame() {
        gameState.isPlaying = false;
        gameState.isPaused = false;
        clearInterval(gameState.gameInterval);
        clearInterval(gameState.timeInterval);
        
        startPopGame.style.display = 'inline-block';
        pausePopGame.style.display = 'none';
        
        // Remove all bubbles
        gameState.bubbles.forEach(bubble => {
            if (bubble.element && bubble.element.parentNode) {
                bubble.element.parentNode.removeChild(bubble.element);
            }
        });
        gameState.bubbles = [];
    }
    
    function resetPopGameFunction() {
        stopPopGame();
        gameState.score = 0;
        gameState.timeLeft = 60;
        popScore.textContent = gameState.score;
        popTime.textContent = gameState.timeLeft;
        popGameArea.innerHTML = '<p class="game-instruction">Click the bubbles to pop them!</p>';
    }
    
    function createBubble() {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size between 30-80px
        const size = Math.random() * 50 + 30;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        // Random position
        const x = Math.random() * (popGameArea.offsetWidth - size);
        const y = Math.random() * (popGameArea.offsetHeight - size);
        bubble.style.left = x + 'px';
        bubble.style.top = y + 'px';
        
        // Random color
        const colors = [
            'rgba(255, 0, 255, 0.7)',
            'rgba(0, 255, 255, 0.7)',
            'rgba(255, 255, 0, 0.7)',
            'rgba(0, 255, 0, 0.7)',
            'rgba(255, 0, 0, 0.7)',
            'rgba(0, 0, 255, 0.7)'
        ];
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Click handler
        bubble.addEventListener('click', () => popBubble(bubble));
        
        // Add to game area
        popGameArea.appendChild(bubble);
        
        // Store bubble reference
        const bubbleObj = {
            element: bubble,
            createdAt: Date.now()
        };
        gameState.bubbles.push(bubbleObj);
        
        // Remove bubble after 5 seconds if not popped
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.classList.add('popped');
                setTimeout(() => {
                    if (bubble.parentNode) {
                        bubble.parentNode.removeChild(bubble);
                    }
                    const index = gameState.bubbles.indexOf(bubbleObj);
                    if (index > -1) {
                        gameState.bubbles.splice(index, 1);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    function popBubble(bubble) {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        bubble.classList.add('popped');
        gameState.score += 10;
        popScore.textContent = gameState.score;
        
        // Remove bubble from array
        const index = gameState.bubbles.findIndex(b => b.element === bubble);
        if (index > -1) {
            gameState.bubbles.splice(index, 1);
        }
        
        // Remove bubble from DOM
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 300);
    }
    
    function updateTimer() {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        gameState.timeLeft--;
        popTime.textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            endPopGame();
        }
    }
    
    function endPopGame() {
        stopPopGame();
        
        const finalScore = gameState.score;
        popGameArea.innerHTML = `
            <div class="game-complete">
                <h3>🎉 Game Over!</h3>
                <p>Final Score: ${finalScore}</p>
                <p>Great job popping those bubbles!</p>
            </div>
        `;
        
        // Reset after 3 seconds
        setTimeout(() => {
            resetPopGameFunction();
        }, 3000);
    }
}

// Memory Game Implementation
function initializeMemoryGame() {
    const memoryGameModal = document.getElementById('memoryGameModal');
    const closeMemoryGameModal = document.getElementById('closeMemoryGameModal');
    const startMemoryGame = document.getElementById('startMemoryGame');
    const resetMemoryGame = document.getElementById('resetMemoryGame');
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryMoves = document.getElementById('memoryMoves');
    const memoryPairs = document.getElementById('memoryPairs');
    const memoryTime = document.getElementById('memoryTime');
    
    let gameState = {
        isPlaying: false,
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        startTime: null,
        timeInterval: null,
        totalPairs: 8
    };
    
    const cardSymbols = ['🌟', '🎈', '🎨', '🎵', '🎯', '🎪', '🎭', '🎸'];
    
    // Close modal handlers
    closeMemoryGameModal.addEventListener('click', () => {
        memoryGameModal.classList.remove('active');
        stopMemoryGame();
    });
    
    memoryGameModal.addEventListener('click', (e) => {
        if (e.target === memoryGameModal) {
            memoryGameModal.classList.remove('active');
            stopMemoryGame();
        }
    });
    
    // Game control handlers
    startMemoryGame.addEventListener('click', () => {
        startMemoryGameFunction();
    });
    
    resetMemoryGame.addEventListener('click', () => {
        resetMemoryGameFunction();
    });
    
    function startMemoryGameFunction() {
        gameState.isPlaying = true;
        gameState.cards = [];
        gameState.flippedCards = [];
        gameState.matchedPairs = 0;
        gameState.moves = 0;
        gameState.startTime = Date.now();
        
        memoryMoves.textContent = gameState.moves;
        memoryPairs.textContent = `${gameState.matchedPairs}/${gameState.totalPairs}`;
        memoryTime.textContent = '0';
        
        // Create cards
        createMemoryCards();
        
        // Start timer
        gameState.timeInterval = setInterval(updateMemoryTimer, 1000);
    }
    
    function createMemoryCards() {
        memoryGrid.innerHTML = '';
        
        // Create pairs of cards
        const cardData = [];
        for (let i = 0; i < gameState.totalPairs; i++) {
            cardData.push(cardSymbols[i], cardSymbols[i]);
        }
        
        // Shuffle cards
        for (let i = cardData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardData[i], cardData[j]] = [cardData[j], cardData[i]];
        }
        
        // Create card elements
        cardData.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            
            card.innerHTML = `
                <div class="card-back">?</div>
                <div class="card-front">${symbol}</div>
            `;
            
            card.addEventListener('click', () => flipCard(card));
            
            memoryGrid.appendChild(card);
            gameState.cards.push(card);
        });
    }
    
    function flipCard(card) {
        if (!gameState.isPlaying || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        if (gameState.flippedCards.length >= 2) {
            return;
        }
        
        card.classList.add('flipped');
        gameState.flippedCards.push(card);
        
        if (gameState.flippedCards.length === 2) {
            gameState.moves++;
            memoryMoves.textContent = gameState.moves;
            
            setTimeout(() => {
                checkForMatch();
            }, 500);
        }
    }
    
    function checkForMatch() {
        const [card1, card2] = gameState.flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            gameState.matchedPairs++;
            memoryPairs.textContent = `${gameState.matchedPairs}/${gameState.totalPairs}`;
            
            // Check if game is complete
            if (gameState.matchedPairs === gameState.totalPairs) {
                endMemoryGame();
            }
        } else {
            // No match
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
            }, 500);
        }
        
        gameState.flippedCards = [];
    }
    
    function updateMemoryTimer() {
        if (!gameState.isPlaying) return;
        
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        memoryTime.textContent = elapsed;
    }
    
    function stopMemoryGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.timeInterval);
    }
    
    function resetMemoryGameFunction() {
        stopMemoryGame();
        gameState.matchedPairs = 0;
        gameState.moves = 0;
        gameState.flippedCards = [];
        
        memoryMoves.textContent = gameState.moves;
        memoryPairs.textContent = `${gameState.matchedPairs}/${gameState.totalPairs}`;
        memoryTime.textContent = '0';
        
        memoryGrid.innerHTML = '<p class="game-instruction">Click Start Game to begin!</p>';
    }
    
    function endMemoryGame() {
        stopMemoryGame();
        
        const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
        const finalMoves = gameState.moves;
        
        memoryGrid.innerHTML = `
            <div class="game-complete">
                <h3>🎉 Congratulations!</h3>
                <p>You completed the memory game!</p>
                <p>Time: ${finalTime} seconds</p>
                <p>Moves: ${finalMoves}</p>
                <p>Great memory skills!</p>
            </div>
        `;
        
        // Reset after 5 seconds
        setTimeout(() => {
            resetMemoryGameFunction();
        }, 5000);
    }
}

// Puzzle Slider Game Implementation
function initializePuzzleSliderGame() {
    const puzzleSliderGameModal = document.getElementById('puzzleSliderGameModal');
    const closePuzzleSliderGameModal = document.getElementById('closePuzzleSliderGameModal');
    const startPuzzleSliderGame = document.getElementById('startPuzzleSliderGame');
    const shufflePuzzleSliderGame = document.getElementById('shufflePuzzleSliderGame');
    const resetPuzzleSliderGame = document.getElementById('resetPuzzleSliderGame');
    const puzzleSliderArea = document.getElementById('puzzleSliderArea');
    const puzzleSizeSelect = document.getElementById('puzzleSizeSelect');
    const puzzleSliderMoves = document.getElementById('puzzleSliderMoves');
    const puzzleSliderTime = document.getElementById('puzzleSliderTime');
    const puzzleSliderSize = document.getElementById('puzzleSliderSize');
    
    let gameState = {
        isPlaying: false,
        size: 3,
        moves: 0,
        startTime: null,
        timeInterval: null,
        puzzle: [],
        emptyIndex: 0
    };
    
    // Close modal handlers
    closePuzzleSliderGameModal.addEventListener('click', () => {
        puzzleSliderGameModal.classList.remove('active');
        stopPuzzleSliderGame();
    });
    
    puzzleSliderGameModal.addEventListener('click', (e) => {
        if (e.target === puzzleSliderGameModal) {
            puzzleSliderGameModal.classList.remove('active');
            stopPuzzleSliderGame();
        }
    });
    
    // Game control handlers
    startPuzzleSliderGame.addEventListener('click', () => {
        startPuzzleSliderGameFunction();
    });
    
    shufflePuzzleSliderGame.addEventListener('click', () => {
        shufflePuzzle();
    });
    
    resetPuzzleSliderGame.addEventListener('click', () => {
        resetPuzzleSliderGameFunction();
    });
    
    puzzleSizeSelect.addEventListener('change', () => {
        gameState.size = parseInt(puzzleSizeSelect.value);
        puzzleSliderSize.textContent = `${gameState.size}x${gameState.size}`;
        if (gameState.isPlaying) {
            createPuzzle();
        }
    });
    
    function startPuzzleSliderGameFunction() {
        gameState.isPlaying = true;
        gameState.moves = 0;
        gameState.startTime = Date.now();
        gameState.size = parseInt(puzzleSizeSelect.value);
        
        updateDisplay();
        createPuzzle();
        startTimer();
        
        startPuzzleSliderGame.style.display = 'none';
    }
    
    function createPuzzle() {
        const totalTiles = gameState.size * gameState.size;
        gameState.puzzle = [];
        
        // Create solved puzzle
        for (let i = 1; i < totalTiles; i++) {
            gameState.puzzle.push(i);
        }
        gameState.puzzle.push(0); // Empty tile
        gameState.emptyIndex = totalTiles - 1;
        
        // Shuffle the puzzle
        shufflePuzzle();
        
        // Create visual grid
        createPuzzleGrid();
    }
    
    function createPuzzleGrid() {
        puzzleSliderArea.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'puzzle-grid';
        grid.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;
        
        const tileSize = Math.min(60, 400 / gameState.size - 10);
        
        for (let i = 0; i < gameState.puzzle.length; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            
            if (gameState.puzzle[i] === 0) {
                tile.classList.add('empty');
                tile.textContent = '';
            } else {
                tile.textContent = gameState.puzzle[i];
                tile.addEventListener('click', () => moveTile(i));
            }
            
            grid.appendChild(tile);
        }
        
        puzzleSliderArea.appendChild(grid);
    }
    
    function moveTile(tileIndex) {
        if (!gameState.isPlaying) return;
        
        const emptyIndex = gameState.emptyIndex;
        const size = gameState.size;
        
        // Check if tile is adjacent to empty space
        const tileRow = Math.floor(tileIndex / size);
        const tileCol = tileIndex % size;
        const emptyRow = Math.floor(emptyIndex / size);
        const emptyCol = emptyIndex % size;
        
        const isAdjacent = (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol) ||
                          (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow);
        
        if (isAdjacent) {
            // Swap tiles
            [gameState.puzzle[tileIndex], gameState.puzzle[emptyIndex]] = 
            [gameState.puzzle[emptyIndex], gameState.puzzle[tileIndex]];
            
            gameState.emptyIndex = tileIndex;
            gameState.moves++;
            
            updateDisplay();
            createPuzzleGrid();
            
            // Add move animation
            const tiles = document.querySelectorAll('.puzzle-tile:not(.empty)');
            tiles.forEach(tile => {
                if (tile.textContent == gameState.puzzle[tileIndex]) {
                    tile.classList.add('moving');
                    setTimeout(() => tile.classList.remove('moving'), 300);
                }
            });
            
            // Check if puzzle is solved
            if (isPuzzleSolved()) {
                endPuzzleSliderGame();
            }
        }
    }
    
    function shufflePuzzle() {
        if (!gameState.isPlaying) return;
        
        // Perform random valid moves to shuffle
        const shuffleMoves = gameState.size * gameState.size * 10;
        for (let i = 0; i < shuffleMoves; i++) {
            const possibleMoves = getPossibleMoves();
            if (possibleMoves.length > 0) {
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                [gameState.puzzle[randomMove], gameState.puzzle[gameState.emptyIndex]] = 
                [gameState.puzzle[gameState.emptyIndex], gameState.puzzle[randomMove]];
                gameState.emptyIndex = randomMove;
            }
        }
        
        gameState.moves = 0;
        updateDisplay();
        createPuzzleGrid();
    }
    
    function getPossibleMoves() {
        const possibleMoves = [];
        const emptyIndex = gameState.emptyIndex;
        const size = gameState.size;
        const emptyRow = Math.floor(emptyIndex / size);
        const emptyCol = emptyIndex % size;
        
        // Check all four directions
        const directions = [
            { row: emptyRow - 1, col: emptyCol }, // Up
            { row: emptyRow + 1, col: emptyCol }, // Down
            { row: emptyRow, col: emptyCol - 1 }, // Left
            { row: emptyRow, col: emptyCol + 1 }  // Right
        ];
        
        directions.forEach(dir => {
            if (dir.row >= 0 && dir.row < size && dir.col >= 0 && dir.col < size) {
                const index = dir.row * size + dir.col;
                possibleMoves.push(index);
            }
        });
        
        return possibleMoves;
    }
    
    function isPuzzleSolved() {
        for (let i = 0; i < gameState.puzzle.length - 1; i++) {
            if (gameState.puzzle[i] !== i + 1) {
                return false;
            }
        }
        return gameState.puzzle[gameState.puzzle.length - 1] === 0;
    }
    
    function startTimer() {
        gameState.timeInterval = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
        if (!gameState.isPlaying) return;
        
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        puzzleSliderTime.textContent = elapsed;
    }
    
    function stopPuzzleSliderGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.timeInterval);
        startPuzzleSliderGame.style.display = 'inline-block';
    }
    
    function resetPuzzleSliderGameFunction() {
        stopPuzzleSliderGame();
        gameState.moves = 0;
        gameState.startTime = null;
        updateDisplay();
        puzzleSliderArea.innerHTML = '<p class="game-instruction">Slide the tiles to solve the puzzle!</p>';
    }
    
    function updateDisplay() {
        puzzleSliderMoves.textContent = gameState.moves;
        puzzleSliderSize.textContent = `${gameState.size}x${gameState.size}`;
    }
    
    function endPuzzleSliderGame() {
        stopPuzzleSliderGame();
        
        const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
        const finalMoves = gameState.moves;
        
        puzzleSliderArea.innerHTML = `
            <div class="game-complete">
                <h3>🧩 Congratulations!</h3>
                <p>Puzzle Solved!</p>
                <p>Time: ${finalTime} seconds</p>
                <p>Moves: ${finalMoves}</p>
                <p>Excellent puzzle-solving skills!</p>
            </div>
        `;
        
        setTimeout(() => {
            resetPuzzleSliderGameFunction();
        }, 3000);
    }
}

// Zen Garden Game Implementation
function initializeZenGardenGame() {
    const zenGardenGameModal = document.getElementById('zenGardenGameModal');
    const closeZenGardenGameModal = document.getElementById('closeZenGardenGameModal');
    const zenCanvas = document.getElementById('zenCanvas');
    const clearZenGarden = document.getElementById('clearZenGarden');
    const saveZenGarden = document.getElementById('saveZenGarden');
    const meditationMode = document.getElementById('meditationMode');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const patternButtons = document.querySelectorAll('.pattern-btn');
    
    let gameState = {
        currentTool: 'rake',
        isDrawing: false,
        isMeditationMode: false,
        meditationInterval: null,
        savedPatterns: []
    };
    
    const ctx = zenCanvas.getContext('2d');
    
    // Initialize canvas
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(0, 0, zenCanvas.width, zenCanvas.height);
    
    // Close modal handlers
    closeZenGardenGameModal.addEventListener('click', () => {
        zenGardenGameModal.classList.remove('active');
        stopMeditationMode();
    });
    
    zenGardenGameModal.addEventListener('click', (e) => {
        if (e.target === zenGardenGameModal) {
            zenGardenGameModal.classList.remove('active');
            stopMeditationMode();
        }
    });
    
    // Tool selection
    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toolButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.currentTool = btn.dataset.tool;
        });
    });
    
    // Pattern buttons
    patternButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            drawPattern(btn.dataset.pattern);
        });
    });
    
    // Canvas drawing events
    zenCanvas.addEventListener('mousedown', startDrawing);
    zenCanvas.addEventListener('mousemove', draw);
    zenCanvas.addEventListener('mouseup', stopDrawing);
    zenCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    zenCanvas.addEventListener('touchstart', handleTouch);
    zenCanvas.addEventListener('touchmove', handleTouch);
    zenCanvas.addEventListener('touchend', stopDrawing);
    
    // Control buttons
    clearZenGarden.addEventListener('click', clearCanvas);
    saveZenGarden.addEventListener('click', savePattern);
    meditationMode.addEventListener('click', toggleMeditationMode);
    
    function startDrawing(e) {
        gameState.isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!gameState.isDrawing) return;
        
        const rect = zenCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'source-over';
        
        switch (gameState.currentTool) {
            case 'rake':
                drawRakePattern(x, y);
                break;
            case 'stone':
                drawStone(x, y);
                break;
            case 'flower':
                drawFlower(x, y);
                break;
        }
    }
    
    function drawRakePattern(x, y) {
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        // Draw wavy lines
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(x - 20 + i * 8, y - 10);
            for (let j = 0; j < 20; j++) {
                const waveX = x - 20 + i * 8 + j * 2;
                const waveY = y - 10 + Math.sin(j * 0.3) * 3;
                ctx.lineTo(waveX, waveY);
            }
            ctx.stroke();
        }
    }
    
    function drawStone(x, y) {
        ctx.fillStyle = '#696969';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight
        ctx.fillStyle = '#A9A9A9';
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function drawFlower(x, y) {
        const colors = ['#FFB6C1', '#FF69B4', '#FF1493', '#FFC0CB'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((i * Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.ellipse(0, -8, 3, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        // Center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function stopDrawing() {
        gameState.isDrawing = false;
    }
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                         e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        zenCanvas.dispatchEvent(mouseEvent);
    }
    
    function drawPattern(pattern) {
        clearCanvas();
        
        const centerX = zenCanvas.width / 2;
        const centerY = zenCanvas.height / 2;
        
        switch (pattern) {
            case 'waves':
                drawWavePattern(centerX, centerY);
                break;
            case 'circles':
                drawCirclePattern(centerX, centerY);
                break;
            case 'spiral':
                drawSpiralPattern(centerX, centerY);
                break;
        }
    }
    
    function drawWavePattern(centerX, centerY) {
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 3;
        
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(50, centerY - 60 + i * 15);
            for (let x = 50; x < zenCanvas.width - 50; x += 5) {
                const y = centerY - 60 + i * 15 + Math.sin(x * 0.02) * 10;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
    
    function drawCirclePattern(centerX, centerY) {
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 2;
        
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, i * 20, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function drawSpiralPattern(centerX, centerY) {
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < 100; i++) {
            const angle = i * 0.2;
            const radius = i * 0.5;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    function clearCanvas() {
        ctx.fillStyle = '#2c1810';
        ctx.fillRect(0, 0, zenCanvas.width, zenCanvas.height);
    }
    
    function savePattern() {
        const dataURL = zenCanvas.toDataURL();
        gameState.savedPatterns.push(dataURL);
        
        // Show save confirmation
        const saveBtn = saveZenGarden;
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
        }, 2000);
    }
    
    function toggleMeditationMode() {
        if (gameState.isMeditationMode) {
            stopMeditationMode();
        } else {
            startMeditationMode();
        }
    }
    
    function startMeditationMode() {
        gameState.isMeditationMode = true;
        meditationMode.textContent = 'Exit Meditation';
        meditationMode.classList.add('meditation-active');
        
        // Gentle breathing animation
        gameState.meditationInterval = setInterval(() => {
            const alpha = 0.1 + Math.sin(Date.now() * 0.001) * 0.05;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#8B7355';
            ctx.fillRect(0, 0, zenCanvas.width, zenCanvas.height);
            ctx.globalAlpha = 1;
        }, 50);
    }
    
    function stopMeditationMode() {
        gameState.isMeditationMode = false;
        meditationMode.textContent = 'Meditation Mode';
        meditationMode.classList.remove('meditation-active');
        
        if (gameState.meditationInterval) {
            clearInterval(gameState.meditationInterval);
            gameState.meditationInterval = null;
        }
    }
}

// Bubble Wrap Game Implementation
function initializeBubbleWrapGame() {
    const bubbleWrapGameModal = document.getElementById('bubbleWrapGameModal');
    const closeBubbleWrapGameModal = document.getElementById('closeBubbleWrapGameModal');
    const startBubbleWrapGame = document.getElementById('startBubbleWrapGame');
    const generateNewBubbles = document.getElementById('generateNewBubbles');
    const resetBubbleWrapGame = document.getElementById('resetBubbleWrapGame');
    const bubbleWrapArea = document.getElementById('bubbleWrapArea');
    const bubbleSizeSelect = document.getElementById('bubbleSizeSelect');
    const bubbleColorSelect = document.getElementById('bubbleColorSelect');
    const bubbleWrapPopped = document.getElementById('bubbleWrapPopped');
    const bubbleWrapTime = document.getElementById('bubbleWrapTime');
    const bubbleWrapStreak = document.getElementById('bubbleWrapStreak');
    
    let gameState = {
        isPlaying: false,
        popped: 0,
        streak: 0,
        maxStreak: 0,
        startTime: null,
        timeInterval: null,
        bubbles: []
    };
    
    // Close modal handlers
    closeBubbleWrapGameModal.addEventListener('click', () => {
        bubbleWrapGameModal.classList.remove('active');
        stopBubbleWrapGame();
    });
    
    bubbleWrapGameModal.addEventListener('click', (e) => {
        if (e.target === bubbleWrapGameModal) {
            bubbleWrapGameModal.classList.remove('active');
            stopBubbleWrapGame();
        }
    });
    
    // Game control handlers
    startBubbleWrapGame.addEventListener('click', () => {
        startBubbleWrapGameFunction();
    });
    
    generateNewBubbles.addEventListener('click', () => {
        generateBubbles();
    });
    
    resetBubbleWrapGame.addEventListener('click', () => {
        resetBubbleWrapGameFunction();
    });
    
    function startBubbleWrapGameFunction() {
        gameState.isPlaying = true;
        gameState.popped = 0;
        gameState.streak = 0;
        gameState.startTime = Date.now();
        
        updateDisplay();
        generateBubbles();
        startTimer();
        
        startBubbleWrapGame.style.display = 'none';
    }
    
    function generateBubbles() {
        bubbleWrapArea.innerHTML = '';
        gameState.bubbles = [];
        
        const bubbleCount = 50;
        const size = bubbleSizeSelect.value;
        const color = bubbleColorSelect.value;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = `bubble-wrap-bubble ${size} ${color}`;
            bubble.addEventListener('click', () => popBubble(bubble));
            bubbleWrapArea.appendChild(bubble);
            gameState.bubbles.push(bubble);
        }
    }
    
    function popBubble(bubble) {
        if (!gameState.isPlaying || bubble.classList.contains('popped')) return;
        
        bubble.classList.add('popped');
        gameState.popped++;
        gameState.streak++;
        
        if (gameState.streak > gameState.maxStreak) {
            gameState.maxStreak = gameState.streak;
        }
        
        updateDisplay();
        
        // Add satisfying pop sound effect (visual feedback)
        createPopEffect(bubble);
        
        // Check if all bubbles are popped
        setTimeout(() => {
            if (gameState.bubbles.every(b => b.classList.contains('popped'))) {
                endBubbleWrapGame();
            }
        }, 300);
    }
    
    function createPopEffect(bubble) {
        const rect = bubble.getBoundingClientRect();
        const effect = document.createElement('div');
        effect.style.position = 'fixed';
        effect.style.left = rect.left + rect.width / 2 + 'px';
        effect.style.top = rect.top + rect.height / 2 + 'px';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)';
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'bubblePop 0.5s ease-out forwards';
        effect.style.zIndex = '1000';
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 500);
    }
    
    function startTimer() {
        gameState.timeInterval = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
        if (!gameState.isPlaying) return;
        
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        bubbleWrapTime.textContent = elapsed;
    }
    
    function stopBubbleWrapGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.timeInterval);
        startBubbleWrapGame.style.display = 'inline-block';
    }
    
    function resetBubbleWrapGameFunction() {
        stopBubbleWrapGame();
        gameState.popped = 0;
        gameState.streak = 0;
        gameState.maxStreak = 0;
        gameState.startTime = null;
        updateDisplay();
        bubbleWrapArea.innerHTML = '<p class="game-instruction">Click the bubbles to pop them! Feel the satisfaction!</p>';
    }
    
    function updateDisplay() {
        bubbleWrapPopped.textContent = gameState.popped;
        bubbleWrapStreak.textContent = gameState.streak;
    }
    
    function endBubbleWrapGame() {
        stopBubbleWrapGame();
        
        const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
        const finalPopped = gameState.popped;
        const maxStreak = gameState.maxStreak;
        
        bubbleWrapArea.innerHTML = `
            <div class="game-complete">
                <h3>🫧 Amazing!</h3>
                <p>All bubbles popped!</p>
                <p>Time: ${finalTime} seconds</p>
                <p>Bubbles: ${finalPopped}</p>
                <p>Max Streak: ${maxStreak}</p>
                <p>So satisfying! 🎉</p>
            </div>
        `;
        
        setTimeout(() => {
            resetBubbleWrapGameFunction();
        }, 3000);
    }
}

// Sand Drawing Game Implementation
function initializeSandDrawingGame() {
    const sandDrawingGameModal = document.getElementById('sandDrawingGameModal');
    const closeSandDrawingGameModal = document.getElementById('closeSandDrawingGameModal');
    const sandCanvas = document.getElementById('sandCanvas');
    const clearSandDrawing = document.getElementById('clearSandDrawing');
    const saveSandDrawing = document.getElementById('saveSandDrawing');
    const windEffect = document.getElementById('windEffect');
    const sandToolButtons = document.querySelectorAll('.sand-tool-btn');
    const sandColorButtons = document.querySelectorAll('.sand-color-btn');
    const sandDrawingTime = document.getElementById('sandDrawingTime');
    const sandDrawingTool = document.getElementById('sandDrawingTool');
    const sandDrawingColor = document.getElementById('sandDrawingColor');
    
    let gameState = {
        currentTool: 'finger',
        currentColor: 'gold',
        isDrawing: false,
        startTime: null,
        timeInterval: null,
        isWindEffect: false,
        windInterval: null
    };
    
    const ctx = sandCanvas.getContext('2d');
    
    // Initialize canvas with sand texture
    initializeSandCanvas();
    
    // Close modal handlers
    closeSandDrawingGameModal.addEventListener('click', () => {
        sandDrawingGameModal.classList.remove('active');
        stopSandDrawingGame();
    });
    
    sandDrawingGameModal.addEventListener('click', (e) => {
        if (e.target === sandDrawingGameModal) {
            sandDrawingGameModal.classList.remove('active');
            stopSandDrawingGame();
        }
    });
    
    // Game control handlers
    clearSandDrawing.addEventListener('click', () => {
        initializeSandCanvas();
    });
    
    saveSandDrawing.addEventListener('click', () => {
        saveSandArt();
    });
    
    windEffect.addEventListener('click', () => {
        toggleWindEffect();
    });
    
    // Tool selection
    sandToolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sandToolButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.currentTool = btn.dataset.tool;
            sandDrawingTool.textContent = btn.textContent.split(' ')[1];
        });
    });
    
    // Color selection
    sandColorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sandColorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.currentColor = btn.dataset.color;
            sandDrawingColor.textContent = btn.textContent;
        });
    });
    
    // Canvas drawing events
    sandCanvas.addEventListener('mousedown', startSandDrawing);
    sandCanvas.addEventListener('mousemove', drawSand);
    sandCanvas.addEventListener('mouseup', stopSandDrawing);
    sandCanvas.addEventListener('mouseleave', stopSandDrawing);
    
    function initializeSandCanvas() {
        // Create sand texture background
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, sandCanvas.width, sandCanvas.height);
        
        // Add sand texture
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * sandCanvas.width;
            const y = Math.random() * sandCanvas.height;
            const alpha = Math.random() * 0.3;
            
            ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
            ctx.fillRect(x, y, 1, 1);
        }
        
        // Start timer
        if (!gameState.startTime) {
            gameState.startTime = Date.now();
            gameState.timeInterval = setInterval(updateSandTimer, 1000);
        }
    }
    
    function startSandDrawing(e) {
        gameState.isDrawing = true;
        drawSand(e);
    }
    
    function drawSand(e) {
        if (!gameState.isDrawing) return;
        
        const rect = sandCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'source-over';
        
        switch (gameState.currentTool) {
            case 'finger':
                drawFingerSand(x, y);
                break;
            case 'brush':
                drawBrushSand(x, y);
                break;
            case 'rake':
                drawRakeSand(x, y);
                break;
            case 'spray':
                drawSpraySand(x, y);
                break;
        }
    }
    
    function drawFingerSand(x, y) {
        const color = getSandColor();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sand particles
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * 16;
            const offsetY = (Math.random() - 0.5) * 16;
            ctx.fillStyle = color;
            ctx.fillRect(x + offsetX, y + offsetY, 2, 2);
        }
    }
    
    function drawBrushSand(x, y) {
        const color = getSandColor();
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    function drawRakeSand(x, y) {
        const color = getSandColor();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        // Draw rake lines
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(x - 20 + i * 10, y - 20);
            ctx.lineTo(x - 20 + i * 10, y + 20);
            ctx.stroke();
        }
    }
    
    function drawSpraySand(x, y) {
        const color = getSandColor();
        for (let i = 0; i < 20; i++) {
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            const alpha = Math.random() * 0.8;
            
            ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.fillRect(x + offsetX, y + offsetY, 3, 3);
        }
    }
    
    function getSandColor() {
        switch (gameState.currentColor) {
            case 'gold':
                return `rgba(${255 + Math.random() * 20 - 10}, ${215 + Math.random() * 20 - 10}, 0, 0.8)`;
            case 'silver':
                return `rgba(${192 + Math.random() * 20 - 10}, ${192 + Math.random() * 20 - 10}, ${192 + Math.random() * 20 - 10}, 0.8)`;
            case 'copper':
                return `rgba(${184 + Math.random() * 20 - 10}, ${115 + Math.random() * 20 - 10}, ${51 + Math.random() * 20 - 10}, 0.8)`;
            case 'rainbow':
                const hue = Math.random() * 360;
                return `hsla(${hue}, 70%, 60%, 0.8)`;
            default:
                return 'rgba(255, 215, 0, 0.8)';
        }
    }
    
    function stopSandDrawing() {
        gameState.isDrawing = false;
    }
    
    function toggleWindEffect() {
        if (gameState.isWindEffect) {
            stopWindEffect();
        } else {
            startWindEffect();
        }
    }
    
    function startWindEffect() {
        gameState.isWindEffect = true;
        windEffect.textContent = 'Stop Wind';
        windEffect.style.background = 'linear-gradient(45deg, #ff6b6b, #ffa500)';
        
        gameState.windInterval = setInterval(() => {
            // Create wind effect by shifting sand particles
            const imageData = ctx.getImageData(0, 0, sandCanvas.width, sandCanvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) { // If pixel has alpha
                    // Slightly shift sand particles
                    if (Math.random() < 0.1) {
                        data[i + 3] *= 0.95; // Fade slightly
                    }
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
        }, 100);
    }
    
    function stopWindEffect() {
        gameState.isWindEffect = false;
        windEffect.textContent = 'Wind Effect';
        windEffect.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
        
        if (gameState.windInterval) {
            clearInterval(gameState.windInterval);
            gameState.windInterval = null;
        }
    }
    
    function saveSandArt() {
        const link = document.createElement('a');
        link.download = 'sand-art.png';
        link.href = sandCanvas.toDataURL();
        link.click();
    }
    
    function updateSandTimer() {
        if (!gameState.startTime) return;
        
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        sandDrawingTime.textContent = elapsed;
    }
    
    function stopSandDrawingGame() {
        if (gameState.timeInterval) {
            clearInterval(gameState.timeInterval);
        }
        if (gameState.windInterval) {
            clearInterval(gameState.windInterval);
        }
    }
}

// Export app for potential backend integration
window.SPYDER = app;
