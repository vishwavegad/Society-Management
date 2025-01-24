document.addEventListener('DOMContentLoaded', ()=>{
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackContainer = document.querySelector(".feedback-container");

    //adding event listener to feedbackForm submit button
    feedbackForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const feedbackText = document.getElementById('text').value.trim();
        if(feedbackText !== "")
        {
            //creating a new feedback card
            const feedbackCard = document.createElement("div");
            //adding classlist feedback-card to new feedbackCard
            feedbackCard.classList.add("feedback-card");

            //creating a div for userPhoto
            const userPhoto = document.createElement("div");
            userPhoto.classList.add("user-photo");
            feedbackCard.innerHTML = '<i class="fa-solid fa-user"></i>';

            //creating a p tag for userText
            const userText = document.createElement("p");
            userText.textContent = `"${feedbackText}"`;

            //creating a div for username
            const userName = document.createElement("div");
            userName.classList.add("user-name");
            userName.textContent = "Anonymous User";

            //creating a div for role
            const clientRole = document.createElement("div");
            clientRole.classList.add("client-role");
            clientRole.textContent = "New Role";

            //appending all the elements to feedback card
            feedbackCard.appendChild(userPhoto);            
            feedbackCard.appendChild(userText);            
            feedbackCard.appendChild(userName);            
            feedbackCard.appendChild(clientRole);
            
            //appending feedback card to feedback container
            feedbackContainer.appendChild(feedbackCard);

            //clearing the form
            feedbackForm.reset();
            alert("Feedback Submitted Successfully");
        }
    })
})