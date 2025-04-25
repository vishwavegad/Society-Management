(async function () {
  const bookingTable = document.getElementById("bookingTable");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  let bookings = [];

  async function fetchBookings() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/amenities/book/admin",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const fetchedBookings = await response.json();

      bookings = fetchedBookings.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      renderBookings(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to load bookings");
    }
  }

  function renderBookings(data) {
    bookingTable.innerHTML = "";
    if (data.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="6" style="text-align: center;">No bookings found</td>`;
      bookingTable.appendChild(emptyRow);
      return;
    }
    
    data.forEach((booking) => {
      const row = createBookingRow(booking);
      bookingTable.appendChild(row);
    });
  }

  function createBookingRow(booking) {
    const row = document.createElement("tr");
    const status = booking.status || "Pending";
    const actionHTML =
      booking.status === "Pending"
        ? `<select class="action-select" onchange="updateStatus('${booking._id}', this)">
             <option disabled selected>Choose</option>
             <option value="Booked">Booked</option>
             <option value="Rejected">Rejected</option>
           </select>`
        : `<button class="delete-btn" onclick="deleteBooking('${booking._id}')">Delete</button>`;

    // Create cells with data-label attributes for responsive design
    row.innerHTML = `
      <td data-label="Amenity">${booking.amenity}</td>
      <td data-label="Booked By">${booking.name}</td>
      <td data-label="Date">${new Date(booking.date).toLocaleDateString()}</td>
      <td data-label="Time">${booking.timeSlot}</td>
      <td data-label="Status" class="${getStatusClass(status)}">${status}</td>
      <td data-label="Action">${actionHTML}</td>
    `;

    return row;
  }

  function getStatusClass(status) {
    if (status === "Booked") return "text-green-500";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-500";
  }

  async function updateStatus(id, selectElement) {
    const newStatus = selectElement.value;
    const booking = bookings.find((b) => b._id === id);
    if (!booking) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/amenities/book/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      const { updatedBooking } = await response.json();
      bookings = bookings.map((b) => (b._id === id ? updatedBooking : b));
      renderBookings(bookings);
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status");
    }
  }
  window.updateStatus = updateStatus;

  async function deleteBooking(id) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/amenities/book/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      bookings = bookings.filter((b) => b._id !== id);
      renderBookings(bookings);
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  }
  window.deleteBooking = deleteBooking;

  // Add enter key functionality to search input
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  searchBtn.addEventListener("click", () => {
    const search = searchInput.value.toLowerCase();
    const filteredBookings = bookings
      .filter(
        (b) =>
          b.amenity.toLowerCase().includes(search) ||
          b.name.toLowerCase().includes(search)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    renderBookings(filteredBookings);
  });

  fetchBookings();
})();