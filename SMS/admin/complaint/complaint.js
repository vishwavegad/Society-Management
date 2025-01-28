// Sample complaints data
const complaints = [
    {
        id: "COMP001",
        resident: "John Doe",
        unit: "A-101",
        date: "2025-01-25",
        category: "Maintenance",
        description: "Water leakage in bathroom",
        status: "pending"
    },
    {
        id: "COMP002",
        resident: "Jane Smith",
        unit: "B-205",
        date: "2025-01-26",
        category: "Security",
        description: "Main gate intercom not working",
        status: "inprogress"
    },
    {
        id: "COMP003",
        resident: "Mike Johnson",
        unit: "C-304",
        date: "2025-01-27",
        category: "Noise",
        description: "Loud construction noise after hours",
        status: "resolved"
    }
];

// DOM Elements
const complaintsList = document.getElementById('complaintsList');
const statusModal = document.getElementById('statusModal');
const closeModal = document.getElementById('closeModal');
const statusSelect = document.getElementById('statusSelect');
const saveStatus = document.getElementById('saveStatus');
let currentComplaintId = null;

// Render complaints
function renderComplaints() {
    complaintsList.innerHTML = '';
    complaints.forEach(complaint => {
        const card = createComplaintCard(complaint);
        complaintsList.appendChild(card);
    });
}

// Create complaint card
function createComplaintCard(complaint) {
    const card = document.createElement('div');
    card.className = 'complaint-card';
    card.innerHTML = `
        <div class="complaint-header">
            <span class="complaint-id">${complaint.id}</span>
            <span class="complaint-status status-${complaint.status}">${complaint.status.toUpperCase()}</span>
        </div>
        <div class="complaint-details">
            <p class="complaint-info"><strong>Resident:</strong> ${complaint.resident}</p>
            <p class="complaint-info"><strong>Unit:</strong> ${complaint.unit}</p>
            <p class="complaint-info"><strong>Date:</strong> ${complaint.date}</p>
            <p class="complaint-info"><strong>Category:</strong> ${complaint.category}</p>
            <p class="complaint-info"><strong>Description:</strong> ${complaint.description}</p>
        </div>
        <div class="complaint-actions">
            <button class="action-button update-status" onclick="openStatusModal('${complaint.id}')">Update Status</button>
            <button class="action-button delete-complaint" onclick="deleteComplaint('${complaint.id}')">Delete</button>
        </div>
    `;
    return card;
}

// Open status modal
function openStatusModal(complaintId) {
    currentComplaintId = complaintId;
    const complaint = complaints.find(c => c.id === complaintId);
    statusSelect.value = complaint.status;
    statusModal.style.display = 'flex';
}

// Close status modal
function closeStatusModal() {
    statusModal.style.display = 'none';
    currentComplaintId = null;
}

// Update complaint status
function updateComplaintStatus() {
    if (currentComplaintId) {
        const complaint = complaints.find(c => c.id === currentComplaintId);
        complaint.status = statusSelect.value;
        renderComplaints();
        closeStatusModal();
    }
}

// Delete complaint
function deleteComplaint(complaintId) {
    if (confirm('Are you sure you want to delete this complaint?')) {
        const index = complaints.findIndex(c => c.id === complaintId);
        if (index !== -1) {
            complaints.splice(index, 1);
            renderComplaints();
        }
    }
}

// Event listeners
closeModal.addEventListener('click', closeStatusModal);
saveStatus.addEventListener('click', updateComplaintStatus);
window.addEventListener('click', (event) => {
    if (event.target === statusModal) {
        closeStatusModal();
    }
});

// Initial render
renderComplaints();
