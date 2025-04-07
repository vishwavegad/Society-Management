const form = document.getElementById("visitorForm");
const tableBody = document.getElementById("visitorTable");

const API_BASE = "http://localhost:3000/api/visitorsLog"; // Adjust if needed

let allVisitors = [];

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  document.getElementById("visitorEntryTime").value = localNow;

  loadVisitors(); // load data on page load
});

function renderVisitors(visitors) {
  const table = document.getElementById("visitorTable");
  table.innerHTML = "";

  visitors.forEach((v) => {
    const tr = document.createElement("tr");
    const entryTime = v.visitorEntryTime || null;
    const exitTime = v.visitorExitTime || null;


    tr.innerHTML = `
      <td>${v.visitorName}</td>
      <td>${v.visitorContact}</td>
      <td>${v.flatNum}</td>
      <td>${v.visitorType}</td>
      <td>${formatDateTime(entryTime)}</td>
      <td>${
        !exitTime
          ? "--"
          : formatDateTime(exitTime)
      }</td>
      <td>${v.visitorExitStatus || "Not Exited"}</td>
      <td>
        ${
          !v.visitorExitTime
            ? `<button class="exit-btn" data-id="${v._id}">Mark Exit</button>`
            : "--"
        }
      </td>
    `;

    table.appendChild(tr);
  });

  searchBtn.addEventListener("click", ()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = allVisitors.filter(v=>v.visitorName.toLowerCase().includes(query));
    renderVisitors(filtered);
})

  function formatDateTime(dateString)
    {
        if(!dateString)
        {
            return "--";
        }
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        })
    }

  const exitButtons = document.querySelectorAll(".exit-btn");
  exitButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const visitorId = button.getAttribute("data-id");

      try {
        const exitTime = new Date().toISOString();
        const response = await fetch(`${API_BASE}/${visitorId}/exit`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorExitTime: exitTime,
            visitorExitStatus: "Exited",
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Visitor marked as exited.");
          loadVisitors();
        } else {
          alert(result.message || "Failed to mark exit.");
        }
      } catch (err) {
        console.error("Exit error:", err);
        alert("Something went wrong while marking exit.");
      }
    });
  });
}

async function loadVisitors() {
  try {
    const response = await fetch(API_BASE);
    allVisitors = await response.json();
    renderVisitors(allVisitors);
  } catch (error) {
    console.error("Failed to load visitors:", error);
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const visitorName = document.getElementById("visitorName").value;
  const visitorContact = document.getElementById("visitorContact").value;
  const flatNum = document.getElementById("flatNum").value;
  const visitorType = document.getElementById("visitorType").value;
  const visitorEntryTime = document.getElementById("visitorEntryTime").value;

  if (
    !visitorName ||
    !visitorContact ||
    !flatNum ||
    !visitorType ||
    !visitorEntryTime
  ) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorName,
        visitorContact,
        flatNum,
        visitorType,
        visitorEntryTime: new Date(visitorEntryTime),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Visitor added!");
      form.reset();

      const entryTimeInput = document.getElementById("visitorEntryTime");
      if (entryTimeInput) {
        const now = new Date();
        const localNow = new Date(
          now.getTime() - now.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);
        entryTimeInput.value = localNow;
      } else {
        console.warn("#visitorEntryTime not found when resetting");
      }

      loadVisitors();
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error submitting visitor:", error);
  }
});
