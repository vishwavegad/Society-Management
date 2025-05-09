document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profile-img");
  const profileImgInput = document.getElementById("profile-img-input");
  const aboutsocietyBtn = document.getElementById("aboutsociety-button");
  const announcementBtn = document.getElementById("announcement-button");
  const amenitiesBtn = document.getElementById("amenities-button");
  const maintenanceBtn = document.getElementById("maintenance-button");
  const complaintBtn = document.getElementById("complaint-button");
  const rightContent = document.getElementById("right-content");
  
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

        const fileName = url.split("/").pop().split(".")[0]; // e.g., visitorslog
        const scriptPath = `../${fileName}/${fileName}.js`; // e.g., ../visitorslog/visitorslog.js

        const script = document.createElement("script");
        script.src = scriptPath;
        script.type = "text/javascript";
        script.onload = () => {
          console.log(`Loaded script: ${scriptPath}`);
        
          const initFnName = `initialize${fileName.charAt(0).toUpperCase() + fileName.slice(1)}Form`;
          if (typeof window[initFnName] === "function") {
            window[initFnName]();
          }

          // if (fileName === "complaint" && typeof initializeComplaintForm === "function") {
          //   initializeComplaintForm();
          // }

          // if (fileName === "maintenance" && typeof initializeMaintenanceForm === "function") {
          //   initializeMaintenanceForm();
          // }
          
        };
        script.onerror = () => console.warn(`Script not found: ${scriptPath}`);
        document.body.appendChild(script);

        // addButtonEventListeners();
        // if(url.includes("complaint.html")){
        //   loadScript("../complaint/complaint.js");
        // }
      })
      .catch((error) => {
        rightContent.innerHTML = "<p>Sorry the page could not be loaded</p>";
        console.log("Error loading the page: ", error);
      });
  };

  function loadScript(scriptSrc){
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.onload = () => console.log(`${scriptSrc} loaded successfully`);
    document.body.appendChild(script);
  }

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
  loadPage(aboutsocietyBtn, defaultURL);

// Create overlay element for when sidebar is open
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Hamburger menu functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const leftSidebar = document.querySelector('.left');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('change');
    leftSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close sidebar when clicking on overlay
overlay.addEventListener('click', () => {
    hamburgerMenu.classList.remove('change');
    leftSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when a menu item is clicked
const featureButtons = document.querySelectorAll('.features button');
featureButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburgerMenu.classList.remove('change');
            leftSidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Adjust display on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburgerMenu.classList.remove('change');
        leftSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
});
});

