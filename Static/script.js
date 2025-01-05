// Enhanced Student Data with Online Status and More Details
const studentsData = [
    {
        id: 1,
        name: "Priya Sharma",
        term: "2024",
        subjects: ["Python", "Statistics", "Mathematics"],
        isTA: true,
        taSubject: "Python",
        linkedin: "linkedin.com/in/priya-sharma",
        avatar: "user3.png",
        isOnline: true,
        lastSeen: "Now",
        specialization: "Data Science",
        bio: "Passionate about teaching Python and helping peers learn programming concepts."
    },
    {
        id: 2,
        name: "Rahul Kumar",
        term: "2024",
        subjects: ["Machine Learning", "Deep Learning"],
        isTA: false,
        linkedin: "linkedin.com/in/rahul-kumar",
        avatar: "user2.png",
        isOnline: false,
        lastSeen: "2 hours ago",
        specialization: "AI & ML",
        bio: "Working on deep learning projects and interested in neural networks."
    },
    {
        id: 3,
        name: "Amit Patel",
        term: "2023",
        subjects: ["Web Development", "Database Systems"],
        isTA: true,
        taSubject: "Web Development",
        linkedin: "linkedin.com/in/amit-patel",
        avatar: "user2.png",
        isOnline: true,
        lastSeen: "Now",
        specialization: "Web Technologies",
        bio: "Full stack developer and teaching assistant for web development courses."
    },
    {
        id: 4,
        name: "Sneha Reddy",
        term: "2024",
        subjects: ["Data Structures", "Algorithms"],
        isTA: false,
        linkedin: "linkedin.com/in/sneha-reddy",
        avatar: "user3.png",
        isOnline: true,
        lastSeen: "Now",
        specialization: "Programming",
        bio: "Competitive programmer and algorithmic problem-solving enthusiast."
    },
    {
        id: 5,
        name: "Vikram Singh",
        image: "/api/placeholder/150/150",
        term: "2024",
        subjects: ["Computer Networks", "System Design"],
        isTA: true,
        taSubject: "Computer Networks",
        linkedin: "linkedin.com/in/vikram-singh",
        avatar: "user2.png",
        isOnline: false,
        lastSeen: "1 day ago",
        specialization: "System Architecture",
        bio: "Network security enthusiast and system design expert."
    }
];

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    setupFilters();
    renderStudents();
});

// View Toggle and Filter Setup
const toggleBtns = document.querySelectorAll('.toggle-btn');
const studentsContainer = document.getElementById('studentsContainer');
const filterContainer = document.getElementById('filterContainer');
let currentView = 'classmates';

function setupFilters() {
    const filters = currentView === 'all-students' ? `
        <select class="filter-select term-filter">
            <option value="">All Terms</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
        </select>
        <select class="filter-select specialization-filter">
            <option value="">All Specializations</option>
            <option value="Data Science">Data Science</option>
            <option value="AI & ML">AI & ML</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Programming">Programming</option>
            <option value="System Architecture">System Architecture</option>
        </select>
        <select class="filter-select status-filter">
            <option value="">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </select>
    ` : '';
    
    filterContainer.innerHTML = filters;
    
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', renderStudents);
    });
}

// Toggle View Functionality
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        setupFilters();
        renderStudents();
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', renderStudents);

// Render Students
function renderStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const termFilter = document.querySelector('.term-filter')?.value || '';
    const specializationFilter = document.querySelector('.specialization-filter')?.value || '';
    const statusFilter = document.querySelector('.status-filter')?.value || '';

    let filteredStudents = studentsData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.specialization.toLowerCase().includes(searchTerm) ||
                            student.subjects.some(sub => sub.toLowerCase().includes(searchTerm));
        const matchesTerm = !termFilter || student.term === termFilter;
        const matchesSpecialization = !specializationFilter || student.specialization === specializationFilter;
        const matchesStatus = !statusFilter || 
                            (statusFilter === 'online' && student.isOnline) ||
                            (statusFilter === 'offline' && !student.isOnline);
        
        if (currentView === 'classmates') {
            return matchesSearch && student.term === '2024';
        }
        return matchesSearch && matchesTerm && matchesSpecialization && matchesStatus;
    });

    studentsContainer.innerHTML = filteredStudents.map(student => createStudentCard(student)).join('');
    addCardEventListeners();
}

