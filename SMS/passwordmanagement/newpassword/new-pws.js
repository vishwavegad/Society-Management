const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const eyeIcon1 = document.getElementById("eyeicon1");
const eyeIcon2 = document.getElementById("eyeicon2");


// Toggle password visibility
function togglePasswordVisibility(input, icon) {
    if (input.type === "password") {
        input.type = "text";
        icon.src = "visible.png"; 
    } else {
        input.type = "password";
        icon.src = "invisible.png"; 
    }
}
eyeIcon1.addEventListener("click", () => togglePasswordVisibility(password1, eyeIcon1));
eyeIcon2.addEventListener("click", () => togglePasswordVisibility(password2, eyeIcon2));



// Handle Password Submission
document.querySelector(".submit").addEventListener("click", function(e) {
    const pass1 = password1.value;
    const pass2 = password2.value;
    if (pass1 !== pass2) {
        e.preventDefault();
        alert("Passwords do not match. Please try again.");
    } else if (pass1.length < 8) {
        e.preventDefault();
        alert("Password must be at least 8 characters long.");
    } else {
        alert("Password changed successfully!");
    }
});