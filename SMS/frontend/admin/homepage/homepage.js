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
  const leftSidebar = document.querySelector(".left");
  // const defaultButton = document.getElementById("aboutsociety-button");
  const defaultURL = "../about/aboutsociety.html";

  // Create and add hamburger menu
  const createHamburgerMenu = () => {
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger-menu";
    hamburger.innerHTML = `
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    `;
    document.body.appendChild(hamburger);
    
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    
    // Add event listeners for hamburger menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("change");
      leftSidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener("click", () => {
      hamburger.classList.remove("change");
      leftSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("change");
        leftSidebar.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  };

  // Initialize hamburger menu
  createHamburgerMenu();

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
      })
      .catch((error) => {
        rightContent.innerHTML = "<p>Sorry, the page could not be loaded</p>";
        console.log("Error loading the page: ", error);
      });
  };

  if (aboutsocietyBtn) {
    aboutsocietyBtn.addEventListener("click", () => {
      loadPage(aboutsocietyBtn, "../about/aboutsociety.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
    });
  }

  if (announcementBtn) {
    announcementBtn.addEventListener("click", () => {
      loadPage(announcementBtn, "../announcement/announcement.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
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
      loadPage(amenitiesBtn, "../amenities/amenities.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
    });
  }

  if (maintenanceBtn) {
    maintenanceBtn.addEventListener("click", () => {
      loadPage(maintenanceBtn, "../maintenance/maintenance.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
    });
  }

  if (complaintBtn) {
    complaintBtn.addEventListener("click", () => {
      loadPage(complaintBtn, "../complaint/complaint.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
    });
  }

  if (visitorBtn) {
    visitorBtn.addEventListener("click", () => {
      loadPage(visitorBtn, "../visitorslog/visitorslog.html");
      // Close mobile menu after navigation on small screens
      if (window.innerWidth <= 768) {
        document.querySelector('.hamburger-menu').classList.remove("change");
        leftSidebar.classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
      }
    });
  }

  loadPage(aboutsocietyBtn, defaultURL);
});