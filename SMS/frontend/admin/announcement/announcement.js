(async function (){
  const addBtn = document.getElementById("add-button");
  console.log(addBtn);
  const announcementTextContainer = document.getElementById("announcement-text-container");
  const announcementSubject = document.getElementById("announcement-subject");
  const announcementTextArea = document.getElementById("announcement-text");
  const announcementsList = document.getElementById("announcementsList");
  const sendBtn = document.getElementById("send-button");
  const searchAnnouncement = document.querySelector(".search-announcements input");
  const maxLength = 200;
  const charCountDisplay = document.getElementById("char-count");

  //autosave announcement subject and text
  const saveData = () => {
    localStorage.setItem("announcementSubject", announcementSubject.value);
    localStorage.setItem("announcementTextArea", announcementTextArea.value);
  };

  //function to load data
  const loadData = () => {
    announcementSubject.value =
      localStorage.getItem("announcementSubject") || "";
    announcementTextArea.value =
      localStorage.getItem("announcementTextArea") || "";
    updateCharCount();
  };

  //function to update character count
  const updateCharCount = () => {
    const currentLength = announcementTextArea.value.length;
    const charactersLeft = maxLength - currentLength;
    charCountDisplay.textContent = `${charactersLeft}`;
    if (charactersLeft < 50) {
      charCountDisplay.style.color = "red";
    } else {
      charCountDisplay.style.color = "#646364";
    }
  };

  announcementSubject.addEventListener("input", saveData);
  announcementTextArea.addEventListener("input", saveData);
  
  loadData();

  //function to search or filter announcements
  searchAnnouncement.addEventListener("input", () => {
    const filter = searchAnnouncement.value.toLowerCase();
    const announcementCards = document.querySelectorAll(".announcement-card");
    announcementCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(filter) ? "block" : "none";
    });
  });

  addBtn.addEventListener("click", () => {
    announcementTextContainer.classList.toggle("active");

    if (announcementTextContainer.style.display === "none" || announcementTextContainer.style.display === "" || announcementTextContainer.classList.contains("active")) 
    {
      announcementTextContainer.style.display = "flex";
    } 
    else 
    {
      announcementTextContainer.style.display = "none";
    }
  });

  const loadAnnouncements = async () => {
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
  };

  loadData();
  loadAnnouncements();

  sendBtn.addEventListener("click", async () => {
    const subject = announcementSubject.value.trim();
    const announcementText = announcementTextArea.value.trim();

    if (subject && announcementText) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/announcements",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject,
              message: announcementText,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          alert("Announcement sent successfully");

          announcementSubject.value = "";
          announcementTextArea.value = "";
          localStorage.removeItem("announcementSubject");
          localStorage.removeItem("announcementTextArea");
          announcementTextArea.style.display = "none";
          charCountDisplay.textContent = "200";
        } else {
          alert(result.message || "Failed to send announcement");
        }
      } catch (error) {
        console.error("Error sending announcement: ", error);
        alert("Server error. Please try again.");
      }
    } else {
      alert(
        "Please fill in the subject and announcement before clicking on send"
      );
    }
  });
  announcementTextArea.addEventListener("input", () => {
    const currentLength = announcementTextArea.value.length;
    if (currentLength >= maxLength) {
      alert("You have reached the maximum character limit.");
      announcementTextArea.value = announcementTextArea.value.substring(
        0,
        maxLength
      );
    }
    saveData();
    updateCharCount();
  });
})();