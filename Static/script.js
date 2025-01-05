// Initialize dummy data
const dummyTickets = [
    { id: "TK001", created: "2025-01-03", status: "open", title: "Python Assignment Help" },
    { id: "TK002", created: "2025-01-02", status: "resolved", title: "Stats Quiz Issue" },
    { id: "TK003", created: "2025-01-01", status: "pending", title: "Payment Confirmation" }
];

// DOM Elements
const ticketsList = document.getElementById('tickets-list');
const userManual = document.getElementById('user-manual');
const ticketForm = document.getElementById('ticket-form');
const incidentForm = document.getElementById('incident-form');
const raiseTicketBtn = document.getElementById('raise-ticket');
const raiseIncidentBtn = document.getElementById('raise-incident');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Display tickets in sidebar
function displayTickets() {
    ticketsList.innerHTML = dummyTickets.map(ticket => `
        <div class="ticket-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-weight: 500;">${ticket.id}</span>
                <span class="status ${ticket.status.toLowerCase()}">${ticket.status}</span>
            </div>
            <div style="font-size: 0.875rem; color: var(--secondary-color);">${ticket.title}</div>
            <div style="font-size: 0.75rem; color: var(--secondary-color); margin-top: 0.5rem;">
                ${new Date(ticket.created).toLocaleDateString()}
            </div>
        </div>
    `).join('');
}

// Show/Hide forms with animations
// Show/Hide forms with animations
function hideAllForms() {
    const forms = [ticketForm, incidentForm];
    forms.forEach(form => {
        if (!form.classList.contains('hidden')) {
            form.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                form.classList.add('hidden');
            }, 300);
        }
    });
}

function showTicketForm() {
    // First hide any visible forms including incident form
    hideAllForms();
    
    // Then hide the user manual if visible
    if (!userManual.classList.contains('hidden')) {
        userManual.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            userManual.classList.add('hidden');
        }, 300);
    }
    
    // Finally show the ticket form
    setTimeout(() => {
        ticketForm.classList.remove('hidden');
        ticketForm.style.animation = 'slideIn 0.3s ease-out';
    }, 300);
}

function showIncidentForm() {
    // First hide any visible forms including ticket form
    hideAllForms();
    
    // Then hide the user manual if visible
    if (!userManual.classList.contains('hidden')) {
        userManual.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            userManual.classList.add('hidden');
        }, 300);
    }
    
    // Finally show the incident form
    setTimeout(() => {
        incidentForm.classList.remove('hidden');
        incidentForm.style.animation = 'slideIn 0.3s ease-out';
    }, 300);
}

function showUserManual() {
    // Hide all forms first
    hideAllForms();
    
    // Then show the user manual
    setTimeout(() => {
        userManual.classList.remove('hidden');
        userManual.style.animation = 'fadeIn 0.3s ease-out';
    }, 300);
}
// Button click handlers
raiseTicketBtn.addEventListener('click', showTicketForm);
raiseIncidentBtn.addEventListener('click', showIncidentForm);

// File upload handlers
function handleFileUpload(input, nameElement) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const file = input.files[0];
    
    if (file) {
        if (file.size > maxSize) {
            showNotification('File size should not exceed 5MB', 'error');
            input.value = '';
            nameElement.textContent = '';
            return;
        }
        nameElement.textContent = file.name;
    } else {
        nameElement.textContent = '';
    }
}

document.getElementById('attachment').addEventListener('change', function() {
    handleFileUpload(this, document.getElementById('file-name'));
});

document.getElementById('incident-attachment').addEventListener('change', function() {
    handleFileUpload(this, document.getElementById('incident-file-name'));
});

// Form submissions with proper reset and animation
function handleFormSubmission(e, formType) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTicket = {
        id: `${formType}${String(dummyTickets.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        status: 'pending',
        title: formData.get('description').slice(0, 50) + '...'
    };
    
    // Add new ticket to the list
    dummyTickets.unshift(newTicket);
    displayTickets();
    
    // Reset the form
    e.target.reset();
    
    // Reset file upload display
    const fileNameElement = document.getElementById(formType === 'TK' ? 'file-name' : 'incident-file-name');
    if (fileNameElement) {
        fileNameElement.textContent = '';
    }
    
    // Show success notification
    showNotification('Your ticket has been submitted successfully', 'success');
    
    // Animate form out and welcome screen in
    const currentForm = document.querySelector('.form-container:not(.hidden)');
    if (currentForm) {
        currentForm.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            currentForm.classList.add('hidden');
            userManual.classList.remove('hidden');
            userManual.style.animation = 'fadeIn 0.3s ease-out';
        }, 300);
    }
}

// Attach form submission handlers
document.querySelector('#ticket-form form').addEventListener('submit', e => handleFormSubmission(e, 'TK'));
document.querySelector('#incident-form form').addEventListener('submit', e => handleFormSubmission(e, 'IN'));

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background-color: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(100px);
        transition: transform 0.3s ease-out;
        z-index: 1000;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
displayTickets();