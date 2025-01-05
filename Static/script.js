// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Sample ticket data with doubt descriptions
const tickets = [
    { 
        id: "TKT-001", 
        priority: "P1", 
        course: "Python", 
        status: "open",
        doubt: "I'm having trouble understanding list comprehensions in Python. When I try to use nested if conditions, it doesn't work as expected. Here's my code: [x for x in range(10) if x > 5 if x < 8]. Can you help explain where I'm going wrong?",
        attachments: ["code-snippet.py"]
    },
    { 
        id: "TKT-002", 
        priority: "P2", 
        course: "Statistics", 
        status: "in-progress",
        doubt: "Could you explain the difference between population variance and sample variance? I'm confused about when to use n-1 in the denominator.",
        attachments: []
    },
    { 
        id: "TKT-003", 
        priority: "P1", 
        course: "Mathematics", 
        status: "resolved",
        doubt: "In linear algebra, I'm struggling with eigenvalue calculations. How do we determine if a matrix is diagonalizable?",
        attachments: ["matrix.jpg"]
    }
];

// Filter functionality
const filterBtn = document.getElementById('filterBtn');
const filterPanel = document.getElementById('filterPanel');

filterBtn.addEventListener('click', () => {
    filterPanel.classList.toggle('active');
});

// Apply filters
document.querySelector('.apply-filters').addEventListener('click', () => {
    const selectedPriorities = [...document.querySelectorAll('.filter-section input[type="checkbox"]:checked')]
        .map(checkbox => checkbox.value);
    
    const filteredTickets = tickets.filter(ticket => {
        const priorityMatch = selectedPriorities.length === 0 || selectedPriorities.includes(ticket.priority.toLowerCase());
        // Add more filter conditions as needed
        return priorityMatch;
    });

    renderTickets(filteredTickets);
    filterPanel.classList.remove('active');
});

// Render tickets
function renderTickets(ticketsToRender) {
    const ticketsList = document.getElementById('ticketsList');
    ticketsList.innerHTML = '';

    ticketsToRender.forEach(ticket => {
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket-row';
        ticketElement.innerHTML = `
            <div class="table-column">${ticket.id}</div>
            <div class="table-column">${ticket.priority}</div>
            <div class="table-column">${ticket.course}</div>
            <div class="table-column">
                <span class="status-badge status-${ticket.status}">${ticket.status}</span>
            </div>
        `;

        ticketElement.addEventListener('click', () => openReplyModal(ticket));
        ticketsList.appendChild(ticketElement);
    });
}

// Modal functionality
const modal = document.getElementById('replyModal');
const closeModal = document.querySelector('.close-modal');
let currentTicket = null;

function openReplyModal(ticket) {
    currentTicket = ticket;
    modal.classList.add('active');
    document.getElementById('ticketId').textContent = ticket.id;
    
    // Update doubt description
    document.querySelector('.ticket-query').textContent = ticket.doubt;
    
    // Update attachments
    const attachmentsContainer = document.querySelector('.attachments');
    attachmentsContainer.innerHTML = '';
    
    if (ticket.attachments && ticket.attachments.length > 0) {
        const attachmentsList = document.createElement('div');
        attachmentsList.classList.add('attachments-list');
        
        ticket.attachments.forEach(attachment => {
            const attachmentItem = document.createElement('div');
            attachmentItem.classList.add('attachment-item');
            attachmentItem.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                </svg>
                <span>${attachment}</span>
            `;
            attachmentsList.appendChild(attachmentItem);
        });
        
        attachmentsContainer.appendChild(attachmentsList);
    }
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    currentTicket = null;
});

// Submit reply
document.querySelector('.submit-reply').addEventListener('click', () => {
    const replyText = document.getElementById('replyText').value;
    if (!replyText.trim()) return;

    // Update ticket status
    if (currentTicket) {
        currentTicket.status = 'resolved';
        renderTickets(tickets);
    }

    // Clear and close modal
    document.getElementById('replyText').value = '';
    modal.classList.remove('active');
});

// Initial render
renderTickets(tickets);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add navigation logic here
        console.log(`Navigating to ${button.textContent}`);
    });
});

// Notification system (sample)
function updateNotifications(count) {
    const badge = document.querySelector('.badge');
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
}

// Update notifications periodically (sample)
setInterval(() => {
    const randomCount = Math.floor(Math.random() * 5);
    updateNotifications(randomCount);
}, 30000);