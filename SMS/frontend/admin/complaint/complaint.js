// DOM Elements
const complaintsList = document.getElementById('complaintsList');
const statusModal = document.getElementById('statusModal');
const closeModal = document.getElementById('closeModal');
const statusSelect = document.getElementById('statusSelect');
const saveStatus = document.getElementById('saveStatus');
let currentComplaintId = null;

let complaints = [];
async function  fetchComplaints(){
    try{
        const response = await fetch("http://localhost:3000/api/complaints", {
            method: "GET"
        })
        if(!response.ok){
            throw new Error("Failed to fetch comaplaints");
        }
        complaints = await response.json();
        renderComplaints(complaints);
    } catch(error){
        console.error("Error fetching complaints: ", error);
        alert("Failed to load complaints.");
    }
}

// Render complaints
function renderComplaints(complaints) {
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
            <span class="complaint-id">${complaint._id}</span>
            <span class="complaint-status status-${complaint.status}">${complaint.status.toUpperCase()}</span>
        </div>
        <div class="complaint-details">
            <p class="complaint-info"><strong>Resident:</strong> ${complaint.username||"Unknown"}</p>
            <p class="complaint-info"><strong>Unit:</strong> ${complaint.flatNum}</p>
            <p class="complaint-info"><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
            <p class="complaint-info"><strong>Category:</strong> ${complaint.complaintType}</p>
            <p class="complaint-info"><strong>Description:</strong> ${complaint.complaint}</p>
        </div>
        <div class="complaint-actions">
            <button class="action-button update-status" onclick="openStatusModal('${complaint._id}', '${complaint.status}')">Update Status</button>
            <button class="action-button delete-complaint" onclick="deleteComplaint('${complaint._id}')">Delete</button>
        </div>
    `;
    return card;
}

// Open status modal
function openStatusModal(complaintId) {
    currentComplaintId = complaintId;
    const complaint = complaints.find(c => c._id === complaintId);
    if(!complaint){
        alert("Complaint not found");
        console.error("Complaint ID not found in array:", complaintId, complaints);

        return;
    }
    statusSelect.value = complaint.status;
    statusModal.style.display = 'flex';
}

// Close status modal
function closeStatusModal() {
    statusModal.style.display = 'none';
    currentComplaintId = null;
}

// Update complaint status
async function updateComplaintStatus() {
    if (!currentComplaintId) {
        console.error("No complaint ID found");
        alert("Error: No complaint selected.");
        return;
    }
    const newStatus = statusSelect.value.trim();
    console.log("Selected status:", statusSelect.value);

    console.log("Updating status Id: ", currentComplaintId, "with status: ", newStatus);
    try{
        const response = await fetch(`http://localhost:3000/api/complaints/${currentComplaintId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: newStatus})
        })
        if(!response.ok){
            const errorData = await response.json();
            console.error("Server response: ", errorData);
            throw new Error("Failed to update status");
        }
        alert("Complaint status updated successfully");
        closeStatusModal();
        fetchComplaints();
    } catch(error){
        console.error("Error updating status: ", error);
        alert("Failed to update complaint status.");
    }   
}

// Delete complaint
async function deleteComplaint(complaintId) {
    if (!confirm('Are you sure you want to delete this complaint?')) {
        return;
    }
    console.log("Deleting complaint with ID:", complaintId);

    try{
        const response = await fetch(`http://localhost:3000/api/complaints/${complaintId}`, {
            method: "DELETE"
        })
        if(!response.ok){
            throw new Error("Failed to delete complaint");
        }
        alert("Complaint deleted successfully");
        fetchComplaints();
    } catch(error){
        console.error("Error deleting complaint: ", error);
        alert("Failed to delete complaint")
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
fetchComplaints();
