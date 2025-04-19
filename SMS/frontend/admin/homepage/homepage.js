document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profile-img");
  const profileImgInput = document.getElementById("profile-img-input");
  const announcementBtn = document.getElementById("announcement-button");
  const complaintBtn = document.getElementById("complaint-button");
  const amenitiesBtn = document.getElementById("amenities-button");
  const rightContent = document.getElementById("right-content");
  const aboutsocietyBtn = document.getElementById("aboutsociety-button");
  const maintenanceBtn = document.getElementById("maintenance-button");
  const visitorBtn = document.getElementById("visitor-button");
  // const defaultButton = document.getElementById("aboutsociety-button");
  const defaultURL = "../about/aboutsociety.html";

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

  // const loadPage = (btn, url) => {
  //   resetButtons();
  //   btn.classList.add("active");
  //   // btn.style.backgroundColor = "#002244";
  //   rightContent.innerHTML = "";
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Page not found");
  //       }
  //       return response.text();
  //     })
  //     .then((data) => {
  //       console.log("Fetched data: ", data);
  //       rightContent.innerHTML = data;
  //       // addButtonEventListeners();
  //     })
  //     .catch((error) => {
  //       rightContent.innerHTML = "<p>Sorry the page could not be loaded</p>";
  //       console.log("Error loading the page: ", error);
  //     });
  // };

  const loadPage = (btn, url) => {
    resetButtons();
    btn.classList.add("active");
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

        const fileName = url.split("/").pop().split(".")[0]; // e.g., visitorslog
        const scriptPath = `../${fileName}/${fileName}.js`; // e.g., ../visitorslog/visitorslog.js

        const script = document.createElement("script");
        script.src = scriptPath;
        script.type = "text/javascript";
        script.onload = () => console.log(`Loaded script: ${scriptPath}`);
        script.onerror = () => console.warn(`Script not found: ${scriptPath}`);
        document.body.appendChild(script);

        // if (url.includes("visitorslog.html")) {
        //   const script = document.createElement("script");
        //   script.src = "../visitorslog/visitorslog.js";
        //   script.type = "text/javascript";
        //   document.body.appendChild(script);
        // }

        // Call this function to add event listeners after loading announcement page
        // if (url.includes("announcement.html")) {
        //   attachAnnouncementEventListeners();
        // }
      })
      .catch((error) => {
        rightContent.innerHTML = "<p>Sorry, the page could not be loaded</p>";
        console.log("Error loading the page: ", error);
      });
  };

  if (aboutsocietyBtn) {
    aboutsocietyBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(aboutsocietyBtn, "../about/aboutsociety.html");
    });
  }

  if (announcementBtn) {
    announcementBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(announcementBtn, "../announcement/announcement.html");
    });
  }

  const attachAnnouncementEventListeners = () => {
    const addButton = document.getElementById("add-button");
    const announcementContainer = document.getElementById(
      "announcement-text-container"
    );

    if (addButton && announcementContainer) {
      addButton.addEventListener("click", () => {
        console.log("Add Announcement button clicked!"); // Debugging
        announcementContainer.style.display = "block"; // Show the announcement text container
        announcementContainer.classList.add("active"); // Add animation
      });
    }
  };

  if (amenitiesBtn) {
    amenitiesBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(amenitiesBtn, "../amenities/amenities.html");
    });
  }

  if (maintenanceBtn) {
    maintenanceBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(maintenanceBtn, "../maintenance/maintenance.html");
    });
  }

  if (complaintBtn) {
    complaintBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(complaintBtn, "../complaint/complaint.html");
    });
  }

  if (visitorBtn) {
    visitorBtn.addEventListener("click", () => {
      // resetButtons();
      loadPage(visitorBtn, "../visitorslog/visitorslog.html");
    });
  }

  loadPage(aboutsocietyBtn, defaultURL);
});
