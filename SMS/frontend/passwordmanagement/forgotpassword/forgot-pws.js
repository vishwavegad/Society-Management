// Select elements
const emailStep = document.getElementById("step-email");
const otpStep = document.getElementById("step-otp");
const passwordStep = document.getElementById("step-password");

const emailInput = document.getElementById("email");
const sendOtpButton = document.getElementById("sendOtp");
const verifyOtpButton = document.getElementById("verifyOtp");
const submitPasswordButton = document.getElementById("submitPassword");

const otpInputs = document.querySelectorAll(".otp-input");

// Handle Email Submission
sendOtpButton.addEventListener("click", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert("Please enter a valid email address.");
    } else {
        alert("OTP sent to your email!");
        otpStep.classList.remove("hidden");
        document.querySelector(".container").style.height = "auto";
    }
});

// Handle OTP Submission
verifyOtpButton.addEventListener("click", () => {
    const otp = Array.from(otpInputs).map(input => input.value).join("");
    if (otp.length !== 4 || isNaN(otp)) {
        alert("Please enter a valid 4-digit OTP.");
    } else {
        alert("OTP verified successfully!");
    }
});


// Auto-focus and OTP Input Navigation
otpInputs.forEach((input, index1) => {
    input.addEventListener('keyup', (e) => {
        const currentInput = input;
        const nextInput = input.nextElementSibling;
        const prevInput = input.previousElementSibling;

        if(currentInput.value.length > 1){
            currentInput.value = "";
            return;
        }

        if(nextInput && currentInput.value !== ""){
            nextInput.focus();
        }
        
        if(e.key === "Backspace"){
            otpInputs.forEach((input, index2) => {
                if(index1 <= index2 && prevInput){
                    currentInput.value = "";
                    prevInput.focus();
                }
            });
        }

        if(otpInputs[3].value !== ""){
            verifyOtpButton.classList.add('active');
            return;
        }
        verifyOtpButton.classList.remove('active');
    });
});

// Autofocus on first element
window.addEventListener("load", () => otpInputs[0].focus());
