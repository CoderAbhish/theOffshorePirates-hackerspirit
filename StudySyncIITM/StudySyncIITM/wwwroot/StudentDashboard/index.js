// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Progress Chart
const ctx = document.getElementById('progressChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Web Dev', 'Database', 'AI'],
        datasets: [{
            data: [75, 68, 90],
            backgroundColor: ['#4a90e2', '#50c878', '#ff6b6b'],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: getComputedStyle(document.body).getPropertyValue('--text-primary')
                }
            }
        }
    }
});

// Chatbot Functionality
const chatbot = document.getElementById('chatbot');
const chatbotToggle = chatbot.querySelector('.chatbot-toggle');
const chatbotContainer = chatbot.querySelector('.chatbot-container');
const chatbotClose = chatbot.querySelector('.close-btn');
const chatbotInput = chatbot.querySelector('.chatbot-input');
const chatbotMessages = chatbot.querySelector('.chatbot-messages');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.remove('hidden');
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.add('hidden');
});

// Send message when "Enter" key is pressed
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatbotInput.value.trim()) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = chatbotInput.value;
        chatbotMessages.appendChild(userMessage);
        chatbotInput.value = ''; // Clear input field

        // Simulate NAVI response after a delay
        setTimeout(() => {
            const naviResponse = document.createElement('div');
            naviResponse.className = 'message navi-message';
            naviResponse.textContent = "I'm here to help! How can I assist you?";
            chatbotMessages.appendChild(naviResponse);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
        }, 1000);
    }
});

// Countdown Timers
function updateCountdowns() {
    document.querySelectorAll('.countdown').forEach(countdown => {
        const targetDate = new Date(countdown.dataset.date);
        const now = new Date();
        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        countdown.textContent = `${days}d ${hours}h remaining`;
    });
}

setInterval(updateCountdowns, 1000 * 60); // Update every minute
updateCountdowns(); // Initial update