// Create Student Card
function createStudentCard(student) {
    return `
        <div class="student-card" data-id="${student.id}">
            <div class="online-indicator ${student.isOnline ? 'online' : 'offline'}"></div>
            <div class="student-header">
                <div class="student-avatar">
                    <img src="${student.avatar}" alt="${student.name}" class="avatar-image">
                </div>
                <div class="student-info">
                    <h3>${student.name}</h3>
                    <p class="term">Term: ${student.term}</p>
                    ${student.isTA ? `<span class="ta-badge">TA - ${student.taSubject}</span>` : ''}
                    <p class="specialization">${student.specialization}</p>
                </div>
            </div>
            <p class="student-bio">${student.bio}</p>
            <div class="student-subjects">
                ${student.subjects.map(subject => `<span class="subject-tag">${subject}</span>`).join('')}
            </div>
            <div class="last-seen">
                ${student.isOnline ? '<span class="online-text">Online Now</span>' : `Last seen: ${student.lastSeen}`}
            </div>
            <div class="connect-buttons">
                <button class="connect-btn chat-btn" data-student-id="${student.id}">
                    <i class="fas fa-comment"></i> Chat
                </button>
                <button class="connect-btn linkedin-btn" data-student-id="${student.id}">
                    <i class="fab fa-linkedin"></i>
                </button>
            </div>
        </div>
    `;
}

// Chat Modal Functionality
const chatModal = document.getElementById('chatModal');
const chatInterface = document.getElementById('chatInterface');
const closeModals = document.querySelectorAll('.close-modal');
const studentNameSpan = document.getElementById('studentName');
const chatUserName = document.getElementById('chatUserName');
const modalOnlineStatus = document.getElementById('modalOnlineStatus');
let currentStudentId = null;

function addCardEventListeners() {
    const chatBtns = document.querySelectorAll('.chat-btn');
    const linkedinBtns = document.querySelectorAll('.linkedin-btn');

    chatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.target.closest('.chat-btn').dataset.studentId;
            openChatModal(studentId);
        });
    });

    linkedinBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.target.closest('.linkedin-btn').dataset.studentId;
            const student = studentsData.find(s => s.id === parseInt(studentId));
            window.open(student.linkedin, '_blank');
        });
    });
}

function openChatModal(studentId) {
    currentStudentId = studentId;
    const student = studentsData.find(s => s.id === parseInt(studentId));
    studentNameSpan.textContent = student.name;
    
    modalOnlineStatus.innerHTML = `
        <div class="modal-online-status">
            <span class="status-indicator ${student.isOnline ? 'online' : 'offline'}"></span>
            <span class="status-text">${student.isOnline ? 'Online Now' : `Last seen: ${student.lastSeen}`}</span>
        </div>
    `;
    
    chatModal.style.display = 'block';
}

// Chat Interface Functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.querySelector('.chat-input');
const sendMessageBtn = document.querySelector('.send-message-btn');
const meetRequestBtn = document.querySelector('.meet-request-btn');

let chatHistory = {};

function initializeChat(studentId) {
    const student = studentsData.find(s => s.id === parseInt(studentId));
    chatUserName.textContent = student.name;
    chatInterface.style.display = 'block';
    chatModal.style.display = 'none';
    
    if (!chatHistory[studentId]) {
        chatHistory[studentId] = [];
    }
    renderChatMessages(studentId);
}

function renderChatMessages(studentId) {
    const messages = chatHistory[studentId];
    chatMessages.innerHTML = messages.map(msg => `
        <div class="chat-message ${msg.sender === 'user' ? 'user-message' : 'student-message'}">
            <div class="message-content">${msg.content}</div>
            <div class="message-time">${msg.time}</div>
        </div>
    `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage(content, studentId) {
    const newMessage = {
        content,
        sender: 'user',
        time: new Date().toLocaleTimeString()
    };
    chatHistory[studentId].push(newMessage);
    renderChatMessages(studentId);
    chatInput.value = '';
}

// Event Listeners for Chat Interface
sendMessageBtn.addEventListener('click', () => {
    const content = chatInput.value.trim();
    if (content) {
        sendMessage(content, currentStudentId);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const content = chatInput.value.trim();
        if (content) {
            sendMessage(content, currentStudentId);
        }
    }
});

meetRequestBtn.addEventListener('click', () => {
    const student = studentsData.find(s => s.id === parseInt(currentStudentId));
    sendMessage(`Meeting request sent to ${student.name}`, currentStudentId);
});

// Close Modal Functionality
closeModals.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        chatModal.style.display = 'none';
        chatInterface.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.style.display = 'none';
    }
    if (e.target === chatInterface) {
        chatInterface.style.display = 'none';
    }
});

// Send Chat Request
const sendRequestBtn = document.querySelector('.send-request-btn');
const connectionMessage = document.querySelector('.connection-message');

sendRequestBtn.addEventListener('click', () => {
    const student = studentsData.find(s => s.id === parseInt(currentStudentId));
    const message = connectionMessage.value.trim();
    
    if (message) {
        chatHistory[currentStudentId] = [{
            content: message,
            sender: 'user',
            time: new Date().toLocaleTimeString()
        }];
        
        // Simulate accepted request
        setTimeout(() => {
            initializeChat(currentStudentId);
        }, 1000);
        
        chatModal.style.display = 'none';
        connectionMessage.value = '';
    } else {
        alert('Please add a message to introduce yourself!');
    }
});