    document.addEventListener("DOMContentLoaded", ()=>{
        const submitBtn = document.querySelector(".btn");

        if(!submitBtn){
            console.error("Submit button not found");
            return;
        }
        submitBtn.addEventListener("click", async(e)=>{
            e.preventDefault();
            const username = document.querySelector('input[placeholder="Full Name"]').value.trim();
            const email = document.querySelector('input[placeholder="Email Adress"]').value.trim();
            const flatNum = document.querySelector('input[placeholder="Flat Number"]').value.trim();
            const contactNo = document.querySelector('input[placeholder="Contact Number"]').value.trim();
            const complaintType = document.querySelector("select").value;
            const complaint = document.querySelector("textarea").value.trim();
            console.log("Complaint Select Element:", complaint);
console.log("Selected Index:", complaint.selectedIndex);
console.log("Selected Value:", complaint.value);

            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Flat Number:", flatNum);
            console.log("Contact Number:", contactNo);
            console.log("Complaint Type:", complaintType);
            console.log("Complaint Description:", complaint);

            if(!username || !email || !flatNum || !contactNo || !complaintType || !complaint){
                alert("All fields are required");
                return;
            }
            const newComplaint = {username, email, flatNum, contactNo, complaintType, complaint};

            try{
                const response = await fetch("http://localhost:3000/api/complaints", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newComplaint)
                })
                const data = await response.json();
                console.log("Server Response:", data);

                if(response.ok){
                    alert("Complaint submitted successfully");
                    window.location.reload();
                }
                else{
                    alert(data.message || "Error submitting complaint.");
                }
            }catch(error){
                console.error("Error: ", error);
                alert("Server error. Please try again.");
            }
        })
    })