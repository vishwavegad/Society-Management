let bookings = [
  {
    amenity: "Swimming Pool",
    bookedBy: "Flat A-102",
    date: "2025-04-20",
    time: "6:00 PM",
    status: "Pending"
  },
  {
    amenity: "Clubhouse",
    bookedBy: "Flat B-304",
    date: "2025-04-22",
    time: "4:00 PM",
    status: "Booked"
  },
  {
    amenity: "Tennis Court",
    bookedBy: "Flat C-202",
    date: "2025-04-23",
    time: "9:00 AM",
    status: "Rejected"
  }
];

function getStatusClass(status) {
  switch (status) {
    case "Booked":
      return "status-booked";
    case "Pending":
      return "status-pending";
    case "Rejected":
      return "status-rejected";
    default:
      return "";
  }
}

function renderBookings(filtered = bookings) {
  const table = document.getElementById("bookingTable");
  table.innerHTML = "";

  filtered.forEach((booking, index) => {
    const row = document.createElement("tr");

    const actionHTML =
      booking.status === "Pending"
        ? `<select class="action-select" onchange="updateStatus(${index}, this)">
             <option disabled selected>Choose</option>
             <option value="Booked">Booked</option>
             <option value="Rejected">Rejected</option>
           </select>`
        : `<button class="delete-btn" onclick="deleteBooking(${index})">Delete</button>`;

    row.innerHTML = `
      <td>${booking.amenity}</td>
      <td>${booking.bookedBy}</td>
      <td>${booking.date}</td>
      <td>${booking.time}</td>
      <td class="${getStatusClass(booking.status)}">${booking.status}</td>
      <td>${actionHTML}</td>
    `;

    table.appendChild(row);
  });
}

function updateStatus(index, selectElement) {
  const newStatus = selectElement.value;
  bookings[index].status = newStatus;
  renderBookings();
}

function deleteBooking(index) {
  if (confirm("Are you sure you want to delete this booking?")) {
    bookings.splice(index, 1);
    renderBookings();
  }
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtered = bookings.filter(
    (b) =>
      b.amenity.toLowerCase().includes(search) ||
      b.bookedBy.toLowerCase().includes(search)
  );
  renderBookings(filtered);
});

renderBookings();
