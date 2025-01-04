// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Navigation Button Functionality
const homeBtn = document.querySelector('.home-btn');
const ticketBtn = document.querySelector('.ticket-btn');
const peerBtn = document.querySelector('.peer-btn');
const logoutBtn = document.querySelector('.login-btn');

// Example navigation handlers
homeBtn.addEventListener('click', () => {
    console.log('Navigating to home...');
    // Add your home navigation logic here
});

ticketBtn.addEventListener('click', () => {
    console.log('Navigating to tickets...');
    // Add your tickets navigation logic here
});

peerBtn.addEventListener('click', () => {
    console.log('Navigating to peer connect...');
    // Add your peer connect navigation logic here
});

logoutBtn.addEventListener('click', () => {
    console.log('Logging out...');
    // Add your logout logic here
});

// Notification Badge Functionality
const notificationBtn = document.querySelector('.notification-badge .nav-btn');
const badge = document.querySelector('.badge');
let notificationCount = parseInt(badge.textContent);

notificationBtn.addEventListener('click', () => {
    console.log('Opening notifications...');
    // Add your notification display logic here
    
    // Example: Clear notifications when clicked
    notificationCount = 0;
    updateNotificationBadge();
});

function updateNotificationBadge() {
    badge.textContent = notificationCount;
    badge.style.display = notificationCount > 0 ? 'block' : 'none';
}

// Example function to add a new notification
function addNotification() {
    notificationCount++;
    updateNotificationBadge();
}

// Timeline Interaction
const milestones = document.querySelectorAll('.milestone');
const timelineContainer = document.querySelector('.timeline-container');

// Helper function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const containerRect = timelineContainer.getBoundingClientRect();
    
    return (
        rect.top >= containerRect.top &&
        rect.bottom <= containerRect.bottom
    );
}

// Update active milestone based on scroll position
function updateActiveMilestones() {
    milestones.forEach(milestone => {
        if (isInViewport(milestone)) {
            milestone.classList.add('active');
        } else {
            milestone.classList.remove('active');
        }
    });
}

// Add scroll event listener
timelineContainer.addEventListener('scroll', updateActiveMilestones);

// Initial update
updateActiveMilestones();

// Update current progress based on date
function updateProgress() {
    const startDate = new Date('2025-02-01'); // Example start date
    const endDate = new Date('2025-04-30');   // Example end date
    const currentDate = new Date();
    
    const totalDuration = endDate - startDate;
    const currentProgress = currentDate - startDate;
    const progressPercentage = Math.min(Math.max((currentProgress / totalDuration) * 100, 0), 100);
    
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.background = `linear-gradient(
        to bottom,
        var(--primary-color) ${progressPercentage}%,
        var(--border-color) ${progressPercentage}%
    )`;
}

// Initial progress update
updateProgress();

// Update progress every hour
setInterval(updateProgress, 3600000);

// Example: Simulate receiving new notifications
function simulateNewNotifications() {
    // Randomly add notifications every 30-60 seconds
    setInterval(() => {
        if (Math.random() > 0.5 && notificationCount < 9) {  // Cap at 9 notifications
            addNotification();
        }
    }, Math.random() * 30000 + 30000);
}
// ai chat bot
// Chat functionality
// Chat functionality
const toggleChat = document.getElementById('toggleChat');
const chatWindow = document.getElementById('chatWindow');
const minimizeChat = document.getElementById('minimizeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

let isChatOpen = false;

// Toggle chat window
toggleChat.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        chatWindow.classList.add('active');
        toggleChat.style.display = 'none'; // Hide the toggle button when chat is open
    } else {
        chatWindow.classList.remove('active');
        toggleChat.style.display = 'block';
    }
});

// Minimize/Close chat window
minimizeChat.addEventListener('click', () => {
    isChatOpen = false;
    chatWindow.classList.remove('active');
    toggleChat.style.display = 'block'; // Show the toggle button when chat is closed
});

// Close chat if clicked outside
document.addEventListener('click', (e) => {
    if (isChatOpen && 
        !chatWindow.contains(e.target) && 
        !toggleChat.contains(e.target)) {
        isChatOpen = false;
        chatWindow.classList.remove('active');
        toggleChat.style.display = 'block';
    }
});

// Prevent chat window from closing when clicked inside
chatWindow.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Auto-resize textarea
chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    // Limit to 4 rows
    if (this.scrollHeight > 120) {
        this.style.height = '120px';
    }
});

// Send message function
function sendUserMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show bot is typing
        showTypingIndicator();
        
        // Simulate bot response after delay
        setTimeout(() => {
            removeTypingIndicator();
            addMessage('This is a demo response from the AI assistant.', 'bot');
        }, 1500);
    }
}

// Send message on button click
sendMessage.addEventListener('click', sendUserMessage);

// Send message on Enter (but allow new lines with Shift+Enter)
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
    }
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${text}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator-container');
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator-container');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Start simulation
simulateNewNotifications();