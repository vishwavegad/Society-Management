const paymentData = [
    { unitNo: "A-101", owner: "Rahul Sharma", amount: 2500, status: "paid", dueDate: "2025-02-15", paymentDate: "2025-02-10" },
    { unitNo: "A-102", owner: "Priya Singh", amount: 2500, status: "paid", dueDate: "2025-02-15", paymentDate: "2025-02-12" },
    { unitNo: "A-103", owner: "Amit Kumar", amount: 2500, status: "pending", dueDate: "2025-02-15", paymentDate: null },
    { unitNo: "B-201", owner: "Sneha Patel", amount: 3000, status: "paid", dueDate: "2025-02-15", paymentDate: "2025-02-01" },
    { unitNo: "B-202", owner: "Vijay Mehta", amount: 3000, status: "overdue", dueDate: "2025-01-15", paymentDate: null },
    { unitNo: "B-203", owner: "Ananya Gupta", amount: 3000, status: "pending", dueDate: "2025-02-15", paymentDate: null },
    { unitNo: "C-301", owner: "Rajesh Khanna", amount: 3500, status: "paid", dueDate: "2025-02-15", paymentDate: "2025-02-08" },
    { unitNo: "C-302", owner: "Meera Desai", amount: 3500, status: "overdue", dueDate: "2025-01-15", paymentDate: null }
];

const paymentTable = document.getElementById('payment-list');
const filterStatus = document.getElementById('filter-status');
const searchUnit = document.getElementById('search-unit');
const addPaymentBtn = document.getElementById('add-payment-btn');
const paymentModal = document.getElementById('payment-modal');
const closeBtn = document.querySelector('.close-btn');
const paymentForm = document.getElementById('payment-form');
const generateReportBtn = document.getElementById('generate-report-btn');
const downloadCsvBtn = document.getElementById('download-csv');

document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
    renderPaymentTable(paymentData);
    
    filterStatus.addEventListener('change', filterPayments);
    searchUnit.addEventListener('input', filterPayments);
    addPaymentBtn.addEventListener('click', openPaymentModal);
    closeBtn.addEventListener('click', closePaymentModal);
    paymentForm.addEventListener('submit', savePayment);
    generateReportBtn.addEventListener('click', generateReport);
    downloadCsvBtn.addEventListener('click', downloadCsv);
    
    window.addEventListener('click', function(event) {
        if (event.target == paymentModal) {
            closePaymentModal();
        }
    });
});

function updateDashboardStats() {
    let totalCollected = 0;
    let totalPending = 0;
    let unitsPaid = 0;
    
    paymentData.forEach(payment => {
        if (payment.status === 'paid') {
            totalCollected += payment.amount;
            unitsPaid++;
        } else {
            totalPending += payment.amount;
        }
    });
    
    document.getElementById('total-collected').textContent = '₹' + totalCollected.toLocaleString();
    document.getElementById('total-pending').textContent = '₹' + totalPending.toLocaleString();
    document.getElementById('units-paid').textContent = unitsPaid + '/' + paymentData.length;
}

function renderPaymentTable(data) {
    paymentTable.innerHTML = '';
    
    if (data.length === 0) {
        paymentTable.innerHTML = '<tr><td colspan="6" style="text-align: center;">No records found</td></tr>';
        return;
    }
    
    data.forEach(payment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${payment.unitNo}</td>
            <td>${payment.owner}</td>
            <td>₹${payment.amount.toLocaleString()}</td>
            <td class="status-${payment.status}">${capitalizeFirstLetter(payment.status)}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td>
                ${payment.status !== 'paid' ? 
                    `<button class="action-btn" onclick="markAsPaid('${payment.unitNo}')">Mark Paid</button>` : 
                    `<button class="action-btn" onclick="viewReceipt('${payment.unitNo}')">Receipt</button>`
                }
            </td>
        `;
        
        paymentTable.appendChild(row);
    });
}

function filterPayments() {
    const statusFilter = filterStatus.value;
    const searchTerm = searchUnit.value.toLowerCase();
    
    const filteredData = paymentData.filter(payment => {
        const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
        const matchesSearch = payment.unitNo.toLowerCase().includes(searchTerm) || 
                            payment.owner.toLowerCase().includes(searchTerm);
        
        return matchesStatus && matchesSearch;
    });
    
    renderPaymentTable(filteredData);
}

function openPaymentModal() {
    paymentModal.style.display = 'block';
    document.getElementById('payment-date').valueAsDate = new Date();
}

function closePaymentModal() {
    paymentModal.style.display = 'none';
    paymentForm.reset();
}

function savePayment(e) {
    e.preventDefault();
    
    const unitNo = document.getElementById('unit-number').value;
    const owner = document.getElementById('owner-name').value;
    const amount = parseInt(document.getElementById('amount').value);
    const paymentDate = document.getElementById('payment-date').value;
    
    const existingPaymentIndex = paymentData.findIndex(p => p.unitNo === unitNo);
    
    if (existingPaymentIndex !== -1){
        paymentData[existingPaymentIndex].status = 'paid';
        paymentData[existingPaymentIndex].paymentDate = paymentDate;
    } else {
        paymentData.push({
            unitNo: unitNo,
            owner: owner,
            amount: amount,
            status: 'paid',
            dueDate: getCurrentMonth15th(),
            paymentDate: paymentDate
        });
    }
   
    updateDashboardStats();
    filterPayments();
    closePaymentModal();
    
    alert(`Payment for Unit ${unitNo} recorded successfully!`);
}

function markAsPaid(unitNo) {
    const paymentIndex = paymentData.findIndex(p => p.unitNo === unitNo);
    
    if (paymentIndex !== -1) {
        paymentData[paymentIndex].status = 'paid';
        paymentData[paymentIndex].paymentDate = formatDateForInput(new Date());
        
        updateDashboardStats();
        filterPayments();
        
        alert(`Payment for Unit ${unitNo} marked as paid!`);
    }
}

function viewReceipt(unitNo) {
    const payment = paymentData.find(p => p.unitNo === unitNo);
    
    if (payment) {
        alert(`Receipt for Unit ${payment.unitNo}\nOwner: ${payment.owner}\nAmount: ₹${payment.amount}\nPayment Date: ${formatDate(payment.paymentDate)}\nStatus: Paid\n\nThank you for your payment!`);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function getCurrentMonth15th() {
    const date = new Date();
    date.setDate(15);
    return formatDateForInput(date);
}