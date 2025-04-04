document.addEventListener("DOMContentLoaded", async () => {
  const announcementsList = document.getElementById("announcementsList");

  try {
    const response = await fetch("http://localhost:3000/api/announcements");
    const announcements = await response.json();
    if (response.ok) {
      announcements.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      announcements.forEach((announcement) => {
        const card = document.createElement("div");
        card.className = "announcement-card";

        const title = document.createElement("h3");
        title.textContent = announcement.subject;

        const description = document.createElement("p");
        description.textContent = announcement.message;

        const date = document.createElement("span");
        const formattedDate = new Date(
          announcement.createdAt
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        date.textContent = `Posted on ${formattedDate}`;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(date);

        announcementsList.appendChild(card);
      });
    } else {
      console.error("Failed to fetch announcements", announcements);
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
    announcementsList.innerHTML = "<p>Failed to load announcements</p>";
  }
});
