// Elements
const paymentTable = document.getElementById("payment-list");
const filterStatus = document.getElementById("filter-status");
const searchUnit = document.getElementById("search-unit");
const addPaymentBtn = document.getElementById("add-payment-btn");
const paymentModal = document.getElementById("payment-modal");
const closeBtn = document.querySelector(".close-btn");
const paymentForm = document.getElementById("payment-form");
const generateReportBtn = document.getElementById("generate-report-btn");
const downloadCsvBtn = document.getElementById("download-csv");

let paymentData = [];

// Init
document.addEventListener("DOMContentLoaded", function () {
  loadPayments();
  filterStatus.addEventListener("change", filterPayments);
  searchUnit.addEventListener("input", filterPayments);
  addPaymentBtn.addEventListener("click", openPaymentModal);
  closeBtn.addEventListener("click", closePaymentModal);
  paymentForm.addEventListener("submit", savePayment);
  generateReportBtn.addEventListener("click", generateReport);
  downloadCsvBtn.addEventListener("click", downloadCsv);
  window.addEventListener("click", function (event) {
    if (event.target == paymentModal) {
      closePaymentModal();
    }
  });
});

async function loadPayments() {
  try {
    const res = await fetch("http://localhost:3000/api/maintenance");
    const data = await res.json();
    paymentData = data.map((p) => ({
      id: p._id,
      unitNo: p.flatNum,
      owner: p.name,
      amount: p.amount,
      status: p.paymentStatus.toLowerCase(),
      dueDate: p.timestamp,
      paymentDate: p.updatedAt || p.timestamp,
    }));
    updateDashboardStats();
    renderPaymentTable(paymentData);
  } catch (err) {
    console.error("Failed to fetch payments:", err);
    alert("Failed to load payments.");
  }
}

function updateDashboardStats() {
  let totalCollected = 0;
  let totalPending = 0;
  let unitsPaid = 0;

  paymentData.forEach((payment) => {
    if (payment.status === "paid") {
      totalCollected += payment.amount;
      unitsPaid++;
    } else {
      totalPending += payment.amount;
    }
  });

  document.getElementById("total-collected").textContent =
    "₹" + totalCollected.toLocaleString();
  document.getElementById("total-pending").textContent =
    "₹" + totalPending.toLocaleString();
  document.getElementById(
    "units-paid"
  ).textContent = `${unitsPaid}/${paymentData.length}`;
}

function renderPaymentTable(data) {
  paymentTable.innerHTML = "";
  if (data.length === 0) {
    paymentTable.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">No records found</td></tr>';
    return;
  }

  data.forEach((payment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${payment.unitNo}</td>
      <td>${payment.owner}</td>
      <td>₹${payment.amount.toLocaleString()}</td>
      <td class="status-${payment.status}">${capitalizeFirstLetter(
      payment.status
    )}</td>
      <td>${formatDate(payment.dueDate)}</td>
      <td>
        ${
          payment.status !== "paid"
            ? `<button class="action-btn" onclick="markAsPaid('${payment.unitNo}')">Mark Paid</button>`
            : `<button class="action-btn" onclick="viewReceipt('${payment.unitNo}')">Receipt</button>`
        }
      </td>
    `;
    paymentTable.appendChild(row);
  });
}

function filterPayments() {
  const statusFilter = filterStatus.value;
  const searchTerm = searchUnit.value.toLowerCase();
  const filteredData = paymentData.filter((payment) => {
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesSearch =
      payment.unitNo.toLowerCase().includes(searchTerm) ||
      payment.owner.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });
  renderPaymentTable(filteredData);
}

function openPaymentModal() {
  paymentModal.style.display = "block";
  document.getElementById("payment-date").valueAsDate = new Date();
}

function closePaymentModal() {
  paymentModal.style.display = "none";
  paymentForm.reset();
}

async function savePayment(e) {
  e.preventDefault();
  const unitNo = document.getElementById("unit-number").value;
  const owner = document.getElementById("owner-name").value;
  const amount = parseInt(document.getElementById("amount").value);
  const paymentDate = document.getElementById("payment-date").value;
  const paymentMethod = document.getElementById("payment-method").value;
  const transactionId = document.getElementById("transaction-id").value;

  const paymentPayload = {
    name: owner,
    email: `${unitNo.toLowerCase()}@demo.com`,
    amount,
    paymentMethod,
    pin: "0000",
    flatNum: unitNo,
  };

  try {
    const res = await fetch("http://localhost:3000/api/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentPayload),
    });
    const result = await res.json();
    if (result.success) {
      alert(`Payment for Unit ${unitNo} recorded successfully!`);
      closePaymentModal();
      loadPayments();
    } else {
      alert("Failed to save payment: " + result.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error saving payment.");
  }
}

function markAsPaid(unitNo) {
  alert("This feature should be implemented to trigger an API update call.");
}

function viewReceipt(unitNo) {
  const payment = paymentData.find((p) => p.unitNo === unitNo);
  if (payment) {
    alert(
      `Receipt for Unit ${payment.unitNo}\nOwner: ${payment.owner}\nAmount: ₹${
        payment.amount
      }\nPayment Date: ${formatDate(
        payment.paymentDate
      )}\nStatus: Paid\n\nThank you for your payment!`
    );
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN");
}

function generateReport() {
  alert("Report generation coming soon...");
}

function downloadCsv() {
  alert("Download CSV not yet implemented.");
}
