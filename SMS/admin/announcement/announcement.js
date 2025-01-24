document.addEventListener("DOMContentLoaded", ()=>{
    const addBtn = document.getElementById("add-button");
    const announcementTextContainer = document.getElementById("announcement-text-container");
    const announcementSubject = document.getElementById("announcement-subject");
    const announcementTextArea = document.getElementById("announcement-text");
    const announcementList = document.getElementById("announcement-list");
    const sendBtn = document.getElementById("send-button");
    const searchAnnouncement = document.querySelector('.search-announcements input');
    const maxLength = 200;
    const charCountDisplay = document.getElementById("char-count");
    //autosave announcement subject and text
    const saveData = () => {
        localStorage.setItem('announcementSubject', announcementSubject.value);
        localStorage.setItem('announcementTextArea', announcementTextArea.value);
    }
    //function to load data
    const loadData = () => {
        announcementSubject.value = localStorage.getItem('announcementSubject') || '';
        announcementTextArea.value = localStorage.getItem('announcementTextArea') || '';
        updateCharCount();
    }
    //function to update character count
    const updateCharCount = () => {
        const currentLength = announcementTextArea.value.length;
        const charactersLeft = maxLength - currentLength;
        charCountDisplay.textContent = `${charactersLeft}`;
        if(charactersLeft<50)
        {
            charCountDisplay.style.color = "red";
        }
        else
        {
            charCountDisplay.style.color = "#646364";
        }
    }
    announcementSubject.addEventListener('input', saveData);
    announcementTextArea.addEventListener('input', saveData);
    loadData();
    //function to search or filter announcements
    // searchInput.placeholder = "Search announcements...";
    searchAnnouncement.addEventListener('input', ()=>{
        const filter = searchAnnouncement.value.toLowerCase();
        const announcementCards = document.querySelectorAll(".announcement-card");
        announcementCards.forEach(card=>{
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(filter)?'block':'none';
        })
    })
    // document.querySelector('.announcement-list').prepend(searchInput);
    addBtn.addEventListener("click", ()=>{
        announcementTextContainer.classList.add('active');
        announcementTextContainer.style.display = "flex";
        // announcementTextArea.value = "";
        // console.log("Clicked");
    })
    sendBtn.addEventListener("click", ()=>{
        // //condition for confirmation
        // if(announcementSubject.value.trim() || announcementTextArea.value.trim())
        // {
        //     const confirmed = confirm("Are you sure you want to send this announcement?");
        //     if(!confirmed)
        //         return;
        // }
        const subject = announcementSubject.value.trim();
        const announcementText = announcementTextArea.value.trim();

        if(subject && announcementText)
        {
            //creating a new announcement card with div and class announcemnet-card
            const newAnnouncementCard = document.createElement("div");
            newAnnouncementCard.classList.add("announcement-card");

            //creating a new h3 with newSubject and appending it to newAnnouncementCard
            const newSubject = document.createElement("h3");
            newSubject.textContent = subject;
            newAnnouncementCard.appendChild(newSubject);

            //creating a new p with newAnnouncementText and appending it to newAnnouncementCard
            const newAnnouncementText = document.createElement("p");
            newAnnouncementText.textContent = announcementText;
            newAnnouncementCard.appendChild(newAnnouncementText);

            //creating a new span with currentDate, formatting it and appending it to newAnnouncementCard
            const newPostedOn = document.createElement("span");
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            newPostedOn.textContent = `Posted on: ${formattedDate}`;
            newAnnouncementCard.appendChild(newPostedOn);

            // appending newAnnouncementCard to announcementList
            announcementList.insertBefore(newAnnouncementCard, announcementList.firstChild);

            //clearing texts
            announcementSubject.value = "";
            announcementTextArea.value = "";

            //clear localStorage after sending the announcement
            localStorage.removeItem('announcementSubject');
            localStorage.removeItem('announcementTextArea');

            // setting display to none after clicking on send button
            announcementTextContainer.style.display = "none";
        }
        else
        {
            alert("Please fill in the subject and announcement before clicking on send");
        }
        charCountDisplay.textContent = "200";
    }) 
    announcementTextArea.addEventListener('input', ()=>{
        const currentLength = announcementTextArea.value.length;
        if(currentLength>=maxLength)
        {
            alert("You have reached the maximum character limit.");
            announcementTextArea.value = announcementTextArea.value.substring(0, maxLength);
        }
        updateCharCount();
    })  
})