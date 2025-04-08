// Auto-fill today's date on page load
window.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.querySelector('input[type="date"]');
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  dateInput.value = formattedDate;
});

function toggleFunctionInput() {
  const amenity = document.getElementById("amenity").value;
  const functionInput = document.getElementById("functionInput");
  functionInput.classList.toggle("hidden", amenity !== "Other");
}

function calculatePayment() {
  const duration = document.getElementById("duration").value;
  const ratePerHour = 100; // ₹100/hour
  const payment = duration ? duration * ratePerHour : 0;
  document.getElementById("payment").value = `₹${payment}`;
}

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent form default behavior

  const name = document.querySelector('input[placeholder="Name"]').value;
  const contact = document.querySelector(
    'input[placeholder="Contact Number"]'
  ).value;
  const flat = document.querySelector('input[placeholder="Flat Number"]').value;
  const amenity = document.getElementById("amenity").value;
  const functionName = document.getElementById("functionInput").value;
  const date = document.querySelector('input[type="date"]').value;
  const timeSlot = document.querySelector(
    'input[placeholder^="Time Slot"]'
  ).value;
  const guests = document.querySelector(
    'input[placeholder="Number of Guests"]'
  ).value;
  const duration = document.getElementById("duration").value;
  const payment = document.getElementById("payment").value;

  const bookingData = {
    name,
    contact,
    flat,
    amenity,
    functionName: amenity === "Other" ? functionName : null,
    date,
    timeSlot,
    guests,
    duration,
    paymentAmount: payment.replace(/[^\d]/g, ""), // Extract numeric value
  };

  try {
    const response = await fetch("http://localhost:3000/api/amenities/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Booking successful!");
      window.location.reload();
    } else {
      alert(`Booking failed: ${result.message}`);
    }
  } catch (err) {
    alert("An error occurred while submitting the form.");
    console.error(err);
  }
});
