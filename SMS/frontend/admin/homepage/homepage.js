document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profile-img");
  const profileImgInput = document.getElementById("profile-img-input");
  const announcementBtn = document.getElementById("announcement-button");
  const complaintBtn = document.getElementById("complaint-button");
  const amenitiesBtn = document.getElementById("amenities-button");
  const rightContent = document.getElementById("right-content");
  const aboutsocietyBtn = document.getElementById("aboutsociety-button");
  const maintenanceBtn = document.getElementById("maintenance-button");
  // const defaultButton = document.getElementById("aboutsociety-button");
  const defaultURL = "aboutsociety.html";

  profileImgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const resetButtons = () => {
    const buttons = document.querySelectorAll(".features button");
    buttons.forEach((btn) => {
      // btn.style.backgroundColor = "#003366";
      btn.classList.remove("active");
      // btn.addEventListener("mouseenter", ()=>{
      //   btn.backgroundColor = "#002244";
      // })
    });
  };

  const loadPage = (btn, url) => {
    resetButtons();
    btn.classList.add("active");
    // btn.style.backgroundColor = "#002244";
    rightContent.innerHTML = "";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Page not found");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Fetched data: ", data);
        rightContent.innerHTML = data;
        // addButtonEventListeners();
      })
      .catch((error) => {
        rightContent.innerHTML = "<p>Sorry the page could not be loaded</p>";
        console.log("Error loading the page: ", error);
      });
  };

  if (announcementBtn) {
    announcementBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(announcementBtn, "announcement.html");
    });
  }
  if (complaintBtn) {
    complaintBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(complaintBtn, "complaint.html");
    });
  }

  if (amenitiesBtn) {
    amenitiesBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(amenitiesBtn, "amenities.html");
    });
  }
  if (aboutsocietyBtn) {
    aboutsocietyBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(aboutsocietyBtn, "aboutsociety.html");
    });
  }

  if (maintenanceBtn) {
    maintenanceBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(maintenanceBtn, "maintenance.html");
    });
  }
  loadPage(aboutsocietyBtn, defaultURL);
});

